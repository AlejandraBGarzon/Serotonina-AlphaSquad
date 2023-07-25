document.addEventListener('DOMContentLoaded', function () {
    let submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();

        // Obtener respuestas seleccionadas
        let question1 = document.querySelector('input[name="question1"]:checked');
        let question2 = document.querySelector('input[name="question2"]:checked');
        let question3 = document.querySelector('input[name="question3"]:checked');
        // Agrega aquí las variables para las demás preguntas...

        // Verificar que todas las preguntas estén respondidas
        if (question1 && question2 && question3 /* && ... */) {
            // Calcular puntuación
            let score = parseInt(question1.value) + parseInt(question2.value) + parseInt(question3.value) /* + ... */;

            // Función para obtener el nivel de autoestima y descripción correspondiente según la puntuación
            function getSelfEsteemLevel(score) {
                let scale = [
                    { score: 3, level: 'Muy bajo', description: 'Tus niveles de autoestima son muy bajos. Puedes sentirte inseguro/a y tener dificultades para valorarte a ti mismo/a.' },
                    { score: 6, level: 'Bajo', description: 'Tus niveles de autoestima son bajos. Puedes tener momentos de duda y sentirte crítico/a contigo mismo/a.' },
                    { score: 9, level: 'Moderado', description: 'Tus niveles de autoestima son moderados. En general, tienes una opinión equilibrada de ti mismo/a, pero aún puedes mejorar.' },
                    { score: 12, level: 'Alto', description: 'Tus niveles de autoestima son altos. Te valoras y tienes confianza en tus habilidades y capacidades.' },
                    { score: 15, level: 'Muy alto', description: 'Tus niveles de autoestima son muy altos. Te sientes seguro/a y satisfecho/a contigo mismo/a en la mayoría de las situaciones.' }
                ];

                for (let i = 0; i < scale.length; i++) {
                    if (score <= scale[i].score) {
                        return scale[i];
                    }
                }
            }

            let selfEsteemLevel = getSelfEsteemLevel(score);

            // Muestra los resultados en el documento HTML
            let resultsSection = document.getElementById('results');
            resultsSection.innerHTML = '<h3>Resultados de la prueba:</h3>' +
                '<p>Tu puntuación de autoestima es: ' + score + '</p>' +
                '<p>Nivel de autoestima: ' + selfEsteemLevel.level + '</p>' +
                '<p>' + selfEsteemLevel.description + '</p>';

            // Restablece las respuestas seleccionadas
            document.querySelector('form').reset();

            // Animación de desplazamiento suave hacia la sección de resultados
            resultsSection.scrollIntoView({ behavior: 'smooth' });

        } else {
            // Mostrar alerta con SweetAlert
            Swal.fire({
                icon: 'warning',
                title: 'Respuestas incompletas',
                text: 'Por favor, responde todas las preguntas antes de enviar la prueba.',
            });
        }
    });
});