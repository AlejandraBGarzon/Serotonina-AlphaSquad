document.addEventListener('DOMContentLoaded', function () {
  const addItemButton = document.getElementById('add-item-button');
  const addItemFormContainer = document.getElementById('add-item-form-container');
  const exploreButton = document.getElementById('explore-button');
  const exploreContainer = document.getElementById('explore-container');
  const itemForm = document.getElementById('item-form');
  const imgTypeSelect = document.getElementById('img-type-select');
  const urlInputContainer = document.getElementById('url-input-container');
  const fileInputContainer = document.getElementById('file-input-container');
  const itemList = document.getElementById('explore-list');

  tinymce.init({
    selector: '#description-input',
    height: 300,
    toolbar: 'undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

  let items = [];

  itemForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('name-input');
    const descriptionInput = tinymce.get('description-input');
    const urlInput = document.getElementById('url-input');
    const fileInput = document.getElementById('file-input');

    const name = nameInput.value.trim();
    const description = descriptionInput.getContent({ format: 'html' });

    if (name !== '' && description !== '') {
      const confirmPublish = confirm('¿Estás seguro de que quieres publicar este item?');
      if (confirmPublish) {
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

        if (exploreContainer.style.display === 'none') {
          exploreContainer.style.display = 'block';
        }

        // Redirigir al usuario a la sección de Explorar Comunicaciones
        window.location.href = '#explore-container';


        // Resto del código para guardar el nuevo elemento

        if (imgTypeSelect.value === 'url' && urlInput.value.trim() !== '') {
          newItem.imageUrl = urlInput.value.trim();
          saveNewItem(newItem);
        } else if (imgTypeSelect.value === 'file' && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          const reader = new FileReader();
          reader.onload = function (e) {
            newItem.imageUrl = e.target.result;
            saveNewItem(newItem);
          };
          reader.readAsDataURL(file);
        } else {
          saveNewItem(newItem);
        }
      }
    }
  });

  function saveNewItem(newItem) {
    items.push(newItem);
    renderItems();

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
    itemList.scrollTop = itemList.scrollHeight;
  }

  imgTypeSelect.addEventListener('change', function () {
    const selectedValue = this.value;

    if (selectedValue === 'url') {
      urlInputContainer.style.display = 'block';
      fileInputContainer.style.display = 'none';
    } else if (selectedValue === 'file') {
      urlInputContainer.style.display = 'none';
      fileInputContainer.style.display = 'block';
    } else {
      urlInputContainer.style.display = 'none';
      fileInputContainer.style.display = 'none';
    }
  });

  addItemButton.addEventListener('click', function () {
    if (addItemFormContainer.style.display === 'block') {
      addItemFormContainer.style.display = 'none';
    } else {
      addItemFormContainer.style.display = 'block';
    }
  });

  exploreButton.addEventListener('click', function () {
    if (exploreContainer.style.display === 'block') {
      exploreContainer.style.display = 'none';
    } else {
      exploreContainer.style.display = 'block';
    }
  });

  function renderItems() {
    itemList.innerHTML = '';
  
    // Ordenar los elementos por fecha de forma descendente (más reciente primero)
    const sortedItems = items.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    for (let i = 0; i < sortedItems.length; i++) {
      const item = sortedItems[i];
  
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.classList.add('item');
  
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
  
      if (item.imageUrl) {
        const imageElement = document.createElement('img');
        imageElement.src = item.imageUrl;
        imageElement.classList.add('item-image');
        imageElement.style.maxWidth = '50%';
        imageElement.style.height = 'auto';
        imageContainer.appendChild(imageElement);
      }
  
      const nameElement = document.createElement('h4');
      nameElement.classList.add('item-name');
      nameElement.textContent = item.name;
  
      const descriptionElement = document.createElement('div');
      descriptionElement.classList.add('item-description');
      descriptionElement.innerHTML = item.description;
  
      const dateElement = document.createElement('p');
      dateElement.classList.add('item-date');
      dateElement.textContent = 'Publicado el ' + item.date;
  
      listItem.appendChild(imageContainer);
      listItem.appendChild(nameElement);
      listItem.appendChild(descriptionElement);
      listItem.appendChild(dateElement);
  
      const deleteButton = createDeleteButton(listItem, i);
      listItem.appendChild(deleteButton);
  
      itemList.appendChild(listItem);
    }
  }
  

  function createDeleteButton(listItem, index) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'delete-button');
    deleteButton.textContent = 'Eliminar';

    deleteButton.addEventListener('click', () => {
      const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este item?');
      if (confirmDelete) {
        items.splice(index, 1);
        listItem.remove();
      }
    });

    return deleteButton;
  }

  function loadDefaultItems() {
    const defaultItems = [
      {
        name: "Consejos para la ansiedad",
        description: "Aprende técnicas efectivas para manejar la ansiedad en tu vida diaria.",
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

    items = defaultItems;
    renderItems();
  }

  // Llama a la función para cargar los elementos predeterminados
  loadDefaultItems();

});
