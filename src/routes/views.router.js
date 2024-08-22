import { Router } from "express";
import { ProductManager } from "../dao/db/product-manager-db.js";

// instancia para "product manager"
const manager = new ProductManager();
// instalacion router para las rutas
const router = Router();

//Ruta principal donde se vera representado el front
router.get("/products", async (req, res) => {
  const products = await manager.getProducts();

  res.render("index", { products });
});

// mostrar los productos en timepo rea
// con boton de agregar y eliminar

router.get("/realtimeproducts", async (req, res) => {
  res.render("realtimeproducts");
});

router.get("/", async (req, res) => {
  res.render("mainpage");
});

export default router;
