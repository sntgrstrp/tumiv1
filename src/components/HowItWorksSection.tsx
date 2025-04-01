
import { Bike, Search, ListFilter, Zap } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <ListFilter className="h-8 w-8 text-ubike" />,
      title: "Ingresa tus Preferencias",
      description: "Comparte tus características físicas, presupuesto y estilo de conducción que buscas."
    },
    {
      icon: <Zap className="h-8 w-8 text-ubike-blue" />,
      title: "IA en Acción",
      description: "Nuestro algoritmo analiza miles de modelos y especificaciones para encontrar tu match perfecto."
    },
    {
      icon: <Bike className="h-8 w-8 text-ubike-purple" />,
      title: "Descubre tu Moto Ideal",
      description: "Recibe recomendaciones personalizadas con detalles de compatibilidad y especificaciones."
    },
    {
      icon: <Search className="h-8 w-8 text-white" />,
      title: "Compara y Decide",
      description: "Analiza y compara hasta 3 modelos recomendados para tomar la mejor decisión."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-ubike-dark/50 to-transparent opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="ubike-gradient">Cómo Funciona</span> uBikeAI
          </h2>
          <p className="text-muted-foreground">
            Un proceso simple y efectivo que utiliza inteligencia artificial para encontrar la motocicleta perfecta para ti, basado en tus características y preferencias.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl transition-all hover:translate-y-[-5px] group"
            >
              <div className="mb-4 p-3 rounded-lg bg-white/5 w-fit group-hover:bg-white/10 transition-colors">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              <div className="mt-6 flex items-center">
                <span className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-sm font-medium">
                  {index + 1}
                </span>
                {index < steps.length - 1 && (
                  <div className="h-[2px] bg-gradient-to-r from-white/20 to-transparent flex-grow ml-2 hidden md:block"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
