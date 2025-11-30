import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
// 👇 Ensure this path matches your file structure exactly
import { Model } from './Model'; 

const ThreeScene = () => {
  return (
    <div style={{ width: '100%', height: '100%', background: '#000000' }}> 
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        
        {/* Background & Lights */}
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} />
        <Environment preset="city" />
        
        {/* Stars & Controls */}
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={true} />

        {/* The Model */}
        <Suspense fallback={null}>
            <group position={[0, -0.5, 0]} scale={0.5}> 
                <Model />
            </group>
        </Suspense>
      </Canvas>
    </div>
  );
};

// 👇 THIS IS THE MAGIC LINE THAT WAS MISSING
export default ThreeScene;