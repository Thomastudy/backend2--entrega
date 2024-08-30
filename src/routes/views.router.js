import { Router } from "express";
import { ProductManager } from "../dao/db/product-manager-db.js";
import productModel from "../dao/models/product.model.js";

// instancia para "product manager"
const manager = new ProductManager();
// instalacion router para las rutas
const router = Router();

//Ruta principal donde se vera representado el front
router.get("/products", async (req, res) => {
  let page = req.query.page || 1;
  let limit = 3;

  try {
    const listProducts = await productModel.paginate({}, { limit, page });
    // const products = await manager.getProducts();

    // Puedo recuperar el doc y pasarlo a products
    const listProductsFinal = listProducts.docs.map((products) => {
      const { _id, ...rest } = products.toObject();
      return rest;
    });

    res.render("index", {
      products: listProductsFinal,
      hasPrevPage: listProducts.prevPage,
      hasNextPage: listProducts.nextPage,
      prevPage: listProducts.prevPage,
      nextPage: listProducts.nextPage,
      currentPage: listProducts.page,
      totalPages: listProducts.totalPages,
    });
  } catch (error) {
    res.status(500).send("error en el servidor");
  }
});

// mostrar los productos en timepo rea
// con boton de agregar y eliminar

router.get("/realtimeproducts", async (req, res) => {
  res.render("realtimeproducts");
});

router.get("/", async (req, res) => {
  res.render("mainpage");
});

export default router;
