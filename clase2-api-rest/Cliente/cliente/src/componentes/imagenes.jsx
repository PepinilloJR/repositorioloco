import { useEffect, useState } from 'react'
import Menu from './menu'

async function Recibir_imagenes(setImagenes) {
    try {
        //const ruta = './xd.mp4'
        const nombre = "foto1"
        const response = await fetch(`http://localhost:4000/imagenes?nombre=${nombre}`)
        const imagenes = await response.json()
        console.log(imagenes)
        setImagenes(imagenes)
    } catch (err) {
        console.log(err)
    }

}

async function Postear_imagen() {

    try {
        const nombreA = 'fotogenerica'
        const esGrandeA = 'false'
        const response = await fetch(`http://localhost:4000/imagenes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombreA, 
                esGrande: esGrandeA
            })
        })
    } catch (err) {
        console.log(err)
    }

}

async function Modificar_imagen() {

    try {
        const nombreA = 'rodrigolarreta'
        const esGrandeA = 'false'
        const response = await fetch(`http://localhost:4000/imagenes/6`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombreA, 
                esGrande: esGrandeA
            })
        })
    } catch (err) {
        console.log(err)
    }

}

async function Eliminar_imagen() {

    try {
        const response = await fetch(`http://localhost:4000/imagenes/5`, {
            method: 'DELETE'
        })
    } catch (err) {
        console.log(err)
    }

}

function Imagenes() {
    const [imagenes, setImagenes] = useState({})

    useEffect(() => {
        Recibir_imagenes(setImagenes)
        //Postear_imagen()
        console.log(imagenes)
    }, [])

    return ( <>
            <Menu></Menu>
            <div> imagenes </div>
            <button onClick={Postear_imagen}>Crear foto</button>
            <button onClick={Modificar_imagen}>Modificar primera foto</button>
            <button onClick={Eliminar_imagen}>Eliminar primera foto</button>
        </>)
}

export default Imagenes