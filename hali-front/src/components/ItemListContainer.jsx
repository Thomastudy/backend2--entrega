// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Loader } from "./complements/Loader";
import axios from "../config/axios";
import profileSVG from "../assets/profile.svg";
import { useUser } from "../contexts/UserContext";

export const ItemListContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuth, user } = useUser();

  const { id } = useParams();

  // additem context
  // const { addItem } = useContext(ItemContext);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`/api/products`)
      .then((result) => {
        const products = result.data.products || [];

        const filteredProducts = id
          ? products.filter(
              (product) =>
                product.category.toLowerCase() === id && product.stock >= 1
            )
          : products.sort((a, b) => a.category.localeCompare(b.category));

        setProducts(filteredProducts);
      })
      .catch((error) => {
        alert("Algo salio mal, por favor intente nuevamente " + error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;

  return (
    <>
      {isAuth && (
        <div className="pointer" to="/profile">
          <a href="/profile">
            <img src={profileSVG} height={30} alt="" />{" "}
            <p>¡Hola {user.userName}!</p>
          </a>
        </div>
      )}
      <main className="mainContenedor">
        <div className="contenedor">
          {products.map((i) => (
            <div key={i._id} className="producto">
              <div className="div--producto__imagen">
                <img
                  className="producto__imagen"
                  src={i.img}
                  alt="imagen producto"
                />
              </div>
              <div className="producto__informacion">
                <p className="producto__nombre">{i.title}</p>
                <p className="producto__precio-r">
                  <b>${i.price}</b>
                </p>
                <Link to={`/item/${i._id}`}>
                  <button className="button pointer" title="Pulsa para comprar">
                    Ver producto <i className="fa-regular fa-heart pointer"></i>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
