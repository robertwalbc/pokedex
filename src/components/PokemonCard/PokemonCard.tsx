import React from "react";
import { Title, Container, Image, CardContent } from "./PokemonCard.styles.ts";

function PokemonCard( {pokeImage, pokeName} ) {
  return (
    <div>
      <Container>
        <CardContent>
          <Image src={pokeImage}/>
          <Title>{pokeName}</Title>
        </CardContent>
      </Container>
    </div>
)};

export default PokemonCard;