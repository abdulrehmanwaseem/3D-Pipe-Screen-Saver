import './assets/main.css'
import { Canvas } from '@react-three/fiber'
import Pipe from './components/Pipe'
import { useEffect, useState } from 'react'
import { monitorPerformance } from './utils/monitor.js'

const App = () => {
  const [fadeOut, setFadeOut] = useState(false)

  if (process.env.NODE_ENV === 'development') {
    useEffect(() => {
      const cleanup = monitorPerformance()
      return cleanup
    }, [])
  }

  if (process.env.NODE_ENV === 'production') {
    useEffect(() => {
      const closeWindowHandler = () => {
        window.electron.ipcRenderer.send('close-window')
      }

      document.addEventListener('mousemove', closeWindowHandler)
      document.addEventListener('keydown', closeWindowHandler)

      return () => {
        document.removeEventListener('mousemove', closeWindowHandler)
        document.removeEventListener('keydown', closeWindowHandler)
      }
    }, [])
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const element = e.currentTarget as HTMLElement
    element.requestPointerLock()
  }

  return (
    <div className="w-screen h-screen relative" onPointerDown={handlePointerDown}>
      <div className="flex justify-center">
        <h1 className="absolute text-3xl top-4 z-10 font-bold underline">Pipe Screen Saver</h1>
      </div>

      <Canvas camera={{ position: [0, 0, 70], fov: 60 }} shadows>
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
        <Pipe setFadeOut={setFadeOut} pipeLimit={600} />
      </Canvas>

      {/* Fade Out overlay div */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-1000 ${fadeOut ? 'opacity-100' : 'opacity-0'}`}
      />

      <p className="absolute bottom-2 right-2 p-2 text-lg text-center mt-2 font-semibold">
        Author: Abdul Rehman
      </p>
    </div>
  )
}

export default App
