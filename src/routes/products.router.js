import { Router } from "express";

const router = Router()

const products = [];

router.get("/api/products", (req, res) => {
  res.send(products);
});
router.post("/api/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.send({status: "succes" , message: "Producto creado correctamente" })
});

export default router
