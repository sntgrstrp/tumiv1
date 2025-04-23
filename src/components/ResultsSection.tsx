import { useState, useEffect } from "react";
import BikeCard from "./BikeCard";
import { toast } from "../hooks/use-toast";
import { ApiResponse, FormattedBike } from "./results/BikeRecommendationTypes";
import { formatBikeData } from "./results/BikeDataFormatter";
import ResultsHeader from "./results/ResultsHeader";
import ResultsLoadingState from "./results/ResultsLoadingState";
import { Button } from "@/components/ui/button";

const ResultsSection = () => {
  const [recommendations, setRecommendations] = useState<FormattedBike[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiResponse = (response: ApiResponse) => {
    console.log("Processing API response:", response);
    try {
      const { data, status, message } = response;
      
      if (status === "success" && data && data.length > 0) {
        console.log("Valid recommendation data:", data);
        
        saveRecommendationsToStorage(response);
        
        const formattedBikes: FormattedBike[] = data.map((bike, index) => formatBikeData(bike, index));
        console.log("Formatted bikes:", formattedBikes);
        
        setRecommendations(formattedBikes);
        setError(null);
        
        toast({
          title: "Recomendaciones listas",
          description: `Se encontraron ${data.length} motocicletas que coinciden con tus criterios.`
        });
      } else {
        console.error("Error in data:", status, message, data);
        setError("No se pudieron obtener recomendaciones. Intente con otros criterios.");
        setRecommendations([]);
        
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
    const handleRecommendationsReceived = (event: CustomEvent<ApiResponse>) => {
      setLoading(true);
      console.log("Received recommendations event:", event.detail);
      handleApiResponse(event.detail);
      setLoading(false);
    };

    // @ts-ignore
    window.handleApiResponse = handleApiResponse;

    window.addEventListener('motorcycleRecommendationsReceived' as any, handleRecommendationsReceived as EventListener);

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
    
    checkStoredRecommendations();

    return () => {
      window.removeEventListener('motorcycleRecommendationsReceived' as any, handleRecommendationsReceived as EventListener);
      // @ts-ignore
      delete window.handleApiResponse;
    };
  }, []);

  const saveRecommendationsToStorage = (response: ApiResponse) => {
    try {
      sessionStorage.setItem('motorcycleRecommendations', JSON.stringify(response));
      console.log("Recommendations saved to sessionStorage");
    } catch (err) {
      console.error("Error saving recommendations:", err);
    }
  };

  const handleNewSearch = () => {
    sessionStorage.removeItem("motorcycleRecommendations");
    setRecommendations([]);
    setError(null);
    setLoading(false);
    
    const stepByStepFinder = document.getElementById('step-by-step-finder');
    if (stepByStepFinder) {
      const resetEvent = new CustomEvent('resetStepByStepFinder');
      window.dispatchEvent(resetEvent);
      stepByStepFinder.scrollIntoView({ behavior: "smooth" });
    }
    
    toast({
      title: "¡Empecemos una nueva búsqueda!",
      description: "Puedes elegir nuevos criterios y obtener recomendaciones frescas.",
    });
  };

  return (
    <section id="results" className="py-16 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-ubike-dark/50 to-transparent opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <ResultsHeader 
          title="Recomendaciones"
          description="Basado en tu perfil, nuestra IA ha encontrado estas motocicletas que se ajustan perfectamente a tus necesidades y características."
        />
        
        {loading ? (
          <ResultsLoadingState />
        ) : error ? (
          <div className="text-center p-8 border border-destructive/20 rounded-lg bg-destructive/10 text-destructive">
            <p className="font-medium">{error}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Por favor intenta con diferentes criterios de búsqueda.
            </p>
            <div className="mt-6 flex justify-center">
              <Button variant="outline" onClick={handleNewSearch}>
                Nueva Búsqueda
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations && recommendations.length > 0 ? (
                recommendations.map((bike) => (
                  <BikeCard key={bike.id} bike={bike} />
                ))
              ) : (
                <div className="col-span-full text-center p-8">
                  <p className="text-muted-foreground">
                    Sin recomendaciones. Intenta buscar usando los filtros.
                  </p>
                </div>
              )}
            </div>
            {recommendations && recommendations.length > 0 && (
              <div className="flex justify-center mt-10">
                <Button variant="outline" size="lg" onClick={handleNewSearch}>
                  Nueva Búsqueda
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsSection;
