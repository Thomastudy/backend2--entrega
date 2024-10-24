import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { authMiddleware, onlyAdmin } from "../middleware/auth.js";

const userController = new UserController();

const router = Router();

router.post("/register", userController.register);

router.post("/login", userController.logIn);

router.post("/logout", userController.logOut);



////////////////////////
////     Current      ////
////////////////////////
router.get("/current", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") {
    return res.redirect("/products");
  }
  // si es admin entra a la parte de edicion
  return res.redirect("/adminpage");
});

export default router;
