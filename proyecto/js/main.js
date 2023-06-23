/* ---------------------------------------------------------------------------------------------- */
/*                                    FUNCIONALIDAD DE REGISTRO                                   */
/* ---------------------- LA VALIDACIÓN DE OTROS DATOS SE HACEN EN EL HTML ---------------------- */
/* ---------------------------------------------------------------------------------------------- */


/* -------------------------- Validar que las dos contraseñas coincidan ------------------------- */
// Obtener referencias a los elementos del formulario
const passwordInput = document.getElementById('pass');
const rePasswordInput = document.getElementById('re_pass');
const form = document.getElementById('register-form');

// Función para validar las contraseñas al enviar el formulario
function validatePasswords(event) {
    const passwordError = document.getElementById('password-error');

    if (passwordInput.value !== rePasswordInput.value) {
        passwordError.textContent = 'Las contraseñas no coinciden';
        // Cancela el envío del formulario
        event.preventDefault(); 
    } else {
        passwordError.textContent = '';
    }
}

/* -------- Si las contraseñas coinciden se envía alerta exitosa con los datos ingresados ------- */
// Evento submit del formulario
form.addEventListener('submit', function (event) {
    // Cancela el envío del formulario para manejarlo mediante JavaScript
    event.preventDefault(); 

    if (passwordInput.checkValidity() && rePasswordInput.checkValidity() && passwordInput.value === rePasswordInput.value) {
        // Objeto JSON con los campos del usuario
        const usuario = {
            nombre: document.getElementById('name').value,
            genero: document.getElementById('genero').value,
            celular: document.getElementById('num').value,
            correo: document.getElementById('email').value
        };

        // Alerta de envío exitoso después de 1 segundo
        setTimeout(function () {
            // Mostrar alerta de envío exitoso
            Swal.fire({
                icon: 'success',
                title: 'Envío exitoso',
                text: 'El formulario se ha enviado correctamente',
                html: `<pre>${JSON.stringify(usuario, null, 2)}</pre>`
            }).then((result) => {
                // Cuando el usuario haga click en "Ok", lo redirije al Ingreso
                if (result.isConfirmed) {
                    const signInSection = document.querySelector('#signin');
                    // Animación de desplazamiento suave
                    signInSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }, 1000);
    }
});

/* ------------- Animación desplazamiento cuando das click en "Ya tengo una cuenta" ------------- */
// Agregar evento click al enlace "Ya tengo una cuenta"
const signupImageLink = document.querySelector('.signup-image-link');
signupImageLink.addEventListener('click', function (event) {
    event.preventDefault();
    const signInSection = document.querySelector('#signin');
    // Animación suave hacia Ingreso
    signInSection.scrollIntoView({ behavior: 'smooth' });
});

