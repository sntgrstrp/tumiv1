
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import MotorcycleModel from "./MotorcycleModel";
import { useMobile } from "@/hooks/use-mobile";

type Motorcycle3DViewerProps = {
  className?: string;
};

const Motorcycle3DViewer = ({ className }: Motorcycle3DViewerProps) => {
  const isMobile = useMobile();

  if (isMobile) {
    // En dispositivos móviles, mostrar una imagen estática en lugar del modelo 3D
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
      <Canvas
        shadows
        className="w-full h-full"
        camera={{ position: [0, 1, 5], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
        }}
        style={{
          background: 'transparent',
          borderRadius: '1rem',
        }}
      >
        <Suspense fallback={null}>
          <MotorcycleModel />
        </Suspense>
      </Canvas>
      
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
