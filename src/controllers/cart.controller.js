import cartService from "../services/cart.service.js";
import productService from "../services/product.service.js";

class CartController {
  async createCart(req, res) {
    try {
      const newCart = await cartService.createCart();

      if (!newCart)
        return res
          .status(400)
          .json({ message: "Error en la creacion del nuevo carrito" });

      // res.status(201).json({ message: "Success" });
      return newCart;
    } catch (error) {
      res.status(500).send(`Error en el server: ${error}`);
    }
  }
  async getCartById(req, res) {
    const { cid } = req.params;
    try {
      const cart = cartService.getCartById(cid);
      if (!cart)
        return res
          .status(404)
          .json({ message: "Error al encontrar el carrito" });
      return res.send(cart);
    } catch (error) {
      res.status(500).send(`Error en el server: ${error}`);
    }
  }

  async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;
    try {
      const cart = await cartService.getCartById(cid);
      if (!cart)
        return res
          .status(404)
          .json({ message: "Error al encontrar el carrito" });

      const product = await productService.getProductById(pid);
      if (!product)
        return res
          .status(404)
          .json({ message: "Error al encontrar el producto" });

      const productInCart = await cart.products.find(
        (item) => item.product._id.toString() === pid
      );
      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        cart.products.push({ product: pid, quantity });
      }

      await cartService.updateCart(cid, cart);

      res.json({ message: "Success" });
    } catch (error) {
      res.status(500).send(`Error en el server: ${error}`);
    }
  }

  async getProductsFromCart(req, res) {}

  /**
   * empty Cart
   */

  async emptyCart(req, res) {
    const { cid } = req.params;

    try {
      const cart = await cartService.getCartById(cid);
      if (!cart)
        return res
          .status(404)
          .json({ message: "Error al encontrar el carrito" });

      cart.products = [];
      cartService.updateCart(cid, cart);
      console.log(cart);
      res.status(201).json({ message: "Success" });
    } catch (error) {
      res.status(500).send(`Error en el server: ${error}`);
    }
  }

  async deleteCart(req, res) {
    const { cid } = req.params;
    try {
      const deletedCart = await cartService.deleteById(cid);
      if (!deletedCart)
        return res
          .status(404)
          .json({ message: "Error al encontrar el carrito" });
      res.json({ message: "Success" });
    } catch (error) {
      res.status(500).send(`Error en el server: ${error}`);
    }
  }

  async purchase(req, res) {
    const { cid } = req.params;
    try {
      //getcart
      const cart = await cartService.getCartById(cid);
      if (!cart)
        return res
          .status(404)
          .json({ message: "Error al encontrar el carrito" });

      //getproduct

      const productArray = await Promise.all(
        cart.products.map(async (item) => {
          const productDetail = await productService.getProductById(
            item.product._id
          );
          return {
            product: item.product._id,
            productDetail,
            quantity: item.quantity,
          };
        })
      );

      console.log(productArray);
      // corroborar stock
      //no. rechazo compra
      //si. continuo
      // create ticket
      // send mail
      // emptyCart
    } catch (error) {
      console.error("error al conectar con el servidor " + error);
      res.status(500).send(`Error en el server: ${error}`);
    }
  }
}

export default new CartController();
