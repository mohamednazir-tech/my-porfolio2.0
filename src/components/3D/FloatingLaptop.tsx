import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingLaptopProps {
  wireframe?: boolean
}

export default function FloatingLaptop({ wireframe = false }: FloatingLaptopProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3 + 1
    }
  })

  return (
    <group position={[-3, 0, 0]}>
      {/* Laptop Base */}
      <Box
        ref={meshRef}
        args={[2, 0.1, 1.5]}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#00d4ff" : "#1a1a1a"} 
          wireframe={wireframe}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Laptop Screen */}
      <Box
        args={[1.8, 1.2, 0.05]}
        position={[0, 0.6, -0.6]}
        rotation={[0.1, 0, 0]}
      >
        <meshStandardMaterial 
          color="#0a0a0a" 
          wireframe={wireframe}
          metalness={0.9}
          roughness={0.1}
        />
      </Box>

      {/* Screen Glow */}
      <Box
        args={[1.6, 1, 0.01]}
        position={[0, 0.6, -0.55]}
        rotation={[0.1, 0, 0]}
      >
        <meshBasicMaterial 
          color="#00d4ff" 
          transparent 
          opacity={0.3}
          wireframe={wireframe}
        />
      </Box>

      {/* Keyboard */}
      <Box
        args={[1.6, 0.02, 0.8]}
        position={[0, 0.06, 0.2]}
      >
        <meshStandardMaterial 
          color="#333" 
          wireframe={wireframe}
          metalness={0.6}
          roughness={0.4}
        />
      </Box>
    </group>
  )
}
