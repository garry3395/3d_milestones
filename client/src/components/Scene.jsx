import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Box from "./Box"; // Tumne file structure mein Box.jsx banaya hua hai

const Scene = () => {
  const sceneRef = useRef();

  // Basic floating animation for the whole scene
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    sceneRef.current.rotation.y = Math.sin(t / 4) * 0.1;
  });

  return (
    <group ref={sceneRef}>
      {/* Abhi ke liye testing ke liye 3 cubes setup karte hain */}
      <Box position={[-2, 0, 0]} title="Project Alpha" />
      <Box position={[0, 0, 0]} title="Vision 2026" />
      <Box position={[2, 0, 0]} title="The Deep Dive" />
    </group>
  );
};

export default Scene;