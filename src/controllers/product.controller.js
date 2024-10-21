import productService from "../services/product.service.js";

class ProductController {
  async getProducts(req, res) {
    const { limit = 10, page = 1, sort, query } = req.body;
    try {
      const products = await productService.getProducts({
        limit,
        page,
        sort,
        query,
      });
      res.json(products);
    } catch (error) {
      res.status(500).send(`Error en el server: ${error}`);
    }
  }
  async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await productService.getProductById(id);
      if (!product) return res.status(404).send("Producto no encontrado");
      res.json(product);
    } catch (error) {
      res.status(500).send(`Error en el server: ${error}`);
    }
  }
  async createProduct(req, res) {
    const { title, description, price, img, code, stock, category } = req.body;
    try {
      if (
        !title ||
        !description ||
        !price ||
        !img ||
        !code ||
        !stock ||
        !category
      )
        return res.send("Faltan datos");
      const newProduct = await productService.save(req.body);
      res.send(`Producto ${title} agregado correctamente`);
    } catch (error) {
      res.status(500).send(`Error en el server: ${error}`);
    }
  }
  async updateProduct(req, res) {
    const { id } = req.params;
    try {
      const updateProduct = await productService.updateProduct(id, req.body);
      if (!updateProduct) return res.status(404).send("producto no encontrado");
      res.json({ message: "Producto modificado exitosamente!" });
    } catch (error) {
      res.status(500).send(`Error en el server: ${error}`);
    }
  }
  async deleteProductById(req, res) {
    const { id } = req.params;
    try {
      const deleteProduct = await productService.deleteById(id);
      if (!deleteProduct) return res.status(404).send("producto no encontrado");
      res.json({ message: "Producto eliminado exitosamente!" });
    } catch (error) {
      res.status(500).send(`Error en el server: ${error}`);
    }
  }
}

export default new ProductController();
