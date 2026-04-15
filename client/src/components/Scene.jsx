import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import Box from "./Box";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import Galaxy from "./Galaxy";

const Scene = () => {
  const scrollData = useScroll();
  const groupRef = useRef();
  const [anyHovered, setAnyHovered] = useState(false); // Global hover state

const chats = [
  { 
    title: "Garry's Vision", 
    text: "Building the future of web with 3D immersive experiences. This project is just the beginning of a new era of digital storytelling.",
    color: "#00ffff", 
    pos: [-4, 1, -5] 
  },
  { 
    title: "MERN Stack Power", 
    text: "Combining MongoDB, Express, React, and Node with Three.js opens up endless possibilities for real-time interactive apps.",
    color: "#ff00ff", 
    pos: [-2, -2, -15] 
  },
  { 
    title: "AI Integration", 
    text: "Future update: Adding Gesture Recognition using MediaPipe to control these cubes with hand movements in mid-air!",
    color: "#ffff00", 
    pos: [3, 2, -25] 
  },
   { 
    title: "AI Integration", 
    text: "Future update: Adding Gesture Recognition using MediaPipe to control these cubes with hand movements in mid-air!",
    color: "#ffff00", 
    pos: [2, 4, -10] 
  }
  ,
   { 
    title: "MERN Stack Power", 
    text: "Combining MongoDB, Express, React, and Node with Three.js opens up endless possibilities for real-time interactive apps.",
    color: "#ff00ff", 
    pos: [3, -5, -15] 
  },
    { 
    title: "Garry's Vision", 
    text: "Building the future of web with 3D immersive experiences. This project is just the beginning of a new era of digital storytelling.",
    color: "#00ffff", 
    pos: [6, 1, -5] 
  },
      { 
    title: "Garry's Vision", 
    text: "Building the future of web with 3D immersive experiences. This project is just the beginning of a new era of digital storytelling.",
    color: "#00ffff", 
    pos: [-8, -4, -10] 
  },
];

  useFrame(() => {
    groupRef.current.position.z = scrollData.offset * 60;
  });
   return (
    <group ref={groupRef}>
      <Galaxy />
      
      {/* Post-Processing: Ye scene ko cinematic banayega */}
      <EffectComposer disableNormalPass>
        <Bloom 
          luminanceThreshold={1} 
          mipmapBlur 
          intensity={1.5} 
          radius={0.4} 
        />
        <Noise opacity={0.05} /> {/* Halka sa film grain cinematic feel ke liye */}
        <Vignette eskil={false} offset={0.1} darkness={1.1} /> 
      </EffectComposer>

      {chats.map((chat, i) => (
        <group key={i} onPointerOver={() => setAnyHovered(true)} onPointerOut={() => setAnyHovered(false)}>
           <Box 
            position={chat.pos} 
            title={chat.title} 
            accentColor={chat.color}
            text={chat.text}
            anyHovered={anyHovered}
          />
        </group>
      ))}
    </group>
  );

};

export default Scene;