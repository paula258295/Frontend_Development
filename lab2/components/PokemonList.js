function PokemonList(props) {
    return <div>{props.pokemons.map((pokemon) => <Pokemon key={pokemon.name} pokemon={pokemon}/>)}</div>
}