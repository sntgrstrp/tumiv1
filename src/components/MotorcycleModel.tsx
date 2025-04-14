
import { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations, PresentationControls, Environment, ContactShadows } from "@react-three/drei";
import { Group, Mesh, MeshStandardMaterial, BoxGeometry, CylinderGeometry } from "three";

const MotorcycleModel = () => {
  const group = useRef<Group>(null);
  const [modelLoadError, setModelLoadError] = useState(false);
  
  // Use a try-catch block around the useGLTF hook to catch any errors
  let modelData;
  try {
    modelData = useGLTF(
      "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/kawasaki-ninja-h2r/model.gltf", 
      undefined, 
      undefined, 
      (error) => {
        console.error("Error loading model:", error);
        setModelLoadError(true);
      }
    );
  } catch (error) {
    console.error("Exception during model loading:", error);
    setModelLoadError(true);
    modelData = { scene: null, animations: [] };
  }
  
  const { scene, animations } = modelData;
  const { actions } = useAnimations(animations, group);

  // Create a simple motorcycle shape as fallback
  const createFallbackModel = () => {
    if (!group.current) return;

    // Body - central box
    const bodyGeometry = new BoxGeometry(2, 0.7, 4);
    const bodyMaterial = new MeshStandardMaterial({ color: 0x3366ff, roughness: 0.5, metalness: 0.8 });
    const body = new Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.6, 0);
    group.current.add(body);

    // Front wheel
    const wheelGeometry = new CylinderGeometry(0.8, 0.8, 0.3, 32);
    const wheelMaterial = new MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });
    const frontWheel = new Mesh(wheelGeometry, wheelMaterial);
    frontWheel.rotation.set(Math.PI / 2, 0, 0);
    frontWheel.position.set(0, -0.2, 1.5);
    group.current.add(frontWheel);

    // Rear wheel
    const rearWheel = new Mesh(wheelGeometry, wheelMaterial);
    rearWheel.rotation.set(Math.PI / 2, 0, 0);
    rearWheel.position.set(0, -0.2, -1.5);
    group.current.add(rearWheel);

    // Seat
    const seatGeometry = new BoxGeometry(1, 0.3, 1.2);
    const seatMaterial = new MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const seat = new Mesh(seatGeometry, seatMaterial);
    seat.position.set(0, 1, -0.5);
    group.current.add(seat);

    // Handlebar
    const handlebarGeometry = new CylinderGeometry(0.05, 0.05, 1, 16);
    const handlebar = new Mesh(handlebarGeometry, bodyMaterial);
    handlebar.rotation.set(0, 0, Math.PI / 2);
    handlebar.position.set(0, 1.2, 1.2);
    group.current.add(handlebar);
    
    // Scale down the entire group
    group.current.scale.set(0.3, 0.3, 0.3);
    group.current.position.set(0, -0.6, 0);
    group.current.rotation.set(0, Math.PI / 4, 0);
  };

  useEffect(() => {
    if (modelLoadError) {
      console.log("Creating fallback model because of load error");
      createFallbackModel();
    } else if (scene) {
      // Configure imported scene
      scene.scale.set(0.01, 0.01, 0.01);
      scene.position.set(0, -0.6, 0);
      scene.rotation.set(0, Math.PI / 4, 0);
      
      // Try to play animations if available
      if (actions && Object.keys(actions).length > 0) {
        const actionNames = Object.keys(actions);
        if (actionNames.length > 0) {
          actions[actionNames[0]]?.play();
        }
      }
    }
  }, [scene, actions, modelLoadError]);

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
          {!modelLoadError && scene && <primitive object={scene} />}
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
