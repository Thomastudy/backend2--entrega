import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

// declaramos router para facilitar su uso
const router = Router();

/*  GET/:cid
 */
router.get("/:cid", cartController.getCartById);

router.post("/", cartController.createCart);

// post/:cid/products/:pid
router.post("/:cid/product/:pid", cartController.addProductToCart);

/// ELIMINAR
router.delete("/del/:cid", cartController.deleteCart);

router.delete("/:cid", cartController.emptyCart);

/// COMPRA
router.post("/:cid/purchase", cartController.purchase);

/**
 * 
// router.delete("/:cid/products/:pid", cartController.delProductFroomCart);
// actualizar carrito
// router.put("/:cid", cartController.);

// router.put("/:cid/products/:pid", cartController.);
*/

export default router;
