"use client";
import { FAVORITE_POKEMONS_KEY } from "../../internal-globals";
import { useState } from "react";
import PokemonList from "../components/PokemonList";

export default function FavoriteList({pokemons}){
    const [favoriteIds, setFavoriteIds] = useState(()=>{
        const favoritePokemonsFromLocalStorage = localStorage.getItem(FAVORITE_POKEMONS_KEY);
        const favoritePokemons = favoritePokemonsFromLocalStorage ? JSON.parse(favoritePokemonsFromLocalStorage) : [];
        return favoritePokemons;
    });
    const favoritePokemons = pokemons.filter(pokemon => favoriteIds.includes(pokemon.id));
    return (
        <PokemonList className='pokemon-list' pokemons={favoritePokemons} />
    )
}