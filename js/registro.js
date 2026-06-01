const formulario = document.getElementById("formRegistro");
const mensajeFinal = document.getElementById("mensajeFinal");

const campos = {
  nombre: document.getElementById("nombre"),
  usuario: document.getElementById("usuario"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  repetirPassword: document.getElementById("repetirPassword"),
  fechaNacimiento: document.getElementById("fechaNacimiento"),
  direccion: document.getElementById("direccion")
};

function mostrarError(input, mensaje) {
  const grupo = input.parentElement;
  const error = grupo.querySelector(".error");

  grupo.classList.remove("correcto");
  grupo.classList.add("incorrecto");
  error.textContent = mensaje;
}

function mostrarCorrecto(input) {
  const grupo = input.parentElement;
  const error = grupo.querySelector(".error");

  grupo.classList.remove("incorrecto");
  grupo.classList.add("correcto");
  error.textContent = "";
}

function validarEmail(email) {
  const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return formato.test(email);
}

function validarPassword(password) {
  const tieneMayuscula = /[A-Z]/.test(password);
  const tieneNumero = /[0-9]/.test(password);
  const largoValido = password.length >= 6 && password.length <= 18;

  return tieneMayuscula && tieneNumero && largoValido;
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

function validarFormulario() {
  let valido = true;

  if (campos.nombre.value.trim() === "") {
    mostrarError(campos.nombre, "El nombre completo es obligatorio.");
    valido = false;
  } else {
    mostrarCorrecto(campos.nombre);
  }

  if (campos.usuario.value.trim() === "") {
    mostrarError(campos.usuario, "El nombre de usuario es obligatorio.");
    valido = false;
  } else {
    mostrarCorrecto(campos.usuario);
  }

  if (campos.email.value.trim() === "") {
    mostrarError(campos.email, "El correo electrónico es obligatorio.");
    valido = false;
  } else if (!validarEmail(campos.email.value.trim())) {
    mostrarError(campos.email, "Debe ingresar un correo válido.");
    valido = false;
  } else {
    mostrarCorrecto(campos.email);
  }

  if (campos.password.value.trim() === "") {
    mostrarError(campos.password, "La contraseña es obligatoria.");
    valido = false;
  } else if (!validarPassword(campos.password.value)) {
    mostrarError(
      campos.password,
      "Debe tener entre 6 y 18 caracteres, una mayúscula y un número."
    );
    valido = false;
  } else {
    mostrarCorrecto(campos.password);
  }

  if (campos.repetirPassword.value.trim() === "") {
    mostrarError(campos.repetirPassword, "Debe repetir la contraseña.");
    valido = false;
  } else if (campos.password.value !== campos.repetirPassword.value) {
    mostrarError(campos.repetirPassword, "Las contraseñas no coinciden.");
    valido = false;
  } else {
    mostrarCorrecto(campos.repetirPassword);
  }

  if (campos.fechaNacimiento.value === "") {
    mostrarError(campos.fechaNacimiento, "La fecha de nacimiento es obligatoria.");
    valido = false;
  } else if (calcularEdad(campos.fechaNacimiento.value) < 13) {
    mostrarError(campos.fechaNacimiento, "Debes tener al menos 13 años.");
    valido = false;
  } else {
    mostrarCorrecto(campos.fechaNacimiento);
  }

  if (campos.direccion.value.trim() !== "") {
    mostrarCorrecto(campos.direccion);
  } else {
    campos.direccion.parentElement.classList.remove("correcto", "incorrecto");
    campos.direccion.parentElement.querySelector(".error").textContent = "";
  }

  return valido;
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validarFormulario()) {
    mensajeFinal.textContent = "Registro enviado correctamente.";
    mensajeFinal.style.color = "#2e8b57";
  } else {
    mensajeFinal.textContent = "Revisa los campos marcados antes de enviar.";
    mensajeFinal.style.color = "#c0392b";
  }
});

formulario.addEventListener("reset", function () {
  setTimeout(() => {
    document.querySelectorAll(".grupo").forEach((grupo) => {
      grupo.classList.remove("correcto", "incorrecto");
      grupo.querySelector(".error").textContent = "";
    });

    mensajeFinal.textContent = "";
    formulario.style.border = "none";
  }, 100);
});