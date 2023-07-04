import instance from "./apiConfig.ts";
import { pokemonURLS } from "./urls.ts";
import { POKEMON_API } from "../enviroments.ts";

export const getPokemons = (url = `${POKEMON_API}${pokemonURLS.pokemon}`) => instance.get(url);

export const getAllPokemon = (limit, offset) => 
instance.get(`${POKEMON_API}${pokemonURLS.pokemon}?limit=${limit}&offset=${offset}`);

export const getPokemon = (name:string) => instance.get(`${POKEMON_API}${pokemonURLS.pokemon}/${name}`);

export const getPokemonId = (id:number) => instance.get(`${POKEMON_API}${pokemonURLS.pokemon}/${id}`);

export const getHabitat = () => instance.get(`${POKEMON_API}${pokemonURLS.habitat}`);

export const getTypes = () => instance.get(`${POKEMON_API}${pokemonURLS.types}`);

export const getRegion = () => instance.get(`${POKEMON_API}${pokemonURLS.region}`);

export const getColor = () => instance.get(`${POKEMON_API}${pokemonURLS.color}`);

export const getGeneration = () => instance.get(`${POKEMON_API}${pokemonURLS.generation}`);

export const getEggGroup = () => instance.get(`${POKEMON_API}${pokemonURLS.eggGroup}`);

