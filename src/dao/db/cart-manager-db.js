import CartModel from "../models/cart.model.js";

CartModel;

// CartManager es la clase principal que va a ser llamada desde la app.js
class CartManager {
  // metodo para crear carrito

  async getCarts() {
    try {
      const carts = await CartModel.find();
      return carts;
    } catch (error) {
      console.error("Error al crear carrito de compras");
    }
  }
  
  async newCart() {
    try {
      const nuevoCarrito = new CartModel({ products: [] });
      await nuevoCarrito.save();
      return nuevoCarrito;
    } catch (error) {
      console.error("Error al crear carrito de compras");
    }
  }

  async getCartById(idCarrito) {
    try {
      const carrito = await CartModel.findById(idCarrito);
      if (!carrito) {
        throw new Error("No existe un carrito con ese id");
      }
      return carrito;
    } catch (error) {
      console.log("Eror al obtener el carrito por id");
      throw error;
    }
  }

  async addProdToCart(idCarrito, idProducto, quantity = 1) {
    try {
      const carrito = await this.getCartById(idCarrito);
      const existeProducto = carrito.products.find(
        (p) => p.product.toString() === idProducto
      );

      if (existeProducto) {
        existeProducto.quantity += quantity;
      } else {
        carrito.products.push({ product: idProducto, quantity });
      }

      // marcar la propiedad "products" como modificada antes de guardar
      carrito.markModified("products");
      await carrito.save();
      return carrito;
    } catch (error) {
      console.log("Eror al agregar un producto : ", error);
    }
  }

  async deleteCartById(idCarrito) {
    try {
      // Buscar la ubicación del carrito en el array de carritos
      const indexCart = this.carts.findIndex(
        (carrito) => carrito.id === idCarrito
      );

      // Si no hay ningún carrito con el id solicitado, lanzar un error
      if (indexCart !== -1) {
        // Eliminar el carrito del array
        this.carts.splice(indexCart, 1);
        await this.guardarCarritos();

        // return tue para que sea un resultado booleano para que el ruter vea que se cumple con el objetivo
        return true;
      } else {
        throw new Error("No existe un carrito con ese id");
      }

      // Guardar los cambios
    } catch (error) {
      console.error("Error al eliminar el carrito:", error);
      throw error;
    }
  }
}

export { CartManager };
