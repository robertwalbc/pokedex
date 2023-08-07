import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Title, Container, Image, CardContent } from "./PokemonCard.styles.ts";

function PokemonCard( {pokeName} ) {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`);
        const data = await response.json();
        setImageURL(data?.sprites?.front_default || 'default_image_url');
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        setImageURL('default_image_url');
      }
    };

    fetchPokemonData();
  }, [pokeName]);

  return (
    <Link to={`/pokemon/${pokeName}`}>
      <Container>
        <CardContent>
          <Image src={imageURL}/>
          <Title>{pokeName}</Title>
        </CardContent>
      </Container>
    </Link>
)};

export default PokemonCard;
