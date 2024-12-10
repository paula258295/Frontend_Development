function PokemonList(props) {
    return <div>{props.pokemons.map((pokemon) => <PokemonOnList key={pokemon.name} pokemon={pokemon}/>)}</div>
}