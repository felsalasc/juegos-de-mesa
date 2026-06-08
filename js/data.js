document.addEventListener("DOMContentLoaded", () => {
  try {
    if (!localStorage.getItem("usuarios")) {
      const usuarios = [
        {
          id: 1,
          nombre: "Administrador",
          usuario: "admin",
          email: "admin@nortlab.cl",
          password: "Admin123!",
          fechaNacimiento: "1990-01-01",
          direccion: "La Serena",
          rol: "admin"
        }
      ];

      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    if (!localStorage.getItem("productos")) {
      const productos = [
        {
          id: 1,
          nombre: "Aventura Diaguita",
          categoria: "Cultura Diaguita",
          precio: 12990,
          stock: 10,
          imagen: "img/juego1.jpg"
        },
        {
          id: 2,
          nombre: "Ruta de los Changos",
          categoria: "Cultura Changa",
          precio: 14990,
          stock: 8,
          imagen: "img/juego2.jpg"
        },
        {
          id: 3,
          nombre: "Misterios Atacameños",
          categoria: "Cultura Atacameña",
          precio: 16990,
          stock: 6,
          imagen: "img/juego3.jpg"
        }
      ];

      localStorage.setItem("productos", JSON.stringify(productos));
    }

    if (!localStorage.getItem("carrito")) {
      localStorage.setItem("carrito", JSON.stringify([]));
    }

    if (!localStorage.getItem("compras")) {
      localStorage.setItem("compras", JSON.stringify([]));
    }

  } catch (error) {
    console.error("Error inicializando datos:", error);
    alert("Ocurrió un problema al cargar los datos iniciales.");
  }
});