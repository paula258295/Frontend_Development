function PokemonDetails(props) {

    function onClick() {
        renderPokemons();
        root2.render(null);
    }
    const stats = props.pokemon.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
    }, {});

    return (
        <div class="details-card"> 
            <h2>{props.pokemon.name.toUpperCase()} (#{props.pokemon.id})</h2>
            <img src={props.pokemon.sprites.front_default} />
            <p><strong>Height:</strong> {props.pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> {props.pokemon.weight / 10} kg</p>
            <p><strong>Types:</strong> {props.pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <p><strong>HP:</strong> {stats.hp}</p>
            <p><strong>Attack:</strong> {stats.attack}</p>
            <p><strong>Defense:</strong> {stats.defense}</p>
            <p><strong>Speed:</strong> {stats.speed}</p>
            <button class="button" onClick={onClick}>Go Back</button>
        </div>
    );
}