
import { useState, useEffect } from "react";
import BikeCard from "./BikeCard";
import { toast } from "../hooks/use-toast";

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
  
  // Directly handle fetch response for testing
  const handleApiResponse = (response: ApiResponse) => {
    console.log("Processing API response:", response);
    try {
      const { data, status, message } = response;
      
      if (status === "success" && data && data.length > 0) {
        console.log("Valid recommendation data:", data);
        
        // Save the complete response in sessionStorage
        saveRecommendationsToStorage(response);
        
        const formattedBikes: FormattedBike[] = data.map((bike, index) => formatBikeData(bike, index));
        console.log("Formatted bikes:", formattedBikes);
        
        setRecommendations(formattedBikes);
        setError(null);
        
        // Notify the user about successful recommendations
        toast({
          title: "Recomendaciones listas",
          description: `Se encontraron ${data.length} motocicletas que coinciden con tus criterios.`
        });
      } else {
        console.error("Error in data:", status, message, data);
        setError("No se pudieron obtener recomendaciones. Intente con otros criterios.");
        setRecommendations([]);
        
        // Notify the user about the error
        toast({
          title: "Sin recomendaciones",
          description: message || "Intenta con otros criterios de búsqueda.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Error processing recommendations:", err);
      setError("Error al procesar las recomendaciones.");
      setRecommendations([]);
    }
  };

  useEffect(() => {
    // Function to handle the event when recommendations are received
    const handleRecommendationsReceived = (event: CustomEvent<ApiResponse>) => {
      setLoading(true);
      console.log("Received recommendations event:", event.detail);
      handleApiResponse(event.detail);
      setLoading(false);
    };

    // Define a direct handler for fetch calls (workaround)
    // @ts-ignore
    window.handleApiResponse = handleApiResponse;

    // Add event listener to capture the custom event
    window.addEventListener('motorcycleRecommendationsReceived' as any, handleRecommendationsReceived as EventListener);

    // Check if we already have stored recommendations when mounting the component
    const checkStoredRecommendations = () => {
      const savedRecommendations = sessionStorage.getItem('motorcycleRecommendations');
      if (savedRecommendations) {
        try {
          const parsedData = JSON.parse(savedRecommendations) as ApiResponse;
          console.log("Retrieving saved data:", parsedData);
          handleApiResponse(parsedData);
        } catch (err) {
          console.error("Error retrieving saved recommendations:", err);
        }
      }
    };
    
    // Execute the check for saved data
    checkStoredRecommendations();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('motorcycleRecommendationsReceived' as any, handleRecommendationsReceived as EventListener);
      // @ts-ignore
      delete window.handleApiResponse;
    };
  }, []);

  // Function to format the bike data in the format expected by BikeCard
  const formatBikeData = (bike: BikeRecommendation, index: number): FormattedBike => {
    console.log(`Formatting bike ${index}:`, bike);
    const placeholderImage = "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
    
    return {
      id: `${index}-${bike.Modelo}`,
      name: bike.Modelo || "Modelo no disponible",
      brand: bike.Marca || "Marca no disponible",
      price: bike.Precio || 0,
      image: bike.Imagen || placeholderImage,
      compatibility: Math.round(bike.similitud || 0),
      link: bike.Enlace || "#",
      description: bike.Descripción || "Descripción no disponible",
      specs: {
        engine: `${bike["Cilindrada (CC)"] || "N/A"}CC`,
        power: `${bike["Potencia (HP)"] || "N/A"} HP`,
        weight: `${bike.Peso || "N/A"} kg`,
        engine_type: bike["Tipo de motor"] || "No especificado",
        transmission: bike["Tipo de transmisión"] || "No especificado",
        front_brake: bike["Freno delantero"] || "No especificado",
        rear_brake: bike["Freno trasero"] || "No especificado",
        front_suspension: bike["Suspensión delantera"] || "No especificado",
        rear_suspension: bike["Suspensión trasera"] || "No especificado",
        tank_capacity: `${bike["Capacidad del tanque"] || "N/A"} L`,
        total_height: `${bike["Alto total"] || "N/A"} CM`,
        bike_type: bike["Tipo de moto"] || "No especificado"
      }
    };
  };

  // Function to save recommendations to sessionStorage
  const saveRecommendationsToStorage = (response: ApiResponse) => {
    try {
      sessionStorage.setItem('motorcycleRecommendations', JSON.stringify(response));
      console.log("Recommendations saved to sessionStorage");
    } catch (err) {
      console.error("Error saving recommendations:", err);
    }
  };

  // Debug function to log current state
  const debugState = () => {
    console.log("Current state:");
    console.log("- recommendations:", recommendations);
    console.log("- loading:", loading);
    console.log("- error:", error);
    console.log("- sessionStorage:", sessionStorage.getItem('motorcycleRecommendations'));
  };

  // Debug on state changes
  useEffect(() => {
    debugState();
  }, [recommendations, loading, error]);

  // Now let's modify the StepByStepFinder.tsx component to dispatch the event correctly
  const injectApiSuccessHandler = () => {
    if (typeof window !== 'undefined') {
      const originalFetch = window.fetch;
      
      window.fetch = async function(...args) {
        const response = await originalFetch.apply(this, args);
        
        // Check if this is our API endpoint
        if (args[0] === 'http://localhost:5000/recomendar' && args[1]?.method === 'POST') {
          try {
            // Clone the response so we can read it twice
            const clonedResponse = response.clone();
            const data = await clonedResponse.json();
            
            console.log("API response intercepted:", data);
            
            // If we have window.handleApiResponse available, use it directly
            // @ts-ignore
            if (window.handleApiResponse) {
              // @ts-ignore
              window.handleApiResponse(data);
            }
            
            // Also dispatch the event as before
            const event = new CustomEvent('motorcycleRecommendationsReceived', { detail: data });
            window.dispatchEvent(event);
          } catch (err) {
            console.error("Error intercepting API response:", err);
          }
        }
        
        return response;
      };
    }
  };

  // Run the fetch injection once on mount
  useEffect(() => {
    injectApiSuccessHandler();
    // Return cleanup function
    return () => {
      // Restore original fetch if needed
      if (typeof window !== 'undefined') {
        // This would ideally restore the original fetch, but is simplified here
      }
    };
  }, []);

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
            {recommendations && recommendations.length > 0 ? (
              recommendations.map((bike) => (
                <BikeCard key={bike.id} bike={bike} />
              ))
            ) : (
              <div className="col-span-full text-center p-8">
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
