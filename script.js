document.getElementById("validarBtn").addEventListener("click", validarRuta);

const reglasPorCliente = {
  corporativo: {
    duracionMax: 90,
    paradasMax: 10,
    pesoHorarioPico: 1,
    nombre: "Corporativo"
  },
  escolar: {
    duracionMax: 60,
    paradasMax: 10,
    pesoHorarioPico: 2,
    nombre: "Escolar"
  },
  turistico: {
    duracionMax: 180,
    paradasMax: 20,
    pesoHorarioPico: 1,
    nombre: "Turístico"
  }
};

function validarRuta() {
  const duracionInput = document.getElementById("duracion").value;
  const paradasInput = document.getElementById("paradas").value;
  const horario = document.getElementById("horario").value;
  const cliente = document.getElementById("cliente").value;

  const resultado = document.getElementById("resultado");
  const estado = document.getElementById("estado");
  const motivos = document.getElementById("motivos");

  motivos.innerHTML = "";
  resultado.style.display = "block";
  resultado.className = "resultado";

  if (duracionInput === "" || paradasInput === "" || !cliente || !horario) {
    estado.textContent = " Análisis no disponible";
    motivos.innerHTML =
      "<li>Faltan datos obligatorios para evaluar la ruta.</li>";
    resultado.classList.add("warning");
    return;
  }

  const duracion = Number(duracionInput);
  const paradas = Number(paradasInput);
  const config = reglasPorCliente[cliente];

  let alertas = 0;
  let notaInformativa = false;

  // Duración
  if (duracion > config.duracionMax) {
    alertas++;
    motivos.innerHTML += `<li>El tiempo estimado supera los ${config.duracionMax} minutos recomendados.</li>`;
  }

  // Paradas
  if (paradas > config.paradasMax) {
    alertas++;
    motivos.innerHTML += `<li>La ruta tiene más paradas de las recomendadas para un cliente ${config.nombre}.</li>`;
  }

  // Horario pico 
  if (horario === "pico") {
    if (paradas < 5) {

      // La ruta sigue siendo viable 
      notaInformativa = true;
      motivos.innerHTML += `<li>La ruta se opera en horario pico, pero el número de paradas es bajo y no representa un riesgo significativo.</li>`;
    } else {
      alertas += config.pesoHorarioPico;
      motivos.innerHTML += `<li>Horario pico combinado con varias paradas puede generar retrasos.</li>`;
    }
  }

  if (alertas === 0 && !notaInformativa) {
    estado.textContent = "Ruta óptima";
    resultado.classList.add("ok");
  } else if (alertas === 0 && notaInformativa) {
    estado.textContent = "Ruta viable con monitoreo";
    resultado.classList.add("neutral");
  } else if (alertas <= 2) {
    estado.textContent = "Ruta viable, pero requiere ajustes";
    resultado.classList.add("warning");
  } else {
    estado.textContent = "Ruta no recomendada en su forma actual";
    resultado.classList.add("danger");
  }
}
