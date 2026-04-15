import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Environment } from "@react-three/drei";
import Scene from "./components/Scene";

function App() {
  return (
    <div className="h-screen w-full bg-[#050505]">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
        <color attach="background" args={["#050505"]} />
        
        {/* ScrollControls: Ye pure scene ko scrollable bana dega */}
        <ScrollControls pages={5} damping={0.3}>
          <Scroll>
            <Scene />
          </Scroll>
          
          {/* HTML layer agar scroll ke saath text dikhana ho */}
          <Scroll html>
            <div className="w-screen">
               {/* 2D overlays yahan aa sakte hain */}
            </div>
          </Scroll>
        </ScrollControls>

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <Environment preset="city" />
      </Canvas>

      <div className="fixed top-10 left-10 text-white z-10 pointer-events-none">
        <h1 className="text-4xl font-bold tracking-tighter italic">GARRY <span className="text-cyan-400">3D</span></h1>
        <p className="opacity-50 italic">Scroll down to dive into the space...</p>
      </div>
    </div>
  );
}
export default App;