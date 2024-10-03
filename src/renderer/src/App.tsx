import './assets/main.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Pipe from './components/Pipe'

const App = () => {
  return (
    <div className="w-screen h-screen relative">
      <h1 className="absolute text-3xl top-4 z-10 left-[40%] font-bold underline">
        Pipe Screen Saver
      </h1>
      <Canvas camera={{ position: [0, 0, 50] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Pipe />
        <OrbitControls />
      </Canvas>
      <p className="absolute bottom-2 right-2 p-2 text-2xl text-center mt-2 font-semibold ">
        Author: Abdul Rehman
      </p>
    </div>
  )
}

export default App
