
import './App.css'
import Rutas from './componentes/rutas'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Rutas></Rutas>
      </BrowserRouter>
    </>
  )
}

export default App
