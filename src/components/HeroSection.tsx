
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";

interface HeroSectionProps {
  onStartClick: () => void;
}

const HeroSection = ({ onStartClick }: HeroSectionProps) => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
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
        <div className="space-y-8 animate-fade-in">
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
              className="bg-ubike hover:bg-ubike/90 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={onStartClick}
            >
              <Search className="mr-2 h-5 w-5" /> Encontrar Mi Moto
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollToHowItWorks}
            >
              Cómo Funciona
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
        
        <div className="relative order-first md:order-last flex justify-center">
          <div className="w-full max-w-md relative animate-float">
            <div className="aspect-[3/4] bg-gradient-to-br from-ubike/20 to-ubike-blue/10 rounded-2xl glass-card p-1">
              <div className="h-full w-full rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1632745216225-3536deb4ca1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Motocicleta moderna"
                  className="h-full w-full object-cover" 
                />
              </div>
            </div>
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
          onClick={scrollToHowItWorks}
        >
          Descubre Más
          <ChevronDown className="h-4 w-4 mt-1" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
