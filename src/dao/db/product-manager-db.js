import productModel from "../models/product.model.js";

// PRODUCT MANAGER

class ProductManager {
  // cargado de los productos en el archivo

  async addProduct({ title, description, price, img, code, stock, category }) {
    try {
      // validar extra de seguridad para que todos los campos estén completos

      const existeCodigo = await productModel.findOne({ code: code });

      if (existeCodigo) {
        console.error("El codigo ya existe y no debe repetirse");
        return;
      }
      if (price < 1 || stock < 0) {
        console.error("Los valores no deben ser menores a cero (0)");
        return;
      }

      //hace que el id sea autoincrementable
      const nuevoProducto = new productModel({
        title,
        description,
        price: parseInt(price),
        img,
        code,
        stock: parseInt(stock),
        category,
      });

      // Esto guarda el producto
      await nuevoProducto.save();
      return nuevoProducto;
    } catch (error) {
      console.error("Error al intentar agregar un producto", error);
    }
  }

  async getProducts() {
    // devuelve el aray con todos los productos creados hasta el momento
    try {
      const arrayProductos = await productModel.find().lean();
      return arrayProductos;
    } catch (error) {
      console.error("Error al obtener los productos del archivo", error);
    }
  }

  async getProductsById(id) {
    // esto va a buscar el product que pertenezca al id que se le soicita

    try {
      const productoBuscado = await productModel.findById(id);

      if (!productoBuscado) {
        console.error(`Producto con el id ${id} no encontrado`);
        return null;
      }
      console.log("Producto encontrado: ", productoBuscado);
      return productoBuscado;
    } catch (error) {
      console.error("Error al buscar el producto con el id solicitado", error);
    }
  }

  // metodos para actualizar productos
  async updateProducts(id, productosActualizado) {
    try {
      const updated = await productModel.findByIdAndUpdate(
        id,
        productosActualizado
      );
      if (!updated) {
        console.error(`Producto con el id ${id} no encontrado`);
        return null;
      }
      return updated;
    } catch (error) {
      console.error(
        "Error al actualizar el producto con el id solicitado",
        error
      );
    }
  }

  // metodo para eliminar productos
  async deleteProductById(idProducto) {
    try {
      const deleted = await productModel.findByIdAndDelete(idProducto);
      if (!deleted) {
        console.error(`Producto con el id ${id} no encontrado`);
        return null;
      }
      return deleted;
    } catch (error) {
      console.error(
        "Error al eliminar el producto con el id solicitado",
        error
      );
    }
  }

  async updateProductStock({ idProducto, stock }) {
    try {
      const updated = await productModel.findByIdAndUpdate(
        idProducto,
        { $set: { stock: stock } },
        { new: true }
      );
      if (!updated) {
        console.error(`Producto con el id ${idProducto} no encontrado`);
        return null;
      }
      return updated;
    } catch (error) {
      console.error(
        "Error al actualizar el producto con el id solicitado",
        error
      );
    }
  }
}

export { ProductManager };
