import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import axios from "../config/axios";
import { alertIcon } from "../components/utils/alerts";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const { user, isAuth } = useUser();
  const [itemList, setItemList] = useState([]);
  const [cartLength, setCartLength] = useState(0);

  const cartID = user.cartID;
  useEffect(() => {
    if (isAuth) {
      getProductsFromCart();
    }
  }, [isAuth]);

  // EXTRAE LA DATA DE EL CART
  const getProductsFromCart = async () => {
    await axios
      .get(`api/carts/${cartID}`, { withCredentials: true })
      .then((response) => {
        setItemList(response.data.cart.products);

        setCartLength(totalItemCount(response.data.cart.products));
      })
      .catch("Error al conseguir los productos del carrito");
  };

  // CONTADOR DE ITEMS
  const totalItemCount = (item) => {
    return item.reduce((total, i) => total + i.quantity, 0);
  };

  // AGREGA LOS PRODUCTOS AL CARRITO
  const addProductToCart = async (pID, quantity, stock) => {
    const productData = itemList.find((i) => i.product._id === pID);

    try {
      if (productData) {
        if (productData.quantity + quantity > stock) {
          return alertIcon("No hay mas stock", "error", 900);
        }
      }
      const response = await axios.post(
        `api/carts/${cartID}/product/${pID}`,
        {
          quantity: quantity,
        },
        { withCredentials: true }
      );
      if (response.data.message === "Success") {
        getProductsFromCart();

        return true;
      } else {
        ("mal ahi flaco");
      }
    } catch (error) {
      console.log("error brutal " + error);
    }
  };

  return (
    <ItemContext.Provider
      value={{
        itemList,
        setItemList,
        cartLength,
        addProductToCart,
        getProductsFromCart,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useProducts = () => useContext(ItemContext);
