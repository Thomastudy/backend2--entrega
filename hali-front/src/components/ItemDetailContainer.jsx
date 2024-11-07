// import data from "../data/productos.json";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProducts } from "../contexts/ItemContext.jsx";
import { Loader } from "./complements/Loader.jsx";
import axios from "../config/axios.jsx";
import { ItemCount } from "./complements/itemCount.jsx";

export const ItemDetailContainer = (props) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addProductToCart } = useProducts();
  const { id } = useParams();
  

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((result) => {
        const product = result.data.product;
        setProduct(product);
      })
      .catch((error) => {
        alert("Hubo un error al llamar al producto" + error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;

  return (
    <>
      <div className="prod-detail ">
        <div className="prod-detail--img">
          <img
            src={`${product.img}`}
            alt={`=> foto de  ${product.title}`}
            height={200}
          />
        </div>
        <div className="prod-detail--info">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h2>
            <b>${product.price}</b>
          </h2>
          <p>Stock: {product.stock}</p>

          <ItemCount
            stock={product.stock}
            addProduct={(quantity) =>
              addProductToCart(id, quantity, product.stock)
            }
          />
        </div>
      </div>
    </>
  );
};
