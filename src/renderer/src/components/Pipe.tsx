import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import {
  generateRandomColor,
  getDistanceFromPointToLineSegment,
  getRandomInitialPosition
} from '../utils/pipeHelpers.js'

interface PipeSegment {
  geometry: THREE.TubeGeometry
  direction: THREE.Vector3
  position: THREE.Vector3
  color: string
  opacity: number
}

interface ActivePipe {
  currentPosition: THREE.Vector3
  currentDirection: THREE.Vector3
  color: string
}

type DirectionArray = THREE.Vector3[]

function Pipe({ interval = 0.01, numberOfPipes = 5, pipeLimit = 500, setFadeOut }) {
  const pipeRef = useRef<THREE.Group>(null)
  const [pipes, setPipes] = useState<PipeSegment[]>([])
  const [_, setActivePipes] = useState<ActivePipe[]>(
    Array.from({ length: numberOfPipes }, () => ({
      currentPosition: getRandomInitialPosition(),
      currentDirection: new THREE.Vector3(10, 0, 0),
      color: generateRandomColor()
    }))
  )

  const { camera } = useThree()
  const frustum = new THREE.Frustum()
  const cameraMatrix = new THREE.Matrix4()
  const timeRef = useRef(0)
  const fadeRef = useRef(false)

  useFrame((_, delta) => {
    if (fadeRef.current) return

    timeRef.current += delta

    if (timeRef.current >= interval) {
      camera.updateMatrixWorld()
      cameraMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
      frustum.setFromProjectionMatrix(cameraMatrix)

      // Generate a new segment for each active pipe
      setActivePipes((prevActivePipes) => {
        return prevActivePipes.map((activePipe) => {
          const directions: DirectionArray = [
            new THREE.Vector3(20, 0, 0), // For Right (X-axis positive)
            new THREE.Vector3(-20, 0, 0), // For Left (X-axis negative)
            new THREE.Vector3(0, 20, 0), // For Up (Y-axis positive)
            new THREE.Vector3(0, -20, 0), // For Down (Y-axis negative)
            new THREE.Vector3(0, 0, -20) // For Backward (Z-axis negative)
            // new THREE.Vector3(0, 0, 20) // For Forward (Z-axis positive)
          ]

          const nextDirection = directions[Math.floor(Math.random() * directions.length)]
          const nextPosition = activePipe.currentPosition.clone().add(nextDirection)

          if (frustum.containsPoint(nextPosition) && !isColliding(nextPosition)) {
            const curve = new THREE.CatmullRomCurve3([activePipe.currentPosition, nextPosition])
            const newPipe = new THREE.TubeGeometry(curve, 20, 1, 8, true)

            setPipes((prevPipes) => {
              const newPipes = [
                ...prevPipes,
                {
                  geometry: newPipe,
                  direction: nextDirection,
                  position: activePipe.currentPosition.clone(),
                  color: activePipe.color,
                  opacity: 1 // Initialize opacity
                }
              ]

              if (newPipes.length >= pipeLimit) {
                fadeRef.current = true // Prevent further pipe generation
                setFadeOut(true) // Trigger fade out effect

                setTimeout(() => {
                  // Gradually decrease opacity of all pipes
                  const fadeInterval = setInterval(() => {
                    setPipes((prevPipes) =>
                      prevPipes.map((pipe) => ({
                        ...pipe,
                        opacity: pipe.opacity > 0 ? pipe.opacity - 0.05 : 0
                      }))
                    )
                  }, 50)

                  // Reset pipes after fade effect is complete
                  setTimeout(() => {
                    clearInterval(fadeInterval)
                    fadeRef.current = false // Allow pipes to be generated again
                    setFadeOut(false)

                    // Generate new initial positions for active pipes
                    const newActivePipes = Array.from({ length: numberOfPipes }, () => ({
                      currentPosition: getRandomInitialPosition(),
                      currentDirection: new THREE.Vector3(10, 0, 0),
                      color: generateRandomColor()
                    }))
                    setActivePipes(newActivePipes)
                    setPipes([])
                  }, 500)
                }, 500)
              }

              return newPipes
            })

            // Update the current position and direction of the pipe
            return {
              ...activePipe,
              currentPosition: nextPosition,
              currentDirection: nextDirection
            }
          }

          return activePipe // No update if not in frustum or colliding
        })
      })

      timeRef.current = 0
    }
  })

  // Function to check collision with existing pipes
  const isColliding = (position: THREE.Vector3) => {
    const collisionThreshold = 1.5 // Adjust for appropriate collision distance

    return pipes.some((pipe) => {
      // Get the start and end points of the tube geometry
      const path = pipe.geometry.parameters.path as THREE.CatmullRomCurve3
      const points = path.getPoints(2)

      const start = points[0]
      const end = points[1]

      const distance = getDistanceFromPointToLineSegment(position, start, end)

      return distance < collisionThreshold // Return true if within collision threshold
    })
  }

  return (
    <group ref={pipeRef}>
      {pipes.map((pipe, index) => (
        <mesh key={index} geometry={pipe.geometry} castShadow receiveShadow>
          <meshStandardMaterial color={pipe.color} transparent opacity={pipe.opacity} />
        </mesh>
      ))}

      {/* Adding spheres at the joints */}
      {pipes.map((pipe, index) => (
        <mesh key={`joint-${index}`} position={pipe.position} castShadow receiveShadow>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshStandardMaterial color={pipe.color} />
        </mesh>
      ))}
    </group>
  )
}

export default Pipe
