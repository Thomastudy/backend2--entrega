import express from "express";

// Importacion de Routers
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

/* Configuracion de puerto */
// declaro app como express para que sea mas facil y mas visual
const app = express();
// declaro en que puerto se va a correr, facilitando y optimizando
const PUERTO = 8080;

//Middleware: aca le digo al servidor que voy a usar formato json
app.use(express.json());

// llama a la api products parausar sus funcionalidades 
app.use("/api/products", productsRouter);

// llama a la api carts parausar sus funcionalidades 
app.use("/api/carts", cartsRouter);

// VINCULA EL SERVIDOR
app.listen(PUERTO, () => {
  // cuando el puerto esta escuchando lo comunca a traves de la consola
  console.log(`escuchando en el puerto: http://localhost:${PUERTO}`);
});

