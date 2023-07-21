/* ---------------------------------------------------------------------------------------------- */
/*                       FUNCIONALIDAD PARA AGREGAR Y MOSTRAR PUBLICACIONES                       */
/* ---------------------------------------------------------------------------------------------- */

// Escucha el evento 'DOMContentLoaded' para ejecutar la función cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function () {

  // Obtiene referencias a elementos del DOM
  const addItemButton = document.getElementById('add-item-button');
  const addItemFormContainer = document.getElementById('add-item-form-container');
  const exploreButton = document.getElementById('explore-button');
  const exploreContainer = document.getElementById('explore-container');
  const itemForm = document.getElementById('item-form');
  const imgTypeSelect = document.getElementById('img-type-select');
  const urlInputContainer = document.getElementById('url-input-container');
  const fileInputContainer = document.getElementById('file-input-container');
  const itemList = document.getElementById('explore-list');

  /* ---------------------------------- Descripción del item ---------------------------------- */

  // Inicialización de la API Tiny para agregar editor de formato a la caja de descripción
  tinymce.init({
    selector: '#description-input',
    // Altura del editor en píxeles
    height: 300,
    // Configuración de la barra de herramientas del editor
    toolbar: 'undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat',
    // Estilo de contenido del editor
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

  /* ------------------------------- Guardando valores de los items ------------------------------- */

  // Array para almacenar los items
  let items = [];

  // Manejador de evento para el envío del formulario
  itemForm.addEventListener('submit', function (event) {
    // Evitar que el formulario se envíe automáticamente
    event.preventDefault();

    // Obtener los valores de los campos del formulario y eliminar los espacios en blanco
    const nameInput = document.getElementById('name-input');
    const descriptionInput = tinymce.get('description-input');
    const urlInput = document.getElementById('url-input');
    const fileInput = document.getElementById('file-input');
    const name = nameInput.value.trim();
    const description = descriptionInput.getContent({ format: 'html' });

    // Verificar que los campos de nombre y descripción no estén vacíos
    if (name !== '' && description !== '') {
      // Mostrar una confirmación al usuario utilizando el método confirm()
      const confirmPublish = confirm('¿Estás seguro de que quieres publicar este item?');
      if (confirmPublish) {
        // Si se confirma, se crea nuevo objeto de item con los valores del formulario y la fecha actual
        const newItem = {
          name: name,
          description: description,
          date: new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          }),
          imageUrl: null
        };

        /* ---------------------------------- Al crear el nuevo item ---------------------------------- */

        // Mostrar el contenedor de exploración si está oculto
        if (exploreContainer.style.display === 'none') {
          exploreContainer.style.display = 'block';
        }

        // Redirigir al usuario a la sección de Explorar Publicaciones
        window.location.href = '#explore-container';

        if (imgTypeSelect.value === 'url' && urlInput.value.trim() !== '') {
          newItem.imageUrl = urlInput.value.trim();
          /* Si el tipo de imagen seleccionado es 'url' y el campo de URL no está vacío
          Se asigna el valor de la URL al campo de imageUrl del nuevo item */
          saveNewItem(newItem);
        } else if (imgTypeSelect.value === 'file' && fileInput.files.length > 0) {
          /* Si el tipo de imagen seleccionado es 'file' y se ha seleccionado un archivo
             Se obtiene el primer archivo seleccionado */
          const file = fileInput.files[0];
          const reader = new FileReader();
          reader.onload = function (e) {
            /* Cuando se complete la carga del archivo, se asigna el resultado 
            (URL base64) al campo de imageUrl del nuevo item */
            newItem.imageUrl = e.target.result;
            saveNewItem(newItem);
          };
          // Se lee el contenido del archivo como una URL base64
          reader.readAsDataURL(file);
        } else {
          // Si no se agregó una imagen, simplemente se guarda el item con nombre y descripción
          saveNewItem(newItem);
        }
      }
    }
  });

  function saveNewItem(newItem) {
    // Agregar el nuevo item a la lista de items
    items.push(newItem);
    // Renderizar los items actualizados en la interfaz
    renderItems();

    // Limpiar los valores de campos de entrada y restablecer la visualización de los contenedores
    const nameInput = document.getElementById('name-input');
    const descriptionInput = tinymce.get('description-input');
    const urlInput = document.getElementById('url-input');
    const fileInput = document.getElementById('file-input');

    nameInput.value = '';
    descriptionInput.setContent('');
    urlInput.value = '';
    fileInput.value = '';
    urlInputContainer.style.display = 'none';
    fileInputContainer.style.display = 'none';
    // Desplazar el scroll del contenedor de items hasta la parte inferior para mostrar el nuevo item
    itemList.scrollTop = itemList.scrollHeight;
  }

  // Agregar evento de cambio al select de tipo de imagen
  imgTypeSelect.addEventListener('change', function () {
    // Obtener el valor seleccionado
    const selectedValue = this.value;

    // Mostrar u ocultar los contenedores de entrada de URL y archivo según el valor seleccionado
    if (selectedValue === 'url') {
      // Si se selecciona 'url', mostrar el contenedor de entrada de URL y ocultar el contenedor de entrada de archivo
      urlInputContainer.style.display = 'block';
      fileInputContainer.style.display = 'none';
    } else if (selectedValue === 'file') {
      // Si se selecciona 'file', mostrar el contenedor de entrada de archivo y ocultar el contenedor de entrada de URL
      urlInputContainer.style.display = 'none';
      fileInputContainer.style.display = 'block';
    } else {
      // Si se selecciona cualquier otro valor, ocultar ambos contenedores
      urlInputContainer.style.display = 'none';
      fileInputContainer.style.display = 'none';
    }
  });

  /* ----------------------------------- Botón Publicar Elemento ---------------------------------- */

  addItemButton.addEventListener('click', function () {
    // Verificar si el contenedor de formulario de agregar item está visible o no
    if (addItemFormContainer.style.display === 'block') {
      addItemFormContainer.style.display = 'none';
    } else {
      addItemFormContainer.style.display = 'block';
    }
  });

  /* -------------------------------- Botón Explorar Publicaciones -------------------------------- */

  exploreButton.addEventListener('click', function () {
    // Verificar si el contenedor de explorar está visible o no
    if (exploreContainer.style.display === 'block') {
      exploreContainer.style.display = 'none';
    } else {
      exploreContainer.style.display = 'block';
    }
  });

  /* ---------------------------------- Cómo mostrar las publicaciones --------------------------------- */
  function renderItems() {
    // Limpiar el contenido previo de la lista de elementos
    itemList.innerHTML = '';

    // Ordenar los elementos por fecha de forma descendente (más reciente primero)
    const sortedItems = items.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Invertir el orden de los elementos
    sortedItems.reverse();

    // Recorrer los elementos ordenados
    for (let i = 0; i < sortedItems.length; i++) {
      const item = sortedItems[i];

      // Crear un elemento de lista
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.classList.add('item');

      // Crear un contenedor de imagen
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      // Agregar la imagen si existe
      if (item.imageUrl) {
        const imageElement = document.createElement('img');
        imageElement.src = item.imageUrl;
        imageElement.classList.add('item-image');
        imageElement.style.maxWidth = '50%';
        imageElement.style.height = 'auto';
        imageContainer.appendChild(imageElement);
      }

      // Crear un elemento de título
      const nameElement = document.createElement('h4');
      nameElement.classList.add('item-name');
      nameElement.textContent = item.name;

      // Crear un elemento de descripción
      const descriptionElement = document.createElement('div');
      descriptionElement.classList.add('item-description');
      descriptionElement.innerHTML = item.description;

      // Crear un elemento de fecha
      const dateElement = document.createElement('p');
      dateElement.classList.add('item-date');
      dateElement.textContent = 'Publicado el ' + item.date;

      // Agregar los elementos al elemento de lista
      listItem.appendChild(imageContainer);
      listItem.appendChild(nameElement);
      listItem.appendChild(descriptionElement);
      listItem.appendChild(dateElement);

      // Crear un botón de eliminar
      const deleteButton = createDeleteButton(listItem, i);
      listItem.appendChild(deleteButton);

      let reacted = false; // Variable para rastrear si se ha reaccionado a esta publicación

      // Crear el icono de corazón para el botón de reacciones
      const heartIcon = document.createElement('i');
      heartIcon.classList.add('fas', 'fa-heart');
      heartIcon.style.marginRight = '10px';
      heartIcon.style.cursor = 'pointer';
      listItem.appendChild(heartIcon);

      // Agregar el evento click al icono de corazón
      let reactionCount = 0; // Variable para contar las reacciones
      heartIcon.addEventListener('click', () => {
        if (!reacted) {
          reactionCount++;
          heartIcon.classList.add('reacted');
          heartIcon.textContent = ` ${reactionCount}`; // Usar textContent para agregar el número de reacciones
        } else {
          reactionCount--;
          heartIcon.classList.remove('reacted');
          heartIcon.textContent = ''; // Quitar el número de reacciones
        }
        reacted = !reacted; // Cambiar el estado de reacción
      });

      // Crear un espacio para comentarios
      const commentSection = document.createElement('div');
      commentSection.classList.add('comment-section'); // Agregamos una clase para el contenedor de comentarios
      const commentTextArea = document.createElement('textarea');
      commentTextArea.placeholder = 'Escribe tu comentario aquí...';
      commentTextArea.style.width = '100%';
      commentTextArea.style.height = '100px';
      commentTextArea.style.resize = 'vertical';
      commentSection.appendChild(commentTextArea);

      const commentButton = document.createElement('button');
      commentButton.textContent = 'Comentar';
      commentButton.classList.add('btn');
      commentButton.classList.add('btn-primary');
      commentButton.classList.add('btn-comment'); // Agregamos una clase para identificar el botón de comentarios
      commentSection.appendChild(commentButton);

      const commentList = document.createElement('div'); // Contenedor para mostrar los comentarios
      commentList.classList.add('comment-list');
      commentSection.appendChild(commentList);

      listItem.appendChild(commentSection);

      // Agregar el elemento de lista a la lista de elementos
      itemList.appendChild(listItem);
    }

    // Evento click para el botón "Comentar"
    itemList.addEventListener('click', (event) => {
      const commentButton = event.target.closest('.btn-comment');
      if (commentButton) {
        const listItem = commentButton.closest('.list-group-item');
        const index = Array.from(itemList.parentElement.children).indexOf(listItem);
        const commentTextArea = listItem.querySelector('textarea');
        const comment = commentTextArea.value.trim();
        if (comment !== '') {
          addComment(listItem, comment); // Llamamos a la función para agregar el comentario
          commentTextArea.value = '';
        }
      }
    });
  }

  // Función para agregar un comentario a una publicación
  function addComment(listItem, comment) {
    const commentList = listItem.querySelector('.comment-list');

    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment-container'); // Clase para el contenedor de cada comentario

    const commentText = document.createElement('p');
    commentText.textContent = comment;
    commentContainer.appendChild(commentText);

    commentList.appendChild(commentContainer);
  }

  /* ---------------------------------- Botón para Eliminar Item ---------------------------------- */

  function createDeleteButton(listItem, index) {
    // Crear un botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'delete-button');
    deleteButton.textContent = 'Eliminar';

    // Agregar un evento click al botón de eliminar
    deleteButton.addEventListener('click', () => {
      // Mostrar una confirmación antes de eliminar el elemento
      const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este item?');
      if (confirmDelete) {
        // Eliminar el elemento del array 'items' y remover el elemento de la lista
        items.splice(index, 1);
        listItem.remove();
      }
    });

    // Devolver el botón de eliminar
    return deleteButton;
  }

  /* ---------------------------------- Cargar items predeterminados ---------------------------------- */

  function loadDefaultItems() {
    // Array con los elementos predeterminados
    const defaultItems = [
      {
        name: "Consejos para la ansiedad",
        description: "Aprende técnicas efectivas para manejar la ansiedad en tu vida diaria.",
        // Se utiliza la función `toLocaleDateString` para obtener la fecha actual formateada
        date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        imageUrl: "https://i.pinimg.com/originals/5a/96/82/5a9682044ee35ddd09401c3a961a5dc9.png"
      },
      {
        name: "Cuidado personal y bienestar",
        description: "Descubre la importancia de cuidar de ti mismo/a y aprender estrategias para mejorar tu bienestar emocional",
        date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        imageUrl: "https://escandala.com/wp-content/uploads/2021/04/INFO-Salud-mental-01-1.jpg"
      },
      {
        name: "Terapia individual",
        description: "Explora los beneficios de la terapia individual y cómo puede ayudarte a superar desafíos emocionales.",
        date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        imageUrl: "https://i.pinimg.com/736x/87/9f/84/879f842ce3727571136b6db1e3b1c67f.jpg"
      },
      {
        name: "Meditación y mindfulness",
        description: "Aprende técnicas de meditación y mindfulness para reducir el estrés y mejorar tu enfoque mental.",
        date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        imageUrl: "https://eurofitness.com/wp-content/uploads/2020/01/rutina-meditacion-mindfullness.jpg"
      },
      {
        name: "Consejos para mejorar la autoestima",
        description: "Descubre cómo fortalecer tu autoestima y desarrollar una imagen positiva de ti mismo/a.",
        date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        imageUrl: "https://www.hakunamatata.com.co/wp-content/uploads/2020/12/mejorar-autoestima.jpg"
      },
      {
        name: "Psicoterapia de pareja",
        description: "Obtén información sobre la psicoterapia de pareja y cómo puede fortalecer la comunicación y la intimidad en tu relación.",
        date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        imageUrl: "https://image.jimcdn.com/app/cms/image/transf/dimension=681x10000:format=png/path/s1cc52c3943ca9ea9/image/ie7ad1a22b4334dc8/version/1572290574/image.png"
      },
      {
        name: "Estrategias para manejar el estrés",
        description: "Aprende técnicas prácticas para lidiar con el estrés y mantener un equilibrio emocional en tu vida cotidiana.",
        date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        imageUrl: "https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/09/08133730/Mes-del-corazon-01.jpg"
      },
      {
        name: "Consejos para el autocuidado emocional",
        description: "Descubre la importancia de cuidar de tus emociones y cómo puedes incorporar el autocuidado emocional en tu rutina diaria.",
        date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        imageUrl: "https://cdn.somosestupendas.com/psicologia/20220906181226/Autocuidado-768x1024.jpg"
      },
      {
        name: "Terapia familiar",
        description: "Explora los beneficios de la terapia familiar y cómo puede fortalecer las relaciones y la comunicación dentro del núcleo familiar.",
        date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        imageUrl: "https://1.bp.blogspot.com/-_zUOMbHw7D4/WKrbxoo6nPI/AAAAAAAAAnM/ijkRq1woTtoPQop_FtXZdU9GzG06Hsb1QCLcB/s1600/TERAPIA%2BFAMILIAR%2BCON%2BNI%25C3%2591OS%2BY%2BADOLESCENTES.png"
      },
      {
        name: "Consejos para mejorar la gestión del tiempo",
        description: "Aprende estrategias efectivas para administrar tu tiempo de manera más eficiente y reducir el estrés asociado.",
        date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        imageUrl: "https://i.pinimg.com/736x/f9/3d/dd/f93dddbd2af131136f93ec0772851c3e.jpg"
      },
    ];

    // Asignar los elementos predeterminados al array 'items'
    items = defaultItems;
    renderItems();
  }

  // Llama a la función para cargar los elementos predeterminados
  loadDefaultItems();

});