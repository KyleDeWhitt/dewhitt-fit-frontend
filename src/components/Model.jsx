import React, { useRef, useMemo } from 'react'
import { useGLTF, useScroll } from '@react-three/drei' // Import useScroll
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Model(props) {
  const { nodes } = useGLTF('/clover.glb')
  const pointsRef = useRef()
  const scroll = useScroll() // 👈 Access scroll data

  // 1. Convert the geometry into random starting positions for particles
  // We memorize this so it doesn't recalculate every frame
  const { positions, randoms } = useMemo(() => {
    // Safety check: Use the first available geometry if 'path1' is missing
    const geom = nodes.path1?.geometry || Object.values(nodes)[0].geometry;
    const count = geom.attributes.position.count;
    
    const randoms = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      randoms[i] = (Math.random() - 0.5) * 2; // Random direction (-1 to 1)
    }
    return { positions: geom.attributes.position.array, randoms };
  }, [nodes]);

  useFrame((state, delta) => {
    // 2. Get scroll progress (0 = Top, 1 = Bottom)
    // We create a "bell curve": 0 at top, 1 in middle (exploded), 0 at bottom (solid)
    const r1 = scroll.range(0, 2/3); // 0 to 1 during first 2/3rds
    const r2 = scroll.range(2/3, 1); // 0 to 1 during last 1/3rd
    
    // The "Explosion Force": Increases then Decreases
    // We want it solid at start (0), exploded in middle (1), solid at end (0)
    // Simple math: Use the scroll offset directly.
    // Let's explode based on how close we are to the MIDDLE of the page.
    const scrollOffset = scroll.offset; 
    
    // Explosion Logic: 
    // If scroll < 0.5, we explode OUT. If scroll > 0.5, we implode IN.
    // We use Math.sin to make a smooth wave: sin(0)=0, sin(PI/2)=1, sin(PI)=0
    const explosionForce = Math.sin(scrollOffset * Math.PI) * 2; // *2 makes it explode wider

    if (pointsRef.current) {
        // Spin logic (Always spinning)
        pointsRef.current.rotation.y += delta * 0.5;
        
        // Explosion logic
        const currentPositions = pointsRef.current.geometry.attributes.position.array;
        
        for (let i = 0; i < currentPositions.length; i+=3) {
            // Original Position + (Random Direction * Force)
            currentPositions[i] = positions[i] + (randoms[i] * explosionForce);
            currentPositions[i+1] = positions[i+1] + (randoms[i+1] * explosionForce);
            currentPositions[i+2] = positions[i+2] + (randoms[i+2] * explosionForce);
        }
        
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  })

  // Safety Geometry Check
  const geom = nodes.path1?.geometry || Object.values(nodes)[0].geometry;

  return (
    <group {...props} dispose={null} scale={0.5} position={[0, -0.5, 0]}>
      {/* Render as POINTS (Particles) instead of solid Mesh */}
      <points ref={pointsRef}>
        <bufferGeometry>
            <bufferAttribute 
                attach="attributes-position" 
                count={geom.attributes.position.count} 
                array={positions} 
                itemSize={3} 
            />
        </bufferGeometry>
        {/* The Material for the dots */}
        <pointsMaterial 
            size={0.02} 
            color="#009A44" 
            sizeAttenuation={true} 
            depthWrite={false} 
        />
      </points>
    </group>
  )
}

useGLTF.preload('/clover.glb')