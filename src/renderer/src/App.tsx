import './assets/main.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Pipe from './components/Pipe'
import { useEffect } from 'react'
import { monitorPerformance } from './utils/monitor.js'

const App = () => {
  useEffect(() => {
    const cleanup = monitorPerformance()
    return cleanup
  }, [])

  return (
    <div className="w-screen h-screen relative">
      <div className="flex justify-center">
        <h1 className="absolute text-3xl top-4 z-10 font-bold underline">Pipe Screen Saver</h1>
      </div>

      <Canvas camera={{ position: [0, 0, 50], fov: 75 }} shadows>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <Pipe />
        <OrbitControls />
      </Canvas>

      <p className="absolute bottom-2 right-2 p-2 text-lg text-center mt-2 font-semibold">
        Author: Abdul Rehman
      </p>
    </div>
  )
}

export default App
