import { useEffect, useState } from "react";
// import { ItemContext } from "../contexts/ItemContext";
import { json, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import axios from "../config/axios";
import { Loader } from "./complements/Loader";
import { useProducts } from "../contexts/ItemContext";
import { alertButton, alertIcon, alertSimple } from "./utils/alerts";

export const Cart = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const { user, isAuth } = useUser();
  const { getProductsFromCart, cartLength, itemList, setItemList } =
    useProducts();

  const cartID = user.cartID;
  if (!isAuth) return navigate("/");

  // se ejecuta la busqueda de productos
  useEffect(() => {
    getProductsFromCart();
  }, []);

  //para cargar los productos
  useEffect(() => {
    if (cartLength > 0) {
      listProducts();
    } else {
      navigate("/");
    }
  }, [itemList]);

  // EXTRAE LA DATA DE LOS PRODUCTOS QUE ESTAN DENTRO DEL CART
  const listProducts = async () => {
    const totalProductsList = await Promise.all(
      itemList.map(async (item) => {
        const getProduct = await axios.get(`api/products/${item.product._id}`, {
          withCredentials: true,
        });
        const product = getProduct.data.product;
        const quantity = item.quantity;

        return { ...product, quantity };
      })
    );
    setProducts(totalProductsList);
    setLoading(false);
  };

  // CALCULA TOTAL DE LA COMPRA
  const totalPurchase = () => {
    return products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  //  ELIMINAR PRODUCTOS DE LA LISTA
  const delProductFromCart = async (pID) => {
    try {
      const response = await axios.delete(`api/carts/${cartID}/del/${pID}`, {
        withCredentials: true,
      });
      await getProductsFromCart();

      if (response.status === 200) alertSimple("Producto eliminado");
    } catch (error) {
      console.log("Error brutal: " + error);
    }
  };

  /* //////////////////
  BOTONES
  ////////////////// */

  // VACIAR CARRITO
  const emptyCart = async () => {
    try {
      const response = await axios.delete(`api/carts/empty/${cartID}`, {
        withCredentials: true,
      });

      if (response.data.message === "Success") {
        alertSimple("Carrito vaciado");
        await getProductsFromCart();
        navigate("/");
      } else {
        console.error("error fatal al vaciar carrito");
      }
      return;
    } catch (error) {
      console.error("Error fatal al vaciar carrito", error);
    }
  };

  //Finalizar compra
  const purhase = async () => {
    setLoading(true);
    try {
      const confirmPurchase = await alertButton(
        "¿Confirmar compra?",
        true,
        true
      );

      if (confirmPurchase) {
        const response = await axios.post(
          `api/carts/${cartID}/purchase`,
          {},
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setItemList([]);
          navigate("/");
          alertButton(
            "¡¡Gracias por su compra!!",
            true,
            false,
            "<p>Nos contactaremos via mail para coordinar el pago y el envio. <p/>",
            "success"
          );
        }
      }
    } catch (error) {
      console.log("error terrible al comprar: " + error);
    }
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="contenedorCheckOut">
        {/* "/empty/:cid" */}
        <button className="button" onClick={emptyCart}>
          Vaciar carrito
        </button>
        {products.map((product) => {
          return (
            <div key={product._id} className="listado">
              <img
                className="producto__imagen"
                src={`${product.img}`}
                alt={`=> foto de  ${product.title}`}
                height={200}
              />
              <div className="checkout--info-btn">
                <div className="checkout--listado--info">
                  <h3>{product.title}</h3>
                  <h3>${product.price}</h3>
                  <p>Cantidad: {product.quantity}</p>
                </div>
                <button
                  className="boton-eliminar"
                  onClick={() => delProductFromCart(product._id)}
                >
                  ⛔️
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="total--compra">
        <p>Total: ${totalPurchase()}</p>
      </div>
      <form action="" className="form--compra">
        <button type="button" className="button" onClick={() => purhase()}>
          Comprar
        </button>

        {/* {isModalOpen && (
          <div className="form--div">
            <h2>Finalizar compra</h2>
            <div>
              <input
                placeholder=""
                className="form--input"
                required
                value={buyer.name}
                name="name"
                type="text"
                onChange={handleChange}
              />
              <label className="form--label">Nombre:</label>
            </div>
            <div>
              <input
                placeholder=""
                className="form--input"
                required
                value={buyer.email}
                name="email"
                type="email"
                onChange={handleChange}
              />
              <label className="form--label">Email:</label>
            </div>
            <div>
              <input
                placeholder=""
                className="form--input"
                required
                value={buyer.phone}
                name="phone"
                type="tel"
                onChange={handleChange}
              />
              <label className="form--label">Telefono:</label>
            </div>
            <button
              type="button"
              className="btnComprar button"
              onClick={sendOrder}
            >
              Finalizar compra
            </button>
          </div>
        )} */}
      </form>
    </>
  );
};
