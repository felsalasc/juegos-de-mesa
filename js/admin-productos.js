document.addEventListener("DOMContentLoaded", () => {
  validarAdmin();
  mostrarMenuUsuario();
  cargarProductosAdmin();
});

function cargarProductosAdmin() {
  const contenedor = document.getElementById("tablaProductos");

  try {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    contenedor.innerHTML = productos.map(producto => `
      <tr>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>$${producto.precio}</td>
        <td>${producto.stock}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarProducto(${producto.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        </td>
      </tr>
    `).join("");

  } catch (error) {
    console.error("Error cargando productos admin:", error);
  }
}

const formProducto = document.getElementById("formProducto");

if (formProducto) {
  formProducto.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
      const idProducto = document.getElementById("idProducto").value;
      const nombre = document.getElementById("nombre").value.trim();
      const categoria = document.getElementById("categoria").value.trim();
      const precio = Number(document.getElementById("precio").value);
      const stock = Number(document.getElementById("stock").value);
      const imagen = document.getElementById("imagen").value.trim();

      if (!nombre || !categoria || !precio || stock < 0 || !imagen) {
        alert("Debes completar correctamente todos los campos.");
        return;
      }

      let productos = JSON.parse(localStorage.getItem("productos")) || [];

      if (idProducto) {
        productos = productos.map(p => {
          if (p.id === Number(idProducto)) {
            return {
              ...p,
              nombre,
              categoria,
              precio,
              stock,
              imagen
            };
          }

          return p;
        });

        alert("Producto actualizado.");
      } else {
        const nuevoProducto = {
          id: Date.now(),
          nombre,
          categoria,
          precio,
          stock,
          imagen
        };

        productos.push(nuevoProducto);
        alert("Producto creado.");
      }

      localStorage.setItem("productos", JSON.stringify(productos));
      formProducto.reset();
      document.getElementById("idProducto").value = "";
      cargarProductosAdmin();

    } catch (error) {
      console.error("Error guardando producto:", error);
      alert("No se pudo guardar el producto.");
    }
  });
}

function editarProducto(id) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const producto = productos.find(p => p.id === id);

  if (!producto) return;

  document.getElementById("idProducto").value = producto.id;
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("categoria").value = producto.categoria;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("stock").value = producto.stock;
  document.getElementById("imagen").value = producto.imagen;
}

function eliminarProducto(id) {
  if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  productos = productos.filter(p => p.id !== id);

  localStorage.setItem("productos", JSON.stringify(productos));
  cargarProductosAdmin();
}