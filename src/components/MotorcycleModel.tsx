
import { useRef, useEffect } from "react";
import { useGLTF, useAnimations, PresentationControls, Environment, ContactShadows } from "@react-three/drei";
import { Group } from "three";

const MotorcycleModel = () => {
  const group = useRef<Group>(null);
  
  // Usamos un modelo 3D de motocicleta disponible públicamente de Sketchfab
  const { scene, animations } = useGLTF("https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/kawasaki-ninja-h2r/model.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Si hay animaciones, podemos reproducirlas aquí
    if (actions && Object.keys(actions).length > 0) {
      const actionNames = Object.keys(actions);
      if (actionNames.length > 0) {
        actions[actionNames[0]]?.play();
      }
    }

    // Ajustar la escala y posición del modelo si es necesario
    if (scene) {
      scene.scale.set(0.01, 0.01, 0.01);
      scene.position.set(0, -0.6, 0);
      scene.rotation.set(0, Math.PI / 4, 0);
    }
  }, [scene, actions]);

  return (
    <>
      {/* Controls para permitir la interacción con el usuario */}
      <PresentationControls
        global
        rotation={[0, -Math.PI / 4, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
      >
        <group ref={group} dispose={null}>
          <primitive object={scene} />
        </group>
      </PresentationControls>

      {/* Ambiente y luces para el modelo 3D */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
      <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} />
      
      {/* Sombra para dar realismo */}
      <ContactShadows 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1, 0]} 
        opacity={0.4} 
        width={10} 
        height={10} 
        blur={1} 
        far={1} 
      />
    </>
  );
};

export default MotorcycleModel;
