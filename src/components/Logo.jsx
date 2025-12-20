import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Model(props) {
  const { nodes } = useGLTF('/Logo.glb')
  const groupRef = useRef()
  const scroll = useScroll()

  const [scale, setScale] = useState(window.innerWidth < 768 ? 0.55 : 1)

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth < 768 ? 0.55 : 1)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useFrame((state, delta) => {
    const scrollOffset = scroll?.offset || 0; 
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;

    if (groupRef.current) {
        const targetZ = scrollOffset * -20;
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);

        const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        groupRef.current.position.y = floatY;
        
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.2, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.2, 0.05);
    }
  })

  return (
    <group {...props} dispose={null} ref={groupRef} scale={scale}>
      {nodes.path1 && (
        <mesh 
          geometry={nodes.path1.geometry} 
          position={[0, 0, 0]} // Reset position for single element
          rotation={[Math.PI / 2, 0, 0]}   
          scale={1.5}
          castShadow 
          receiveShadow
        >
            <meshStandardMaterial 
              color="#FFB800"        
              metalness={1.0}        
              roughness={0.15}       
              envMapIntensity={2.5}  
            />
        </mesh>
      )}
    </group>
  )
}

useGLTF.preload('/Logo.glb')