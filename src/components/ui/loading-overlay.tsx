
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "./loading-spinner";

interface LoadingOverlayProps {
  message?: string;
  className?: string;
  fullScreen?: boolean;
  error?: string;
}

const LoadingOverlay = ({ 
  message = "Cargando...", 
  className,
  fullScreen = false,
  error
}: LoadingOverlayProps) => {
  return (
    <div className={cn(
      "flex items-center justify-center bg-background/80 backdrop-blur-sm",
      fullScreen ? "fixed inset-0 z-50" : "absolute inset-0 z-10",
      className
    )}>
      <div className="flex flex-col items-center space-y-4">
        {error ? (
          <>
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div className="text-center">
              <p className="text-sm font-medium text-destructive">{error}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Por favor intenta nuevamente
              </p>
            </div>
          </>
        ) : (
          <>
            <LoadingSpinner size="lg" />
            <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
