import React from "react";
import { Link } from "react-router-dom";
import { Title, Container, Image, CardContent } from "./PokemonCard.styles.ts";

function PokemonCard( {pokeImage, pokeName} ) {
  return (
    <Link to={`/pokemon/${pokeName}`}>
      <Container>
        <CardContent>
          <Image src={pokeImage}/>
          <Title>{pokeName}</Title>
        </CardContent>
      </Container>
    </Link>
)};

export default PokemonCard;
