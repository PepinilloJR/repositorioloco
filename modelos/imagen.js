import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const Imagenes = require("../rutas/imagenes.json")

// aqui el modelo para las imagenes

// en la arquitectura MVC
// los modelos  Es responsable de gestionar los datos, 
// realizar operaciones sobre ellos y notificar a las vistas /
// y controladores sobre cualquier cambio. 
// En resumen, el modelo encapsula la lógica interna y la manipulación de datos que usamos en las rutas para responder a por ejemplo, un GET, un POST, etc


// usaremos clases para ello, AUNQUE NO ES OBLIGATORIO, es solo para el ejemplo


// usaremos metodos estaticos para trabajar la logica, recordemos
// que un metodo estatico puede ser llamado sin necesitar de una instancia
// de la clase para para ello

// los metodos deben ser asyncronos por un tema de compatibilidad
// no lo entiendo bien, pero el concepto es que sean promesas
export class ImagenModel {
    static async RecibirTodos ({ id /* recibe el ID para filtrar*/}) {
        if (Number(id) != -1) {
            const objeto = Imagenes.find(imagen => Number(id) === imagen.id) 
            return objeto
        } else {
            return Imagenes
        }
    }

    static async Postear ({nombre, esGrande}) {
        if (typeof nombre === 'string' && (esGrande === true || esGrande === false)) {
            const nuevaImagen = {
                id: (Imagenes.length + 3),
                nombre: nombre,
                esGrande: esGrande
            }
            Imagenes.push(nuevaImagen)
            return Imagenes
        } else {
            return null
        }
    }
}