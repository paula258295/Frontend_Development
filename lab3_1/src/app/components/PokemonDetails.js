'use client'

import { FAVORITE_POKEMONS_KEY } from "../../internal-globals";
import styles from "./PokemonDetails.module.css"
import { useState } from "react";

export default function PokemonDetails(props) {
    console.log(props.pokemon)
    const [isFavorite, setIsFavorite] = useState(() => {
        const favoritePokemonsFromLocalStorage = localStorage.getItem(FAVORITE_POKEMONS_KEY);
        const favoritePokemons = favoritePokemonsFromLocalStorage ? JSON.parse(favoritePokemonsFromLocalStorage) : [];
        const isFavoritePokemon = favoritePokemons.includes(props.pokemon.id);
        return isFavoritePokemon;
    });

    function onSaveClick(id) {
        const favoritePokemonsFromLocalStorage = localStorage.getItem(FAVORITE_POKEMONS_KEY);
        const favoritePokemons = favoritePokemonsFromLocalStorage ? JSON.parse(favoritePokemonsFromLocalStorage) : [];
        favoritePokemons.push(id);
        const favoritePokemonsToSave = JSON.stringify(favoritePokemons);
        localStorage.setItem(FAVORITE_POKEMONS_KEY, favoritePokemonsToSave);
        setIsFavorite(true);
    }

    function onUnSaveClick(id) {
        const favoritePokemonsFromLocalStorage = localStorage.getItem(FAVORITE_POKEMONS_KEY);
        const favoritePokemons = favoritePokemonsFromLocalStorage ? JSON.parse(favoritePokemonsFromLocalStorage) : [];
        const favoritePokemonsRemoved = favoritePokemons.filter(pokemonId => pokemonId !== id);
        const favoritePokemonsToSave = JSON.stringify(favoritePokemonsRemoved);
        localStorage.setItem(FAVORITE_POKEMONS_KEY, favoritePokemonsToSave);
        setIsFavorite(false);
    }

    const stats = props.pokemon.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
    }, {});

    function onClick(id) {
        if (isFavorite) {
            onUnSaveClick(id)
        } else {
            onSaveClick(id)
        }
    }

    return (
        <div className={styles["details-card"]}>
            <h2>{props.pokemon.name.toUpperCase()} (#{props.pokemon.id})</h2>
            <img src={props.pokemon.sprites.front_default} />
            <p><strong>Height:</strong> {props.pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> {props.pokemon.weight / 10} kg</p>
            <p><strong>Types:</strong> {props.pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <p><strong>HP:</strong> {stats.hp}</p>
            <p><strong>Attack:</strong> {stats.attack}</p>
            <p><strong>Defense:</strong> {stats.defense}</p>
            <p><strong>Speed:</strong> {stats.speed}</p>
            <button className={styles[['add-to-fav-button']]} onClick={() => onClick(props.pokemon.id)}>
                {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </button>
        </div>
    );
}