// import { ItemContext } from "../contexts/ItemContext";
import { Link } from "react-router-dom";

import Cart from "../../assets/shopbag.svg";
import { useUser } from "../../contexts/UserContext";
import { logInAlert } from "./Session";
import { useEffect } from "react";
import { useProducts } from "../../contexts/ItemContext";
import { alertSimple } from "../utils/alerts";

export const CartWidget = () => {
  const { productList, cartLength } = useProducts();
  const { isAuth, user, checkAuthStatus } = useUser();

  // se ejecuta la busqueda de productos
  useEffect(() => {
    if (isAuth) {
    }
  }, [isAuth]);

  return (
    <>
      {isAuth === true ? (
        cartLength > 0 ? (
          /** falta agregar uno de cantidad = 0 (carritovacio) */
          <Link to={"/cart"}>
            <div className="imgCarro" id="imgCarro">
              <img src={Cart} className="pointer carrito" alt="carrito" />
              <span className="pContador">{cartLength}</span>
            </div>
          </Link>
        ) : (
          <div className="imgCarro" id="imgCarro">
            <img
              src={Cart}
              className="pointer carrito"
              alt="carrito"
              onClick={() => alertSimple("El carrito se encuentra vacio")}
            />
          </div>
        )
      ) : (
        <div className="imgCarro" id="imgCarro">
          <img
            src={Cart}
            className="pointer carrito"
            alt="carrito"
            onClick={() => logInAlert(checkAuthStatus)}
          />
        </div>
      )}
    </>
  );
};
