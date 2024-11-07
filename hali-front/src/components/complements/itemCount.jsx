import { useState } from "react";
import { logInAlert } from "./Session";
import { useUser } from "../../contexts/UserContext";
import { Loader } from "./Loader";
import { alertSimple } from "../utils/alerts";

export const ItemCount = ({ stock, addProduct }) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const { isAuth, checkAuthStatus } = useUser();

  const handleIncrease = () => {
    if (count < stock) {
      setCount((prev) => prev + 1);
    }
  };
  const handleDecrease = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };
  const handleAdd = async () => {
    if (isAuth === false) {
      logInAlert(checkAuthStatus);

      return;
    }
    setLoading(true);

    const agregado = await addProduct(count);
    if (agregado) {
      alertSimple("Agregado al carrtiro");
      setCount(1);
    }
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="item--count">
        {count > 1 ? (
          <button className="btn--decrease" onClick={handleDecrease}>
            -
          </button>
        ) : (
          <button className="btn--disabled">-</button>
        )}
        <span>{count}</span>
        {count < stock ? (
          <button className="btn--increase" onClick={handleIncrease}>
            +
          </button>
        ) : (
          <button className="btn--disabled">+</button>
        )}
        <br />
        <button className="btn--add" onClick={handleAdd}>
          Comprar
        </button>
      </div>
    </>
  );
};
