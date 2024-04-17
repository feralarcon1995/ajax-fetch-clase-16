const API_URL = "https://pokeapi.co/api/v2/pokemon";
const container = document.querySelector('.container');
const searchForm = document.querySelector('#search-form');

fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Hubo un problema al obtener los datos.');
    }

    return response.json();
  })
  .then(data => {
    data.results.forEach(pokemon => {
      fetch(pokemon.url)
        .then(response => response.json())
        .then(data => mostrarPokemones(data))
        .catch(error => console.error(('Hubo un error', error.message)))
    })
  })
  .catch(error => console.error(('Hubo un error', error.message)));



function mostrarPokemones(pokemon) {
  console.log(pokemon.types[0].type.name);
  container.innerHTML +=
    `<article class="pokemon">
        <div class="img-container">
          <span class=${pokemon.types[0]?.type.name}></span>
          <img src=${pokemon.sprites.other.dream_world.front_default} alt="">
        </div>
        <div class="pokemon-content">
          <h2>${pokemon.name}</h2>
          <p>
            <span class=${pokemon.types[0]?.type.name}>${pokemon.types[0]?.type.name}</span> 
            ${pokemon.types[1]?.type.name ? `<span class=${pokemon.types[1]?.type.name}>${pokemon.types[1]?.type.name}</span>` : ''} 
          </p>
        </div>
      </article>`;
}


// buscador

function buscarPokemon(e) {
  e.preventDefault()

  const name = document.querySelector('#search').value.trim().toLowerCase();
  const searchType = document.querySelector('select').value.toLowerCase();

  if (searchType == 'name') {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los datos.');
        }

        return response.json();
      })
      .then(data => {
        mostrarPokemones(data)
      })
      .catch(error => console.error(('Hubo un error', error.message)))
  } else if (searchType == 'type') {
    fetch(`https://pokeapi.co/api/v2/type/${name}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los datos.');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error(('Hubo un error', error.message)))
  }
}


searchForm.addEventListener('submit', buscarPokemon);