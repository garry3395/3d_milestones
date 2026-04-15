import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Sparkles, Float } from "@react-three/drei";

const Galaxy = () => {
  const starsRef = useRef();

  useFrame((state) => {
    starsRef.current.rotation.y += 0.0003;
  });

  return (
    <group ref={starsRef}>
      <Stars radius={150} depth={50} count={7000} factor={7} saturation={0} fade speed={2} />
      
      {/* Blue "Supernova" Stars - Ye thode bade aur bright honge */}
      <Sparkles count={50} scale={50} size={4} speed={0.4} opacity={0.8} color="#00ffff" />
      
      {/* Tutta Tara (Multiple Shooting Stars) */}
      <Float speed={5} rotationIntensity={0} floatIntensity={10}>
        <mesh position={[-20, 20, -50]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#fff" />
        </mesh>
      </Float>
    </group>
  );
};
export default Galaxy;