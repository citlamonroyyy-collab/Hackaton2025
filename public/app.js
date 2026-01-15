let map;
let directionsService;
let directionsRenderer;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 19.4326, lng: -99.1332 },
    zoom: 12,
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
  });
}

// Analiza el texto
function interpretarTexto(texto) {
  const lower = texto.toLowerCase();

  const avoidTolls =
    lower.includes("sin peajes") || lower.includes("evitar peajes");

  const fastest =
    lower.includes("rápido") ||
    lower.includes("más rápido") ||
    lower.includes("menor tiempo");

  // Limpiar frases comunes
  let limpio = lower
  .replace("llévame", "")
  .replace("lleva me", "")
  .replace("quiero ir", "")
  .replace("ruta", "")
  .replace("desde", "")
  .replace("del", "")
  .replace("de", "")
  .replace("sin peajes", "")
  .replace("evitar peajes", "")
  .replace("más rápido", "")
  .replace("rapido", "")
  .replace("rápido", "")
  .replace("menor tiempo", "")
  .replace(/\s+/g, " ")
  .trim();



  // Detectar separador
  let separador = null;
  if (limpio.includes(" al ")) separador = " al ";
  else if (limpio.includes(" a ")) separador = " a ";
  else if (limpio.includes(" hasta ")) separador = " hasta ";

  if (!separador) return null;

  const partes = limpio.split(separador);
  if (partes.length !== 2) return null;

  return {
    origin: partes[0].trim(),
    destination: partes[1].trim(),
    avoidTolls,
    fastest,
  };
}

function calcularRuta() {
  const texto = document.getElementById("texto").value;
  const datos = interpretarTexto(texto);

  if (!datos) {
    alert("No pude entender el origen y destino");
    return;
  }

  const request = {
    origin: datos.origin,
    destination: datos.destination,
    travelMode: google.maps.TravelMode.DRIVING,
    avoidTolls: datos.avoidTolls,
    drivingOptions: datos.fastest
      ? {
          departureTime: new Date(),
          trafficModel: "bestguess",
        }
      : undefined,
  };

  directionsService.route(request, (result, status) => {
    if (status === "OK") {
      directionsRenderer.setDirections(result);

      const leg = result.routes[0].legs[0];
      document.getElementById("info").innerText =
        ` Distancia: ${leg.distance.text} |  Duración: ${leg.duration.text}`;
    } else {
      alert("Error al calcular la ruta: " + status);
    }
  });
}
