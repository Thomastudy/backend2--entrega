/* IMPORTACIONES */

import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

// Database
import "./database.js";
// Importacion de Routers
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";

// Importacion de Manager
import { ProductManager } from "./dao/db/product-manager-db.js";
// Passport config
import passport from "passport";
import initializePassport from "./config/passport.config.js";

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
// Hace que busque las cosas llamandolas desde esta ubicacion
app.use(express.static("./src/public"));
// usar las cookies
app.use(cookieParser());
// passport config middleware
initializePassport();
app.use(passport.initialize());

/*////////////////////

CONFIGURACION EXPRESS-HANDLEBARS

//////////////////////
*/
app.engine(
  "handlebars",
  engine({
    helpers: {
      eq: function (a, b) {
        return a === b;
      },
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

/*///////////////////

APIS/RUTAS

/////////////////////
*/

/*///////////////////////////////
          VIEWSSSS
///////////////////////////////*/

//Ruta principal donde se vera representado el front
app.use("/", viewsRouter);

/*///////////////////////////////
          PRODUCTS
///////////////////////////////*/
// llama a la api products para usar sus funcionalidades
app.use("/api/products", productsRouter);

/*///////////////////////////////
          CARTS
///////////////////////////////*/
// llama a la api carts para usar sus funcionalidades
app.use("/api/carts", cartsRouter);

/*///////////////////////////////
          SESSIONS
///////////////////////////////*/
// llama a la api sessions para usar sus funcionalidades
app.use("/api/sessions", usersRouter);

// VINCULA EL SERVIDOR
const httpServer = app.listen(PUERTO, () => {
  // cuando el puerto esta escuchando lo comunica a traves de la consola
  console.log(`Escuchando en el puerto: http://localhost:${PUERTO}`);
});

/*/////////////////////////

SERVER

///////////////////////////*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Apuntes: traigan el ProductManager:
const manager = new ProductManager();

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Un cliente se conecto");

  //Le envian el array de productos a la vista realTimeProducts:
  socket.emit("products", await manager.getProducts());
  //Con un evento y el metodo "on" lo escuchas desde el  main.js y lo mostras por pantalla.

  // //Recibimos el evento "deleteProduct" desde el cliente y borramos con el metodo borrar:
  socket.on("deleteProduct", async (id) => {
    await manager.deleteProductById(id);
  });

  // //Recibimos el evento "updateProduct" desde el cliente y actualizamos con el metodo update:
  socket.on("updateProduct", async ({ id, stock }) => {
    try {
      console.log({ id, stock });

      await manager.updateProductStock({ idProducto: id, stock });
      const products = await products.find(); // Obtén la lista actualizada de productos
      io.emit("products", products);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  });
  // //Recibimos el evento "addProduct" desde el cliente y agregamos con el metodo addproduct:
  socket.on("addProduct", async (formValues) => {
    try {
      const result = await manager.addProduct(formValues);

      if (result) {
        console.log("Nuevo producto agregado correctamente");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  });

  // //Despues de borrar le envio los productos actualizados al cliente:
  io.sockets.emit("products", await manager.getProducts());
});
