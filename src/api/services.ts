import instance from "./apiConfig.ts";
import { pokemonURLS } from "./urls.ts";
import { POKEMON_API } from "../enviroments.ts";

export const getPokemons = (url = `${POKEMON_API}${pokemonURLS.pokemon}`) => instance.get(url);

export const getPokemon = (name:string) => instance.get(`${POKEMON_API}${pokemonURLS.pokemon}/${name}`);

export const getPokemonId = (id:number) => instance.get(`${POKEMON_API}${pokemonURLS.pokemon}/${id}`);