import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

const Galaxy = () => {
  const starsRef = useRef();

  useFrame((state) => {
    // Dhire-dhire galaxy ko rotate karne ke liye
    starsRef.current.rotation.y += 0.0005;
    starsRef.current.rotation.z += 0.0002;
  });

  return (
    <group ref={starsRef}>
      {/* 1. Static Stars (Door ke tare) */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />

      {/* 2. Glowing Particles (Paas ki lights) */}
      <Sparkles 
        count={100} 
        scale={20} 
        size={2} 
        speed={0.5} 
        opacity={0.5} 
        color="#00ffff" 
      />

      {/* 3. Subtle Shooting Star (Tutta tara effect) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <mesh position={[10, 10, -20]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </Float>
    </group>
  );
};

export default Galaxy;