
import { Bike } from "lucide-react";

const LoadingBikeAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="relative flex flex-col items-center max-w-md mx-auto px-4">
        <div className="animate-bike-move">
          <Bike className="h-12 w-12 text-ubike" strokeWidth={1.5} />
        </div>
        <div className="mt-8 w-full">
          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-ubike animate-progress rounded-full" />
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center animate-pulse">
            Buscando tu moto ideal...
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2 text-center">
            Esto puede tomar unos segundos
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingBikeAnimation;
