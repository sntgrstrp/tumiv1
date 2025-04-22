
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const isMobile = useIsMobile();
  
  const scrollToFinder = () => {
    const element = document.getElementById('finder');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ubike/20 rounded-full filter blur-3xl opacity-30 animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ubike-blue/20 rounded-full filter blur-3xl opacity-20 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center py-16 md:py-32">
        {/* Text Content - Set to display first on mobile */}
        <div className="space-y-8 animate-fade-in order-2 md:order-1">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="ubike-gradient">Inteligencia Artificial</span>
            <br /> para encontrar tu 
            <br /> moto ideal
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-md">
            TuMI analiza tus preferencias y características para recomendarte la motocicleta perfecta para ti, de manera personalizada.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-ubike hover:bg-ubike/90 text-white"
              onClick={scrollToFinder}
            >
              <Search className="mr-2 h-5 w-5" /> Encontrar Mi Moto
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Cómo Funciona
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-ubike"></div>
              IA Avanzada
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-ubike-blue"></div>
              Recomendaciones Precisas
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-ubike-purple"></div>
              Datos Actualizados
            </span>
          </div>
        </div>
        
        {/* Motorcycle Image - Set to display second on mobile */}
        <div className="relative flex justify-center order-1 md:order-2">
          <div className="w-full max-w-xl relative animate-float">
            <img 
              src="https://images.squarespace-cdn.com/content/v1/65441add9f1c47170e484373/98b53ed4-59ca-403f-a55f-93ef6cd315ac/bike.png?format=1000w" 
              alt="Motocicleta moderna"
              className="h-full w-full object-contain scale-110" 
            />
            <div className="absolute -bottom-6 -right-6 p-4 glass-card rounded-xl max-w-[200px]">
              <div className="text-xs text-muted-foreground">Compatibilidad</div>
              <div className="text-lg font-bold mt-1 text-ubike">98% Match</div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
                <div className="bg-gradient-to-r from-ubike to-ubike-blue h-full rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <button 
          className="flex flex-col items-center text-xs text-muted-foreground hover:text-white transition-colors"
          onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Descubre Más
          <ChevronDown className="h-4 w-4 mt-1" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
