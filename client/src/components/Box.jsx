import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Edges, Text } from "@react-three/drei";
import * as THREE from "three";

const Box = ({ position, title }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Subtle float animation
    meshRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
    // Smooth hover scale
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, hovered ? 1.2 : 1, 0.1));
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          transmission={1}
          roughness={0.1}
          thickness={0.2}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0}
          color={hovered ? "#81e6f3" : "white"}
        />
        
        {/* Cube ke andar ka Text */}
        <Text
          fontSize={0.2}
          position={[0, 0, 0.76]} // Cube ke thoda sa front face par
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff" // Ek clean font
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>

        <Edges color={hovered ? "#00ffff" : "#ffffff"} threshold={15} />
      </mesh>
    </group>
  );
};

export default Box;