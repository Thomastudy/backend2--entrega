import CartModel from "../models/cart.model.js";

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

  // AGREGAR

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

  // ELIMINAR

  async delProdsFromCart(cartId) {
    try {
      await CartModel.updateOne({ _id: cartId }, { $set: { products: [] } });
      return `Carrito con el id ${cartId} vaciado correctamente`;
    } catch (error) {
      console.log("Eror al vaciar el carrito: ", error);
    }
  }

  async delProdFromCartById(idCarrito, idProducto) {
    try {
      const carrito = await this.getCartById(idCarrito);
      const indexProducto = carrito.products.findIndex(
        (p) => p.product.toString() === idProducto
      );

      if (indexProducto !== -1) {
        carrito.products.splice(indexProducto, 1);
      } else {
        throw new Error("No existe un producto con ese id en este carrito");
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
      // Buscar la ubicación y eliminar el carrito en el array de carritos
      const deletedCart = await CartModel.findByIdAndDelete(idCarrito);

      // Si no hay ningún carrito eliminado, lanzar un error
      if (!deletedCart) {
        console.log(`No se encontró un carrito con el ID: ${idCarrito}`);
        throw new Error("No existe un carrito con ese id");
      } else {
        return deletedCart;
      }

      // Guardar los cambios
    } catch (error) {
      console.error("Error al eliminar el carrito:", error);
      throw error;
    }
  }

  // ACTUALIZAR

  async updateStockById(idCarrito, idProducto, quantity) {
    try {
      const carrito = await this.getCartById(idCarrito);
      const existeProducto = carrito.products.find(
        (p) => p.product.toString() === idProducto
      );

      if (!existeProducto) {
        console.log(`No se encontró un producto con el ID: ${idproducto}`);
        throw new Error("No existe un producto con ese id");
      }

      existeProducto.quantity = quantity;

      // marcar la propiedad "products" como modificada antes de guardar
      carrito.markModified("products");
      await carrito.save();
      return carrito;
    } catch (error) {
      console.log("Eror al actualizar un producto : ", error);
    }
  }
}

export { CartManager };
