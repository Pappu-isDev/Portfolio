"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/model/3d-model.glb");
  return <primitive object={scene} scale={1.5} />;
}

export default function Models() {
  return (
    <div className="w-full h-[500px] bg-gray-900 rounded-2xl">
      <Canvas camera={{ position: [0, 1, 5] }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} />
        <Suspense fallback={null}>
          <Model />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
