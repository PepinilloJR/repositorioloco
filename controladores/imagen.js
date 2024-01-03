// en este caso, los controladores interactuan directamente con los modelos
// el concepto es que el controlador es llamado en las rutas, y le deja toda la logica 
// que procede despues de recibir respuesta de los modelos, al controlador, siendo 
// ahora la ruta una especie de puntero a la logica 

// entonces, el controlador recibe las respuestas de los modelos, procesa que debe hacerse con esta, y se envia directamente 
// a la vista del cliente 

import { ImagenModel } from "../modelos/imagen-sql.js"
import fs from 'node:fs'

export class ImagenControler {
    static async RecibirTodos (req, res) {

        // como usamos async, podemos manejar errores con try y catch
        // ademas, seria recomendanble "granular" un poco mas el manejo 
        // de errores, para asegurarse que sea un error del servidor, del cliente
        // etc
        try {
            const id = req.params.id
            const ImagenesRecuperadas = await ImagenModel.RecibirTodos({id})
            res.status(200).json(ImagenesRecuperadas)
            res.status(200)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    static async Postear (req, res) {
        const {
            nombre,
            esGrande
        } = req.body
    
        try {
            const Imagenes = await ImagenModel.Postear({nombre,esGrande})
            console.log(Imagenes)
            res.status(200).json(Imagenes)
        } catch (err) {
            // esto es medio cualquiera, pero por ahora asi, da igual
            res.status(400).json({message: err.message}) 
        }
    }
}