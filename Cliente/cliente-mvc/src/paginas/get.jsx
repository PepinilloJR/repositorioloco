import { useEffect, useRef } from "react";
import { Menu } from "./menu";

async function recibirImagenes(id) {
    try {
        let response
        if (id != "") {
            response = await fetch(`http://localhost:1234/imagenes/${id}`) 
        } else {
            response = await fetch('http://localhost:1234/imagenes/-1')
        }
        const lista = await response.json()
        console.log(lista)
    } catch (err) {
        console.log(err)
    }
}


function GetImagen() {
    const id = useRef("")

    useEffect(() => {
        recibirImagenes(id.current.value)
    }, [])
    return (<>
        <h1>GET</h1>
        <h3>Filtrar por id</h3>
        <form onSubmit={(submit) => {
            submit.preventDefault()
        }}>
            <input ref={id} onChange={
                () => {
                    recibirImagenes(id.current.value)
                    console.log(id.current.value)
                }
            } type="text" /> 
        </form>
        <Menu></Menu>
        </>)
}


export default GetImagen 