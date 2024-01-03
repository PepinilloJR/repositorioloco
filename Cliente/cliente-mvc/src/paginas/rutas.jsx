import {Routes, Route} from "react-router-dom"
import GetImagen from "./get"
import PostImagen from "./post"
import { Home } from "./home"

export function RutasCliente() {
    
    return (<>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/get" element={<GetImagen/>}></Route>
            <Route path="/post" element={<PostImagen/>}></Route>
        </Routes>
    </>)
}