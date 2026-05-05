import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import {Routes, Route} from 'react-router'
import StartSide from './pages/StartSide'
import Depression from './pages/Depression'
import Rygning from './pages/Rygning'
import Kraeftbehandling from './pages/Kraeftbehandling'
import Blodsukker from './pages/Blodsukker'
import Graviditet from './pages/Graviditet'
import Hormoner from './pages/Hormoner'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<StartSide />} />
        <Route path= "/depression" element={<Depression />} />
        <Route path= "/rygning" element={<Rygning />} />
        <Route path= "/kraeftbehandling" element={<Kraeftbehandling />} />
        <Route path= "/blodsukker" element={<Blodsukker />} />
        <Route path= "/graviditet" element={<Graviditet />} />
        <Route path= "/hormoner" element={<Hormoner />} />
      </Routes>
    </>
  )
}

export default App
