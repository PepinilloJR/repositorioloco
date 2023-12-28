import {Routes, Route } from "react-router-dom"
import Videos from "./video"
import Home from "./home"
import Imagenes from "./imagenes"

function Rutas() {
    return (
    <>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/Videos" element={<Videos/>}></Route>
            <Route path="/imagenes" element={<Imagenes/>}></Route>
        </Routes>
    </>
    )
}


export default Rutas