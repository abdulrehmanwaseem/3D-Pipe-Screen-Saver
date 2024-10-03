import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

interface PipeSegment {
  geometry: THREE.TubeGeometry
  direction: THREE.Vector3
  position: THREE.Vector3
}

type DirectionArray = THREE.Vector3[]
type Vector3 = THREE.Vector3

function Pipe({ color = '#0077ff' }) {
  const pipeRef = useRef<THREE.Group>(null)
  const [pipes, setPipes] = useState<PipeSegment[]>([])
  const [currentPosition, setCurrentPosition] = useState<Vector3>(new THREE.Vector3(0, 0, 0))
  const [currentDirection, setCurrentDirection] = useState<Vector3>(new THREE.Vector3(10, 0, 0))

  useFrame(() => {
    const directions: DirectionArray = [
      new THREE.Vector3(20, 0, 0), // For Right (X-axis positive)
      new THREE.Vector3(-20, 0, 0), // For Left (X-axis negative)
      new THREE.Vector3(0, 20, 0), // For Up (Y-axis positive)
      new THREE.Vector3(0, -20, 0), // For Down (Y-axis negative)
      new THREE.Vector3(0, 0, 20), // For Forward (Z-axis positive)
      new THREE.Vector3(0, 0, -20) // For Backward (Z-axis negative)
    ]

    const nextDirection = directions[Math.floor(Math.random() * directions.length)] // index of next direction (0-6)

    const nextPosition = currentPosition.clone().add(nextDirection)

    const curve = new THREE.CatmullRomCurve3([currentPosition, nextPosition])
    const newPipe = new THREE.TubeGeometry(curve, 20, 1, 8, false)

    setPipes((prev) => [
      ...prev,
      { geometry: newPipe, direction: nextDirection, position: currentPosition.clone() }
    ])

    setCurrentPosition(nextPosition)
    setCurrentDirection(nextDirection)
  })

  return (
    <group ref={pipeRef}>
      {pipes.map((pipe, index) => (
        <mesh key={index} geometry={pipe.geometry} castShadow receiveShadow>
          <meshStandardMaterial color={color} roughness={0} />
        </mesh>
      ))}

      {/* Adding spheres at the joints */}

      {pipes.map((pipe, index) => (
        <mesh key={`joint-${index}`} position={pipe.position} castShadow receiveShadow>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}

export default Pipe
