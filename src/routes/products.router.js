import { Router } from "express";
import { ProductManager } from "../controlers/product-manager.js";

// instancia para "product manager"
const manager = new ProductManager("./src/data/products.json");
const products = manager.getProducts();
const router = Router();

/// Metodos GET

// Get inicial
router.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts()
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
  const  { title, description, price, img, code, stock, category } = req.body;

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

    if (!nuevoProducto) {
        res.status(400).send("Error al agregar el producto");
    }else{
        res.status(201).send(nuevoProducto);
      }

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
