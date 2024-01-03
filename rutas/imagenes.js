import { Router } from "express";
import { createRequire } from 'node:module'
import fs from 'node:fs'
import { ImagenModel } from "../modelos/imagen.js";
import { ImagenControler } from "../controladores/imagen.js";
const require = createRequire(import.meta.url)

const Imagenes = require('./imagenes.json')


export const routerImg = Router()

// ahora los callbacks de los metodos son async
// porque los models devuelven promesas, esto se ve en el controlador

// el uso de models y controladores nos ahorraria algunas librerias que habria que sacar
// pero como no esta todo pasado a models aun asi la estoy usando
// cuando se pase todo a models y controladores, se quitan y ya
routerImg.get('/:id', ImagenControler.RecibirTodos)


routerImg.post('/', ImagenControler.Postear)

// estos de aqui todavia no estan aplicados con modelos, porque me da paja
// el concepto ya se entiende bien
routerImg.put('/:id', (req, res) => {
    const {
        nombre,
        esGrande
    } = req.body
    const indexOriginal = Imagenes.findIndex(imagen => imagen.id === Number(id))
    if (indexOriginal != -1 && typeof nombre === 'string' && (esGrande === "true" || esGrande === "false")) {
        const nuevaImagen = {
            nombre: nombre,
            esGrande: esGrande
        }
        
        Imagenes[indexOriginal] = nuevaImagen

        fs.writeFile('./imagenes.json', JSON.stringify(Imagenes), (err) => {
            console.log(err)
        })
        res.status(201).json(nImagen)
    }
    else {
        res.status(400).json({message: "los valores cargados son incorrectos o no existe el ID"}) 
    }
})


routerImg.delete('/:id', (req, res) => {
    const index = Imagenes.findIndex(imagen => imagen.id === Number(id))
    if (index != -1) {
        ImagenesNew = Imagenes.splice(index, 1)
        fs.writeFile('./imagenes.json', JSON.stringify(Imagenes), (err) => {
            console.log(err)
        })
        res.status(201).json({message: "eliminado correctamente"})
    }
    else {
        res.status(400).json({message: "el ID no existe"})
    }
})