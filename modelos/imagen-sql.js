// aca creamos otro modelo para las imagenes, esta vez en vez de usar un JSON
// usamos una base de datos de MySQL, usando el paquete mysql2, QUE SOPORTA PROMESAS
// POR LO QUE PODEMOS EVITAR USAR CALLBACKS

// antes de esto estudiar SQL

import mysql from 'mysql2/promise'

// para acceder a los datos mySQL utiliza un usuario
// para ello creamos el objeto config para poner credenciales

const config = {
    host: 'bezq5ldzvoauchqbpev7-mysql.services.clever-cloud.com', // nombre del host, en este caso es 127.0.0.1 (localhost)
    user: 'u8txtsky2nzzq7xk', // nombre del usuario
    port: 3306, // puerto
    password: 'sp1XZdhSAjGoz2nlBa0I', // contraseña, vacia si no tiene
    database: 'bezq5ldzvoauchqbpev7', // nombre de la base de datos SQL que queremos usar
}                                                   // no se dice asi pero bueno

// para conectarnos a la base de datos, nos conectamos usando el metodo
// de mysql de createConnection, a la que le tenemos que pasar la config
const connection = await mysql.createConnection(config)
// a partir de la connection, podemos hacer querys con el formato SQL 
// a la base de datos

export class ImagenModel {
    static async RecibirTodos ({ id /* recibe el ID para filtrar*/}) {
        if (Number(id) != -1) {
            // aca se puede ver que uso querys, y que puedo usarlo de forma dinamica
            // la logica del query deberia ser entendible con suficiente entendimiento de SQL, es una tontera
            // cada ? se reemplaza por un valor en orden de aparicion de un array que pasamos como segundo argumento
            // del query
            const response = await connection.query(
                `SELECT img_id, img_nombre, es_grande FROM imagenes WHERE img_id = ?`, [Number(id)]
            )
            const Imagenes = response[0]
            return Imagenes
        } else {
            const response = await connection.query(
                'SELECT img_id, img_nombre, es_grande FROM imagenes;'
            )
            // la respuesta es una tupla de datos, la primera lista es la
            // respuesta que buscamos, la otra es la definicion de la fila 
            // en cada tabla
            const Imagenes = response[0]
            return Imagenes
        }
    }

    static async Postear ({nombre, esGrande}) {
        if (typeof nombre === 'string' && (esGrande === true || esGrande === false)) {
            const nuevaImagen = {
                nombre: nombre,
                esGrande: esGrande
            }
            const imagenNueva = await connection.query(
                `INSERT INTO imagenes (img_nombre, es_grande)
                VALUES (?, ?);`, 
                [nombre, esGrande]
            )
            return imagenNueva
        } else {
            return null
        }
    }
}