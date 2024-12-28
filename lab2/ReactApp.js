const rootElement = document.getElementById('pokemonList');
const root = ReactDOM.createRoot(rootElement);
const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';

function App(props) {
    
    function onClick() {
        const searchInput = document.getElementById('search-input')
        const name = searchInput.value.trim().toLowerCase();
        renderSearchedPokemons(name)
    }
    function onClickMainPage() {
        const searchInput = document.getElementById('search-input')
        searchInput.value=''
        renderPokemons()
    }

    return (
        <div>
            <h1>Pokemon searcher</h1>
            <input type="text" id="search-input" placeholder="Enter Pokemon name..."/>
            <button className="button" onClick={onClick}>Search</button>
            <button className="button" onClick={onClickMainPage}>Main Page</button>
            {props.error?<div>{props.error}</div>:null}
            <PokemonList pokemons={props.pokemons} />
        </div>
    );
}

function renderPokemons() {
    fetch(`${POKEMON_URL}?limit=20`)
        .then(response => response.json())
        .then(responseJson => {
            const pokemonPromises = responseJson.results.map(pokemon =>
                fetch(pokemon.url).then(res => res.json())
            );

            Promise.all(pokemonPromises).then(pokemonDetails => {
                root.render(<App pokemons={pokemonDetails} />);
            });
        });
}

function renderSearchedPokemons(query) {
    if (!query) {
        root.render(<App pokemons={[]} error={'Please enter Pokemon name'} />);
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
        .then(pokemonDetails => {
            root.render(<App pokemons={[pokemonDetails]} />);
        })
        .catch(error => {
            root.render(<App pokemons={[]} error={error.message} />);
        });
}

renderPokemons()