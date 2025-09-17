import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function GameCanvas({ children }) {
  return (
    <Canvas
      style={{ width: "100%", height: "400px" }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Orbit Controls for interaction */}
      <OrbitControls enableZoom={false} />

      {/* Render children (3D card) */}
      {children}
    </Canvas>
  );
}

export default GameCanvas;
