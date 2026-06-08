function obtenerUsuarioActivo() {
  try {
    return JSON.parse(localStorage.getItem("usuarioActivo"));
  } catch (error) {
    console.error("Error obteniendo usuario activo:", error);
    return null;
  }
}

function validarSesion() {
  const usuario = obtenerUsuarioActivo();

  if (!usuario) {
    alert("Debes iniciar sesión.");
    window.location.href = "login.html";
    return null;
  }

  return usuario;
}

function validarAdmin() {
  const usuario = validarSesion();

  if (!usuario) return;

  if (usuario.rol !== "admin") {
    alert("No tienes permisos para acceder a esta página.");
    window.location.href = "catalogo.html";
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  localStorage.removeItem("carrito");
  localStorage.setItem("carrito", JSON.stringify([]));
  window.location.href = "login.html";
}

function mostrarMenuUsuario() {
  const usuario = obtenerUsuarioActivo();
  const contenedor = document.getElementById("menuUsuario");

  if (!contenedor || !usuario) return;

  contenedor.innerHTML = `
    <span class="me-3">Hola, ${usuario.nombre}</span>
    <button class="btn btn-outline-light btn-sm" onclick="cerrarSesion()">Cerrar sesión</button>
  `;
}