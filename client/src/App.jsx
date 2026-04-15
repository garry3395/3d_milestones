import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Environment } from "@react-three/drei";
import { Toaster } from 'sonner'; 
import Scene from "./components/Scene";


function App() {
  return (
    <div className="h-screen w-full bg-[#050505]">
      {/* Notifications container */}
      <Toaster position="bottom-right" theme="dark" richColors />

      <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
        <color attach="background" args={["#050505"]} />
        
        <ScrollControls pages={6} damping={0.3}>
          <Scroll>
            <Scene />
          </Scroll>
        </ScrollControls>

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <Environment preset="city" />
      </Canvas>

      {/* UI Overlay */}
      <div className="fixed top-10 left-10 text-white z-10 pointer-events-none">
        <h1 className="text-4xl font-bold tracking-tighter italic uppercase">
          SPACE <span className="text-cyan-400">3D</span>
        </h1>
        <p className="opacity-50 italic">Scroll and hover to read the galaxy...</p>
      </div>
    </div>
  );
}

export default App;