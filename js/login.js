const formLogin = document.getElementById("formLogin");

if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      if (!email || !password) {
        alert("Debes ingresar correo y contraseña.");
        return;
      }

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const usuario = usuarios.find(u => u.email === email && u.password === password);

      if (!usuario) {
        alert("Correo o contraseña incorrectos.");
        return;
      }

      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

      if (usuario.rol === "admin") {
        window.location.href = "admin-productos.html";
      } else {
        window.location.href = "catalogo.html";
      }

    } catch (error) {
      console.error("Error en login:", error);
      alert("No se pudo iniciar sesión.");
    }
  });
}