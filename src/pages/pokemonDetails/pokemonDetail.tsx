import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemon } from '../../api/services.ts';

export const PokemonDetail = () => {
  const { name } = useParams();
  const [loading, setLoading] = useState();
  const [pokemonData, setPokemonData] = useState();

  const fetchPokemonData =async () => {
    try {
      setLoading(true);
      const res = await getPokemon(name);
      setPokemonData(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!pokemonData) {
    return <p>Pokemon not found</p>;
  }

  const { abilities, height, weight, types, sprites } = pokemonData;

  return (
    <div> {/*despues le voy a dar estilos*/}
      <h1>{name}</h1>
      <img src={sprites?.front_default} alt={name} />
      <h2>Types:</h2>
      <div>
        {types.map((type) => (
          <p key={type?.type?.name}>{type?.type?.name}</p>
        ))}
      </div>
      <h2>Height:</h2>
      <p>{height}</p>
      <h2>Weight:</h2>
      <p>{weight}</p>
      <h2>Abilities:</h2>
      <div>
        {abilities.map((ability) => (
          <p key={ability?.ability?.name}>{ability?.ability?.name}</p>
        ))}
      </div>
    </div>
  )
}

