import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Edges, Text } from "@react-three/drei";
import * as THREE from "three";

const Box = ({ position, title, accentColor = "#00ffff", anyHovered }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // --- FOCUS LOGIC ---
    // Agar hover hai: Screen ke center (0,0) par aao aur paas (Z=4) aao
    // Agar koi aur hover hai: Apni purani jagah se thoda piche (Z-5) jao
    const targetX = hovered ? 0 : position[0];
    const targetY = hovered ? 0 : position[1];
    const targetZ = hovered ? 4 : (anyHovered ? position[2] - 5 : position[2]);

    // Smoothly moving to target position
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.08);

    // --- SCALE & ROTATION ---
    const targetScale = hovered ? 2 : (anyHovered ? 0.5 : 1);
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));

    if (hovered) {
      // Hero cube ekdum seedha aur steady
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
    } else {
      // Baaki cubes piche revolve aur rotate karenge
      meshRef.current.rotation.y += anyHovered ? 0.08 : 0.01; 
      meshRef.current.rotation.z += anyHovered ? 0.02 : 0;
      
      // Halka floating motion jab tak idle hain
      if (!anyHovered) {
        meshRef.current.position.y += Math.sin(t + position[0]) * 0.005;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <MeshTransmissionMaterial
        backside
        samples={15}
        thickness={0.15} // Thinner glass for better readability
        chromaticAberration={0.05}
        color={hovered ? accentColor : "white"} 
        transmission={1}
        roughness={hovered ? 0 : 0.5} // Focused cube is clear, others are blurred
      />

      {hovered && <pointLight distance={10} intensity={15} color={accentColor} />}

      <Text
        fontSize={0.15}
        position={[0, 0, 0.76]} 
        maxWidth={1.2}
        textAlign="center"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        color="white"
        fillOpacity={hovered ? 1 : 0.2}
      >
        {title}
      </Text>

      <Edges 
        scale={1.02} 
        color={hovered ? accentColor : "#333333"} 
      />
    </mesh>
  );
};

export default Box;