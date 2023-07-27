import instance from "./apiConfig.ts";
import { pokemonURLS } from "./urls.ts";
import { POKEMON_API } from "../enviroments.ts";

export const getPokemons = (url = `${POKEMON_API}${pokemonURLS.pokemon}`) => instance.get(url);

export const getAllPokemon = (limit, offset) => 
instance.get(`${POKEMON_API}${pokemonURLS.pokemon}?limit=${limit}&offset=${offset}`);

export const getPokemon = (name:string) => instance.get(`${POKEMON_API}${pokemonURLS.pokemon}/${name}`);

export const getPokemonId = (id:number) => instance.get(`${POKEMON_API}${pokemonURLS.pokemon}/${id}`);

//calling the names for the dropdowns
export const getHabitat = (habitat: string = '') => instance.get(`${POKEMON_API}${pokemonURLS.habitat}/${habitat}`);

export const getTypes = (type: string = '') => instance.get(`${POKEMON_API}${pokemonURLS.types}/${type}`);

export const getRegion = () => instance.get(`${POKEMON_API}${pokemonURLS.region}`);

export const getColor = (color: string = '') => instance.get(`${POKEMON_API}${pokemonURLS.color}/${color}`);

export const getGeneration = (generation: string = '') => instance.get(`${POKEMON_API}${pokemonURLS.generation}/${generation}`);

export const getEggGroup = (group: string = '') => instance.get(`${POKEMON_API}${pokemonURLS.eggGroup}/${group}`);

export const getRegionPokemon = (region: string) => instance.get(`${POKEMON_API}${pokemonURLS.pokedex}/${region}`);