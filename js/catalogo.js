document.addEventListener("DOMContentLoaded", () => {
  validarSesion();
  mostrarMenuUsuario();

  const contenedor = document.getElementById("contenedorProductos");

  try {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    if (productos.length === 0) {
      contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
      return;
    }

    contenedor.innerHTML = productos.map(producto => `
      <div class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="card h-100">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.categoria}</p>
            <p><strong>$${producto.precio}</strong></p>
            <p>Stock: ${producto.stock}</p>
            <button class="btn btn-primary w-100" onclick="agregarAlCarrito(${producto.id})">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    `).join("");

  } catch (error) {
    console.error("Error cargando catálogo:", error);
    contenedor.innerHTML = "<p>Error al cargar productos.</p>";
  }
});

function agregarAlCarrito(idProducto) {
  try {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = productos.find(p => p.id === idProducto);

    if (!producto) {
      alert("Producto no encontrado.");
      return;
    }

    if (producto.stock <= 0) {
      alert("Producto sin stock.");
      return;
    }

    const productoCarrito = carrito.find(p => p.id === idProducto);

    if (productoCarrito) {
      if (productoCarrito.cantidad >= producto.stock) {
        alert("No puedes agregar más unidades que el stock disponible.");
        return;
      }

      productoCarrito.cantidad++;
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito.");

  } catch (error) {
    console.error("Error agregando al carrito:", error);
    alert("No se pudo agregar el producto.");
  }
}