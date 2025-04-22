
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Bike, Search, HelpCircle, ChevronLeft, ChevronRight, Check, CheckCircle2, Building2, Compass, Mountain, CircleOff, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// API required format interface
interface ApiRequestData {
  "Marca"?: string;
  "Tipo de motor"?: string;
  "Tipo de transmisión"?: string;
  "Suspensión delantera"?: string;
  "Suspensión trasera"?: string;
  "Freno delantero"?: string;
  "Freno trasero"?: string;
  "Tipo de moto"?: string;
  "tipo_uso"?: string;
  "Cilindrada (CC)"?: number;
  "Precio"?: number;
  "Potencia (HP)"?: number;
  //"Alto total"?: number;
  "Capacidad del tanque"?: number;
  // "Peso"?: number;
}

interface StepProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Paso {currentStep} de {totalSteps}</span>
        <span className="text-sm text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}% completado</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-ubike transition-all duration-500 ease-in-out rounded-full" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

const StepByStepFinder = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Basic information
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [budget, setBudget] = useState(6000000);
  
  // Usage information
  const [selectedUseType, setSelectedUseType] = useState("");
  
  // Transmission type
  const [transmissionType, setTransmissionType] = useState("");
  
  // Experience level and advanced mode
  const [hasExperience, setHasExperience] = useState(false);
  
  // Brand selection
  const [selectedBrand, setSelectedBrand] = useState("");
  
  // Advanced specifications
  const [engineCC, setEngineCC] = useState("");
  const [power, setPower] = useState("");
  const [engineType, setEngineType] = useState("");
  const [frontSuspension, setFrontSuspension] = useState("");
  const [rearSuspension, setRearSuspension] = useState("");
  const [frontBrake, setFrontBrake] = useState("");
  const [rearBrake, setRearBrake] = useState("");
  const [tankCapacity, setTankCapacity] = useState("");
  //const [bikeWeight, setBikeWeight] = useState("");

  const totalSteps = hasExperience ? 6 : 5;

  /*
  // Map bike types based on usage
  const usageToMotorType = {
    "ciudad": "Naked",
    "carretera": "Deportiva",
    "todo-terreno": "Todo Terreno",
  };
  */

  const marcas = [
    "Cualquiera", "Victory", "AKT", "Yamaha", "Honda", "TVS", "Suzuki",
    "Bajaj", "Hero", "KTM", "SYM", "Benelli", "CF", "Kawasaki", "KYMCO"
  ];  

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1) {
      // Basic information validation
      if (!height || !budget) {
        toast({
          title: "Información incompleta",
          description: "Por favor completa todos los campos requeridos.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (currentStep === 2 && !selectedUseType) {
      toast({
        title: "Selección requerida",
        description: "Por favor selecciona un tipo de uso principal.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 3 && !transmissionType) {
      toast({
        title: "Selección requerida",
        description: "Por favor selecciona un tipo de transmisión.",
        variant: "destructive",
      });
      return;
    }

    // If we're on the last step, handle search
    if (currentStep === totalSteps) {
      handleSearch();
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  // Map our internal values to API expected format
  const mapTransmissionType = (type: string) => {
    switch(type) {
      case "manual": return "Mecanica";
      case "automatica": return "Automática";
      case "semiautomatica": return "Semiautomática";
      default: return undefined;
    }
  };

  const mapBrakeType = (type: string) => {
    switch(type) {
      case "disco": return "Disco";
      case "tambor": return "Tambor";
      case "abs": return "Disco ABS";
      default: return undefined;
    }
  };

  const mapSuspensionType = (type: string) => {
    switch(type) {
      case "telescopica": return "Telescópica";
      case "invertida": return "Invertida";
      case "horquilla": return "Horquilla";
      case "monoamortiguador": return "Monoamortiguador";
      case "doble-amortiguador": return "Doble Amortiguador";
      case "progresiva": return "Progresiva";
      default: return undefined;
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    
    try {
      // Prepare request data according to API format
      let requestData: ApiRequestData = {
        "Precio": budget
      };
      
      /*
      // Convertir peso del usuario en peso sugerido de la moto (aprox. 120%)
      if (weight) {
        const dryWeightFromUser = weight * 1.2;
        requestData["Peso"] = Math.round(dryWeightFromUser);
      }
        */
      
      /*
      // Add usage type if selected
      if (selectedUseType && selectedUseType !== "cualquiera") {
        const bikeType = usageToMotorType[selectedUseType as keyof typeof usageToMotorType];
        if (bikeType) {
          requestData["Tipo de moto"] = bikeType;
        }
      }
      */

      // Enviar tipo_uso directamente (la API lo manejará)
      if (selectedUseType && selectedUseType !== "cualquiera") {
        requestData["tipo_uso"] = selectedUseType;
      }

      
      // Add transmission type if selected
      if (transmissionType && transmissionType !== "cualquiera") {
        const mappedTransmission = mapTransmissionType(transmissionType);
        if (mappedTransmission) {
          requestData["Tipo de transmisión"] = mappedTransmission;
        }
      }
      
      // Add brand if selected
      if (selectedBrand && selectedBrand !== "no-preferencia") {
        requestData["Marca"] = selectedBrand;
      }
      
      /*
      // Convertir altura del usuario en alto total de la moto (aprox. 65%)
      if (height) {
        const totalHeightFromUser = height * 0.65;
        requestData["Alto total"] = Math.round(totalHeightFromUser);
      }
      */

      // Add advanced specifications if user has experience
      if (hasExperience) {
        if (engineCC) requestData["Cilindrada (CC)"] = parseInt(engineCC);
        if (power) requestData["Potencia (HP)"] = parseInt(power);
        
        if (engineType && engineType !== "no-preferencia") {
          requestData["Tipo de motor"] = engineType;
        }
        
        if (frontBrake && frontBrake !== "no-preferencia") {
          requestData["Freno delantero"] = mapBrakeType(frontBrake);
        }
        
        if (rearBrake && rearBrake !== "no-preferencia") {
          requestData["Freno trasero"] = mapBrakeType(rearBrake);
        }
        
        if (frontSuspension && frontSuspension !== "no-preferencia") {
          requestData["Suspensión delantera"] = mapSuspensionType(frontSuspension);
        }
        
        if (rearSuspension && rearSuspension !== "no-preferencia") {
          requestData["Suspensión trasera"] = mapSuspensionType(rearSuspension);
        }
        
        //if (bikeWeight) requestData["Peso"] = parseInt(bikeWeight);
        if (tankCapacity) requestData["Capacidad del tanque"] = parseFloat(tankCapacity);
      }
      
      console.log("Enviando datos:", requestData);
      
      // Send request to API
      const response = await fetch("http://localhost:5000/recomendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error de API:", errorData);
        throw new Error(`Error: ${response.status} - ${errorData.message || 'Error desconocido'}`);
      }
      
      const data = await response.json();
      console.log("Respuesta API:", data);
      
      // Simulate loading for better UX
      setTimeout(() => {
        setLoading(false);
        
        // Show success message
        toast({
          title: "¡Búsqueda exitosa!",
          description: "Hemos encontrado las mejores motocicletas para ti.",
        });
        
        // Scroll to results section
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500);
      
    } catch (error) {
      console.error("Error al buscar motos:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudieron obtener recomendaciones. Intente nuevamente.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  // Helper function for tooltips
  const InfoTooltip = ({ content }: { content: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help ml-1" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  // Step 1: Basic Information
  const renderBasicInfoStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Información básica</h3>
        <p className="text-muted-foreground">
          ¡Hola! Vamos a encontrar la moto perfecta para ti.
          Primero, necesitamos saber un poco sobre ti para hacer recomendaciones precisas.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <label className="text-sm font-medium">¿Cuánto mides? (cm): {height}</label>
            <InfoTooltip content="Tu altura es importante para determinar qué motos serán más cómodas para ti. Una moto adecuada para tu altura te permitirá mantener un mejor control y posición de manejo." />
          </div>
          <Slider 
            value={[height]} 
            min={150} 
            max={210} 
            step={1} 
            //onValueChange={(value) => setHeight(value[0])}
            className="py-4"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <label className="text-sm font-medium">¿Cuál es tu presupuesto? (COP): ${(budget).toLocaleString('es-CO')}</label>
            <InfoTooltip content="Definir un presupuesto nos ayuda a mostrarte opciones que se ajusten a tus posibilidades económicas." />
          </div>
          <Slider 
            value={[budget]} 
            min={4000000} 
            max={110000000} 
            step={500000} 
            onValueChange={(value) => setBudget(value[0])}
            className="py-4"
          />
        </div>
      </div>
    </div>
  );
  
  // Step 2: Usage Type
  const renderUsageTypeStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Uso principal</h3>
        <p className="text-muted-foreground">
          ¿Para qué vas a usar la moto principalmente?
          Selecciona la opción que mejor describa cómo planeas usar tu motocicleta.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          className={`p-6 rounded-xl border cursor-pointer transition-all ${
            selectedUseType === "ciudad" ? "border-ubike bg-ubike/10" : "border-muted hover:border-ubike/50"
          }`}
          onClick={() => setSelectedUseType("ciudad")}
        >
          <div className="flex items-center justify-between mb-4">
            <Building2 className="h-8 w-8 text-ubike" />
            {selectedUseType === "ciudad" && <Check className="h-5 w-5 text-ubike" />}
          </div>
          <h4 className="font-medium mb-1">Ciudad</h4>
          <p className="text-sm text-muted-foreground">
            Para desplazamientos urbanos, tráfico, y uso diario.
          </p>
        </div>
        
        <div 
          className={`p-6 rounded-xl border cursor-pointer transition-all ${
            selectedUseType === "carretera" ? "border-ubike bg-ubike/10" : "border-muted hover:border-ubike/50"
          }`}
          onClick={() => setSelectedUseType("carretera")}
        >
          <div className="flex items-center justify-between mb-4">
            <Compass className="h-8 w-8 text-ubike-blue" />
            {selectedUseType === "carretera" && <Check className="h-5 w-5 text-ubike" />}
          </div>
          <h4 className="font-medium mb-1">Viajes largos / Carretera</h4>
          <p className="text-sm text-muted-foreground">
            Para recorrer largas distancias con comodidad y estabilidad.
          </p>
        </div>
        
        <div 
          className={`p-6 rounded-xl border cursor-pointer transition-all ${
            selectedUseType === "todo-terreno" ? "border-ubike bg-ubike/10" : "border-muted hover:border-ubike/50"
          }`}
          onClick={() => setSelectedUseType("todo-terreno")}
        >
          <div className="flex items-center justify-between mb-4">
            <Mountain className="h-8 w-8 text-ubike-purple" />
            {selectedUseType === "todo-terreno" && <Check className="h-5 w-5 text-ubike" />}
          </div>
          <h4 className="font-medium mb-1">Todo terreno</h4>
          <p className="text-sm text-muted-foreground">
            Para caminos de tierra, senderos y terrenos difíciles.
          </p>
        </div>
        
        <div 
          className={`p-6 rounded-xl border cursor-pointer transition-all ${
            selectedUseType === "cualquiera" ? "border-ubike bg-ubike/10" : "border-muted hover:border-ubike/50"
          }`}
          onClick={() => setSelectedUseType("cualquiera")}
        >
          <div className="flex items-center justify-between mb-4">
            <CircleOff className="h-8 w-8 text-muted-foreground" />
            {selectedUseType === "cualquiera" && <Check className="h-5 w-5 text-ubike" />}
          </div>
          <h4 className="font-medium mb-1">Cualquiera</h4>
          <p className="text-sm text-muted-foreground">
            Muéstrame todos los tipos de motos disponibles.
          </p>
        </div>
      </div>
    </div>
  );
  
  // Step 3: Transmission Type
  const renderTransmissionStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Tipo de transmisión</h3>
        <p className="text-muted-foreground">
          ¿Qué tipo de transmisión prefieres?
          La elección de transmisión afecta la facilidad de conducción y la experiencia general.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div 
          className={`p-6 rounded-xl border cursor-pointer transition-all ${
            transmissionType === "manual" ? "border-ubike bg-ubike/10" : "border-muted hover:border-ubike/50"
          }`}
          onClick={() => setTransmissionType("manual")}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Transmisión Mecánica</h4>
            {transmissionType === "manual" && <Check className="h-5 w-5 text-ubike" />}
          </div>
          <p className="text-sm text-muted-foreground">
            Requiere cambiar marchas manualmente. Mayor control y generalmente más económica.
          </p>
        </div>
        
        <div 
          className={`p-6 rounded-xl border cursor-pointer transition-all ${
            transmissionType === "automatica" ? "border-ubike bg-ubike/10" : "border-muted hover:border-ubike/50"
          }`}
          onClick={() => setTransmissionType("automatica")}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Transmisión Automática</h4>
            {transmissionType === "automatica" && <Check className="h-5 w-5 text-ubike" />}
          </div>
          <p className="text-sm text-muted-foreground">
            No requiere cambiar marchas. Más fácil de conducir, especialmente en ciudad con tráfico.
          </p>
        </div>
        
        <div 
          className={`p-6 rounded-xl border cursor-pointer transition-all ${
            transmissionType === "semiautomatica" ? "border-ubike bg-ubike/10" : "border-muted hover:border-ubike/50"
          }`}
          onClick={() => setTransmissionType("semiautomatica")}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Transmisión Semiautomática</h4>
            {transmissionType === "semiautomatica" && <Check className="h-5 w-5 text-ubike" />}
          </div>
          <p className="text-sm text-muted-foreground">
            Una transmisión semiautomática de moto combina elementos de las transmisiones manuales y automáticas, permitiendo cambiar de marcha sin usar el embrague.
          </p>
        </div>
        
        <div 
          className={`p-6 rounded-xl border cursor-pointer transition-all ${
            transmissionType === "cualquiera" ? "border-ubike bg-ubike/10" : "border-muted hover:border-ubike/50"
          }`}
          onClick={() => setTransmissionType("cualquiera")}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Cualquiera</h4>
            {transmissionType === "cualquiera" && <Check className="h-5 w-5 text-ubike" />}
          </div>
          <p className="text-sm text-muted-foreground">
            No tengo preferencia por el tipo de transmisión.
          </p>
        </div>
      </div>
    </div>
  );
  
  // Step 4: Brand Selection
  const renderBrandStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Marca preferida</h3>
        <p className="text-muted-foreground">
          ¿Tienes alguna marca de motocicleta favorita? (Opcional)
        </p>
      </div>
      
      <div className="space-y-4">
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una marca (opcional)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no-preferencia">No tengo preferencia</SelectItem>
            {marcas.map(marca => (
              <SelectItem key={marca} value={marca}>{marca}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="text-center mb-6 mt-8">
        <h3 className="text-xl font-bold mb-2">Conocimientos técnicos</h3>
        <p className="text-muted-foreground">
          ¿Tienes conocimientos sobre especificaciones técnicas de motos?
          Si tienes experiencia con motos, podemos hacerte preguntas más específicas para encontrar la moto perfecta.
        </p>
      </div>
      
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h4 className="font-medium">Modo avanzado</h4>
          <p className="text-sm text-muted-foreground mt-1">
            {hasExperience ? "Activado: Te haremos preguntas técnicas adicionales." : "Desactivado: Te recomendaremos motos basadas en tus datos básicos."}
          </p>
        </div>
        <Switch 
          checked={hasExperience}
          onCheckedChange={setHasExperience}
        />
      </div>
      <div className="text-sm text-muted-foreground flex items-start gap-2">
        <HelpCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <p>
          El modo avanzado te permite especificar detalles técnicos como cilindrada, potencia, tipo de suspensión y frenos para una recomendación más precisa. Si no conoces estos términos, deja esta opción desactivada.
        </p>
      </div>
    </div>
  );
  
  // Step 5: Advanced Specifications
  const renderAdvancedSpecsStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Especificaciones técnicas</h3>
        <p className="text-muted-foreground">
          Estas opciones te permitirán encontrar una moto que se ajuste exactamente a tus preferencias técnicas.
        </p>
      </div>
      
      <div className="space-y-5">
        <h4 className="font-medium flex items-center">
          <Settings className="h-4 w-4 mr-2" />
          Motor y Potencia
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-medium">Cilindrada (CC)</label>
              <InfoTooltip content="La cilindrada del motor determina en gran parte su capacidad de potencia. Motores más grandes (mayor cilindrada) generalmente ofrecen más potencia pero consumen más combustible." />
            </div>
            <Input
              type="number"
              placeholder="Cilindrada en CC"
              value={engineCC}
              onChange={(e) => setEngineCC(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-medium">Potencia (HP)</label>
              <InfoTooltip content="La potencia máxima que puede generar el motor, medida en caballos de fuerza. A mayor potencia, mejor aceleración y velocidad máxima." />
            </div>
            <Input
              type="number"
              placeholder="Potencia en HP"
              value={power}
              onChange={(e) => setPower(e.target.value)}
            />
          </div>
        </div>
        
        <h4 className="font-medium flex items-center mt-4">
          <Settings className="h-4 w-4 mr-2" />
          Suspensiones
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-medium">Suspensión Delantera</label>
              <InfoTooltip content="La suspensión delantera absorbe los impactos del terreno. Diferentes tipos ofrecen distintos niveles de comodidad, control y rendimiento." />
            </div>
            <Select value={frontSuspension} onValueChange={setFrontSuspension}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de suspensión" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-preferencia">Sin preferencia</SelectItem>
                <SelectItem value="telescopica">Telescópica</SelectItem>
                <SelectItem value="invertida">Invertida</SelectItem>
                <SelectItem value="horquilla">Horquilla</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-medium">Suspensión Trasera</label>
              <InfoTooltip content="La suspensión trasera afecta la estabilidad y comodidad. Diferentes sistemas están optimizados para distintos tipos de conducción." />
            </div>
            <Select value={rearSuspension} onValueChange={setRearSuspension}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de suspensión" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-preferencia">Sin preferencia</SelectItem>
                <SelectItem value="monoamortiguador">Monoamortiguador</SelectItem>
                <SelectItem value="doble-amortiguador">Doble Amortiguador</SelectItem>
                <SelectItem value="progresiva">Progresiva</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <h4 className="font-medium flex items-center mt-4">
          <Settings className="h-4 w-4 mr-2" />
          Frenos
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-medium">Freno Delantero</label>
              <InfoTooltip content="El freno delantero proporciona hasta el 70% de la potencia de frenado. Los discos ofrecen mejor rendimiento que los tambores, y el ABS añade seguridad." />
            </div>
            <Select value={frontBrake} onValueChange={setFrontBrake}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de freno" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-preferencia">Sin preferencia</SelectItem>
                <SelectItem value="disco">Disco</SelectItem>
                <SelectItem value="tambor">Tambor</SelectItem>
                <SelectItem value="abs">ABS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-medium">Freno Trasero</label>
              <InfoTooltip content="El freno trasero complementa al delantero y ayuda a estabilizar la moto durante el frenado. El ABS previene el bloqueo de la rueda." />
            </div>
            <Select value={rearBrake} onValueChange={setRearBrake}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de freno" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-preferencia">Sin preferencia</SelectItem>
                <SelectItem value="disco">Disco</SelectItem>
                <SelectItem value="tambor">Tambor</SelectItem>
                <SelectItem value="abs">ABS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <h4 className="font-medium flex items-center mt-4">
          <Settings className="h-4 w-4 mr-2" />
          Características generales
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-medium">Capacidad del Tanque (L)</label>
              <InfoTooltip content="La capacidad del tanque afecta la autonomía de tu moto. Un tanque más grande permite recorrer más distancia entre cargas de combustible." />
            </div>
            <Input
              type="number"
              placeholder="Capacidad en litros"
              value={tankCapacity}
              onChange={(e) => setTankCapacity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-medium">Peso (kg)</label>
              <InfoTooltip content="El peso de la moto afecta su manejo. Motos más livianas son más ágiles y fáciles de manejar, mientras que las más pesadas suelen ser más estables." />
            </div>
            <Input
              type="number"
              placeholder="Peso máximo en kg"
              //value={bikeWeight}
              //onChange={(e) => setBikeWeight(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
  
  // Step 6/5: Summary
  const renderSummaryStep = () => {
    const getTechnicalInfo = () => {
      if (!hasExperience) return null;
      
      return (
        <div className="mt-4 border-t pt-4">
          <h4 className="font-medium mb-2">Especificaciones técnicas avanzadas:</h4>
          <ul className="space-y-1 text-sm">
            {engineCC && <li><span className="text-muted-foreground">Cilindrada:</span> {engineCC} cc</li>}
            {power && <li><span className="text-muted-foreground">Potencia:</span> {power} HP</li>}
            {frontSuspension && frontSuspension !== "no-preferencia" && <li><span className="text-muted-foreground">Suspensión delantera:</span> {mapSuspensionType(frontSuspension)}</li>}
            {rearSuspension && rearSuspension !== "no-preferencia" && <li><span className="text-muted-foreground">Suspensión trasera:</span> {mapSuspensionType(rearSuspension)}</li>}
            {frontBrake && frontBrake !== "no-preferencia" && <li><span className="text-muted-foreground">Frenos delanteros:</span> {mapBrakeType(frontBrake)}</li>}
            {rearBrake && rearBrake !== "no-preferencia" && <li><span className="text-muted-foreground">Frenos traseros:</span> {mapBrakeType(rearBrake)}</li>}
            {tankCapacity && <li><span className="text-muted-foreground">Capacidad mínima del tanque:</span> {tankCapacity} L</li>}
          </ul>
        </div>
      );
    };
    
    const getUseType = () => {
      switch(selectedUseType) {
        case "ciudad": return "Ciudad";
        case "carretera": return "Viajes largos / Carretera";
        case "todo-terreno": return "Todo terreno";
        case "cualquiera": return "Sin preferencia específica";
        default: return "No especificado";
      }
    };
    
    const getTransmission = () => {
      switch(transmissionType) {
        case "manual": return "Mecánica";
        case "automatica": return "Automática";
        case "semiautomatica": return "Semiautomática";
        case "cualquiera": return "Sin preferencia específica";
        default: return "No especificado";
      }
    };
    
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2">Resumen</h3>
          <p className="text-muted-foreground">
            ¡Listo! Ya tenemos toda la información necesaria.
            Revisa los detalles de tu búsqueda y haz clic en "Buscar mi moto" para encontrar las mejores opciones para ti.
          </p>
        </div>
        
        <div className="bg-muted/30 p-6 rounded-xl">
          <h4 className="font-medium mb-3">Resumen de tu búsqueda:</h4>
          <ul className="space-y-2">
            <li><span className="text-muted-foreground">Tu altura:</span> {height} cm</li>
            <li><span className="text-muted-foreground">Presupuesto:</span> ${budget.toLocaleString('es-CO')}</li>
            <li><span className="text-muted-foreground">Uso principal:</span> {getUseType()}</li>
            <li><span className="text-muted-foreground">Tipo de transmisión:</span> {getTransmission()}</li>
            {selectedBrand && selectedBrand !== "no-preferencia" && <li><span className="text-muted-foreground">Marca preferida:</span> {selectedBrand}</li>}
          </ul>
          
          {getTechnicalInfo()}
        </div>
      </div>
    );
  };
  
  // Render current step content
  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return renderBasicInfoStep();
      case 2:
        return renderUsageTypeStep();
      case 3:
        return renderTransmissionStep();
      case 4:
        return renderBrandStep();
      case 5:
        return hasExperience ? renderAdvancedSpecsStep() : renderSummaryStep();
      case 6:
        return renderSummaryStep();
      default:
        return null;
    }
  };

  return (
    <section id="finder" className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="ubike-gradient">Encuentra</span> Tu Moto Ideal
          </h2>
          <p className="text-muted-foreground">
            Responde algunas preguntas y te recomendaremos las motocicletas que mejor se adapten a ti.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto glass-card rounded-2xl p-8">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
          
          {renderStepContent()}
          
          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="min-w-[100px]"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Atrás
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={loading}
              className={`min-w-[150px] ${
                currentStep === totalSteps 
                  ? "bg-ubike hover:bg-ubike/90" 
                  : "bg-ubike-blue hover:bg-ubike-blue/90"
              } text-white`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-l-2 border-white absolute"></div>
                    <Bike className="h-4 w-4 animate-bounce" />
                  </div>
                  <span className="ml-3">Buscando...</span>
                </div>
              ) : (
                <>
                  {currentStep === totalSteps ? (
                    <>
                      <Search className="mr-2 h-4 w-4" /> Buscar mi moto
                    </>
                  ) : (
                    <>
                      Siguiente <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </>
              )}
            </Button>
          </div>
          
          {currentStep < totalSteps && (
            <div className="mt-6 text-center">
              <div className="text-xs text-muted-foreground">
                Paso {currentStep} de {totalSteps}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-ubike" />
          Tus datos están seguros y solo se utilizan para mejorar las recomendaciones
        </div>
      </div>
    </section>
  );
};

export default StepByStepFinder;

