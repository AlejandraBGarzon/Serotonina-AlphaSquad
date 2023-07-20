document.addEventListener('DOMContentLoaded', function () {
    // Obtener los valores almacenados en el Local Storage
    const name = localStorage.getItem('Name');
    const email = localStorage.getItem('Email');
    const num = localStorage.getItem('Num');

    // Mostrar los valores almacenados en la sección "Perfil"
    const nameElement = document.querySelector('#name-li');
    const emailElement = document.querySelector('#email-li');
    const numElement = document.querySelector('#num-li');

    nameElement.textContent += name;
    emailElement.textContent += email;
    numElement.textContent += num;
});