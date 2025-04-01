import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { SearchIcon, CheckCircle, UserRound, Ruler, Wallet, MapPin, Gauge, Wrench } from "lucide-react";

const SearchForm = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [budget, setBudget] = useState(5000);
  const [loading, setLoading] = useState(false);

  const handleSearch = (mode: string) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Scroll to results section would go here
      const resultsSection = document.getElementById('results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1500);
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
            
            {/* Basic Mode */}
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
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
                      <label className="text-sm font-medium">Presupuesto (€): {budget}</label>
                    </div>
                    <Slider 
                      value={[budget]} 
                      min={1000} 
                      max={20000} 
                      step={100} 
                      onValueChange={(value) => setBudget(value[0])}
                      className="py-4"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <label className="text-sm font-medium">Tipo de Uso</label>
                    </div>
                    <Select defaultValue="city">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de uso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="city">Ciudad</SelectItem>
                        <SelectItem value="highway">Carretera</SelectItem>
                        <SelectItem value="offroad">Todo Terreno</SelectItem>
                        <SelectItem value="mixed">Uso Mixto</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Buscando...
                    </div>
                  ) : (
                    <>
                      <SearchIcon className="mr-2 h-5 w-5" /> Encontrar Mi Moto
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
            
            {/* Advanced Mode */}
            <TabsContent value="advanced" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cilindrada</label>
                    <Select defaultValue="500">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona cilindrada" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="125">Hasta 125cc</SelectItem>
                        <SelectItem value="250">126cc - 250cc</SelectItem>
                        <SelectItem value="500">251cc - 500cc</SelectItem>
                        <SelectItem value="750">501cc - 750cc</SelectItem>
                        <SelectItem value="1000">751cc - 1000cc</SelectItem>
                        <SelectItem value="1000+">Más de 1000cc</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo de Moto</label>
                    <Select defaultValue="naked">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="naked">Naked</SelectItem>
                        <SelectItem value="sport">Deportiva</SelectItem>
                        <SelectItem value="touring">Touring</SelectItem>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                        <SelectItem value="scooter">Scooter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Peso Máximo</label>
                    <Select defaultValue="200">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona peso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="150">Hasta 150kg</SelectItem>
                        <SelectItem value="175">Hasta 175kg</SelectItem>
                        <SelectItem value="200">Hasta 200kg</SelectItem>
                        <SelectItem value="225">Hasta 225kg</SelectItem>
                        <SelectItem value="250">Hasta 250kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nivel de Experiencia</label>
                    <Select defaultValue="intermediate">
                      <SelectTrigger>
                        <SelectValue placeholder="Nivel de experiencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Principiante</SelectItem>
                        <SelectItem value="intermediate">Intermedio</SelectItem>
                        <SelectItem value="advanced">Avanzado</SelectItem>
                        <SelectItem value="expert">Experto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sistema de Frenos</label>
                    <Select defaultValue="abs">
                      <SelectTrigger>
                        <SelectValue placeholder="Sistema de frenos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disc">Disco</SelectItem>
                        <SelectItem value="abs">ABS</SelectItem>
                        <SelectItem value="advanced-abs">ABS Avanzado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Presupuesto (€)</label>
                    <Input
                      type="number"
                      placeholder="Presupuesto máximo"
                      defaultValue="8000"
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
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Buscando...
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
