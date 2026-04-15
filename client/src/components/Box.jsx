import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Edges } from "@react-three/drei";
import * as THREE from "three";

const Box = ({ position, title }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Subtle rotation aur hover scaling logic
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, hovered ? t * 0.2 : 0, 0.1);
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, hovered ? 1.1 : 1, 0.1));
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />

      {/* Ye hai magic material: MeshTransmissionMaterial */}
      <MeshTransmissionMaterial
        backside
        samples={16}
        resolution={512}
        transmission={1.0}
        roughness={0.2}
        thickness={0.5}
        ior={1.5}
        chromaticAberration={0.06}
        anisotropy={0.1}
        distortion={0.1}
        color={hovered ? "#81e6f3" : "white"}
      />

      {/* Cube ki edges highlight karne ke liye */}
      <Edges
        scale={1}
        threshold={15} // Sirf corners dikhayega
        color={hovered ? "#00ffff" : "#444"}
      />
    </mesh>
  );
};

export default Box;