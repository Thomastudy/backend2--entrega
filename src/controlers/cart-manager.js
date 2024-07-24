import { readFile, writeFile } from "fs/promises";

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
    this.ultId = 0;

    // Cargar los carritos almacenados en el archivo:
    this.cargarCarritos();
  }

  async cargarCarritos() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      this.carts = JSON.parse(data);
      if (this.cargarCarritos.length > 0) {
        // verifico si hay x lo menos un elemento y calculo el ultimo id
        this.ultId = Math.max(...this.carts.map((cart) => cart.id));
      }
    } catch {
      console.log("Error al cargar el carrito");

      // si no existe el carrito lo voy a crear:
      await this.guardarCarritos();
    }
  }

  async guardarCarritos() {
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
  }

  // metodo para crear carrito

  async crearCarrito() {
    const nuevoCarrito = {
      id: ++this.ultId,
      produts: [],
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
    const carrito = await this.getCarritoById(idProducto);
    const existeProducto = carrito.produts.find(
      (p) => p.produts === idProducto
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
