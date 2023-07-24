/* ---------------------------------------------------------------------------------------------- */
/*                          FUNCIONALIDAD PARA PERFIL EN PANEL DE USUARIO                         */
/* ---------------------------------------------------------------------------------------------- */

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

    // Obtener las citas almacenadas en el Local Storage
    const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];

    // Mostrar las citas en la sección "Citas"
    const citasList = document.querySelector('#citas-list');
    citasGuardadas.forEach((cita) => {
        const citaItem = document.createElement('li');
        citaItem.textContent = `${cita.fecha} - ${cita.hora}, Terapeuta: ${cita.terapeuta}, Estado: ${cita.estado}`;
        citasList.appendChild(citaItem);
    });
});