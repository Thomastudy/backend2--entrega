import { Router } from "express";
import UserModel from "../dao/models/user.model.js";
import jwt from "jsonwebtoken";
import { createHash, isValidPassword } from "../utils/utils.js";
import passport from "passport";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, user, email, birth, password } = req.body;

  try {
    // verificamos si existe

    const existeUsuario = await UserModel.findOne({ user });
    const existeMail = await UserModel.findOne({ email });

    if (existeUsuario || existeMail) {
      return res.status(400).send("El usuario o mail ya existe");
    }

    if (!first_name || !last_name || !user || !email || !birth || !password) {
      console.log("faltan datos");

      return res
        .status(400)
        .send("Completar todos los datos para poder registrarse");
    }
    const nuevoUsuario = new UserModel({
      first_name,
      last_name,
      user,
      email,
      birth,
      password: createHash(password),
      role: "user",
    });
    await nuevoUsuario.save();

    // generar el nuevo token jwt
    const token = jwt.sign({ user: nuevoUsuario.user }, "cr7.suuuuuuu", {
      expiresIn: "1h",
    });

    // lo mandamos con la cookie
    res.cookie("userCookieToken", token, {
      maxAge: 3600000, //1h
      httpOnly: true,
    });

    res.redirect("/api/sessions/home");
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/login", async (req, res) => {
  const { user, password } = req.body;

  try {
    const existeUsuario = await UserModel.findOne({ user });

    if (!existeUsuario) {
      return res.status(401).send("usuario no encontrado");
    }

    if (!isValidPassword(password, existeUsuario)) {
      return res.status(400).send("contrasena incorrecta");
    }

    // generar el nuevo token jwt
    const token = jwt.sign(
      { user: existeUsuario.user, role: existeUsuario.role },
      "cr7.suuuuuuu",
      {
        expiresIn: "1h",
      }
    );

    // lo mandamos con la cookie
    res.cookie("userCookieToken", token, {
      maxAge: 3600000, //1h
      httpOnly: true,
    });
    res.redirect("/api/sessions/home");
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("userCookieToken");
  res.redirect("/login");
});

////////////////////////
////    Current     ////
////////////////////////

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).send("Acceso denegado");
      }
      res.render("mainpage", { user: req.user.user });
    } catch (error) {
      res.status(500).send(`Error interno en el servidor, ${error}`);
    }
  }
);

////////////////////////
////     ADMIN      ////
////////////////////////
router.get(
  "/home",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    if (req.user.role !== "admin") {
      return res.redirect("/products");
    }
    // si es admin entra a la parte de edicion
    return res.redirect("/api/sessions/current");
  }
);

export default router;
