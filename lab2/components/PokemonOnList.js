const rootElement2 = document.getElementById('pokemonDetails');
const root2 = ReactDOM.createRoot(rootElement2);

function PokemonOnList(props) {
    // console.log(props.pokemon)
    function onClick() {
        root.render(null);
        root2.render(<PokemonDetails pokemon={props.pokemon} />);
    }

    return (
        <button className="pokemon-card" onClick={onClick}> 
        <img src={props.pokemon.sprites.front_default}/>
        <div className="name">#{props.pokemon.id} {props.pokemon.name}</div>
        </button>
    );
}


