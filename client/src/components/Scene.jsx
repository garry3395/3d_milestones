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
    { title: "Garry: Oye, sunn!", color: "#00ffff", pos: [2, 1, -5] },
    { title: "Bhai: Haan bol?", color: "#ff00ff", pos: [-2, -2, -15] },
    { title: "Garry: Look check kar!", color: "#ffff00", pos: [3, 2, -25] },
    { title: "Bhai: Zeher setup hai!", color: "#00ff00", pos: [-3, 0, -35] },
    { title: "Garry: Animation dekh ab.", color: "#00ffff", pos: [0, -4, -45] },
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
            anyHovered={anyHovered}
          />
        </group>
      ))}
    </group>
  );

};

export default Scene;