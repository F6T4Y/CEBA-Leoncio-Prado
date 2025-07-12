document
  .getElementById("quizForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let puntaje = 0;
    const totalPreguntas = 10;

    const respts = {
      q1: "A",
      q2: "B",
      q3: "120",
      q4: "A",
      q5: "A",
      q6: "2.5",
      q7: "A",
      q8: "B",
      q9: "3",
      q10: "B",
    };

    for (let i = 1; i <= totalPreguntas; i++) {
      const pregunta = document.querySelector(`input[name="q${i}"]`);
      const preguntaDiv = pregunta.closest(".question");

      if (pregunta.type === "radio") {
        const valorSelec = document.querySelector(`input[name="q${i}"]:checked`)?.value;
        if (valorSelec === respts[`q${i}`]) {
          puntaje++;
          preguntaDiv.classList.add("correct");
        } else {
          preguntaDiv.classList.add("incorrect");
        }
      } else {
        const respUser = pregunta.value.trim();
        if (respUser === respts[`q${i}`]) { 
          puntaje++;
          preguntaDiv.classList.add("correct");
        } else {
          preguntaDiv.classList.add("incorrect");
        }
      }
    }

    document.getElementById("score").innerHTML = `Puntaje obtenido: ${puntaje} de ${totalPreguntas}`;
  });

          
