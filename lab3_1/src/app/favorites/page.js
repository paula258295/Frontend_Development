import { POKEMONS_URL } from "../../internal-globals";
import FavoriteList from "./FavoriteList";

async function fetchPokemons() {
  const response = await fetch(`${POKEMONS_URL}?limit=20`);
  
  const responseJson = await response.json();
  // .then(response => response.json())
  // .then(responseJson => {
  const pokemonPromises = responseJson.results.map(pokemon =>
      fetch(pokemon.url).then(res => res.json())
  );

  const pokemons = Promise.all(pokemonPromises);
  return pokemons;

  //     Promise.all(pokemonPromises).then(pokemonDetails => {
  //         root.render(<App pokemons={pokemonDetails} />);
  //     });
  // });
}


export default async function Favorites() {
  const pokemons = await fetchPokemons()

  return (
    <FavoriteList pokemons={pokemons}/>
  );
}