document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = validarSesion();

    if (!usuarioActivo) {
        return;
    }

    const formPerfil = document.getElementById("formPerfil");

    document.getElementById("nombre").value = usuarioActivo.nombre || "";
    document.getElementById("usuario").value = usuarioActivo.usuario || "";
    document.getElementById("email").value = usuarioActivo.email || "";
    document.getElementById("fechaNacimiento").value = usuarioActivo.fechaNacimiento || "";
    document.getElementById("direccion").value = usuarioActivo.direccion || "";

    formPerfil.addEventListener("submit", (e) => {
        e.preventDefault();

        limpiarErrores();

        const nombre = document.getElementById("nombre").value.trim();
        const direccion = document.getElementById("direccion").value.trim();

        if (!nombre) {
            mostrarError("nombre", "El nombre es obligatorio.");
            return;
        }

        try {
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            const usuariosActualizados = usuarios.map(usuario => {
                if (usuario.id === usuarioActivo.id) {
                    return {
                        ...usuario,
                        nombre,
                        direccion
                    };
                }

                return usuario;
            });

            const usuarioActualizado = usuariosActualizados.find(
                usuario => usuario.id === usuarioActivo.id
            );

            localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActualizado));

            alert("Perfil actualizado correctamente.");

        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al actualizar el perfil.");
        }
    });
});

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