
import { cn } from "@/lib/utils";
import LoadingSpinner from "./loading-spinner";

interface LoadingOverlayProps {
  message?: string;
  className?: string;
  fullScreen?: boolean;
}

const LoadingOverlay = ({ 
  message = "Cargando...", 
  className,
  fullScreen = false 
}: LoadingOverlayProps) => {
  return (
    <div className={cn(
      "flex items-center justify-center bg-background/80 backdrop-blur-sm",
      fullScreen ? "fixed inset-0 z-50" : "absolute inset-0 z-10",
      className
    )}>
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
