
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bike, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  ShieldCheck, 
  FuelIcon, 
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BikeCardProps {
  bike: {
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
  };
}

const BikeCard = ({ bike }: BikeCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);
  
  // Manejo de error de imagen
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("Error al cargar imagen:", bike.image);
    e.currentTarget.src = "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  };

  // Formatear el precio con separador de miles
  const formattedPrice = bike.price ? bike.price.toLocaleString('es-CO') : 'N/A';

  console.log("Renderizando BikeCard:", bike.id, bike.name, bike.brand);

  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all hover:translate-y-[-5px] group animate-fade-in relative">
      <div className="relative">
        <img 
          src={bike.image} 
          alt={`${bike.brand} ${bike.name}`}
          className="w-full aspect-[4/3] object-cover object-center transition-transform group-hover:scale-105" 
          onError={handleImageError}
        />
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center">
          <FuelIcon className="h-3 w-3 mr-1" />
          {bike.specs.engine}
        </div>
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-ubike to-ubike-blue text-white px-3 py-1 rounded-full text-xs font-medium">
          {bike.compatibility}% Match
        </div>
        {bike.specs.bike_type && (
          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
            {bike.specs.bike_type}
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{bike.name}</h3>
            <p className="text-muted-foreground text-sm">{bike.brand}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">
              ${formattedPrice}
            </p>
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
            <span>{bike.specs.total_height}</span>
          </div>
        </div>
        
        <AnimatePresence>
          {showDetails && (
            <motion.div 
              className="mt-4 pt-4 border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {bike.description && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Descripción</h4>
                  <p className="text-sm text-muted-foreground">
                    {bike.description}
                  </p>
                </div>
              )}
              
              <h4 className="font-medium mb-2">Especificaciones Técnicas</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-start gap-2">
                  <div className="min-w-4 mt-0.5">
                    <Info className="h-3 w-3 text-ubike" />
                  </div>
                  <span>Motor: {bike.specs.engine_type}</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="min-w-4 mt-0.5">
                    <Info className="h-3 w-3 text-ubike" />
                  </div>
                  <span>Transmisión: {bike.specs.transmission}</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="min-w-4 mt-0.5">
                    <Info className="h-3 w-3 text-ubike" />
                  </div>
                  <span>Freno Del.: {bike.specs.front_brake}</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="min-w-4 mt-0.5">
                    <Info className="h-3 w-3 text-ubike" />
                  </div>
                  <span>Freno Tras.: {bike.specs.rear_brake}</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="min-w-4 mt-0.5">
                    <Info className="h-3 w-3 text-ubike" />
                  </div>
                  <span>Susp. Del.: {bike.specs.front_suspension}</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="min-w-4 mt-0.5">
                    <Info className="h-3 w-3 text-ubike" />
                  </div>
                  <span>Susp. Tras.: {bike.specs.rear_suspension}</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="min-w-4 mt-0.5">
                    <Info className="h-3 w-3 text-ubike" />
                  </div>
                  <span>Cap. Tanque: {bike.specs.tank_capacity}</span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  size="sm" 
                  className="bg-ubike hover:bg-ubike/90 text-white"
                  onClick={() => window.open(bike.link, '_blank')}
                >
                  Más Información
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-4"
          onClick={toggleDetails}
        >
          {showDetails ? (
            <>
              <ChevronUp className="h-4 w-4 mr-2" /> Ocultar Detalles
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-2" /> Ver Detalles
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BikeCard;
