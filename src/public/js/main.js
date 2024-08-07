// primero crear instancia de socket.io
const socket = io();

// escuchar evento "products" de app.js y recibir array
socket.on("products", (data) => {
  renderProducts(data);
  console.log(data);
});

const renderProducts = (products) => {
  //traer el div container de realtimeproducts.handlebars
  const containerProducts = document.getElementById("containerProducts");

  // vaciamosd para que al eliminar productos y renderizar no se repitan
  containerProducts.innerHTML = "";

  // para cada producto creamos un div llamado card en el cual se vera representado cada producto con sus caracteristicas
  products.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
                    <h2>${item.title}</h2>
                    <p>ID: ${item.id}</p>
                    <p>Stock: ${item.stock}</p>
                    <button id="+">+</button><button> - </button>
                    <p>${item.price}</p>
                    <button id="delete">eliminar</button>`;

    containerProducts.appendChild(card);

    // card.querySelector("#+").addEventListener("click", () => {
      // (item.stock+1)});
    card.querySelector("#delete").addEventListener("click", () => {
      eliminarProducto(item.id);
    });
  });
};

const eliminarProducto = (id) => {
  socket.emit("eliminarProducto", id);
};
