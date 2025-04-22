
import { Bike, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LoadingBikeAnimationProps {
  error?: string;
  progress?: number;
}

const LoadingBikeAnimation = ({ error, progress = 33 }: LoadingBikeAnimationProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="relative flex flex-col items-center max-w-md mx-auto px-4">
        {error ? (
          <>
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" strokeWidth={1.5} />
            <p className="text-destructive font-medium text-center">{error}</p>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Por favor intenta nuevamente
            </p>
          </>
        ) : (
          <>
            <div className="animate-bike-move">
              <Bike className="h-12 w-12 text-ubike" strokeWidth={1.5} />
            </div>
            <div className="mt-8 w-full">
              <Progress value={progress} className="w-full h-1" />
              <p className="text-sm text-muted-foreground mt-4 text-center animate-pulse">
                Buscando tu moto ideal...
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2 text-center">
                Esto puede tomar unos segundos
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoadingBikeAnimation;
