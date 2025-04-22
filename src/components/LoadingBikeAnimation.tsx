
import { Bike } from "lucide-react";

const LoadingBikeAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        <div className="animate-bike-move">
          <Bike className="h-12 w-12 text-ubike" strokeWidth={1.5} />
        </div>
        <div className="mt-8">
          <div className="h-1 w-48 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-ubike animate-progress rounded-full" />
          </div>
          <p className="text-sm text-muted-foreground mt-2 animate-pulse">
            Buscando tu moto ideal...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingBikeAnimation;
