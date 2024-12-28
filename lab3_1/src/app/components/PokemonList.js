import PokemonOnList from "./PokemonOnList"

export default function PokemonList(props) {
    return <div className='pokemon-list'>{props.pokemons.map((pokemon) => <PokemonOnList key={pokemon.name} pokemon={pokemon}/>)}</div>
}