
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bike, ChevronDown, ChevronUp, Zap, ShieldCheck, FuelIcon, Info } from "lucide-react";

interface BikeCardProps {
  bike: {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    compatibility: number;
    specs: {
      engine: string;
      power: string;
      weight: string;
      seat_height: string;
    };
  };
}

const BikeCard = ({ bike }: BikeCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all hover:translate-y-[-5px] group animate-fade-in">
      <div className="relative">
        <img 
          src={bike.image} 
          alt={bike.name}
          className="w-full aspect-[4/3] object-cover object-center transition-transform group-hover:scale-105" 
        />
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center">
          <FuelIcon className="h-3 w-3 mr-1" />
          {bike.specs.engine}
        </div>
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-ubike to-ubike-blue text-white px-3 py-1 rounded-full text-xs font-medium">
          {bike.compatibility}% Match
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{bike.name}</h3>
            <p className="text-muted-foreground text-sm">{bike.brand}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">{bike.price.toLocaleString('es-ES')} €</p>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-ubike" />
            <span>{bike.specs.power}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-ubike-blue" />
            <span>{bike.specs.weight}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bike className="h-4 w-4 text-ubike-purple" />
            <span>{bike.specs.seat_height} altura</span>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
            <h4 className="font-medium mb-2">Descripción</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Una motocicleta perfecta para tus necesidades con un motor potente y confiable. Diseño aerodinámico y ergonómico para mayor comodidad en viajes largos.
            </p>
            
            <h4 className="font-medium mb-2">Puntos Destacados</h4>
            <ul className="text-sm text-muted-foreground space-y-1 mb-4">
              <li className="flex items-start gap-2">
                <div className="min-w-4 mt-0.5">
                  <Info className="h-3 w-3 text-ubike" />
                </div>
                <span>Sistema de frenos ABS de última generación</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 mt-0.5">
                  <Info className="h-3 w-3 text-ubike" />
                </div>
                <span>Suspensión ajustable para diferentes tipos de terreno</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 mt-0.5">
                  <Info className="h-3 w-3 text-ubike" />
                </div>
                <span>Consumo eficiente de combustible para mayor autonomía</span>
              </li>
            </ul>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Ver Detalles
              </Button>
              <Button className="flex-1 bg-ubike hover:bg-ubike/90">
                Concesionarios
              </Button>
            </div>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-4"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-2" /> Ver Menos
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-2" /> Ver Más
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BikeCard;
