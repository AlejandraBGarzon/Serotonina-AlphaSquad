/* -------------------------------------------------------------------------- */
/*                             Validación de datos                            */
/* Este bloque contiene las funciones de validación para cada campo del       */
/*   formulario y la función principal que escucha el evento de envío del     */
/*   formulario para realizar las validaciones y enviar el correo electrónico.*/
/* -------------------------------------------------------------------------- */


/* ------------------------ Validación del formulario ----------------------- */

document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que se envíe el formulario de forma predeterminada

  // Si cumple con los tres criterios, se inicia la función para enviar el correo
  if (validateName() && validateEmail() && validatePhone()) {
    sendMail();
  }
});

/* -------------------------------------------------------------------------- */


/* -------------- Función de validación del campo de nombre -------------- */

// Función de validación del campo de nombre
function validateName() {
  let nameInput = document.getElementById("name");
  let nameValue = nameInput.value.trim();

  if (nameValue === "") {
    setError(nameInput, "Por favor, ingresa tu nombre");
    return false;
  }

  // Validación de que el nombre no contenga números
  let nameRegex = /^[^\d]+$/;
  if (!nameRegex.test(nameValue)) {
    setError(nameInput, "El nombre no debe contener números");
    return false;
  }

  clearError(nameInput);
  return true;
}


/* -------------------------------------------------------------------------- */


/* ---------------- Función de validación del campo de email ---------------- */

function validateEmail() {
  let emailInput = document.getElementById("email");
  let emailValue = emailInput.value.trim();

  if (emailValue === "") {
    setError(emailInput, "Por favor, ingresa tu correo electrónico");
    return false;
  }

  // Validación de formato de email usando expresión regular
  let emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(emailValue)) {
    setError(emailInput, "Por favor, ingresa un correo electrónico válido");
    return false;
  }

  clearError(emailInput);
  return true;
}

/* -------------------------------------------------------------------------- */


/* --------------- Función de validación del campo de teléfono -------------- */

function validatePhone() {
  let phoneInput = document.getElementById("phone");
  let phoneValue = phoneInput.value.trim();

  if (phoneValue === "") {
    setError(phoneInput, "Por favor, ingresa tu número de teléfono");
    return false;
  }

  // Validación de formato de teléfono usando expresión regular
  let phoneRegex = /^\d{10}$/; // Ejemplo: 1234567890 (10 dígitos)
  if (!phoneRegex.test(phoneValue)) {
    setError(phoneInput, "Por favor, ingresa un número de teléfono válido");
    return false;
  }

  clearError(phoneInput);
  return true;
}

/* -------------------------------------------------------------------------- */


/* --------- Función para establecer un mensaje de error en un campo -------- */

function setError(input, message) {
  input.classList.add("is-invalid");
  let errorElement = document.createElement("div");
  errorElement.className = "invalid-feedback";
  errorElement.innerText = message;
  input.parentNode.appendChild(errorElement);
}

// Función para borrar un mensaje de error de un campo
function clearError(input) {
  input.classList.remove("is-invalid");
  let errorElement = input.parentNode.querySelector(".invalid-feedback");
  if (errorElement) {
    errorElement.remove();
  }
}

/* -------------------------------------------------------------------------- */

/* ----------------------------------- fin validación ----------------------------------*/


/* -------------------------------------------------------------------------- */
/*                                Enviar email                                */
/* La función sendMail() se encarga de obtener los valores de los campos del 
   formulario y enviar el correo electrónico utilizando la biblioteca EmailJS.
   Si el envío es exitoso, se limpian los campos del formulario y se muestra 
   un mensaje de éxito al usuario. Si se produce un error, se muestra un 
   mensaje de error.                                                          */
/* -------------------------------------------------------------------------- */

function sendMail() {
  // Obtener los valores de los campos del formulario
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
    fromName: "Contacto de Serotonina"
  };

  let serviceID = "gmail_service"; // ID del servicio de EmailJS
  let templateID = "template_gssc"; // ID de la plantilla de correo electrónico

  // Enviar el correo electrónico utilizando EmailJS
  emailjs
    .send(serviceID, templateID, params)
    .then(function (response) {
      // El correo electrónico se envió exitosamente
      console.log(response);
      // Limpiar los campos del formulario
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("message").value = "";
      // Mostrar un mensaje de éxito al usuario
      swal("¡Éxito!", "Tu mensaje ha sido enviado", "success");
    })
    .catch(function (error) {
      // Se produjo un error al enviar el correo electrónico
      console.error("Error al enviar el correo electrónico", error);
      // Mostrar un mensaje de error al usuario
      swal("¡Error!", "Se produjo un error al enviar el correo electrónico. Por favor, intenta nuevamente.", "error");
    });
}

/* -------------------------------------------------------------------------- */

