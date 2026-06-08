const formRecuperar = document.getElementById("formRecuperar");

if (formRecuperar) {
  formRecuperar.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
      const email = document.getElementById("email").value.trim();

      if (!email) {
        alert("Debes ingresar tu correo.");
        return;
      }

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuario = usuarios.find(u => u.email === email);

      if (!usuario) {
        alert("No existe un usuario registrado con ese correo.");
        return;
      }

      alert("Solicitud procesada. Se simula el envío de recuperación de contraseña.");
      window.location.href = "login.html";

    } catch (error) {
      console.error("Error recuperando contraseña:", error);
      alert("No se pudo procesar la recuperación.");
    }
  });
}