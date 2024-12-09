const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';
let allPokemonsData = []

fetch(`${POKEMON_URL}?limit=20`)
    .then(response => response.json())
    .then(responseJson => {
        const pokemonPromises = responseJson.results.map(pokemon =>
            fetch(pokemon.url).then(res => res.json())
        );

        Promise.all(pokemonPromises).then(pokemonDetails => {
            allPokemonsData = pokemonDetails;
        });
    });

function App(props) {
    return (
        <div>
            <h1>Hello, React!</h1>
            <PokemonList pokemons={props.pokemons} />
        </div>
    );
}
//search i list
root.render(<App pokemons={allPokemonsData} />);