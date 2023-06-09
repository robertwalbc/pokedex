import React, { useEffect, useState } from 'react';
import { getPokemons, getPokemon } from '../api/services.ts';
import PokemonCard from '../components/PokemonCard/PokemonCard.tsx';
import { CardGrid } from './home.styles.ts';

function Home() {
  
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  const callPokemons = async () => {
    try {
        const res = await getPokemons();
        setPokemons(res?.data?.results);
        return res;
    } catch (error) {
        console.log(error);
      }
  }

  const callPokemonName = async () => {
    try {
        const pokemonPromises = pokemons.map(pk => getPokemon(pk.name))
        const res = await Promise.all(pokemonPromises);
        console.log(res)
        setPokemonData(res);
        return res;
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    callPokemons();
    callPokemonName();
    setLoading(false);
  }, []);

  console.log(loading, 'loading');

    return (
      <CardGrid>
        {loading ? <p>{loading}</p> :
        pokemonData.map(poke => <PokemonCard pokeImage={poke.data?.sprites?.front_default} pokeName={poke.data?.name}/>)}
      </CardGrid>
    )
}

export default Home;