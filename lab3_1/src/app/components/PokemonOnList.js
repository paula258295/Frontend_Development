import Link from 'next/link'
import styles from "./PokemonOnList.module.css";

export default function PokemonOnList(props) {

    return (
        <Link href={`/pokemon/${props.pokemon.id}`} className={styles["pokemon-card"]}> 
            <img src={props.pokemon.sprites.front_default}/>
            <div className={styles["name"]}>#{props.pokemon.id} {props.pokemon.name}</div>
        </Link>
    );
}


