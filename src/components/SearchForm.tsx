
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { SearchIcon, CheckCircle, UserRound, Ruler, Wallet, MapPin, Gauge, Wrench, Bike } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

const SearchForm = () => {
  const { toast } = useToast();
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [budget, setBudget] = useState(6000000);
  const [loading, setLoading] = useState(false);
  const [selectedUseType, setSelectedUseType] = useState("ciudad");
  const [selectedBrand, setSelectedBrand] = useState("");

  // Campos avanzados
  const [engineCC, setEngineCC] = useState("");
  const [power, setPower] = useState("");
  const [engineType, setEngineType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [frontBrake, setFrontBrake] = useState("");
  const [rearBrake, setRearBrake] = useState("");
  const [frontSuspension, setFrontSuspension] = useState("");
  const [rearSuspension, setRearSuspension] = useState("");
  const [bikeWeight, setBikeWeight] = useState("");
  const [tankCapacity, setTankCapacity] = useState("");
  const [totalHeight, setTotalHeight] = useState("");

  const tipoDeUsoMapeo = {
    "Ciudad": ["Naked", "Scooter", "Urbana", "Automática", "Semiautomática"],
    "Carretera": ["Deportiva", "Naked"],
    "Todo Terreno": ["Todo Terreno", "Semiautomática"],
    "Cualquiera": null
  };

  const marcas = [
    "Cualquiera", "Honda", "Yamaha", "Suzuki", "Kawasaki", "KTM", "BMW", 
    "Ducati", "Triumph", "Harley-Davidson", "Bajaj", "TVS", "Hero", "Royal Enfield", "AKT"
  ];

  const handleSearch = async (mode) => {
    setLoading(true);
    
    try {
      // Preparar datos según el modo
      let requestData = {};
      
      if (mode === "basic") {
        requestData = {
          altura: height,
          peso: weight,
          presupuesto: budget
        };
        
        if (selectedBrand && selectedBrand !== "Cualquiera") {
          requestData.marca = selectedBrand;
        }
        
        if (selectedUseType !== "cualquiera") {
          requestData.tipo_uso = selectedUseType;
        }
      } else {
        // Modo avanzado
        requestData = {
          presupuesto: budget
        };
        
        // Solo añadir campos con valor
        if (engineCC) requestData.cilindrada = parseInt(engineCC);
        if (power) requestData.potencia = parseInt(power);
        if (engineType) requestData.tipo_motor = engineType;
        if (transmission) requestData.transmision = transmission;
        if (frontBrake) requestData.freno_delantero = frontBrake;
        if (rearBrake) requestData.freno_trasero = rearBrake;
        if (frontSuspension) requestData.suspension_delantera = frontSuspension;
        if (rearSuspension) requestData.suspension_trasera = rearSuspension;
        if (bikeWeight) requestData.peso = parseInt(bikeWeight);
        if (tankCapacity) requestData.capacidad_tanque = parseFloat(tankCapacity);
        if (totalHeight) requestData.alto_total = parseInt(totalHeight);
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

  return (
    <section id="finder" className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="ubike-gradient">Busca</span> Tu Moto Ideal
          </h2>
          <p className="text-muted-foreground">
            Responde algunas preguntas para que nuestra IA encuentre las motocicletas perfectas para ti, según tus características y preferencias.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto glass-card rounded-2xl p-8">
          <Tabs defaultValue="basic" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="basic" className="data-[state=active]:bg-ubike data-[state=active]:text-white">
                  <UserRound className="h-4 w-4 mr-2" />
                  Modo Básico
                </TabsTrigger>
                <TabsTrigger value="advanced" className="data-[state=active]:bg-ubike-blue data-[state=active]:text-white">
                  <Gauge className="h-4 w-4 mr-2" />
                  Modo Avanzado
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Modo Básico */}
            <TabsContent value="basic" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
                      <label className="text-sm font-medium">Altura (cm): {height}</label>
                    </div>
                    <Slider 
                      value={[height]} 
                      min={150} 
                      max={210} 
                      step={1} 
                      onValueChange={(value) => setHeight(value[0])}
                      className="py-4"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <UserRound className="h-4 w-4 mr-2 text-muted-foreground" />
                      <label className="text-sm font-medium">Peso (kg): {weight}</label>
                    </div>
                    <Slider 
                      value={[weight]} 
                      min={40} 
                      max={150} 
                      step={1} 
                      onValueChange={(value) => setWeight(value[0])}
                      className="py-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <label className="text-sm font-medium">Marca (opcional)</label>
                    </div>
                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una marca" />
                      </SelectTrigger>
                      <SelectContent>
                        {marcas.map(marca => (
                          <SelectItem key={marca} value={marca}>{marca}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
                      <label className="text-sm font-medium">Presupuesto (COP): ${(budget).toLocaleString('es-CO')}</label>
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
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <label className="text-sm font-medium">Tipo de Uso</label>
                    </div>
                    <RadioGroup value={selectedUseType} onValueChange={setSelectedUseType} className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 border border-muted rounded-md p-3 hover:bg-muted/30 cursor-pointer transition-colors">
                        <RadioGroupItem value="ciudad" id="ciudad" />
                        <label htmlFor="ciudad" className="font-medium cursor-pointer flex-1">Ciudad</label>
                      </div>
                      <div className="flex items-center space-x-2 border border-muted rounded-md p-3 hover:bg-muted/30 cursor-pointer transition-colors">
                        <RadioGroupItem value="carretera" id="carretera" />
                        <label htmlFor="carretera" className="font-medium cursor-pointer flex-1">Carretera</label>
                      </div>
                      <div className="flex items-center space-x-2 border border-muted rounded-md p-3 hover:bg-muted/30 cursor-pointer transition-colors">
                        <RadioGroupItem value="todo-terreno" id="todo-terreno" />
                        <label htmlFor="todo-terreno" className="font-medium cursor-pointer flex-1">Todo Terreno</label>
                      </div>
                      <div className="flex items-center space-x-2 border border-muted rounded-md p-3 hover:bg-muted/30 cursor-pointer transition-colors">
                        <RadioGroupItem value="cualquiera" id="cualquiera" />
                        <label htmlFor="cualquiera" className="font-medium cursor-pointer flex-1">Cualquiera</label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button 
                  size="lg"
                  className="bg-ubike hover:bg-ubike/90 text-white w-full max-w-md"
                  onClick={() => handleSearch('basic')}
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
                  ) : (
                    <>
                      <SearchIcon className="mr-2 h-5 w-5" /> Encontrar Mi Moto
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
            
            {/* Modo Avanzado */}
            <TabsContent value="advanced" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cilindrada (CC)</label>
                    <Input
                      type="number"
                      placeholder="Cilindrada en CC"
                      value={engineCC}
                      onChange={(e) => setEngineCC(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Potencia (HP)</label>
                    <Input
                      type="number"
                      placeholder="Potencia en HP"
                      value={power}
                      onChange={(e) => setPower(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo de Motor</label>
                    <Select value={engineType} onValueChange={setEngineType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tipo de motor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-tiempos">2 Tiempos</SelectItem>
                        <SelectItem value="4-tiempos">4 Tiempos</SelectItem>
                        <SelectItem value="electrico">Eléctrico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo de Transmisión</label>
                    <Select value={transmission} onValueChange={setTransmission}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona transmisión" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="automatica">Automática</SelectItem>
                        <SelectItem value="semiautomatica">Semiautomática</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Peso (kg)</label>
                    <Input
                      type="number"
                      placeholder="Peso en kg"
                      value={bikeWeight}
                      onChange={(e) => setBikeWeight(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Freno Delantero</label>
                      <Select value={frontBrake} onValueChange={setFrontBrake}>
                        <SelectTrigger>
                          <SelectValue placeholder="Freno delantero" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="disco">Disco</SelectItem>
                          <SelectItem value="tambor">Tambor</SelectItem>
                          <SelectItem value="abs">ABS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Freno Trasero</label>
                      <Select value={rearBrake} onValueChange={setRearBrake}>
                        <SelectTrigger>
                          <SelectValue placeholder="Freno trasero" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="disco">Disco</SelectItem>
                          <SelectItem value="tambor">Tambor</SelectItem>
                          <SelectItem value="abs">ABS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Suspensión Delantera</label>
                      <Select value={frontSuspension} onValueChange={setFrontSuspension}>
                        <SelectTrigger>
                          <SelectValue placeholder="Suspensión delantera" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="telescopica">Telescópica</SelectItem>
                          <SelectItem value="invertida">Invertida</SelectItem>
                          <SelectItem value="horquilla">Horquilla</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Suspensión Trasera</label>
                      <Select value={rearSuspension} onValueChange={setRearSuspension}>
                        <SelectTrigger>
                          <SelectValue placeholder="Suspensión trasera" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monoamortiguador">Monoamortiguador</SelectItem>
                          <SelectItem value="doble-amortiguador">Doble Amortiguador</SelectItem>
                          <SelectItem value="progresiva">Progresiva</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Capacidad del Tanque (L)</label>
                    <Input
                      type="number"
                      placeholder="Capacidad en litros"
                      value={tankCapacity}
                      onChange={(e) => setTankCapacity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Alto Total (mm)</label>
                    <Input
                      type="number"
                      placeholder="Alto en milímetros"
                      value={totalHeight}
                      onChange={(e) => setTotalHeight(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
                      <label className="text-sm font-medium">Presupuesto (COP): ${(budget).toLocaleString('es-CO')}</label>
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
              
              <div className="mt-8 flex justify-center">
                <Button 
                  size="lg"
                  className="bg-ubike-blue hover:bg-ubike-blue/90 text-white w-full max-w-md"
                  onClick={() => handleSearch('advanced')}
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
                  ) : (
                    <>
                      <Wrench className="mr-2 h-5 w-5" /> Búsqueda Avanzada
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
          <CheckCircle className="h-4 w-4 text-ubike" />
          Tus datos están seguros y solo se utilizan para mejorar las recomendaciones
        </div>
      </div>
    </section>
  );
};

export default SearchForm;
