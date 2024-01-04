import { useEffect, useRef } from "react";
import { Menu } from "./menu";

async function postearImagenes(nombreO, esGrandeO) {
    try {
        await fetch('https://repositorioloco-dev-mpaq.2.us-1.fl0.io/imagenes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({nombre: nombreO, esGrande: esGrandeO})
        })
        //const lista = await response.json()
        //console.log(lista)
    } catch (err) {
        console.log(err)
    }
}


function PostImagen() {
    const nombre = useRef("")
    const esGrande = useRef(false)

    useEffect(() => {
        console.log(nombre.current.value, esGrande.current.checked)
    }, [nombre, esGrande])
    return (<>
        <h1>POST</h1>
        <form onSubmit={(submit) => {
            submit.preventDefault()
        }}>
            <h3>Nombre</h3>
            <input ref={nombre} type="text" /> 
            <h3>esGrande</h3>
            <input ref={esGrande} onClick={() => {console.log(esGrande.current.checked)}} type="checkbox" /> 
            <button onClick={() => {postearImagenes(nombre.current.value, esGrande.current.checked)}}>Enviar</button>
        </form>
        <Menu></Menu>
        </>)
}
//<button onClick={() => {postearImagenes(nombre.current.value, esGrande.current.value)}}>Enviar</button>
export default PostImagen 