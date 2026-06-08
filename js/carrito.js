document.addEventListener("DOMContentLoaded", () => {
  validarSesion();
  mostrarMenuUsuario();
  cargarCarrito();
});

function cargarCarrito() {
  const contenedor = document.getElementById("contenedorCarrito");

  try {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
      contenedor.innerHTML = "<p>El carrito está vacío.</p>";
      return;
    }

    let total = 0;

    contenedor.innerHTML = carrito.map(item => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;

      return `
        <div class="card mb-3">
          <div class="card-body">
            <h5>${item.nombre}</h5>
            <p>Precio: $${item.precio}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Subtotal: $${subtotal}</p>
            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${item.id})">
              Eliminar
            </button>
          </div>
        </div>
      `;
    }).join("");

    contenedor.innerHTML += `
      <h4>Total: $${total}</h4>
      <button class="btn btn-success" onclick="finalizarCompra()">Finalizar compra</button>
    `;

  } catch (error) {
    console.error("Error cargando carrito:", error);
    contenedor.innerHTML = "<p>Error al cargar carrito.</p>";
  }
}

function eliminarDelCarrito(idProducto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter(item => item.id !== idProducto);

  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function finalizarCompra() {
  try {
    const usuario = obtenerUsuarioActivo();
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const compras = JSON.parse(localStorage.getItem("compras")) || [];

    if (carrito.length === 0) {
      alert("No puedes comprar con el carrito vacío.");
      return;
    }

    for (const item of carrito) {
      const producto = productos.find(p => p.id === item.id);

      if (!producto || producto.stock < item.cantidad) {
        alert(`No hay stock suficiente para ${item.nombre}.`);
        return;
      }
    }

    carrito.forEach(item => {
      const producto = productos.find(p => p.id === item.id);
      producto.stock -= item.cantidad;
    });

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const nuevaCompra = {
      id: Date.now(),
      usuarioId: usuario.id,
      fecha: new Date().toLocaleString(),
      productos: carrito,
      total
    };

    compras.push(nuevaCompra);

    localStorage.setItem("productos", JSON.stringify(productos));
    localStorage.setItem("compras", JSON.stringify(compras));
    localStorage.setItem("carrito", JSON.stringify([]));

    alert("Pago simulado realizado con éxito.");
    window.location.href = "mis-compras.html";

  } catch (error) {
    console.error("Error finalizando compra:", error);
    alert("No se pudo finalizar la compra.");
  }
}