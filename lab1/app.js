const pokemonListEl = document.getElementById('pokemon-list');
const pokemonDetailsEl = document.getElementById('pokemon-details');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const backHomeBtn = document.getElementById('back-home-btn');
const loadingIndicator = document.getElementById('loading-indicator');
const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';

let allPokemonsData = [];

const loadAllPokemons = () => {
    loadingIndicator.style.display = 'block';

    fetch(`${POKEMON_URL}?limit=20`)
        .then(response => response.json())
        .then(responseJson => {
            const pokemonPromises = responseJson.results.map(pokemon =>
                fetch(pokemon.url).then(res => res.json())
            );

            Promise.all(pokemonPromises).then(pokemonDetails => {
                allPokemonsData = pokemonDetails;
                displayAllPokemons(allPokemonsData);
                loadingIndicator.style.display = 'none';
            });
        });
};

const displayAllPokemons = (pokemons) => {
    pokemonListEl.innerHTML = '';
    pokemons.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        const pokemonNumber = pokemon.id;
        pokemonCard.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <p>#${pokemonNumber} ${pokemon.name}</p>
        `;
        pokemonCard.addEventListener('click', () => {
            displayPokemonDetails(pokemon);
        });
        pokemonListEl.appendChild(pokemonCard);
    });
};

const displayPokemonDetails = (pokemon) => {
    pokemonListEl.style.display = 'none';
    pokemonDetailsEl.style.display = 'block';
    const pokemonNumber = pokemon.id;
    const stats = pokemon.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
    }, {});

    pokemonDetailsEl.innerHTML = `
        <div class="details-card">
            <h2>${pokemon.name.toUpperCase()} (#${pokemonNumber})</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
            <p><strong>Types:</strong> ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <p><strong>HP:</strong> ${stats.hp}</p>
            <p><strong>Attack:</strong> ${stats.attack}</p>
            <p><strong>Defense:</strong> ${stats.defense}</p>
            <p><strong>Speed:</strong> ${stats.speed}</p>
            <button class="back-button" id="back-to-home-btn">Back</button>
        </div>
    `;

    const backToHomeButton = document.getElementById('back-to-home-btn');
    backToHomeButton.addEventListener('click', () => {
        pokemonListEl.style.display = 'flex';
        pokemonDetailsEl.style.display = 'none';
    });
};

const searchPokemon = () => {
    loadingIndicator.style.display = 'block';
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        pokemonListEl.innerHTML = '<p>Please enter a Pokémon name!</p>';
        loadingIndicator.style.display = 'none';
        return;
    }

    fetch(`${POKEMON_URL}${query}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Pokémon not found!');
                } else if (response.status >= 500) {
                    throw new Error('Server error, please try again later!');
                } else {
                    throw new Error('An unknown error occurred, please try again!');
                }
            }
            return response.json();
        })
        .then(pokemonData => {
            displayPokemon(pokemonData);
            loadingIndicator.style.display = 'none';
        })
        .catch(error => {
            pokemonListEl.innerHTML = `<p>${error.message}</p>`;
            loadingIndicator.style.display = 'none';
        });
};

const displayPokemon = (pokemon) => {
    pokemonListEl.innerHTML = '';
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    const pokemonNumber = pokemon.id;
    pokemonCard.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        <p>#${pokemonNumber} ${pokemon.name}</p>
    `;
    pokemonCard.addEventListener('click', () => {
        displayPokemonDetails(pokemon);
    });
    pokemonListEl.appendChild(pokemonCard);
};

searchBtn.addEventListener('click', searchPokemon);

backHomeBtn.addEventListener('click', () => {
    searchInput.value = '';
    pokemonListEl.style.display = 'flex';
    pokemonDetailsEl.style.display = 'none';
    pokemonListEl.innerHTML = '';
    loadAllPokemons();
});

document.addEventListener('DOMContentLoaded', loadAllPokemons);