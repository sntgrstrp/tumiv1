
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Bike, ChevronRight, HelpCircle, Info, MapPin, SearchIcon, UserRound, Wallet } from "lucide-react";

interface AssistantQuestion {
  id: string;
  question: string;
  type: "slider" | "radio" | "select";
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  field: string;
  help?: string;
}

interface RequestData {
  altura?: number;
  peso?: number;
  presupuesto?: number;
  marca?: string;
  tipo_uso?: string;
  cilindrada?: number;
  potencia?: number;
  tipo_motor?: string;
  transmision?: string;
  freno_delantero?: string;
  freno_trasero?: string;
  suspension_delantera?: string;
  suspension_trasera?: string;
  capacidad_tanque?: number;
  alto_total?: number;
  bike_weight?: number; // For the bike's weight to avoid confusion with user weight
  experience?: string; // Added this to fix TypeScript errors
}

const InteractiveAssistant = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showHelp, setShowHelp] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<RequestData>({
    altura: 170,
    peso: 70,
    presupuesto: 15000000,
    transmision: "",
    tipo_uso: "",
    marca: "",
    experience: "", // Initialize the experience property
  });

  const basicQuestions: AssistantQuestion[] = [
    {
      id: "welcome",
      question: "¡Hola! Vamos a encontrar la moto perfecta para ti. Responderé a todas tus dudas. ¿Empezamos?",
      type: "radio",
      options: [{ value: "yes", label: "¡Vamos!" }],
      field: "intro",
      help: "Este asistente te ayudará a encontrar la moto ideal basada en tus preferencias y características físicas."
    },
    {
      id: "height",
      question: "¿Cuánto mides?",
      type: "slider",
      min: 150,
      max: 210,
      step: 1,
      field: "altura",
      help: "La altura es importante para determinar si podrás apoyar cómodamente los pies en el suelo cuando estés sentado en la moto."
    },
    {
      id: "weight",
      question: "¿Cuál es tu peso aproximado?",
      type: "slider",
      min: 40,
      max: 150,
      step: 1,
      field: "peso",
      help: "El peso es relevante para recomendar motocicletas con la potencia adecuada para un manejo cómodo y seguro."
    },
    {
      id: "budget",
      question: "¿Cuál es tu presupuesto aproximado?",
      type: "slider",
      min: 4000000,
      max: 110000000,
      step: 500000,
      field: "presupuesto",
      help: "Este rango te permitirá encontrar motos que se ajusten a tu capacidad económica."
    },
    {
      id: "usage",
      question: "¿Para qué vas a usar la moto principalmente?",
      type: "radio",
      options: [
        { value: "ciudad", label: "Ciudad" },
        { value: "carretera", label: "Carretera" },
        { value: "todo-terreno", label: "Todo Terreno" },
        { value: "cualquiera", label: "Uso mixto" }
      ],
      field: "tipo_uso",
      help: "El tipo de uso determina características como suspensión, postura de manejo y otros factores importantes."
    },
    {
      id: "transmission",
      question: "¿Prefieres transmisión automática, semiautomática o manual?",
      type: "radio",
      options: [
        { value: "automatica", label: "Automática" },
        { value: "semiautomatica", label: "Semiautomática" },
        { value: "manual", label: "Manual" },
        { value: "no-preferencia", label: "No tengo preferencia" } // Changed from empty string to "no-preferencia"
      ],
      field: "transmision",
      help: "La transmisión automática es más sencilla de manejar, mientras que la manual te da mayor control sobre la potencia."
    },
    {
      id: "experience",
      question: "¿Tienes experiencia previa con motocicletas o quieres especificar más detalles técnicos?",
      type: "radio",
      options: [
        { value: "yes", label: "Sí, quiero especificar más detalles" },
        { value: "no", label: "No, con lo básico es suficiente" }
      ],
      field: "experience",
      help: "Si tienes experiencia, podemos hacerte preguntas más específicas sobre características técnicas."
    }
  ];

  const advancedQuestions: AssistantQuestion[] = [
    {
      id: "engine_cc",
      question: "¿Te interesa un rango específico de cilindrada?",
      type: "select",
      options: [
        { value: "no-preferencia", label: "No tengo preferencia" }, // Changed from empty string to "no-preferencia"
        { value: "125", label: "Hasta 125cc" },
        { value: "150", label: "126cc - 150cc" },
        { value: "200", label: "151cc - 200cc" },
        { value: "300", label: "201cc - 300cc" },
        { value: "500", label: "301cc - 500cc" },
        { value: "1000", label: "501cc - 1000cc" },
        { value: "1001", label: "Más de 1000cc" }
      ],
      field: "cilindrada",
      help: "La cilindrada afecta la potencia de la motocicleta. A mayor cilindrada, generalmente mayor potencia pero también mayor consumo de combustible."
    },
    {
      id: "abs_brakes",
      question: "¿Prefieres frenos ABS?",
      type: "radio",
      options: [
        { value: "abs", label: "Sí, quiero ABS" },
        { value: "disco", label: "No necesariamente, frenos de disco normales están bien" },
        { value: "no-preferencia", label: "No tengo preferencia" } // Changed from empty string to "no-preferencia"
      ],
      field: "freno_delantero",
      help: "Los frenos ABS evitan que las ruedas se bloqueen durante una frenada brusca, aumentando la seguridad."
    },
    {
      id: "suspension",
      question: "¿Qué tipo de suspensión delantera prefieres?",
      type: "select",
      options: [
        { value: "no-preferencia", label: "No tengo preferencia" }, // Changed from empty string to "no-preferencia"
        { value: "telescopica", label: "Telescópica (estándar)" },
        { value: "invertida", label: "Invertida (mejor rendimiento)" },
        { value: "horquilla", label: "Horquilla" }
      ],
      field: "suspension_delantera",
      help: "La suspensión invertida ofrece mejor rendimiento y estabilidad, mientras que la telescópica es más común y económica."
    },
    {
      id: "brand",
      question: "¿Tienes alguna marca favorita?",
      type: "select",
      options: [
        { value: "no-preferencia", label: "No tengo preferencia" }, // Changed from empty string to "no-preferencia"
        { value: "Honda", label: "Honda" },
        { value: "Yamaha", label: "Yamaha" },
        { value: "Suzuki", label: "Suzuki" },
        { value: "Kawasaki", label: "Kawasaki" },
        { value: "KTM", label: "KTM" },
        { value: "BMW", label: "BMW" },
        { value: "Ducati", label: "Ducati" },
        { value: "Triumph", label: "Triumph" },
        { value: "Bajaj", label: "Bajaj" },
        { value: "TVS", label: "TVS" },
        { value: "Hero", label: "Hero" },
        { value: "Royal Enfield", label: "Royal Enfield" },
        { value: "AKT", label: "AKT" }
      ],
      field: "marca",
      help: "Cada marca tiene su propio enfoque y especialidad en el diseño y fabricación de motocicletas."
    }
  ];

  const allQuestions = showAdvanced 
    ? [...basicQuestions, ...advancedQuestions] 
    : basicQuestions;
  
  const currentQuestion = allQuestions[currentStep];
  const isLastQuestion = currentStep === allQuestions.length - 1;
  const isAdvancedQuestion = currentStep === basicQuestions.length - 1;
  
  const handleNext = () => {
    if (isAdvancedQuestion && userData.experience === "yes" && !showAdvanced) {
      setShowAdvanced(true);
    }
    
    if (isLastQuestion || (isAdvancedQuestion && userData.experience === "no")) {
      handleSearch();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleValueChange = (field: string, value: any) => {
    setUserData({
      ...userData,
      [field]: value
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    
    try {
      // Prepare API request data
      const requestData: RequestData = {};
      
      // Only add fields with values
      if (userData.altura) requestData.altura = userData.altura;
      if (userData.peso) requestData.peso = userData.peso;
      if (userData.presupuesto) requestData.presupuesto = userData.presupuesto;
      if (userData.tipo_uso && userData.tipo_uso !== "cualquiera") requestData.tipo_uso = userData.tipo_uso;
      if (userData.transmision && userData.transmision !== "no-preferencia") requestData.transmision = userData.transmision;
      if (userData.cilindrada && userData.cilindrada !== "no-preferencia") requestData.cilindrada = parseInt(userData.cilindrada as unknown as string);
      if (userData.marca && userData.marca !== "no-preferencia") requestData.marca = userData.marca;
      if (userData.freno_delantero && userData.freno_delantero !== "no-preferencia") requestData.freno_delantero = userData.freno_delantero;
      if (userData.suspension_delantera && userData.suspension_delantera !== "no-preferencia") requestData.suspension_delantera = userData.suspension_delantera;
      
      console.log("Sending data to API:", requestData);
      
      // Send API request
      const response = await fetch("http://localhost:5000/recomendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API response:", data);
      
      // Simulate a delay for showing loading animation
      setTimeout(() => {
        setLoading(false);
        // Scroll to the results section
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500);
      
    } catch (error) {
      console.error("Error searching for bikes:", error);
      toast({
        title: "Error",
        description: "No se pudieron obtener recomendaciones. Intente nuevamente.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const toggleHelp = (helpText: string) => {
    if (showHelp === helpText) {
      setShowHelp("");
    } else {
      setShowHelp(helpText);
    }
  };

  const renderQuestionContent = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case "slider":
        const value = userData[currentQuestion.field as keyof RequestData] as number;
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-2">
              {currentQuestion.field === "altura" && (
                <span className="text-xl font-semibold">{value} cm</span>
              )}
              {currentQuestion.field === "peso" && (
                <span className="text-xl font-semibold">{value} kg</span>
              )}
              {currentQuestion.field === "presupuesto" && (
                <span className="text-xl font-semibold">${value.toLocaleString('es-CO')} COP</span>
              )}
            </div>
            <Slider
              value={[value]}
              min={currentQuestion.min}
              max={currentQuestion.max}
              step={currentQuestion.step}
              onValueChange={(newValue) => handleValueChange(currentQuestion.field, newValue[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{currentQuestion.min?.toLocaleString('es-CO')}</span>
              <span>{currentQuestion.max?.toLocaleString('es-CO')}</span>
            </div>
          </div>
        );
      
      case "radio":
        return (
          <RadioGroup
            value={userData[currentQuestion.field as keyof RequestData] as string || ""}
            onValueChange={(value) => handleValueChange(currentQuestion.field, value)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto"
          >
            {currentQuestion.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 border border-muted rounded-md p-4 hover:bg-muted/30 cursor-pointer transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <label htmlFor={option.value} className="font-medium cursor-pointer flex-1">{option.label}</label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case "select":
        return (
          <div className="w-full max-w-md mx-auto">
            <Select 
              value={userData[currentQuestion.field as keyof RequestData] as string || ""}
              onValueChange={(value) => handleValueChange(currentQuestion.field, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                {currentQuestion.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="assistant" className="py-16 relative min-h-screen flex items-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-ubike-dark/50 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-ubike-dark/50 to-transparent opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="glass-card rounded-2xl p-6 md:p-10 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="ubike-gradient">Asistente TuMI</span>
            </h2>
            <p className="text-muted-foreground">Encuentra tu moto ideal respondiendo algunas preguntas</p>
          </div>
          
          {currentQuestion && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-start">
                <div className="bg-ubike rounded-full p-2 mr-4 flex-shrink-0">
                  <UserRound className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">
                      {currentQuestion.question}
                    </h3>
                    {currentQuestion.help && (
                      <button 
                        onClick={() => toggleHelp(currentQuestion.help || "")}
                        className="text-muted-foreground hover:text-ubike transition-colors"
                      >
                        <HelpCircle className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  {showHelp === currentQuestion.help && (
                    <div className="mt-2 p-4 bg-white/5 border border-white/10 rounded-md text-muted-foreground animate-fade-in">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 mr-2 flex-shrink-0 text-ubike" />
                        <p>{currentQuestion.help}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                {renderQuestionContent()}
              </div>
              
              <div className="flex justify-end mt-8">
                <Button
                  size="lg"
                  className={`${isLastQuestion || (isAdvancedQuestion && userData.experience === "no") ? "bg-ubike" : "bg-ubike-blue"} hover:bg-opacity-90 text-white`}
                  onClick={handleNext}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-l-2 border-white absolute"></div>
                        <Bike className="h-5 w-5 animate-bounce" />
                      </div>
                      <span className="ml-3">Buscando tu moto ideal...</span>
                    </div>
                  ) : isLastQuestion || (isAdvancedQuestion && userData.experience === "no") ? (
                    <>
                      <SearchIcon className="mr-2 h-5 w-5" /> 
                      Encontrar Mi Moto
                    </>
                  ) : (
                    <>
                      Siguiente <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <UserRound className="h-3 w-3 mr-1" />
                <span>Perfil: {currentStep}/{allQuestions.length}</span>
              </div>
              {userData.presupuesto && (
                <div className="flex items-center">
                  <Wallet className="h-3 w-3 mr-1" />
                  <span>Presupuesto: ${userData.presupuesto.toLocaleString('es-CO')}</span>
                </div>
              )}
              {userData.tipo_uso && (
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>Uso: {userData.tipo_uso}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveAssistant;
