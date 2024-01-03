//import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { RutasCliente } from './paginas/rutas'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <RutasCliente></RutasCliente>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
