import { Router } from "express";
import { CartManager } from "../controlers/cart-manager.js";
const cartManager = new CartManager("./src/data/carts.json");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.cargarCarritos();
    res.send(carts);
  } catch {
    console.error("Error al obtener los carritos:", error);
    res.status(500).send("Error al obtener los carritos");
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevoCarrito = await cartManager.crearCarrito();
    res.status(201).json(nuevoCarrito);
  } catch (error) {
    res.status(500).send("Error del servidor");
  }

  // const newCart = req.body;
  // carts.push(newCart);
  // res.send({status: "succes" , message: "Carrito creado correctamente" })
});

//  GET/:cid

router.get("/:cid", async (req, res) => {
  const carritoId = parseInt(req.params.cid);

  try {
    const carritoBusado = await cartManager.getCarritoById(carritoId);
    res.json(carritoBusado.products);
  } catch (error) {
    console.error("Error al obtener el carrito por ID:", error);
    res.status(500).send("Error al obtener el carrito");
  }
});

// post/:cid/products/:pid
router.post("/:cid/product/:pid", async (req, res) => {
  const carritoId = parseInt(req.params.cid);
  const productoId = (req.params.pid);
  const quantity = (req.body.quantity) || 1;

  try {
    const carritoActualizado = await cartManager.agregarProductoAlCarrito(carritoId, productoId, quantity);
    res.json(carritoActualizado.products)
  } catch (error) {
    console.error("Error al obtener el carrito por ID:", error);
    res.status(500).send("Error al obtener el carrito");
  }
});




/// FALTAN ACTUALIZAR Y ELIMINAR



export default router;
