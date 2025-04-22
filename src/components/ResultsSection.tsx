import { useState, useEffect } from "react";
import BikeCard from "./BikeCard";

interface ApiResponse {
  status: string;
  data: BikeRecommendation[] | null;
  message: string;
}

interface BikeRecommendation {
  ID?: string;
  Marca: string;
  Modelo: string;
  "Cilindrada (CC)": number;
  Precio: number;
  "Potencia (HP)": number;
  "Tipo de motor"?: string;
  "Tipo de transmisión"?: string;
  "Suspensión delantera"?: string;
  "Suspensión trasera"?: string;
  "Freno delantero"?: string;
  "Freno trasero"?: string;
  "Alto total": number;
  "Capacidad del tanque"?: number;
  Peso: number;
  "Tipo de moto": string;
  "Descripción general"?: string;
  Imagen: string;
  Enlace: string;
  similitud: number;
}

interface FormattedBike {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  compatibility: number;
  url: string;
  specs: {
    engine: string;
    power: string;
    weight: string;
    engine_type?: string;
    transmission?: string;
    front_brake?: string;
    rear_brake?: string;
    front_suspension?: string;
    rear_suspension?: string;
    tank_capacity?: string;
    total_height?: string;
    bike_type?: string;
    seat_height?: string;
  }
}

const ResultsSection = () => {
  const [recommendations, setRecommendations] = useState<FormattedBike[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchInitialBikes = async () => {
      try {
        const initialParams = {
          "Precio": 15000000
        };
        
        const response = await fetch("http://localhost:5000/recomendar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(initialParams),
        });
        
        if (!response.ok) {
          console.log("API no disponible para carga inicial de motos");
          return;
        }
        
        const data: ApiResponse = await response.json();
        
        if (data.status === "success" && data.data) {
          const formattedBikes: FormattedBike[] = data.data.map((bike, index) => formatBikeData(bike, index));
          setRecommendations(formattedBikes);
        }
      } catch (error) {
        console.log("Error al obtener motos iniciales:", error);
      }
    };
    
    fetchInitialBikes();
  }, []);
  
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
    return {
      id: bike.ID || `${index}-${bike.Modelo}`,
      name: bike.Modelo,
      brand: bike.Marca,
      price: bike.Precio,
      image: bike.Imagen,
      url: bike.Enlace,
      compatibility: Math.round(bike.similitud),
      specs: {
        engine: `${bike["Cilindrada (CC)"]}cc`,
        power: `${bike["Potencia (HP)"]} CV`,
        weight: `${bike.Peso} kg`,
        engine_type: bike["Tipo de motor"],
        transmission: bike["Tipo de transmisión"],
        front_brake: bike["Freno delantero"],
        rear_brake: bike["Freno trasero"],
        front_suspension: bike["Suspensión delantera"],
        rear_suspension: bike["Suspensión trasera"],
        tank_capacity: bike["Capacidad del tanque"] ? `${bike["Capacidad del tanque"]} L` : undefined,
        total_height: bike["Alto total"] ? `${bike["Alto total"]} mm` : undefined,
        bike_type: bike["Tipo de moto"],
        seat_height: "800 mm"
      }
    };
  };

  const sampleBikes = [
    {
      id: "1",
      name: "MT-07",
      brand: "Yamaha",
      price: 35000000,
      image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      url: "https://www.example.com/mt-07",
      compatibility: 98,
      specs: {
        engine: "689cc",
        power: "73.4 CV",
        weight: "184 kg",
        engine_type: "4 Tiempos",
        transmission: "Manual 6 velocidades",
        front_brake: "Discos ABS",
        rear_brake: "Disco ABS",
        front_suspension: "Telescópica",
        rear_suspension: "Monoamortiguador",
        tank_capacity: "14 L",
        total_height: "1,085 mm",
        bike_type: "Naked"
      }
    },
    {
      id: "2",
      name: "Z650",
      brand: "Kawasaki",
      price: 33500000,
      image: "https://images.unsplash.com/photo-1549027032-1977ba8a1b15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      url: "https://www.example.com/z650",
      compatibility: 94,
      specs: {
        engine: "649cc",
        power: "68 CV",
        weight: "187 kg",
        engine_type: "4 Tiempos",
        transmission: "Manual 6 velocidades",
        front_brake: "Discos ABS",
        rear_brake: "Disco",
        front_suspension: "Telescópica",
        rear_suspension: "Monoamortiguador",
        tank_capacity: "15 L",
        total_height: "1,065 mm",
        bike_type: "Naked"
      }
    },
    {
      id: "3",
      name: "CB650R",
      brand: "Honda",
      price: 42500000,
      image: "https://images.unsplash.com/photo-1601989307097-7365eb41d031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      url: "https://www.example.com/cb650r",
      compatibility: 92,
      specs: {
        engine: "649cc",
        power: "95 CV",
        weight: "202 kg",
        engine_type: "4 Tiempos",
        transmission: "Manual 6 velocidades",
        front_brake: "Discos ABS",
        rear_brake: "Disco ABS",
        front_suspension: "Invertida",
        rear_suspension: "Monoamortiguador",
        tank_capacity: "15.4 L",
        total_height: "1,075 mm",
        bike_type: "Naked"
      }
    }
  ];

  const bikesToDisplay = recommendations.length > 0 ? recommendations : [];

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
            {bikesToDisplay.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsSection;
