import { Router } from "express";
import { CartManager } from "../controlers/cart-manager.js";
const cartManager = new CartManager("./src/data/carts.json")

const router = Router()

const carts = [];

router.get("/api/carts", (req, res) => {
  res.send(carts);
});

router.post("/", async (req, res) => {
    try{
        const nuevoCarrito = await CartManager.crearCarrito()
    }catch(error){

    }


    // const newCart = req.body;
    // carts.push(newCart);
    // res.send({status: "succes" , message: "Carrito creado correctamente" })
  });

  export default router