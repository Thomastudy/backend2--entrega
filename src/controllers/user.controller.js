//externos
import jwt from "jsonwebtoken";
//internos
import UserDTO from "../dto/user.dto.js";
import userService from "../services/user.service.js";
import cartController from "./cart.controller.js";

const normalice = (word) => {
  const lower = word.trim().toLowerCase();
  const firsLetterUpper = lower[0].toUpperCase() + lower.slice(1);
  return firsLetterUpper;
};

class UserController {
  async register(req, res) {
    const { first_name, last_name, userName, email, birth, password } =
      req.body;
    try {
      const nuevoCarrito = await cartController.createCart();
      if (!nuevoCarrito)
        res
          .status(404)
          .json({ message: "Error en la creacion del nuevo carrito" });

      const nuevoUsuario = await userService.registerUser({
        first_name: normalice(first_name),
        last_name: normalice(last_name),
        userName: userName.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        birth,
        password,
        role: "user",
        cartID: nuevoCarrito._id,
      });
      // generar el nuevo token jwt
      const token = jwt.sign(
        {
          userName: nuevoUsuario.userName,
          role: nuevoUsuario.role,
          cartID: nuevoUsuario.cartID,
        },
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
      res.status(500).send("Error interno del servidor, " + error);
    }
  }

  async logIn(req, res) {
    const { userName, password } = req.body;

    try {
      const userNameFixed = userName.toLowerCase().trim();
      const user = await userService.loginUser(userNameFixed, password);

      if (!user) {
        return res.status(401).send("Usuario o contraseña incorrectos");
      }

      const token = jwt.sign(
        {
          userName: user.userName,
          email: user.email,
          role: user.role,
          cartID: user.cartID,
        },
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
      res.status(500).send("Error interno del servidorrrrrrrrrrr " + error);
    }
  }
  async current(req, res) {
    try {
      if (req.user) {
        const user = req.user;
        const userDTO = new UserDTO(user);
        res.render("mainpage", { user: userDTO });
      } else {
        res.status(403).send("Acceso denegado");
      }
    } catch (error) {
      res.status(500).send(`Error interno en el servidor, ${error}`);
    }
  }
  async logOut(req, res) {
    res.clearCookie("userCookieToken");
    res.redirect("/login");
  }
}

export default UserController;
