import { Router } from "express";
import { ProductManager } from "../controlers/product-manager.js";

// instancia para "product manager"
const manager = new ProductManager("../src/data/products.json");


const products = manager.getProducts()

const router = Router();

router.get("/api/products", (req, res) => {
  res.send(products);
});

router.post("/", (req, res) => {
    const nuevoProducto = req.body

    try {
        manager.addProduct(nuevoProducto);

        res.status(201).send("Producto agregado exitosamente")
    } catch (error) {
        res.status(500).json({status:"error", message: error.message})
    }


//   const newProduct = req.body;
//   products.push(newProduct);
//   res.send({ status: "succes", message: "Producto creado correctamente" });
});

export default router;
