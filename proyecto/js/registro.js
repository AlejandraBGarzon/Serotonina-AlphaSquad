/* ---------------------------------------------------------------------------------------------- */
/*                               API FECTH PARA REGISTRO DE USUARIO                               */
/* ---------------------------------------------------------------------------------------------- */

async function checkEmailRegistration(correo) {
  const url = `http://localhost:8080/usuarios?correo_usu=${encodeURIComponent(correo)}`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data !== null && data !== undefined;
    } else if (response.status === 409) {
      return true;
    } else {
      throw new Error('Error al verificar el correo electrónico.');
    }
  } catch (error) {
    console.error('Error al verificar el correo electrónico:', error);
    await new Promise(resolve => setTimeout(resolve, 1000));
    throw error;
  }
}

async function registrarUsuario() {
  const url = 'http://localhost:8080/usuarios';
  const registroForm = new FormData();

  registroForm.append('nombre_usu', document.getElementById('nombre').value);
  registroForm.append('telefono_usu', document.getElementById('telefono').value);
  registroForm.append('correo_usu', document.getElementById('correo').value);
  registroForm.append('contrasenia_usu', document.getElementById('contrasenia').value);

  const tipoUsuarioId = document.getElementById('tipo_usuario').value;
  registroForm.append('tipo_usuario_id_tipo_usu', tipoUsuarioId);

  const confirmarContrasenia = document.getElementById('re_pass').value;

  if (
    !registroForm.get('nombre_usu') ||
    !registroForm.get('telefono_usu') ||
    !registroForm.get('tipo_usuario_id_tipo_usu') ||
    !registroForm.get('correo_usu') ||
    !registroForm.get('contrasenia_usu') ||
    registroForm.get('contrasenia_usu') !== confirmarContrasenia
  ) {
    setTimeout(() => {
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: 'Por favor, complete todos los campos obligatorios y verifique que las contraseñas coincidan.'
      });
    }, 1000);
    return;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(registroForm)
    });

    if (response.ok) {
      const nuevoUsuario = await response.json();
      console.log('Usuario registrado:', nuevoUsuario);

      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: `¡Registro exitoso!\n\nNombre: ${registroForm.get('nombre_usu')}\nNúmero: ${registroForm.get('telefono_usu')}\nEmail: ${registroForm.get('correo_usu')}`
        });
      }, 1000);

      setTimeout(() => {
        window.location.href = '#ingreso';
      }, 1000);

      document.getElementById('nombre').value = '';
      document.getElementById('telefono').value = '';
      document.getElementById('tipo_usuario').value = '';
      document.getElementById('correo').value = '';
      document.getElementById('contrasenia').value = '';
      document.getElementById('re_pass').value = '';
    } else if (response.status === 409) {
      setTimeout(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'El correo electrónico ya está registrado. Por favor, utiliza un correo electrónico diferente.'
        });
      }, 1000);
    } else {
      throw new Error('Error al registrar el usuario.');
    }
  } catch (error) {
    console.error('Error en el registro:', error);
    await new Promise(resolve => setTimeout(resolve, 1000));
    Swal.fire({
      icon: 'error',
      title: 'Error en el registro',
      text: 'Ocurrió un error al registrar el usuario. Por favor, inténtalo nuevamente.'
    });
  }
}

let formSubmitted = false;

document.getElementById('register-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  document.getElementById('signup').disabled = true;

  if (formSubmitted) {
    return;
  }

  const correo = document.getElementById('correo').value;

  try {
    formSubmitted = true;
    const isEmailRegistered = await checkEmailRegistration(correo);

    if (isEmailRegistered) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: 'El correo electrónico ya está registrado. Por favor, utiliza un correo electrónico diferente.'
      });
      return;
    }

    await registrarUsuario();
  } catch (error) {
    console.error('Error en el registro:', error);
    await new Promise(resolve => setTimeout(resolve, 1000));
    Swal.fire({
      icon: 'error',
      title: 'Error en el registro',
      text: 'Ocurrió un error al verificar el correo electrónico. Por favor, inténtalo nuevamente.'
    });
  } finally {
    formSubmitted = false;
  }
});
