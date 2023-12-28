import { useEffect, useState } from 'react'
import Menu from './menu'

async function Recibir_Principal(setPrincipal) {
    try {
        const response = await fetch("http://localhost:4000")
        const palabra = await response.json()
        console.log(palabra)
        setPrincipal(palabra.message)
    } catch (err) {
        console.log(err)
    }

}


export default function Home() {
    const [principal, setPrincipal] = useState('')

    useEffect(() => {
        Recibir_Principal(setPrincipal)
    }, [])
    console.log("dddddddddddd")
    return (<>
        <Menu></Menu>
        <div>
            {principal}
        </div>
    </>
    )
}