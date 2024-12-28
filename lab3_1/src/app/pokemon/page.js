import { POKEMONS_URL } from "../../internal-globals";
import PokemonList from "../components/PokemonList";
import Filters from "../components/Filters";

async function fetchPokemons(name, limit) {
  const nameToUse = name ? `/${name}` : '';
  const response = await fetch(`${POKEMONS_URL}${nameToUse}?limit=${limit}`);
  if(!response.ok) return [];
  const responseJson = await response.json();
  console.log(responseJson);
  if(name){
    return [responseJson];
  }
  const pokemonPromises = responseJson.results.map(pokemon =>
    fetch(pokemon.url).then(res => res.json())
  );

  const pokemons = Promise.all(pokemonPromises);
  return pokemons;
}

export default async function Pokemon(props) {
  const searchParams = await props.searchParams;
  const name = searchParams?.name || '';
  const limit = searchParams?.limit || '20';
  const typeFromParams = searchParams?.type || '';
  const pokemons = await fetchPokemons(name, limit)
  const pokemonsToUse = pokemons.filter(pokemon => {
    if(!typeFromParams) return true;
    return !!pokemon.types.find(({type}) => type?.name === typeFromParams)
  })
  return (
    <div>
      <Filters />
      <PokemonList className='pokemon-list' pokemons={pokemonsToUse} />
    </div>
  );
}