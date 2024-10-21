import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";

const userController = new UserController();

const router = Router();

router.post("/register", userController.register);

router.post("/login", userController.logIn);

router.post("/logout", userController.logOut);

////////////////////////
////    Current     ////
////////////////////////

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  userController.current
);

////////////////////////
////     ADMIN      ////
////////////////////////
router.get(
  "/home",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role !== "admin") {
      return res.redirect("/products");
    }
    // si es admin entra a la parte de edicion
    return res.redirect("/api/sessions/current");
  }
);

export default router;
