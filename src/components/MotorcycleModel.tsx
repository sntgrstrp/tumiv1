
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Group } from "three";

// Using a more reliable model source
// A simple motorcycle model from the Three.js examples
const MODEL_URL = "https://raw.githubusercontent.com/pmndrs/drei-assets/master/honda.glb";

export default function MotorcycleModel({ autoRotate = true }) {
  const motoRef = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_URL);
  
  // Aplicar materiales y ajustes al modelo
  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          // Mejoramos la calidad de las sombras y reflejos
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (child.material) {
            child.material.envMapIntensity = 1.5;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene]);
  
  // Animación de rotación automática
  useFrame((state, delta) => {
    if (motoRef.current && autoRotate) {
      motoRef.current.rotation.y += delta * 0.15; // Velocidad de rotación suave
    }
  });
  
  return (
    <>
      {/* Luces ambientales y direccionales */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        color="#ffffff"
      />
      
      {/* Luces de acento con colores de la marca */}
      <pointLight position={[-5, 2, -5]} intensity={0.8} color="#9b87f5" />
      <pointLight position={[5, 0, 5]} intensity={0.6} color="#1EAEDB" />
      
      {/* Controles orbitales limitados */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={10}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />
      
      {/* Cámara perspectiva con posición óptima */}
      <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={50} />
      
      {/* Modelo 3D */}
      <group ref={motoRef} position={[0, -1, 0]} rotation={[0, Math.PI / 4, 0]} scale={1.5}>
        <primitive object={scene} />
      </group>
    </>
  );
}

// Pre-cargamos el modelo para mejor rendimiento
useGLTF.preload(MODEL_URL);
