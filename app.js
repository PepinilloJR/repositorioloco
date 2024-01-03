import express, {json} from "express";
import {CorsConf, CorsConf2} from './middleware/CORS.js'
import { routerImg } from "./rutas/imagenes.js";
const app = express()
app.disable('x-powered-by')



//const puerto = process.env.PORT ?? 1234
const puerto = 1234

app.use((req,res,next) => {
    CorsConf2(req,res)
    console.log('xd')
    next()
})
app.use(json())
app.use('/imagenes', routerImg)
//app.use(CorsConf())




app.listen(puerto, () => {
    console.log(`server escuchando en http://localhost:${puerto} negrita puta`)
})


app.get('/', (req, res) => {
    res.status(200).json({ message: 'nada por aqui uwu' })

})


