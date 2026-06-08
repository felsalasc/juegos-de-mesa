const formRegistro = document.getElementById("formRegistro");

function validarPassword(password) {
  return (
    password.length >= 8 &&
    password.length <= 20 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
  );
}

function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}

function limpiarErrores() {
  document.querySelectorAll(".campo-error").forEach(campo => {
    campo.classList.remove("campo-error");
  });

  document.querySelectorAll(".mensaje-error").forEach(mensaje => {
    mensaje.remove();
  });
}

function mostrarError(idCampo, mensaje) {
  const campo = document.getElementById(idCampo);
  campo.classList.add("campo-error");

  const error = document.createElement("div");
  error.className = "mensaje-error";
  error.textContent = mensaje;

  campo.insertAdjacentElement("afterend", error);
}

if (formRegistro) {
  formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    limpiarErrores();

    let formularioValido = true;

    const nombre = document.getElementById("nombre").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const repetirPassword = document.getElementById("repetirPassword").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const direccion = document.getElementById("direccion").value.trim();

    if (!nombre) {
      mostrarError("nombre", "El nombre completo es obligatorio.");
      formularioValido = false;
    }

    if (!usuario) {
      mostrarError("usuario", "El nombre de usuario es obligatorio.");
      formularioValido = false;
    }

    if (!email) {
      mostrarError("email", "El correo electrónico es obligatorio.");
      formularioValido = false;
    } else if (!email.includes("@") || !email.includes(".")) {
      mostrarError("email", "Debes ingresar un correo válido.");
      formularioValido = false;
    }

    if (!password) {
      mostrarError("password", "La contraseña es obligatoria.");
      formularioValido = false;
    } else if (!validarPassword(password)) {
      mostrarError("password", "Debe tener 8 a 20 caracteres, una mayúscula, un número y un carácter especial.");
      formularioValido = false;
    }

    if (!repetirPassword) {
      mostrarError("repetirPassword", "Debes repetir la contraseña.");
      formularioValido = false;
    } else if (password !== repetirPassword) {
      mostrarError("repetirPassword", "Las contraseñas no coinciden.");
      formularioValido = false;
    }

    if (!fechaNacimiento) {
      mostrarError("fechaNacimiento", "La fecha de nacimiento es obligatoria.");
      formularioValido = false;
    } else if (calcularEdad(fechaNacimiento) < 13) {
      mostrarError("fechaNacimiento", "Debes tener al menos 13 años para registrarte.");
      formularioValido = false;
    }

    if (!formularioValido) {
      return;
    }

    try {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const existeEmail = usuarios.some(u => u.email === email);
      const existeUsuario = usuarios.some(u => u.usuario === usuario);

      if (existeEmail) {
        mostrarError("email", "Este correo ya está registrado.");
        return;
      }

      if (existeUsuario) {
        mostrarError("usuario", "Este nombre de usuario ya existe.");
        return;
      }

      const nuevoUsuario = {
        id: Date.now(),
        nombre,
        usuario,
        email,
        password,
        fechaNacimiento,
        direccion,
        rol: "cliente"
      };

      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("Usuario registrado correctamente.");
      window.location.href = "login.html";

    } catch (error) {
      console.error("Error en registro:", error);
      alert("No se pudo registrar el usuario.");
    }
  });
}