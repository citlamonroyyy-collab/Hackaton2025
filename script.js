document.getElementById("validarBtn").addEventListener("click", validarRuta);

function validarRuta() {
  const duracion = Number(document.getElementById("duracion").value);
  const paradas = Number(document.getElementById("paradas").value);
  const horario = document.getElementById("horario").value;
  const cliente = document.getElementById("cliente").value;

  const resultado = document.getElementById("resultado");
  const estado = document.getElementById("estado");
  const motivos = document.getElementById("motivos");

  let alertas = 0;
  motivos.innerHTML = "";

  if (duracion > 90) {
    alertas++;
    motivos.innerHTML += "<li>Duración mayor a 90 minutos</li>";
  }

  if (paradas > 5) {
    alertas++;
    motivos.innerHTML += "<li>Demasiadas paradas</li>";
  }

  if (horario === "pico") {
    alertas++;
    motivos.innerHTML += "<li>Ruta en horario pico</li>";
  }

  if (cliente === "corporativo" && paradas > 4) {
    alertas++;
    motivos.innerHTML += "<li>Cliente corporativo con muchas paradas</li>";
  }

  resultado.style.display = "block";
  resultado.className = "resultado";

  if (alertas === 0) {
    estado.textContent = "✅ Ruta viable";
    resultado.classList.add("ok");
  } else if (alertas <= 2) {
    estado.textContent = "⚠️ Ruta viable con ajustes";
    resultado.classList.add("warning");
  } else {
    estado.textContent = "❌ Ruta con alto riesgo operativo";
    resultado.classList.add("danger");
  }
}
