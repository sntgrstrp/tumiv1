
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SearchIcon, ArrowRight, MessageCircle, UserRound, Ruler, Wallet, MapPin, Bike, Wrench } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";

// Define the interface for our request data
interface RequestData {
  altura?: number;
  peso?: number;
  presupuesto?: number;
  marca?: string;
  tipo_uso?: string;
  transmision?: string;
  cilindrada?: number;
  freno_delantero?: string; // For ABS preference
  suspension_delantera?: string;
}

// Questions data
type Question = {
  id: string;
  question: string;
  type: 'slider' | 'radio' | 'select' | 'input' | 'text';
  help?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  condition?: (data: any) => boolean;
  formatValue?: (value: any) => string;
};

const InteractiveAssistant = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<RequestData>({});
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  
  // Define questions in sequence
  const questions: Question[] = [
    {
      id: 'altura',
      question: '¿Cuánto mides?',
      type: 'slider',
      min: 150,
      max: 210,
      step: 1,
      formatValue: (value) => `${value} cm`
    },
    {
      id: 'peso',
      question: '¿Cuál es tu peso?',
      type: 'slider',
      min: 40,
      max: 150,
      step: 1,
      formatValue: (value) => `${value} kg`
    },
    {
      id: 'presupuesto',
      question: '¿Cuál es tu presupuesto aproximado?',
      type: 'slider',
      min: 4000000,
      max: 110000000,
      step: 500000,
      formatValue: (value) => `$${(value).toLocaleString('es-CO')}`
    },
    {
      id: 'tipo_uso',
      question: '¿Para qué vas a usar la moto principalmente?',
      type: 'radio',
      options: [
        { value: 'ciudad', label: 'Ciudad' },
        { value: 'carretera', label: 'Carretera' },
        { value: 'todo-terreno', label: 'Todo Terreno' },
        { value: 'cualquiera', label: 'Cualquiera' }
      ]
    },
    {
      id: 'transmision',
      question: '¿Prefieres transmisión automática, semiautomática o mecánica?',
      type: 'radio',
      options: [
        { value: 'automatica', label: 'Automática' },
        { value: 'semiautomatica', label: 'Semiautomática' },
        { value: 'manual', label: 'Mecánica (Manual)' }
      ]
    },
    {
      id: 'experiencia',
      question: '¿Tienes experiencia previa con motos o quieres opciones más específicas?',
      type: 'radio',
      options: [
        { value: 'si', label: 'Sí, tengo experiencia/preferencias específicas' },
        { value: 'no', label: 'No, soy principiante/opciones básicas' }
      ]
    },
    {
      id: 'cilindrada',
      question: '¿Te interesa un número específico de cilindrada (cc)?',
      type: 'input',
      help: 'La cilindrada indica el volumen del motor, que afecta la potencia. Mayor cilindrada suele significar más potencia.',
      condition: (data) => data.experiencia === 'si'
    },
    {
      id: 'freno_delantero',
      question: '¿Quieres frenos ABS o no te importa?',
      type: 'radio',
      options: [
        { value: 'abs', label: 'Sí, quiero ABS' },
        { value: 'cualquiera', label: 'No me importa' }
      ],
      help: 'El sistema ABS evita que las ruedas se bloqueen durante frenadas bruscas, aumentando la seguridad.',
      condition: (data) => data.experiencia === 'si'
    },
    {
      id: 'suspension_delantera',
      question: '¿Qué tipo de suspensión prefieres?',
      type: 'select',
      options: [
        { value: 'cualquiera', label: 'No tengo preferencia' },
        { value: 'telescopica', label: 'Telescópica' },
        { value: 'invertida', label: 'Invertida (Upside-down)' },
        { value: 'horquilla', label: 'Horquilla' }
      ],
      help: 'La suspensión afecta el confort y manejo. Las invertidas suelen ser más premium y ofrecen mejor rendimiento.',
      condition: (data) => data.experiencia === 'si'
    },
    {
      id: 'marca',
      question: '¿Tienes alguna marca favorita?',
      type: 'select',
      options: [
        { value: 'cualquiera', label: 'Cualquiera' },
        { value: 'Honda', label: 'Honda' },
        { value: 'Yamaha', label: 'Yamaha' },
        { value: 'Suzuki', label: 'Suzuki' },
        { value: 'Kawasaki', label: 'Kawasaki' },
        { value: 'KTM', label: 'KTM' },
        { value: 'BMW', label: 'BMW' },
        { value: 'Ducati', label: 'Ducati' },
        { value: 'Triumph', label: 'Triumph' },
        { value: 'Harley-Davidson', label: 'Harley-Davidson' },
        { value: 'Bajaj', label: 'Bajaj' },
        { value: 'TVS', label: 'TVS' },
        { value: 'Hero', label: 'Hero' },
        { value: 'Royal Enfield', label: 'Royal Enfield' },
        { value: 'AKT', label: 'AKT' }
      ],
      condition: (data) => data.experiencia === 'si'
    }
  ];

  // Filter questions based on conditions
  const filteredQuestions = questions.filter(q => 
    !q.condition || q.condition(formData)
  );

  // Current question
  const currentQuestion = filteredQuestions[step];

  const handleValueChange = (questionId: string, value: any) => {
    setFormData(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    // If we have a value for the current question or it's optional, we can proceed
    if (step < filteredQuestions.length - 1) {
      setStep(step + 1);
    } else {
      // We've reached the end of the questions
      handleSearch();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      // We're at the first question, go back to start
      setIsStarted(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    
    try {
      // Create request data object from form data
      let requestData: RequestData = {};
      
      // Only include fields with values
      if (formData.altura) requestData.altura = formData.altura;
      if (formData.peso) requestData.peso = formData.peso;
      if (formData.presupuesto) requestData.presupuesto = formData.presupuesto;
      
      if (formData.tipo_uso && formData.tipo_uso !== 'cualquiera') {
        requestData.tipo_uso = formData.tipo_uso;
      }
      
      if (formData.transmision) requestData.transmision = formData.transmision;
      
      // Advanced fields
      if (formData.cilindrada) requestData.cilindrada = parseInt(formData.cilindrada.toString());
      if (formData.freno_delantero && formData.freno_delantero !== 'cualquiera') {
        requestData.freno_delantero = formData.freno_delantero;
      }
      if (formData.suspension_delantera && formData.suspension_delantera !== 'cualquiera') {
        requestData.suspension_delantera = formData.suspension_delantera;
      }
      if (formData.marca && formData.marca !== 'cualquiera') {
        requestData.marca = formData.marca;
      }
      
      console.log("Enviando datos:", requestData);
      
      // Enviar solicitud a la API
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
      console.log("Respuesta API:", data);
      
      // Simular un pequeño retardo para mostrar la animación de carga
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "¡Listo!",
          description: "Hemos encontrado las motocicletas perfectas para ti.",
          duration: 5000,
        });
        // Desplazarse a la sección de resultados
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500);
      
    } catch (error) {
      console.error("Error al buscar motos:", error);
      toast({
        title: "Error",
        description: "No se pudieron obtener recomendaciones. Intente nuevamente.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  // Render different question types
  const renderQuestionInput = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'slider':
        return (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              {formData[currentQuestion.id as keyof RequestData] !== undefined && (
                <p className="text-center text-2xl font-semibold">
                  {currentQuestion.formatValue ? 
                    currentQuestion.formatValue(formData[currentQuestion.id as keyof RequestData]) : 
                    formData[currentQuestion.id as keyof RequestData]}
                </p>
              )}
              <Slider 
                value={[formData[currentQuestion.id as keyof RequestData] as number || (currentQuestion.min || 0)]}
                min={currentQuestion.min}
                max={currentQuestion.max}
                step={currentQuestion.step}
                onValueChange={(value) => handleValueChange(currentQuestion.id, value[0])}
                className="py-6"
              />
            </div>
            {currentQuestion.help && (
              <p className="text-sm text-muted-foreground mt-2">{currentQuestion.help}</p>
            )}
          </div>
        );
        
      case 'radio':
        return (
          <div className="space-y-4 py-4">
            <RadioGroup 
              value={formData[currentQuestion.id as keyof RequestData]?.toString() || ''} 
              onValueChange={(value) => handleValueChange(currentQuestion.id, value)}
              className="grid grid-cols-1 gap-3"
            >
              {currentQuestion.options?.map(option => (
                <div key={option.value} className="flex items-center space-x-2 border border-muted rounded-md p-4 hover:bg-muted/30 cursor-pointer transition-colors">
                  <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} />
                  <label htmlFor={`${currentQuestion.id}-${option.value}`} className="font-medium cursor-pointer flex-1">
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
            {currentQuestion.help && (
              <p className="text-sm text-muted-foreground mt-2">{currentQuestion.help}</p>
            )}
          </div>
        );
        
      case 'select':
        return (
          <div className="space-y-4 py-4">
            <Select 
              value={formData[currentQuestion.id as keyof RequestData]?.toString() || ''} 
              onValueChange={(value) => handleValueChange(currentQuestion.id, value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                {currentQuestion.options?.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {currentQuestion.help && (
              <p className="text-sm text-muted-foreground mt-2">{currentQuestion.help}</p>
            )}
          </div>
        );
        
      case 'input':
        return (
          <div className="space-y-4 py-4">
            <Input 
              type="number"
              placeholder="Ingresa un valor"
              value={formData[currentQuestion.id as keyof RequestData] || ''}
              onChange={(e) => handleValueChange(currentQuestion.id, e.target.value)}
              className="w-full"
            />
            {currentQuestion.help && (
              <p className="text-sm text-muted-foreground mt-2">{currentQuestion.help}</p>
            )}
          </div>
        );
        
      case 'text':
        return (
          <div className="py-4">
            <p className="text-center">{currentQuestion.question}</p>
          </div>
        );
    }
  };

  const startAssistant = () => {
    setIsStarted(true);
  };

  if (!isStarted) {
    return (
      <section id="finder" className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="ubike-gradient">TuMI</span> - Asistente inteligente
            </h2>
            <p className="text-muted-foreground mb-8">
              Nuestro asistente te guiará paso a paso para encontrar la motocicleta perfecta para ti. Responde algunas preguntas sencillas y te mostraremos las mejores opciones.
            </p>
            <Button 
              size="lg"
              className="bg-ubike hover:bg-ubike/90 text-white w-full max-w-md"
              onClick={startAssistant}
            >
              <MessageCircle className="mr-2 h-5 w-5" /> Iniciar Asistente
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="finder" className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="ubike-gradient">TuMI</span> - Asistente inteligente
          </h2>
        </div>
        
        <div className="max-w-2xl mx-auto glass-card rounded-2xl p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative mb-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-l-2 border-ubike absolute"></div>
                <Bike className="h-8 w-8 animate-bounce" />
              </div>
              <p className="text-lg font-medium">Buscando tu moto ideal...</p>
              <p className="text-sm text-muted-foreground mt-2">
                Estamos analizando miles de opciones para encontrar la perfecta
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-6">
                <div className="bg-ubike/20 p-3 rounded-full">
                  <MessageCircle className="h-6 w-6 text-ubike" />
                </div>
                <h3 className="ml-4 text-xl font-medium">Asistente TuMI</h3>
                <div className="ml-auto text-sm text-muted-foreground">
                  Paso {step + 1} de {filteredQuestions.length}
                </div>
              </div>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h4 className="text-xl font-medium mb-4">{currentQuestion?.question}</h4>
                  {renderQuestionInput()}
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="min-w-[100px]"
                >
                  Atrás
                </Button>
                
                <Button 
                  variant={step === filteredQuestions.length - 1 ? "default" : "outline"}
                  className={step === filteredQuestions.length - 1 ? 
                    "bg-ubike hover:bg-ubike/90 text-white min-w-[140px]" : 
                    "min-w-[100px]"}
                  onClick={handleNext}
                >
                  {step === filteredQuestions.length - 1 ? (
                    <>
                      <SearchIcon className="mr-2 h-5 w-5" /> Buscar mi moto
                    </>
                  ) : (
                    <>
                      Siguiente <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveAssistant;
