document.addEventListener("DOMContentLoaded", () => {

    validarAdmin();
    mostrarMenuUsuario();

    cargarUsuarios();

});

function cargarUsuarios() {

    const tabla = document.getElementById("tablaUsuarios");
    const totalUsuarios = document.getElementById("totalUsuarios");

    try {

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        totalUsuarios.textContent = `${usuarios.length} usuarios`;

        if (usuarios.length === 0) {

            tabla.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">
                        No existen usuarios registrados.
                    </td>
                </tr>
            `;

            return;
        }

        tabla.innerHTML = usuarios.map(usuario => `

            <tr>

                <td>${usuario.nombre}</td>

                <td>${usuario.usuario}</td>

                <td>${usuario.email}</td>

                <td>
                    <span class="badge ${
                        usuario.rol === "admin"
                        ? "bg-danger"
                        : "bg-success"
                    }">
                        ${usuario.rol}
                    </span>
                </td>

                <td>
                    ${usuario.fechaNacimiento || "-"}
                </td>

                <td>
                    ${usuario.direccion || "-"}
                </td>

            </tr>

        `).join("");

    } catch (error) {

        console.error(error);

        tabla.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-danger">
                    Error al cargar usuarios.
                </td>
            </tr>
        `;
    }
}