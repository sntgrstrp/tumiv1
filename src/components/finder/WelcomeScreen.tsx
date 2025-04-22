
import { ArrowRight, Bike, Search, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const features = [
    {
      icon: <Search className="h-5 w-5 text-ubike" />,
      title: "Búsqueda Personalizada",
      description: "Encontramos la moto perfecta basada en tus necesidades específicas"
    },
    {
      icon: <Shield className="h-5 w-5 text-ubike-blue" />,
      title: "Recomendaciones Confiables",
      description: "Análisis detallado de características y compatibilidad"
    },
    {
      icon: <Star className="h-5 w-5 text-ubike-purple" />,
      title: "Experiencia Guiada",
      description: "Te guiamos paso a paso en la selección de tu moto ideal"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-6">
          <Bike className="h-12 w-12 text-ubike animate-float" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Encuentra tu Moto Ideal
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Responde algunas preguntas simples y nuestro sistema de IA te ayudará a encontrar 
          la motocicleta perfecta para ti. ¡Comencemos!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-3xl">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="p-4 rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all"
          >
            <div className="mb-3">{feature.icon}</div>
            <h4 className="font-medium mb-2">{feature.title}</h4>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      <Button
        onClick={onStart}
        size="lg"
        className="bg-ubike hover:bg-ubike/90 text-white font-medium px-8 animate-pulse-glow"
      >
        Comenzar Búsqueda
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default WelcomeScreen;
