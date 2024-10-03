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

function Pipe() {
  const pipeRef = useRef<THREE.Group>(null)
  const [pipes, setPipes] = useState<PipeSegment[]>([])
  const [currentPosition, setCurrentPosition] = useState<Vector3>(new THREE.Vector3(0, 0, 0))
  const [currentDirection, setCurrentDirection] = useState<Vector3>(new THREE.Vector3(10, 0, 0))

  useFrame(() => {
    const directions: DirectionArray = [
      new THREE.Vector3(20, 0, 0),
      new THREE.Vector3(-20, 0, 0),
      new THREE.Vector3(0, 20, 0),
      new THREE.Vector3(0, -20, 0),
      new THREE.Vector3(0, 0, 20),
      new THREE.Vector3(0, 0, -20)
    ]

    const nextDirection = directions[Math.floor(Math.random() * directions.length)]
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
          <meshStandardMaterial
            color={'#0077ff'} // Change to your desired color
            roughness={0} // Zero roughness for a reflective finish
          />
        </mesh>
      ))}
      {/* Adding spheres at the joints */}
      {pipes.map((pipe, index) => (
        <mesh key={`joint-${index}`} position={pipe.position} castShadow receiveShadow>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshStandardMaterial
            color={'#0077ff'} // Same color for joints
          />
        </mesh>
      ))}
    </group>
  )
}

export default Pipe
