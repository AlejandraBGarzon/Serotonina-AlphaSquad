document.getElementById('register-form').addEventListener('submit', function (event) {
  event.preventDefault();
  registrarUsuario(); // Llamar a la función registrarUsuario para procesar el registro
});

async function registrarUsuario() {
  const url = 'http://localhost:8080/usuarios';
  const registroForm = {}; // Inicializar el objeto vacío o sin datos

  // Aquí, el usuario debería proporcionar los datos a través del formulario
  registroForm.nombre_usu = document.getElementById('nombre').value;
  registroForm.telefono_usu = document.getElementById('telefono').value;
  registroForm.correo_usu = document.getElementById('correo').value;
  registroForm.contrasenia_usu = document.getElementById('contrasenia').value;

  // Obtener el valor seleccionado de tipo_usuario_id_tipo_usu y configurarlo como la propiedad tipo_usuario
  const tipoUsuarioId = document.getElementById('tipo_usuario').value;
  registroForm.tipo_usuario = { id_tipo_usu: parseInt(tipoUsuarioId) };

  const confirmarContrasenia = document.getElementById('re_pass').value;

  // Registrar el valor seleccionado de tipo_usuario_id_tipo_usu antes de hacer la solicitud
  console.log("Selected tipo_usuario_id_tipo_usu:", registroForm.tipo_usuario_id_tipo_usu);

  if (!registroForm.nombre_usu || !registroForm.telefono_usu || !registroForm.tipo_usuario || !registroForm.correo_usu || !registroForm.contrasenia_usu || registroForm.contrasenia_usu !== confirmarContrasenia) {
    // Mostrar mensajes de error utilizando SweetAlert
    Swal.fire({
      icon: 'error',
      title: 'Error en el registro',
      text: 'Por favor, complete todos los campos obligatorios y verifique que las contraseñas coincidan.'
    });
    return;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registroForm)
    });

    if (!response.ok) {
      throw new Error('Error al registrar el usuario.');
    }

    const nuevoUsuario = await response.json();
    console.log('Usuario registrado:', nuevoUsuario);

    // Mostrar mensaje de éxito utilizando SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: `¡Registro exitoso!\n\nNombre: ${registroForm.nombre_usu}\nNúmero: ${registroForm.telefono_usu}\nEmail: ${registroForm.correo_usu}`
    });

    // Redirigir al formulario de inicio de sesión después de 1 segundo (1000 milisegundos)
    setTimeout(() => {
      window.location.href = '#ingreso';
    }, 1000);

    // Limpiar el formulario después del registro exitoso
    document.getElementById('nombre').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('tipo_usuario').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('contrasenia').value = '';
    document.getElementById('re_pass').value = '';

  } catch (error) {
    console.error('Error en el registro:', error);
    // Mostrar mensaje de error utilizando SweetAlert
    Swal.fire({
      icon: 'error',
      title: 'Error en el registro',
      text: 'Ocurrió un error al registrar el usuario. Por favor, inténtalo nuevamente.'
    });
  }
}
