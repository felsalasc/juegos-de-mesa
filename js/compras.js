document.addEventListener("DOMContentLoaded", () => {
  const usuario = validarSesion();
  mostrarMenuUsuario();

  const contenedor = document.getElementById("contenedorCompras");

  try {
    const compras = JSON.parse(localStorage.getItem("compras")) || [];
    const comprasUsuario = compras.filter(c => c.usuarioId === usuario.id);

    if (comprasUsuario.length === 0) {
      contenedor.innerHTML = `
        <div class="alert alert-info">
          Aún no tienes compras registradas.
        </div>
      `;
      return;
    }

    contenedor.innerHTML = comprasUsuario.map(compra => `
      <div class="card mb-4">
        <div class="card-body">
          <div class="d-flex justify-content-between flex-wrap gap-2 mb-3">
            <div>
              <h5 class="card-title mb-1">Compra #${compra.id}</h5>
              <p class="text-muted mb-0">Fecha: ${compra.fecha}</p>
            </div>

            <div class="text-end">
              <span class="badge bg-success fs-6">Pagado</span>
              <h5 class="mt-2 mb-0">$${compra.total}</h5>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-bordered align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${compra.productos.map(p => `
                  <tr>
                    <td>${p.nombre}</td>
                    <td>${p.cantidad}</td>
                    <td>$${p.precio}</td>
                    <td>$${p.precio * p.cantidad}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `).join("");

  } catch (error) {
    console.error("Error cargando compras:", error);

    contenedor.innerHTML = `
      <div class="alert alert-danger">
        Error al cargar el historial de compras.
      </div>
    `;
  }
});