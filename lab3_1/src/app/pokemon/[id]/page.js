import PokemonDetails from "../../components/PokemonDetails";
import { POKEMONS_URL } from "../../../internal-globals";
import Link from "next/link";
import styles from './pokemonDetails.module.css'


async function fetchPokemon(pokemonId) {
    const response = await fetch(`${POKEMONS_URL}/${pokemonId}`);
    
    const responseJson = await response.json();
    return responseJson
}

export default async function PokemonId({params}) {
    const id = (await params).id;
    const pokemon = await fetchPokemon(id);
    return (
      <> 
        <main className={styles["details-container"]}>
          <PokemonDetails nameClass={styles['pokemon-details']} pokemon={pokemon}/>
          <Link className={styles['go-to-list-link']} href='/pokemon'>
              Go to list!
          </Link>
        </main>
      </> 
    );
  }