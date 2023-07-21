/* ---------------------------------------------------------------------------------------------- */
/*                               API FETCH PARA REGISTRO DE USUARIO                               */
/* ---------------------------------------------------------------------------------------------- */

const formularioLogin = document.getElementById("login-form");
const mensajeError = document.getElementById("error-message");

formularioLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault(); // Evitar el comportamiento de envío predeterminado del formulario

  const datosFormulario = new FormData(formularioLogin);

  try {
    const respuesta = await fetch("http://localhost:8080/usuarios/ingreso", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(datosFormulario),
    });

    if (!respuesta.ok) {
      // Verificar si el estado de respuesta no es 2xx (es decir, no fue exitoso)
      const datosError = await respuesta.json();
      throw new Error(datosError.error || "Error al iniciar sesión.");
    }

    // Inicio de sesión exitoso, redireccionar o manejar los datos de respuesta
    const datosRespuesta = await respuesta.json();
    console.log("Datos de usuario:", datosRespuesta);
    // Redireccionar a la página de bienvenida o realizar otras acciones.
  } catch (error) {
    mensajeError.textContent = error.message;
  }
});
