import { Router } from "express";
import { CartManager } from "../controlers/cart-manager.js";
const cartManager = new CartManager("./src/data/carts.json");

// declaramos router para facilitar su uso
const router = Router();

// get sirve para llamar al JSON y traer los productos a traves de la funcion cargarCarrito desde CartManager.
router.get("/", async (req, res) => {
  // Try declara que al ser llamago el get, va a intentar hacer lo siguiente...
  try {
    const carts = await cartManager.cargarCarritos();
    res.send(carts);
  } catch {
    // catch declara lo que se va a hacer en caso de error
    console.error("Error al obtener los carritos:", error);
    res.status(500).send("Error al obtener los carritos");
  }
});

// POST sirve para llamar al JSON y agregar los productos a traves de la funcion crearCarrito desde CartManager.
router.post("/", async (req, res) => {
  // Try declara que al ser llamago el post, va a intentar hacer lo siguiente...
  try {
    const nuevoCarrito = await cartManager.crearCarrito();
    res.status(201).json(nuevoCarrito);
  } catch (error) {
    // catch declara lo que se va a hacer en caso de error
    res.status(500).send("Error del servidor");
  }

  // const newCart = req.body;
  // carts.push(newCart);
  // res.send({status: "succes" , message: "Carrito creado correctamente" })
});

/*  GET/:cid
 */
router.get("/:cid", async (req, res) => {
  const carritoId = parseInt(req.params.cid);
  /* carritoId: recive cual es el id que se quiere consultar.
  parseInt() se utiliza para convertir un str en un Int
  params son los parámetros de ruta en una URL, que permiten capturar valores dinámicos definidos en la ruta del servidor. */

  try {
    const carritoBusado = await cartManager.getCarritoById(carritoId);
    res.json(carritoBusado.products);// devuelve el carrito solicitado a traves del id
  } catch (error) {
    console.error("Error al obtener el carrito por ID:", error);
    res.status(500).send("Error al obtener el carrito");
  }
});

// post/:cid/products/:pid
router.post("/:cid/product/:pid", async (req, res) => {
  const carritoId = parseInt(req.params.cid);
  /* carritoId: recive cual es el id que se quiere consultar.
  parseInt() se utiliza para convertir un str en un Int
  params son los parámetros de ruta en una URL, que permiten capturar valores dinámicos definidos en la ruta del servidor. */

  const productoId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const carritoActualizado = await cartManager.agregarProductoAlCarrito(
      carritoId,
      productoId,
      quantity
    );
    res.json(carritoActualizado.products);
  } catch (error) {
    console.error("Error al obtener el carrito por ID:", error);
    res.status(500).send("Error al obtener el carrito");
  }
});

/// ELIMINAR
router.delete("/del/:cid", async (req,res) => {
  const carritoId = parseInt(req.params.cid);

  try {
    const result = await cartManager.deleteCartById(carritoId);
    if (result) {
      res.status(200).send(`Se ha eliminado el carrito con el id ${carritoId}`);
    }
  } catch (error) {
    res.status(500).send("Error al eliminar el carrito");
  }
});

// actualizar carrito
router.put("/", async (req,res) => {
  const carritoId = parseInt(req.params.cid); 

  try{

  }
  catch(error){
    res.status(500).send("Error al eliminar el carrito", error);
  }
});


export default router;
