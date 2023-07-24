/* ---------------------------------------------------------------------------------------------- */
/*                            VALIDACIÓN Y FUNCIONALIDAD DE FORMULARIOS                           */
/* ---------------------------------------------------------------------------------------------- */

// Obtener referencias a los formularios de registro e ingreso
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

/* ------------------------------------------ REGISTRO ------------------------------------------ */

// Manejar el evento de envío del formulario de registro
registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener referencias a los campos del formulario de registro
    const nameInput = registerForm.querySelector('#name');
    const numInput = registerForm.querySelector('#num');
    const emailInput = registerForm.querySelector('#email');
    const passInput = registerForm.querySelector('#pass');
    const rePassInput = registerForm.querySelector('#re_pass');
    const passwordError = registerForm.querySelector('#password-error');

    // Obtener los valores de los campos del formulario
    const name = nameInput.value;
    const num = numInput.value;
    const email = emailInput.value;
    const pass = passInput.value;
    const rePass = rePassInput.value;

    // Almacenar los valores en el almacenamiento local
    localStorage.setItem('Name', name);
    localStorage.setItem('Num', num);
    localStorage.setItem('Email', email);
    localStorage.setItem('Pass', pass);
    localStorage.setItem('RePass', rePass);

    // Validar si algún campo está vacío
    if (name === '' || num === '' || email === '' || pass === '' || rePass === '') {
        Swal.fire(
            'Opps..!',
            '¡Los campos están vacíos!',
            'error'
        );
    } else {
        // Validar la longitud de la contraseña y si coincide con la confirmación
        if (pass.length >= 8 && pass === rePass) {
            Swal.fire({
                title: '¡Buen trabajo!',
                text: `¡Registro exitoso!\n\nNombre: ${name}\nNúmero: ${num}\nEmail: ${email}`,
                icon: 'success'
            });
            setTimeout(() => {
                // Redirigir al formulario de inicio de sesión
                location.href = '#signin';
            }, 1000);
        } else {
            // Mostrar un mensaje de error si las contraseñas no coinciden o no cumplen los requisitos
            passwordError.textContent = 'Las contraseñas no coinciden o no cumplen los requisitos';
            passwordError.style.display = 'block';
        }
    }
});
/* ---------------------------------------------------------------------------------------------- */


/* ------------------------------------------- INGRESO ------------------------------------------- */

// Manejar el evento de envío del formulario de ingreso
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener referencias a los campos del formulario de ingreso
    const emailInput = loginForm.querySelector('#your_email');
    const passInput = loginForm.querySelector('#your_pass');

    // Obtener los valores de los campos del formulario
    const email = emailInput.value;
    const pass = passInput.value;

    // Obtener los valores almacenados en el almacenamiento local
    const storedEmail = localStorage.getItem('Email');
    const storedPass = localStorage.getItem('Pass');

    // Validar si algún campo está vacío
    if (email === '' || pass === '') {
        Swal.fire(
            'Opps..!',
            '¡Los campos están vacíos!',
            'error'
        );
    } else {
        // Validar si el correo electrónico y la contraseña coinciden con los valores almacenados
        if (email === storedEmail && pass === storedPass) {
            Swal.fire({
                title: '¡Bien hecho!',
                text: `¡Inicio de sesión exitoso!\n\nEmail: ${email}`,
                icon: 'success'
            });
            setTimeout(() => {
                // Redirigir a la página deseada después del inicio de sesión exitoso después de  un segundo
                location.href = 'panelusuario.html';
            }, 1000);
        } else {
            // Validar si el correo electrónico y la contraseña coinciden con los valores almacenados
            Swal.fire(
                'Opps..!',
                '¡El correo electrónico o la contraseña son incorrectos!',
                'error'
            );
        }
    }
});

/* ---------------------------------------------------------------------------------------------- */

/* ------------------------------------ DESPLAZAMIENTO ------------------------------------ */

// Manejar el evento de clic en el enlace "Ya tengo una cuenta"
const signupImageLink = document.querySelector('.signup-image-link');
signupImageLink.addEventListener('click', function (event) {
    event.preventDefault();
    const signInSection = document.querySelector('.sign-in');
    signInSection.scrollIntoView({ behavior: 'smooth' });
});

/* --------------------------------------------- FIN -------------------------------------------- */
