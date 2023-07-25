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

      // Función para obtener el nivel de ansiedad y descripción correspondiente según la puntuación
      function getAnxietyLevel(score) {
        let scale = [
          { score: 8, level: 'Muy bajo', description: 'Tus niveles de ansiedad son muy bajos. Es posible que no experimentes una gran cantidad de ansiedad en tu vida cotidiana.', recommendation: 'Continúa manteniendo hábitos saludables para el bienestar emocional y busca actividades que te ayuden a manejar el estrés.' },
          { score: 16, level: 'Bajo', description: 'Tus niveles de ansiedad son bajos. Experimentas algo de ansiedad, pero no de manera significativa.', recommendation: 'Sigue practicando técnicas de relajación y mindfulness para mantener tu bienestar emocional.' },
          { score: 24, level: 'Moderado', description: 'Tus niveles de ansiedad son moderados. Experimentas una cantidad promedio de ansiedad en situaciones estresantes.', recommendation: 'Considera hablar con un profesional de la salud mental para obtener apoyo adicional y aprender estrategias de manejo de la ansiedad.' },
          { score: 32, level: 'Alto', description: 'Tus niveles de ansiedad son altos. Experimentas una cantidad significativa de ansiedad en varias áreas de tu vida.', recommendation: 'Es recomendable buscar la ayuda de un profesional de la salud mental para obtener un diagnóstico y un plan de tratamiento adecuados.' },
          { score: 40, level: 'Muy alto', description: 'Tus niveles de ansiedad son muy altos. La ansiedad puede estar teniendo un impacto significativo en tu bienestar y funcionamiento diario.', recommendation: 'Te recomendamos buscar ayuda profesional lo antes posible. Un terapeuta especializado en salud mental puede ayudarte a desarrollar estrategias de manejo de la ansiedad y mejorar tu calidad de vida.' }
        ];

        for (let i = 0; i < scale.length; i++) {
          if (score <= scale[i].score) {
            return scale[i];
          }
        }
      }

      let anxietyLevel = getAnxietyLevel(score);

      // Muestra los resultados en el documento HTML
      let resultsSection = document.getElementById('results');
      resultsSection.innerHTML = '<h3>Resultados de la prueba:</h3>' +
        '<p>Tu puntuación de ansiedad es: ' + score + '</p>' +
        '<p>Nivel de ansiedad: ' + anxietyLevel.level + '</p>' +
        '<p>' + anxietyLevel.description + '</p>' +
        '<p>' + anxietyLevel.recommendation + '</p>';

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
