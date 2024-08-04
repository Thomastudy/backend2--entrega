// PRODUCT MANAGER

// IMPORT
import { readFile, writeFile } from "fs/promises";

class ProductManager {
  
  constructor(path) {
    this.products = [];
    this.path = path;
    this.ultId = 0;

    this.cargarProductos().catch((error) =>
      console.error("Error al cargar los productos en el constructor:", error)
    );
  }

  // cargado de los productos en el archivo

  async cargarProductos() {
    try {
      this.products = await this.leerArchivo();

      // Obtener el máximo ID de los productos existentes
      if (this.products.length > 0) {
        // verifico si hay x lo menos un elemento y calculo el ultimo id
        this.ultId = Math.max(...this.products.map((prod) => prod.id));
      }
    } catch (error) {
      console.error("No se han podido cargar los productos");
    }
  }

  async addProduct(title, description, price, img, code, stock, category) {
    // validar que todos los campos estén completos
    if (
      !title ||
      !description ||
      !price ||
      !img ||
      !code ||
      !stock ||
      !category
    ) {
      console.log("Faltan campos");
      return "Todos los campos son obligatorios";
    }

    //Este que el codigo no se repita
    if (this.products.some((item) => item.code === code)) {
      console.log("Este codigo ya es usado por otro producto");
      return "Este codigo ya es usado por otro producto";
    }

    //hace que el id sea autoincrementable
    const nuevoProducto = {
      id: ++this.ultId, // poniendo ++ProductManager.ultId inicia desde el id 1, porque primero aumenta y despues asigna, ProductManager.ultId++ inicia desde el 0
      title,
      description,
      price,
      img,
      code,
      stock: parseInt(stock),
      category,
    };

    // Esto agrega el producto
    this.products.push(nuevoProducto);

    // lo guardamos en el archivo
    await this.guardarArchivo(this.products);

    return nuevoProducto;
  }

  async getProducts() {
    // devuelve el aray con todos los productos creados hasta el momento
    try {
      const arrayProductos = await this.leerArchivo();
      return arrayProductos;
    } catch (error) {
      console.error("Error al obtener los productos del archivo", error);
    }
  }

  async getProductsById(id) {
    // esto va a buscar el product que pertenezca al id que se le soicita

    try {
      const producto = this.products.find((item) => item.id === id);

      if (!producto) {
        console.log("No se encuentra el producto con el id: " + id);
        return null;
      } else {
        console.log(`El producto ${producto.title} encontrado`);
        return producto;
      }
    } catch (error) {
      console.error("Error al buscar el producto con el id solicitado", error);
    }
  }

  async leerArchivo() {
    const respuesta = await readFile(this.path, "utf-8");
    const arrayProductos = JSON.parse(respuesta);
    return arrayProductos;
  }

  async guardarArchivo(arrayProductos) {
    await writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
  }
}

export { ProductManager };