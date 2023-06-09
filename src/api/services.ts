import instance from "./apiConfig.ts";
import { pokemonURLS } from "./urls.ts";

export const getPokemons = () => instance.get(pokemonURLS.pokemon);

export const getPokemon = (name:string) => instance.get(`${pokemonURLS.pokemon}/${name}`);

export const getPokemonId = (id:number) => instance.get(`${pokemonURLS.pokemon}/${id}`);