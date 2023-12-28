import { useEffect, useState } from 'react'
import Menu from './menu'

async function Recibir_Videos(setVideos) {
    try {
        const titulo = 'Lol'
        const response = await fetch(`http://localhost:4000/videos/${titulo}`)
        const videos = await response.json()
        console.log(videos)
        setVideos(videos)
    } catch (err) {
        console.log(err)
    }

}

function Videos() {
    const [videos, setVideos] = useState({})

    useEffect(() => {
        Recibir_Videos(setVideos)
        console.log(videos)
    }, [])

    return ( <>
            <Menu></Menu>
            <div> videos </div>
        </>)
}

export default Videos