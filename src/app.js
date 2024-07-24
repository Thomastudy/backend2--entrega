import http from "http"
import express from "express"

const app = express()
const PUERTO = 8080;

// CREAR SERVIDOR EN HTTP
const server = http.createServer((req,res) => {
    console.log("Escuchando en el puerto 8080")
    res.end("Mi primer hola mundo desde backend")
})

// VINCULA EL SERVIDOR
server.listen(PUERTO, () =>{
    console.log(`escuchando en el puerto: http://localhost:${PUERTO}`)
})

// app.use("/api/products", productsRouter)
// app.use("/api/carts", cartsRouter)

//la ruta raiz get / debera listar los productos de la base
//la ruta raiz get /:pid debera listar el producto con mismo id

// La ruta raíz POST / deberá agregar un nuevo producto con los campos:
// id: String  el id NO se manda desde body
// title:String,
// description:String
// code:String
// price:Number
// status:Boolean
// stock:Number
// category:String
// thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
// Status es true por defecto.
// Todos los campos son obligatorios, a excepción de thumbnails


app.GET("/", (req,res) => {

    let {id} = 
})