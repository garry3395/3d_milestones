import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import Box from "./Box";
import Galaxy from "./Galaxy";

const Scene = () => {
  const scrollData = useScroll();
  const groupRef = useRef();

  const projects = [
    { title: "Intro", pos: [0, 0, 0] },
    { title: "MERN Stack", pos: [2, -1, -10] },
    { title: "Three.js", pos: [-3, 2, -20] },
    { title: "AI/ML", pos: [3, -2, -30] },
    { title: "Next.js", pos: [-2, -3, -40] },
    { title: "GSAP", pos: [4, 4, -50] },
    { title: "Final", pos: [0, 0, -60] },
  ];

  useFrame((state) => {
    // scrollData.offset 0 se 1 tak jata hai scroll ke saath
    const offset = scrollData.offset;
    
    // Pure group ko camera ki taraf khinchenge (Z-axis move)
    groupRef.current.position.z = offset * 60; 

    // Halka sa floating movement pure scene ke liye
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Galaxy />
      {projects.map((item, index) => (
        <Box key={index} position={item.pos} title={item.title} />
      ))}
    </group>
  );
};

export default Scene;