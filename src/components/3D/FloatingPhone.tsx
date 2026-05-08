import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingPhoneProps {
  wireframe?: boolean
}

export default function FloatingPhone({ wireframe = false }: FloatingPhoneProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = -state.clock.elapsedTime * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2 + 0.5
    }
  })

  return (
    <group position={[3, 0, 0]}>
      {/* Phone Body */}
      <Box
        ref={meshRef}
        args={[0.8, 1.6, 0.1]}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#a855f7" : "#1a1a1a"} 
          wireframe={wireframe}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Screen */}
      <Box
        args={[0.7, 1.4, 0.01]}
        position={[0, 0, 0.06]}
      >
        <meshBasicMaterial 
          color="#0a0a0a" 
          wireframe={wireframe}
        />
      </Box>

      {/* Screen Glow */}
      <Box
        args={[0.65, 1.3, 0.01]}
        position={[0, 0, 0.07]}
      >
        <meshBasicMaterial 
          color="#a855f7" 
          transparent 
          opacity={0.3}
          wireframe={wireframe}
        />
      </Box>

      {/* Home Button */}
      <Box
        args={[0.1, 0.1, 0.02]}
        position={[0, -0.75, 0.06]}
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
