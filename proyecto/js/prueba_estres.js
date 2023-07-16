document.addEventListener('DOMContentLoaded', function () {
    let submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();

        let question1 = document.querySelector('input[name="question1"]:checked');
        let question2 = document.querySelector('input[name="question2"]:checked');
        let question3 = document.querySelector('input[name="question3"]:checked');
        let question4 = document.querySelector('input[name="question4"]:checked');
        let question5 = document.querySelector('input[name="question5"]:checked');
        let question6 = document.querySelector('input[name="question6"]:checked');
        let question7 = document.querySelector('input[name="question7"]:checked');
        let question8 = document.querySelector('input[name="question8"]:checked');

        if (question1 && question2 && question3 && question4 && question5 && question6 && question7 && question8) {
            let score = parseInt(question1.value) + parseInt(question2.value) + parseInt(question3.value) + parseInt(question4.value) + parseInt(question5.value) + parseInt(question6.value) + parseInt(question7.value) + parseInt(question8.value);

            // Función para obtener el nivel de estrés y descripción correspondiente según la puntuación
            function getStressLevel(score) {
                let scale = [
                    { score: 8, level: 'Muy bajo', description: 'Tu nivel de estrés es muy bajo. Es posible que no experimentes una gran cantidad de estrés en tu vida cotidiana.', recommendation: 'Sigue practicando técnicas de relajación y manejo del estrés para mantener un equilibrio saludable.' },
                    { score: 16, level: 'Bajo', description: 'Tu nivel de estrés es bajo. Experimentas algo de estrés, pero no de manera significativa.', recommendation: 'Continúa manteniendo hábitos saludables y encuentra actividades que te ayuden a reducir el estrés.' },
                    { score: 24, level: 'Moderado', description: 'Tu nivel de estrés es moderado. Experimentas una cantidad promedio de estrés en situaciones estresantes.', recommendation: 'Considera implementar técnicas de manejo del estrés, como ejercicios de respiración y tiempo dedicado a ti mismo/a.' },
                    { score: 32, level: 'Alto', description: 'Tu nivel de estrés es alto. Experimentas una cantidad significativa de estrés en varias áreas de tu vida.', recommendation: 'Es recomendable buscar la ayuda de un profesional de la salud o un terapeuta especializado en estrés para obtener apoyo adicional y desarrollar estrategias de manejo del estrés.' },
                    { score: 40, level: 'Muy alto', description: 'Tu nivel de estrés es muy alto. El estrés puede estar teniendo un impacto significativo en tu bienestar y funcionamiento diario.', recommendation: 'Te recomendamos buscar ayuda profesional lo antes posible. Un profesional de la salud mental puede ayudarte a identificar y manejar eficazmente el estrés.' }
                ];

                for (let i = 0; i < scale.length; i++) {
                    if (score <= scale[i].score) {
                        return scale[i];
                    }
                }
            }

            let stressLevel = getStressLevel(score);

            // Muestra los resultados en el documento HTML
            let resultsSection = document.getElementById('results');
            resultsSection.innerHTML = '<h3>Resultados de la prueba:</h3>' +
                '<p>Tu puntuación de estrés es: ' + score + '</p>' +
                '<p>Nivel de estrés: ' + stressLevel.level + '</p>' +
                '<p>' + stressLevel.description + '</p>' +
                '<p>' + stressLevel.recommendation + '</p>';

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
