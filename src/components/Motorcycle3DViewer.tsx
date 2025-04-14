
import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import MotorcycleModel from "./MotorcycleModel";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "react-error-boundary";

type Motorcycle3DViewerProps = {
  className?: string;
};

// Fallback component when 3D model fails to load
const ModelErrorFallback = () => (
  <div className="h-full w-full flex flex-col items-center justify-center">
    <img 
      src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
      alt="Motocicleta moderna"
      className="h-full w-full object-cover rounded-xl"
    />
    <div className="absolute bottom-4 right-4 p-4 glass-card rounded-xl max-w-[200px]">
      <div className="text-xs text-muted-foreground">Compatibilidad</div>
      <div className="text-lg font-bold mt-1 text-ubike">98% Match</div>
      <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
        <div className="bg-gradient-to-r from-ubike to-ubike-blue h-full rounded-full" style={{ width: '98%' }}></div>
      </div>
    </div>
  </div>
);

const Motorcycle3DViewer = ({ className }: Motorcycle3DViewerProps) => {
  const isMobile = useIsMobile();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Función para manejar errores en la carga del modelo
  const handleError = (error: Error) => {
    console.error("Error loading 3D model:", error);
    setHasError(true);
  };

  // Simulación de carga completada
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Mostrar imagen estática en móviles o si hay un error de carga
  if (isMobile || hasError) {
    return (
      <div className={`${className} relative w-full h-full rounded-2xl overflow-hidden`}>
        <img 
          src="https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Motocicleta moderna"
          className="h-full w-full object-cover rounded-xl"
        />
        <div className="absolute bottom-4 right-4 p-4 glass-card rounded-xl max-w-[200px]">
          <div className="text-xs text-muted-foreground">Compatibilidad</div>
          <div className="text-lg font-bold mt-1 text-ubike">98% Match</div>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
            <div className="bg-gradient-to-r from-ubike to-ubike-blue h-full rounded-full" style={{ width: '98%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-background/80 to-background/10`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-10 h-10 border-4 border-ubike border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <ErrorBoundary FallbackComponent={ModelErrorFallback} onError={handleError}>
        <Canvas
          shadows
          className="w-full h-full"
          camera={{ position: [0, 1, 5], fov: 50 }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false
          }}
          style={{
            background: 'transparent',
            borderRadius: '1rem',
          }}
          onError={handleError}
        >
          <Suspense fallback={null}>
            <MotorcycleModel />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
      
      {/* Card flotante con la compatibilidad */}
      <div className="absolute bottom-4 right-4 p-4 glass-card rounded-xl max-w-[200px] z-10">
        <div className="text-xs text-muted-foreground">Compatibilidad</div>
        <div className="text-lg font-bold mt-1 text-ubike">98% Match</div>
        <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
          <div className="bg-gradient-to-r from-ubike to-ubike-blue h-full rounded-full" style={{ width: '98%' }}></div>
        </div>
      </div>
      
      {/* Indicador de interacción */}
      <div className="absolute top-4 left-4 p-2 glass-card rounded-lg text-xs text-white/70 opacity-70 z-10">
        Arrastra para rotar • Scroll para zoom
      </div>
    </div>
  );
};

export default Motorcycle3DViewer;
