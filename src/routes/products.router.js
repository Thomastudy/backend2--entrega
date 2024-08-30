import { Router } from "express";
import { ProductManager } from "../dao/db/product-manager-db.js";

// instancia para "product manager"
const manager = new ProductManager();
// instalacion router para las rutas
const router = Router();

/// Metodos GET

// Get inicial
router.get("/", async (req, res) => {
  let limit = parseInt(req.query.limit) || 10;
  try {
    const products = await manager.getProducts();
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } catch (error) {
    res.status(500).json("Error del servidor");
  }
});

// GET por id
router.get("/:pid", async (req, res) => {
  let id = req.params.pid;

  try {
    const product = await manager.getProductsById(id);

    if (!product) {
      res.json("Prdoducto no encontrado");
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    res.status(500).json("Error al obtener el producto");
  }
});

// Metodos POST
router.post("/", async (req, res) => {
  const { title, description, price, img, code, stock, category } = req.body;

  try {
    const result = await manager.addProduct({
      title,
      description,
      price,
      img,
      code,
      stock,
      category,
    });

    if (result) {
      res.status(201).json(result);
    } else {
      res.status(400).json("Error al agregar el producto");
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/// Actualizar por id
router.put("/:pid", async (req, res) => {
  const productosActualizado = req.body;
  const id = req.params.pid;

  try {
    await manager.updateProducts(id, productosActualizado);
    res.status(201).json(productosActualizado);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/// ELIMINAR
router.delete("/del/:pid", async (req, res) => {
  const productID = req.params.pid;

  try {
    const result = await manager.deleteProductById(productID);
    if (result) {
      res
        .status(200)
        .json(`Se ha eliminado el producto con el id ${productID}`);
    }
  } catch (error) {
    res.status(500).json("Error al eliminar el producto");
  }
});

export default router;
