
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface BikeRecommendation {
  similitud: number;
  Marca: string;
  Modelo: string;
  "Tipo de moto": string;
  Precio: number;
  "Cilindrada (CC)": number;
  Peso: number;
  "Potencia (HP)": number;
  "Alto total": number;
  "Capacidad del tanque": number;
  "Tipo de motor": string;
  "Tipo de transmisión": string;
  "Suspensión delantera": string;
  "Suspensión trasera": string;
  "Freno delantero": string;
  "Freno trasero": string;
  Descripción: string;
  Imagen: string;
  Enlace: string;
}

const ComparisonSection = () => {
  const [bikes, setBikes] = useState<BikeRecommendation[]>([]);

  useEffect(() => {
    const loadBikes = () => {
      const savedRecommendations = sessionStorage.getItem('motorcycleRecommendations');
      if (savedRecommendations) {
        try {
          const parsedData = JSON.parse(savedRecommendations);
          if (parsedData.status === "success" && parsedData.data && parsedData.data.length > 0) {
            // Tomar solo las primeras 3 motos para la comparación
            setBikes(parsedData.data.slice(0, 3));
          }
        } catch (err) {
          console.error("Error loading bike recommendations:", err);
        }
      }
    };

    // Cargar las motos inicialmente
    loadBikes();

    // Escuchar por nuevas recomendaciones
    const handleNewRecommendations = (event: CustomEvent) => {
      if (event.detail && event.detail.data) {
        setBikes(event.detail.data.slice(0, 3));
      }
    };

    window.addEventListener('motorcycleRecommendationsReceived' as any, handleNewRecommendations as EventListener);

    return () => {
      window.removeEventListener('motorcycleRecommendationsReceived' as any, handleNewRecommendations as EventListener);
    };
  }, []);

  if (bikes.length === 0) {
    return null; // No mostrar la sección si no hay motos para comparar
  }

  return (
    <section id="comparison" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="ubike-gradient">Compara</span> Tus Opciones
          </h2>
          <p className="text-muted-foreground">
            Analiza las características y especificaciones de tus motos recomendadas lado a lado para tomar la mejor decisión.
          </p>
        </div>
        
        <div className="overflow-x-auto glass-card rounded-xl">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left font-medium text-muted-foreground">Características</th>
                {bikes.map((bike, index) => (
                  <th key={index} className="p-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="relative w-16 h-16 mb-3 mx-auto">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img 
                            src={bike.Imagen || "https://images.unsplash.com/photo-1558981852-426c6c22a060?q=80&w=200"} 
                            alt={bike.Modelo}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-ubike text-white text-xs font-medium rounded-full w-8 h-8 flex items-center justify-center">
                          {Math.round(bike.similitud)}%
                        </div>
                      </div>
                      <div className="font-bold text-white">{bike.Modelo}</div>
                      <div className="text-sm text-muted-foreground">{bike.Marca}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Precio</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center font-bold">
                    {bike.Precio.toLocaleString('es-CO')} COP
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Motor</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">{bike["Cilindrada (CC)"]} cc</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Potencia</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">{bike["Potencia (HP)"]} HP</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Peso</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">{bike.Peso} kg</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Altura Total</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">{bike["Alto total"]} mm</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Tipo de Motor</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">{bike["Tipo de motor"]}</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Transmisión</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">{bike["Tipo de transmisión"]}</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Freno Delantero</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">{bike["Freno delantero"]}</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Freno Trasero</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">{bike["Freno trasero"]}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4"></td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">
                    <Button 
                      className="bg-ubike hover:bg-ubike/90 w-full"
                      onClick={() => window.open(bike.Enlace, '_blank')}
                    >
                      Ver Detalles
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
