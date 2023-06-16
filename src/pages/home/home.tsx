import React, { useEffect, useState } from 'react';
import { getPokemons, getPokemon } from '../../api/services.ts';
import PokemonCard from '../../components/PokemonCard/PokemonCard.tsx';
import { CardGrid, ButtonContainer, Button, Pagination } from './home.styles.ts';

function Home() {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]); // name, url
  const [pokemonData, setPokemonData] = useState([]); // sprites, name, abilities
  const [previousPageUrl, setPreviousPageUrl] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);



  const callPokemons = async (url) => {
    try {
        setLoading(true);
        const res = await getPokemons(url);
        setPokemons(res?.data?.results);
        setPreviousPageUrl(res?.data?.previous);
        setNextPageUrl(res?.data?.next);
        setLoading(false);

        // Calculate the current page number from the URL
        const params = new URLSearchParams(new URL(url).search);
        const offset = parseInt(params.get("offset"), 10);
        const limit = parseInt(params.get("limit"), 10);
        const currentPage = offset / limit + 1;
        setCurrentPage(currentPage);

        return res;
    } catch (error) {
        console.log(error);
        setLoading(false);
      }
  }

  const callPokemonName = async () => {
    try {
        setLoading(true);
        const pokemonPromises = pokemons?.map(pk => getPokemon(pk?.name))
        const res = await Promise.all(pokemonPromises);
        setPokemonData(res);
        setLoading(false);
        return res;
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
  }

  useEffect(() => {
    callPokemons(); // 
  }, []); 

  useEffect(() => {
    if(pokemons?.length > 0) {
          callPokemonName();
        }
  }, [pokemons]);

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      callPokemons(previousPageUrl)
    }
  };

  const handleNextPage = () => {
    if (nextPageUrl) {
      callPokemons(nextPageUrl)
    }
  };

  const handlePageClick = (page) => {
    const offset = (page - 1) * 20; // Adjust the limit (20) based on your actual API pagination
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`; // Adjust the URL format based on your API
  
    callPokemons(url);
  };
  
  const totalPages = Math.ceil(pokemons.length / 20); // Adjust the limit (20) based on your actual API pagination

  // Generate an array of page numbers from 1 to totalPages
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
      <>
        <CardGrid>
          {loading ? <p>loading...</p> :
          pokemonData?.map(poke => 
          <PokemonCard
          key={poke?.data?.name}
          pokeImage={poke?.data?.sprites?.front_default}
          pokeName={poke?.data?.name}
          />)}
        </CardGrid>
        <ButtonContainer>
          <Button onClick={handlePreviousPage} disabled={!previousPageUrl}>
            Previous Page
          </Button>
          <Button onClick={handleNextPage} disabled={!nextPageUrl}>
            Next Page
          </Button>
          <Pagination> 
            {pageNumbers.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                disabled={page === currentPage}
              >
                {page}
              </Button>
            ))}
          </Pagination>
        </ButtonContainer>
      </>
    );
}

export default Home;