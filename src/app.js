/* IMPORTACIONES */

import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

// Importacion de Routers
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

/* Configuracion de puerto */
// declaro app como express para que sea mas facil y mas visual
const app = express();

// declaro en que puerto se va a correr, facilitando y optimizando
const PUERTO = 8080;

/*////////////////////

MIDDLEWARE

//////////////////////
*/

//Middleware: aca le digo al servidor que voy a usar formato json
app.use(express.json());
//esto le dice a la app que va a recibir datos complejos
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./src/public"));

/*////////////////////

CONFIGURACION EXPRESS-HANDLEBARS

//////////////////////
*/
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

/*///////////////////

APIS/RUTAS

/////////////////////
*/

//Ruta principal donde se vera representado el front
app.use("/", viewsRouter);

// llama a la api products parausar sus funcionalidades
app.use("/api/products", productsRouter);

// llama a la api carts parausar sus funcionalidades
app.use("/api/carts", cartsRouter);

// VINCULA EL SERVIDOR
const httpServer = app.listen(PUERTO, () => {
  // cuando el puerto esta escuchando lo comunca a traves de la consola
  console.log(`escuchando en el puerto: http://localhost:${PUERTO}`);
});

/*/////////////////////////

SERVER

///////////////////////////*/

//Apuntes: traigan el ProductManager:
import { ProductManager } from "./controlers/product-manager.js";
const manager = new ProductManager("./src/data/products.json");

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Un cliente se conecto");

  //Le envian el array de productos a la vista realTimeProducts:
  socket.emit("products", await manager.getProducts());
  //Con un evento y el metodo "on" lo escuchas desde el  main.js y lo mostras por pantalla.

  // //Recibimos el evento "eliminarProducto" desde el cliente y borramos con el metodo borrar:
  socket.on("eliminarProducto", async (id) => {
    await manager.deleteProductById(id);

    //Despues de borrar le envio los productos actualizados al cliente:
    io.sockets.emit("products", await manager.getProducts());
  });
});
