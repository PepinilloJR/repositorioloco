const express = require('express')
const fs = require('node:fs')

const videos = require('./videos.json')
const imagenes = require('./imagenes.json')

const app = express()

app.disable('x-powered-by')

//app.use((req, res, next) => {
//   res.append("Access-Control-Allow-Origin", ['*'])
//   res.append("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS ')
//   next()
//})

app.use(express.json()) // este middleware nos ahorra el capturar 
                        // mediante chunks del stream de datos 
                        // para conseguir el body del request
                        // ahora podemos acceder directamente al body en el codigo


// configuro CORS, en este caso todo esta permitido pero deberiamos configurar los puntos de origen de forma mas limitada
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", ['*'])
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE, PATCH');
    res.header("Access-Control-Allow-Headers", 'Content-Type');

    next()
})


const PORT = process.env.PORT ?? 1234






app.listen(PORT, () => {
    console.log("sas escuchando en http://localhost:4000 lmaoooo" )
})

app.get('/', (req, res) => {
    // puedo usar un send alternativo para json que es .json')
    res.status(200).json({ message: 'pagina principal' })

})

//app.get('/videos', (req, res) => {
//    res.header("Access-Control-Allow-Origin", ['*'])
//    res.json(videos)
//})

// puedo acceder a videos especificos segun por ejemplo, el titulo
// considerando los parametros de la URL
// los parametros se logran entendiendo el uso de REGEX, es decir
// :titulo se traduce a una expresion regular 
// esto significa que tambien podemos usar expresiones regulares dentro
// de los paths
// por ejemplo ^Letra (que empiece con una letra, etc)
// por ejemplo a+ (que esta la letra a una o varias veces)
app.get('/videos/:titulo', (req, res) => {

    // recibo el parametro con req.params.titulo
    const titulo = req.params.titulo

    // filtro para buscar el objeto con el ID porque es una lista de videos
    const video = videos.find(objeto => objeto.titulo === titulo)
    res.json(video)
})

// otra forma de filtrar es con query string 
// puedo filtrar imagenes por algun parametro
// que no sera especificado en la URL si no que de forma dinamica 
// podemos acceder con el query del request

// del lado del cliente, los parametros deberan ser especificados con el siguiente formato
// direccion/imagenes?nombre=algo&esGrande=true
//                   ^           ^
//                   | ? comienzo| & and
app.get('/imagenes', (req, res) => {
    // extraemos los parametros que queremos usar
    const { nombre, esgrande } = req.query
    let ImagenFiltrada = imagenes
    if (nombre) {
        ImagenFiltrada = imagenes.find(imagen => imagen.nombre === nombre)
    }
    res.json(ImagenFiltrada)
})


app.post('/imagenes', (req, res) => {
    console.log("hola")
    const {
        nombre,
        esGrande
    } = req.body // como usamos en el middleware express.json()
                 // no es nescesario usar on.data y recoger cada chunk
    console.log(req.body)

    if (typeof nombre === 'string' && (esGrande === "true" || esGrande === "false")) {
        const nImagen = {
            id: (imagenes.length + 3),
            nombre: nombre,
            esGrande: esGrande
        }
        imagenes.push(nImagen)
        fs.writeFile('./imagenes.json', JSON.stringify(imagenes), (err) => {
            console.log(err)
        })
        res.status(201).json(nImagen)
    } else {
        res.status(400).send("los valores ingresados no cumplen con los requisitos")
    }
    
})

app.patch('/imagenes/:id', (req, res) => {
    const id = req.params.id

    // como manejamos una lista, en vez de encontrar la imagen, buscamos su indice
    // en la lista, buscandolo con el ID que ingresa el cliente
    const imagenIndex = imagenes.findIndex(imagen => imagen.id === Number(id))

    if (imagenIndex === -1) {
        return res.status(404).json({ mensaje: "imagen no encontrada"})
    }
    // ahora que sabes que existe la imagen, la obtenemos 
    const imagen = imagenes[imagenIndex]
    // obtenemos los valores que ingreso el cliente
    const {nombre, esGrande} = req.body
    if (typeof nombre === 'string' && (esGrande === "true" || esGrande === "false")) {
        const nImagen = {
            id: imagenes[imagenIndex].id,
            nombre: nombre,
            esGrande: esGrande
        }
        imagenes[imagenIndex] = nImagen
        fs.writeFile('./imagenes.json', JSON.stringify(imagenes), (err) => {
            console.log(err)
        })
        res.status(201).json(nImagen)
    } else {
        res.status(400).send("los valores ingresados no cumplen con los requisitos")
    }
})


app.delete("/imagenes/:id", (req, res) => {
    const id = req.params.id
    const imagenIndex = imagenes.findIndex((imagen) => {
        //console.log(typeof id, id)
        //console.log(typeof toString(imagen.id), imagen.id)
        return imagen.id === Number(id)})
    console.log(imagenIndex)
    if (imagenIndex === -1) {
        return res.status(404).json({ mensaje: "imagen no encontrada"})
    } else {
        const nuevoImagenes = imagenes.splice(imagenIndex, 1) 
        fs.writeFile('./imagenes.json', JSON.stringify(imagenes), (err) => {
            console.log(err)
        })
        res.status(200)
    }
})
