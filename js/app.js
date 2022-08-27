//Variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//Contenedor
const resultado = document.querySelector("#resultado");
const yearMax = new Date().getFullYear();
const yearMin = yearMax - 10;

const datosAutos = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

//Eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); //Muestra los autos al cargar
  yearSelect(); //LLena las opciones de years
});

//Even listener para los select de busquedas
marca.addEventListener("change", (e) => {
  datosAutos.marca = e.target.value;
  filtrarAuto();
});

year.addEventListener("change", (e) => {
  datosAutos.year = parseInt(e.target.value);
  filtrarAuto();
});

minimo.addEventListener("change", (e) => {
  datosAutos.minimo = e.target.value;
  filtrarAuto();
});

maximo.addEventListener("change", (e) => {
  datosAutos.maximo = e.target.value;
  filtrarAuto();
});

puertas.addEventListener("change", (e) => {
  datosAutos.puertas = parseInt(e.target.value);
  filtrarAuto();
});

transmision.addEventListener("change", (e) => {
  datosAutos.transmision = e.target.value;
  filtrarAuto();
});

color.addEventListener("change", (e) => {
  datosAutos.color = e.target.value;
  filtrarAuto();
});

//Funciones
function mostrarAutos(autos) {
  limpiarHTML();
  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autoHTML = document.createElement("p");
    autoHTML.textContent = `
    ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color}
    `;
    resultado.appendChild(autoHTML);
  });
}

//Funcion que limpia el HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

//Gener los year del select
function yearSelect() {
  for (let i = yearMax; i >= yearMin; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion); //Agrega las opciones de year al select
  }
}

//Funcion que filtra en base a la busqueda
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHTML();
  const noResultado = document.createElement("div");
  noResultado.classList.add("alerta", "error");
  noResultado.textContent = "No se encontraron resultados";
  resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
  const { marca } = datosAutos;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto) {
  const { year } = datosAutos;
  if (year) {
    return auto.year === year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datosAutos;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  const { maximo } = datosAutos;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosAutos;
  if (puertas) {
    return auto.puertas === puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = datosAutos;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = datosAutos;
  if (color) {
    return auto.color === color;
  }
  return auto;
}
