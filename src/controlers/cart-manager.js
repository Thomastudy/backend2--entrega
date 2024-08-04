import { readFile, writeFile } from "fs/promises";

// CartManager es la clase principal que va a ser llamada desde la app.js
class CartManager {

  // constructor
  constructor(path) {
    this.path = path;
    this.carts = [];
    this.ultId = 0;

    // Cargar los carritos almacenados en el archivo:
    this.cargarCarritos().catch(error => console.error("Error al cargar los carritos en el constructor:", error));

  }
  async cargarCarritos() {
    try {

      const data = await readFile(this.path, "utf-8");
      this.carts = JSON.parse(data);
      
      // console.log("Datos del archivo cargados:", this.carts); // para controlar que se cargue bien
      if (this.carts.length > 0) {
        // verifico si hay x lo menos un elemento y calculo el ultimo id
        this.ultId = Math.max(...this.carts.map((cart) => cart.id));
      }
      return this.carts
    } catch {
      console.log("Error al cargar el carrito");

      // si no existe el carrito lo voy a crear:
      await this.guardarCarritos();
    }
  }

  async guardarCarritos() {
    await writeFile(this.path, JSON.stringify(this.carts, null, 2));
  }

  // metodo para crear carrito

  async crearCarrito() {
    const nuevoCarrito = {
      id: ++this.ultId,
      products: [],
    };

    // con este metodo metemos al array
    this.carts.push(nuevoCarrito);

    //Guaradmos el array en el archivo
    await this.guardarCarritos();
    return nuevoCarrito;
  }

  async getCarritoById(idCarrito) {
    try {
      const carritoBusado = this.carts.find(
        (carrito) => carrito.id === idCarrito
      );

      if (!carritoBusado) {
        throw new Error("No existe un carrito con ese id");
      }

      return carritoBusado;
    } catch (error) {
      console.log("Eror al obtener el carrito por id");
      throw error;
    }
  }

  async agregarProductoAlCarrito(idCarrito, idProducto, quantity = 1) {
    const carrito = await this.getCarritoById(idCarrito);
    const existeProducto = carrito.products.find(
      (p) => p.product === idProducto
    );

    if (existeProducto) {
      existeProducto.quantity += quantity;
    } else {
      carrito.products.push({ product: idProducto, quantity });
    }

    await this.guardarCarritos();
    return carrito;
  }


}

export { CartManager };
