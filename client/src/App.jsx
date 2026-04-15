import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, Environment, ContactShadows } from "@react-three/drei";
import Scene from "./components/Scene"; // Hum ye component banayenge

function App() {
  return (
    <div className="h-screen w-full bg-[#050505]"> 
      <Canvas shadows>
        {/* Orthographic Camera for that flat-but-3D look */}
     <OrthographicCamera 
      makeDefault 
  position={[5, 5, 5]} // Thoda paas laao camera
  zoom={50}            // Zoom thoda kam karo taaki wide view mile
    />
        
        <color attach="background" args={["#050505"]} />
        
        {/* Lighting: Soft and Moody */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="cyan" />

        {/* The Actual 3D Content */}
        <Scene />

        {/* Environment for Glass Reflections */}
        <Environment preset="city" />
        
        {/* Ground reflection-like feel */}
        <ContactShadows opacity={0.4} scale={20} blur={2.4} far={4.5} />
      </Canvas>
      
      {/* UI Layer */}
      <div className="fixed top-10 left-10 text-white z-10 pointer-events-none">
        <h1 className="text-4xl font-bold tracking-tighter">GARRY <span className="text-cyan-400">3D</span></h1>
        <p className="opacity-50">Scroll to explore the cubes...</p>
      </div>
    </div>
  );
}

export default App;