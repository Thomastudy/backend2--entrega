// PRODUCT MANAGER

// IMPORT
import { readFile, writeFile } from "fs/promises";

class ProductManager {
  static ultId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;

    this.cargarProductos().catch(error => console.error("Error al cargar los productos en el constructor:", error));
  }

  // cargado de los productos en el archivo 

  async cargarProductos(){
    try{
      this.products = await this.leerArchivo()
    }catch(error){
      console.error("No se han podido cargar los productos");
    }
  }

  async addProduct(title, description, price, img, code, stock, category) {
    // agregar productos a la lista de productos

    // Esto valida que el campo este comleto
    if (
      (!title || !description || !price || !img || !code || !stock, !category)
    ) {

      console.log("Faltan campos")
      return("Todos los campos son obligatorios");
    }

    //Este que el codigo no se repita
    if (this.products.some((item) => item.code === code)) {
      console.log("Este codigo ya es usado por otro producto");
      return;
    }

    //hace que el id sea autoincrementable
    const nuevoProducto = {
      id: ++ProductManager.ultId, // poniendo ++ProductManager.ultId inicia desde el id 1, porque primero aumenta y despues asigna, ProductManager.ultId++ inicia desde el 0
      title,
      description,
      price,
      img,
      code,
      stock,
      category,
    };

    // Esto agrega el producto
    this.products.push(nuevoProducto);

    // lo guardamos en el archivo
    await this.guardarArchivo(this.products);
  }

  async getProducts() {
    // devuelve el aray con todos los productos creados hasta el momento
    try{
      const arrayProductos = await this.leerArchivo()
      return arrayProductos

    }catch(error){
      console.error("Error al obtener los productos del archivo", error);
    }
  }

  async getProductsById(id) {
    // esto va a buscar el product que pertenezca al id que se le soicita

    try{  const producto = this.products.find((item) => item.id === id);

      if (!producto) {
        console.log("No se encuentra el producto con el id: " + id);
        return null
      } else {
        console.log(`El producto ${producto.title} encontrado`);
        return producto
      }}catch(error){
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

// cada producto que se cree debe tener: titulo, descripcion, precio, codigo, stock

////////////////////////////////////////////////////////////////////

// // TESTING:

// // debe devolver array vacio
// console.log(manager.getProducts());

// // aca se llama al metodo "addProduct" con campos para rellenar
// // title,
// // description,
// // price,
// // img,
// // code,
// // stock
// // Agrego primer producto
// manager.addProduct(
//   "producto de prueba",
//   "este es el prodcuto de prueba",
//   200,
//   "sin imagen",
//   "abc123",
//   25
// );

// // Agrego un nuevo poducto para probar como funcions
// manager.addProduct(
//   "Segundo producto de prueba",
//   "este es el segundo prodcuto prueba",
//   450,
//   "sin imagen",
//   "abc124",
//   12
// );

// // // Sin un dato: deberia devolver error
// // manager.addProducts("falta un dato", "este es un producto sin un dato", 628, "sin imagen", "abc124")

// // con el mismo id
// // manager.addProduct("mismo Id", "este es un producto con midmo id", 820, "sin imagen", "abc124", 46)

// // console.log(manager.getProducts())

// // probar getProductById
// // camino feliz
// manager.getProductsById(2);

// // // camino fallado
// // manager.getProductsById(6);
