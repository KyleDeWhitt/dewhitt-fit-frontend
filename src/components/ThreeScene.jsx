import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Stars, Environment } from '@react-three/drei';
import { Model } from './Model'; 

const ThreeScene = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}> 
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} />
        <Environment preset="city" />
        <Stars radius={300} depth={50} count={5000} factor={4} fade speed={1} />

        {/* 👇 CONNECT SCROLL: pages=3 matches our 3 HTML sections */}
        <ScrollControls pages={3} damping={0.2}>
            <Suspense fallback={null}>
                <Model />
            </Suspense>
        </ScrollControls>

      </Canvas>
    </div>
  );
};

export default ThreeScene;