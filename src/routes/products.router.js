import { Router } from "express";
import { ProductManager } from "../controlers/product-manager.js";
// instancia para "product manager"
const manager = new ProductManager("./src/data/products.json");
const products = manager.getProducts();
// instalacion router para las rutas
const router = Router();

/// Metodos GET

// Get inicial
router.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts();
    res.send(products);
  } catch (error) {
    res.status(500).send("Error del servidor");
  }
});

// GET por id
router.get("/:pid", async (req, res) => {
  let id = req.params.pid;

  try {
    const product = await manager.getProductsById(parseInt(id));

    if (!product) {
      res.send("Prdoducto no encontrado");
    } else {
      res.send(product);
    }
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    res.status(500).send("Error al obtener el producto");
  }
});

// Metodos POST
router.post("/", async (req, res) => {
  const { title, description, price, img, code, stock, category } = req.body;

  try {
    const nuevoProducto = await manager.addProduct(
      title,
      description,
      price,
      img,
      code,
      stock,
      category
    );

    if (nuevoProducto) {
      res.status(201).send(nuevoProducto);
    } else {
      res.status(400).send("Error al agregar el producto");
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});


/// ELIMINAR
router.delete("/del/:pid", async (req,res) => {
  const productID = parseInt(req.params.pid);

  try {
    const result = await manager.deleteProductById(productID);
    if (result) {
      res.status(200).send(`Se ha eliminado el producto con el id ${productID}`);
    }
  } catch (error) {
    res.status(500).send("Error al eliminar el producto");
  }
});

export default router;
