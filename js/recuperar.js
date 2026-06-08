const formRecuperar = document.getElementById("formRecuperar");

function limpiarErrores() {

    document.querySelectorAll(".campo-error").forEach(campo => {
        campo.classList.remove("campo-error");
    });

    document.querySelectorAll(".mensaje-error").forEach(error => {
        error.remove();
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

if (formRecuperar) {

    formRecuperar.addEventListener("submit", (e) => {

        e.preventDefault();

        limpiarErrores();

        const email = document.getElementById("email").value.trim();

        if (!email) {

            mostrarError(
                "email",
                "Debes ingresar un correo electrónico."
            );

            return;
        }

        const usuarios = JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];

        const usuario = usuarios.find(
            u => u.email === email
        );

        if (!usuario) {

            mostrarError(
                "email",
                "No existe una cuenta asociada a este correo."
            );

            return;
        }

        alert(
            "Solicitud procesada correctamente. (Simulación de recuperación de contraseña)"
        );

        window.location.href = "login.html";

    });

}