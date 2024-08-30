import { Router } from "express";
import { CartManager } from "../dao/db/cart-manager-db.js";

const Manager = new CartManager();
// declaramos router para facilitar su uso
const router = Router();

// get sirve para llamar al JSON y traer los productos a traves de la funcion cargarCarrito desde CartManager.
router.get("/", async (req, res) => {
  // Try declara que al ser llamago el get, va a intentar hacer lo siguiente...
  try {
    const carts = await Manager.getCarts();
    res.send(carts);
  } catch {
    // catch declara lo que se va a hacer en caso de error
    console.error("Error al obtener los carritos:", error);
    res.status(500).send("Error al obtener los carritos");
  }
});

/*  GET/:cid
 */
router.get("/:cid", async (req, res) => {
  const carritoId = req.params.cid;
  /* carritoId: recive cual es el id que se quiere consultar.
   */

  try {
    const carritoBusado = await Manager.getCartById(carritoId);

    if (!carritoBusado) {
      res.send("Carrito no encontrado");
    } else {
      res.json(carritoBusado.products); // devuelve el carrito solicitado a traves del id
    }
  } catch (error) {
    console.error("Error al obtener el carrito por ID:", error);
    res.status(500).send("Error al obtener el carrito");
  }
});

// POST sirve para llamar al JSON y agregar los productos a traves de la funcion crearCarrito desde CartManager.
router.post("/", async (req, res) => {
  // Try declara que al ser llamago el post, va a intentar hacer lo siguiente...
  try {
    const nuevoCarrito = await Manager.newCart();
    res.status(201).json(nuevoCarrito);
  } catch (error) {
    // catch declara lo que se va a hacer en caso de error
    res.status(500).send("Error del servidor");
  }

  // const newCart = req.body;
  // carts.push(newCart);
  // res.send({status: "succes" , message: "Carrito creado correctamente" })
});

// post/:cid/products/:pid
router.post("/:cid/product/:pid", async (req, res) => {
  const carritoId = req.params.cid;
  /* carritoId: recive cual es el id que se quiere consultar.
  parseInt() se utiliza para convertir un str en un Int
  params son los parámetros de ruta en una URL, que permiten capturar valores dinámicos definidos en la ruta del servidor. */

  const productoId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const carritoActualizado = await Manager.addProdToCart(
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
router.delete("/del/:cid", async (req, res) => {
  const carritoId = req.params.cid;

  try {
    const result = await Manager.deleteCartById(carritoId);
    if (result) {
      res.status(200).send(`Se ha eliminado el carrito con el id ${carritoId}`);
    }
  } catch (error) {
    res.status(500).send("Error al eliminar el carrito");
  }
});

router.delete("/:cid", async (req, res) => {
  const carritoId = req.params.cid;

  try {
    const result = await Manager.delProdsFromCart(carritoId);
    if (result) {
      res.status(200).send(`Se ha vaciado el carrito con el id ${carritoId}`);
    }
  } catch (error) {
    res.status(500).send("Error al eliminar el carrito");
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const carritoId = req.params.cid;
  const productoId = req.params.pid;

  try {
    const carritoActualizado = await Manager.delProdFromCartById(
      carritoId,
      productoId
    );
    res.json(carritoActualizado.products);
  } catch (error) {
    console.error("Error al obtener el carrito por ID:", error);
    res.status(500).send("Error al obtener el carrito");
  }
});
// actualizar carrito
router.put("/:cid", async (req, res) => {
  const carritoId = req.params.cid;
  const products = req.body;
  /**PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba. */
  await Manager.delProdsFromCart(carritoId);
  try {
    for (const prod of products) {
      // desglosar las partes de cada product
      const { id, quantity } = prod;

      await Manager.addProdToCart(carritoId, id, quantity);
    }
    const carritoActualizado = await Manager.getCartById(carritoId);
    res.json(carritoActualizado.products);
  } catch (error) {
    res.status(500).send("Error al eliminar el carrito", error);
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = parseInt(req.body.quantity) || 1;
  /**PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
   */
  if (typeof quantity !== "number" || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "La cantidad debe ser un número positivo" });
  }

  try {
    const carritoActualizado = await Manager.updateStockById(
      cartId,
      productId,
      quantity
    );
    res.json(carritoActualizado.products);
  } catch (error) {
    res.status(500).send("Error al eliminar el carrito", error);
  }
});

export default router;
