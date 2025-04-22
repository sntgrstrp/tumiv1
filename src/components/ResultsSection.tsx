import { useState, useEffect } from "react";
import BikeCard from "./BikeCard";

interface ApiResponse {
  status: string;
  data: BikeRecommendation[] | null;
  message: string;
}

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

interface FormattedBike {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  compatibility: number;
  link: string;
  description: string;
  specs: {
    engine: string;
    power: string;
    weight: string;
    engine_type: string;
    transmission: string;
    front_brake: string;
    rear_brake: string;
    front_suspension: string;
    rear_suspension: string;
    tank_capacity: string;
    total_height: string;
    bike_type: string;
  };
}

const ResultsSection = () => {
  const [recommendations, setRecommendations] = useState<FormattedBike[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleRecommendationsReceived = (event: CustomEvent<ApiResponse>) => {
      setLoading(true);
      try {
        const { data, status } = event.detail;
        
        if (status === "success" && data) {
          const formattedBikes: FormattedBike[] = data.map((bike, index) => formatBikeData(bike, index));
          setRecommendations(formattedBikes);
          setError(null);
        } else {
          setError("No se pudieron obtener recomendaciones. Intente con otros criterios.");
        }
      } catch (err) {
        setError("Error al procesar las recomendaciones.");
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener('motorcycleRecommendationsReceived' as any, handleRecommendationsReceived as EventListener);

    return () => {
      window.removeEventListener('motorcycleRecommendationsReceived' as any, handleRecommendationsReceived as EventListener);
    };
  }, []);

  const formatBikeData = (bike: BikeRecommendation, index: number): FormattedBike => {
    const placeholderImage = "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
    
    return {
      id: `${index}-${bike.Modelo}`,
      name: bike.Modelo,
      brand: bike.Marca,
      price: bike.Precio,
      image: bike.Imagen || placeholderImage,
      compatibility: Math.round(bike.similitud),
      link: bike.Enlace,
      description: bike.Descripción,
      specs: {
        engine: `${bike["Cilindrada (CC)"]}cc`,
        power: `${bike["Potencia (HP"]} CV`,
        weight: `${bike.Peso} kg`,
        engine_type: bike["Tipo de motor"],
        transmission: bike["Tipo de transmisión"],
        front_brake: bike["Freno delantero"],
        rear_brake: bike["Freno trasero"],
        front_suspension: bike["Suspensión delantera"],
        rear_suspension: bike["Suspensión trasera"],
        tank_capacity: `${bike["Capacidad del tanque"]} L`,
        total_height: `${bike["Alto total"]} mm`,
        bike_type: bike["Tipo de moto"]
      }
    };
  };

  return (
    <section id="results" className="py-16 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-ubike-dark/50 to-transparent opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="ubike-gradient">Recomendaciones</span> Para Ti
          </h2>
          <p className="text-muted-foreground">
            Basado en tu perfil, nuestra IA ha encontrado estas motocicletas que se ajustan perfectamente a tus necesidades y características.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-ubike"></div>
          </div>
        ) : error ? (
          <div className="text-center p-8 border border-red-200 rounded-lg bg-red-50 text-red-700">
            <p>{error}</p>
            <p className="mt-2 text-sm">Por favor intenta con diferentes criterios de búsqueda.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.length > 0 ? (
              recommendations.map((bike) => (
                <BikeCard key={bike.id} bike={bike} />
              ))
            ) : (
              <div className="col-span-3 text-center p-8">
                <p className="text-muted-foreground">Sin recomendaciones. Intenta buscar usando los filtros.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsSection;
