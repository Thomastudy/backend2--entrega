import { Router } from "express";

const router = Router()

const carts = [];

router.get("/api/carts", (req, res) => {
  res.send(carts);
});

router.post("/api/carts", (req, res) => {
    const newCart = req.body;
    carts.push(newCart);
    res.send({status: "succes" , message: "Carrito creado correctamente" })
  });

  export default router