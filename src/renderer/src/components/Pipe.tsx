import { useRef } from 'react'
import * as THREE from 'three'

function Pipe() {
  const pipeRef = useRef<THREE.Mesh>(null)

  const createPipeGeometry = (): THREE.TubeGeometry => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(10, 0, 10),
      new THREE.Vector3(20, 10, 0),
      new THREE.Vector3(30, 0, -10)
    ])

    const tubeGeometry = new THREE.TubeGeometry(curve, 20, 1, 8, false)
    return tubeGeometry
  }

  return (
    <group>
      <mesh ref={pipeRef} geometry={createPipeGeometry()} position={[-20, 13, 20]}>
        <meshStandardMaterial color={'blue'} />
      </mesh>
      <mesh ref={pipeRef} geometry={createPipeGeometry()}>
        <meshStandardMaterial color={'red'} />
      </mesh>
    </group>
  )
}

export default Pipe
