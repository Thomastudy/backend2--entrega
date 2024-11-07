import { useState } from "react";

const initialValues = {
  title: "",
  description: "",
  category: "aritos",
  img: null,
  stock: "",
  price: "",
};

export const AdminPage = () => {
  const [newProduct, setNewProduct] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const addProduct = async () => {
    setLoading(true);
    if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.category ||
      !newProduct.img ||
      !newProduct.stock ||
      !newProduct.price
    ) {
      Swal.fire({
        title: "Datos incompletos",
        text: "Por favor, complete todos los campos del formulario.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `products/${newProduct.img.name}`);

      await uploadBytes(storageRef, newProduct.img);

      const imgURL = await getDownloadURL(storageRef);

      const db = getFirestore();
      const productsColection = collection(db, "products");

      const fullNewProducts = { ...newProduct, img: imgURL };

      console.log(fullNewProducts);
      addDoc(productsColection, fullNewProducts)
        .then(() => setLoading(false))
        .then(productoAgregado)
        .finally(() => {
          setNewProduct(initialValues);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (ev) => {
    const file = ev.target.files[0]; // Obtiene el archivo seleccionado
    setNewProduct((prev) => ({
      ...prev,
      img: file, // Almacena el archivo en el estado
    }));
  };

  const productoAgregado = () => {
    Swal.fire({
      position: "top-end",
      // icon: "success",
      title: "Producto agregado correctamente",
      showConfirmButton: false,
      timer: 800,
    });
  };

  if (loading)
    return (
      <div id="loader">
        <div id="box"></div>
        <div id="shadow"></div>
      </div>
    );

  return (
    <>
      <form action="" className="form--compra">
        <h1>AGREGAR PRODUCTOS</h1>
        <a href="/">Volver al inicio</a>
        <div className="form--div">
          <div>
            <input
              placeholder=""
              className="form--input"
              required
              value={newProduct.title}
              name="title"
              type="text"
              onChange={handleChange}
            />
            <label className="form--label">title:</label>
          </div>
          <div>
            <input
              placeholder=""
              className="form--input"
              required
              value={newProduct.description}
              name="description"
              type="text"
              onChange={handleChange}
            />
            <label className="form--label">description:</label>
          </div>
          <div>
            <select
              // class="form--input"
              onChange={handleChange}
              value={newProduct.category}
              name="category"
            >
              <option value="aritos">Aritos</option>
              <option value="collares">Collares</option>
              <option value="pulseras">Pulseras</option>
            </select>
            <label className="form--label">category:</label>
          </div>
          <div>
            <input
              placeholder=""
              className="form--input"
              required
              name="img"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label className="form--label">img:</label>
          </div>
          <div>
            <input
              placeholder=""
              className="form--input"
              required
              value={newProduct.stock}
              name="stock"
              type="text"
              onChange={handleChange}
            />
            <label className="form--label">stock:</label>
          </div>
          <div>
            <input
              placeholder=""
              className="form--input"
              required
              value={newProduct.price}
              name="price"
              type="text"
              onChange={handleChange}
            />
            <label className="form--label">price:</label>
          </div>
          <button
            type="button"
            className=" btnComprar button"
            onClick={addProduct}
          >
            Agregar producto
          </button>
        </div>
      </form>
    </>
  );
};
