const tipos = {
  fire: "🔥 Fuego",
  water: "💧 Agua",
  grass: "🌿 Planta",
  electric: "⚡ Eléctrico",
  psychic: "🔮 Psíquico",
  ice: "❄️ Hielo",
  dragon: "🐉 Dragón",
  dark: "🌑 Siniestro",
  fairy: "🌸 Hada",
  normal: "⭐ Normal",
  fighting: "🥊 Lucha",
  flying: "🦅 Volador",
  poison: "☠️ Veneno",
  ground: "🌍 Tierra",
  rock: "🪨 Roca",
  bug: "🐛 Bicho",
  ghost: "👻 Fantasma",
  steel: "⚙️ Acero",
};

const contenedor = document.getElementById("contenedor-api");
const buscador = document.getElementById("buscador");
const msgBuscador = document.getElementById("msgBuscador");

let todosLosPokemons = [];

const cargarPokemons = async () => {
  contenedor.innerHTML = `<p class="loading">Cargando...</p>`;

  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    if (!response.ok) throw new Error("Error al obtener datos de la API");

    const data = await response.json();

    
    const detallados = await Promise.all(
      data.results.map(p => fetch(p.url).then(r => r.json()))
    );

    todosLosPokemons = detallados;
    renderPokemons(todosLosPokemons);

  } catch (error) {
    contenedor.innerHTML = `<p class="error">❌ ${error.message}</p>`;
  }
};

const renderPokemons = (lista) => {
  if (lista.length === 0) {
    contenedor.innerHTML = `<p class="empty">No se encontraron resultados.</p>`;
    return;
  }

  contenedor.innerHTML = lista.map(p => `
    <div class="card">
      <img src="${p.sprites.other['official-artwork'].front_default}"
      <h3>${p.name}</h3>
      <p>ID: ${p.id}</p>
     <p>Tipo: ${p.types.map(t => tipos[t.type.name] || t.type.name).join(" · ")}</p>
    </div>
  `).join("");
};

buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase().trim();

  if (texto.length < 3) {
    msgBuscador.textContent = "Escribí al menos 3 caracteres para buscar.";
    renderPokemons(todosLosPokemons);
    return;
  }

  msgBuscador.textContent = "Buscando...";
  const filtrados = todosLosPokemons.filter(p => p.name.includes(texto));
  msgBuscador.textContent = "";

  if (filtrados.length === 0) {
    contenedor.innerHTML = `<p class="empty">No se encontraron resultados.</p>`;
  } else {
    renderPokemons(filtrados);
    
  }
});

cargarPokemons();