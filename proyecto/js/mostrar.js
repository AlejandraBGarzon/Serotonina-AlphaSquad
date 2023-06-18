document.addEventListener('DOMContentLoaded', function() {
  const addItemButton = document.getElementById('add-item-button');
  const addItemFormContainer = document.getElementById('add-item-form-container');
  const exploreButton = document.getElementById('explore-button');
  const exploreContainer = document.getElementById('explore-container');
  const itemForm = document.getElementById('item-form');
  const imgTypeSelect = document.getElementById('img-type-select');
  const urlInputContainer = document.getElementById('url-input-container');
  const fileInputContainer = document.getElementById('file-input-container');
  const itemList = document.getElementById('explore-list');
  const footer = document.getElementById('footer');

  // Función para ajustar la altura del contenedor principal y el footer
  function adjustContainerHeight() {
    const contentHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    const footerHeight = footer.offsetHeight;
    const mainMarginTop = parseFloat(getComputedStyle(itemList).marginTop);
    const mainOffset = mainMarginTop + itemList.offsetHeight;
    exploreContainer.style.height = `calc(${contentHeight}px - ${footerHeight}px - ${mainOffset}px)`;
  }

  // Función para ajustar la altura del contenedor principal al mostrar u ocultar los contenidos
  function adjustContainerHeightOnContentChange() {
    const contentHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    const footerHeight = footer.offsetHeight;
    const mainMarginTop = parseFloat(getComputedStyle(itemList).marginTop);
    const mainOffset = mainMarginTop + itemList.offsetHeight;
    const contentOffset = exploreContainer.offsetHeight - exploreContainer.clientHeight;
    exploreContainer.style.height = `calc(${contentHeight - contentOffset}px - ${footerHeight}px - ${mainOffset}px)`;
  }

  // Ajustar la altura del contenedor principal al cargar la página
  adjustContainerHeight();

  // Ajustar la altura del contenedor principal al cambiar el tamaño de la ventana
  window.addEventListener('resize', adjustContainerHeight);

  // Mostrar u ocultar el formulario de agregar elemento
  addItemButton.addEventListener('click', function() {
    addItemFormContainer.classList.toggle('hidden');
    adjustContainerHeightOnContentChange();
  });

  // Mostrar u ocultar el contenedor de exploración
  exploreButton.addEventListener('click', function() {
    exploreContainer.classList.toggle('hidden');
    adjustContainerHeightOnContentChange();
  });

  // Resto del código...
});
