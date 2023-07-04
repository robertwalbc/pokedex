import React, { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon, getColor, getGeneration, getRegion, getHabitat, getTypes, getEggGroup } from '../../api/services.ts';
import PokemonCard from '../../components/PokemonCard/PokemonCard.tsx';
import { CardGrid, ButtonContainer, Button, FilterGrid } from './home.styles.ts';
import { Filters } from '../../components/Filters/filters.tsx';

function Home() {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]); // name, url
  const [pokemonData, setPokemonData] = useState([]); // sprites, name, abilities
  const [previousPageUrl, setPreviousPageUrl] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [calOffset, setCalOffset] = useState(0);
  const [calLimit, setCalLimit] = useState(20);
  //info de los dropdowns
  const [color, setColor] = useState([]);
  const [type, setType] = useState([]);
  const [generation, setGeneration] = useState([]);
  const [region, setRegion] = useState([]);
  const [habitat, setHabitat] = useState([]);
  const [eggGroup, setEggGroup] = useState([]);

  const callAllPokemon = async (limit, offset) => {
    try {
        setLoading(true);
        setCalOffset(offset + limit);
        const res = await getAllPokemon(limit, offset);
        setPokemons(res?.data?.results);
        setPreviousPageUrl(res?.data?.previous);
        setNextPageUrl(res?.data?.next);
        setLoading(false);
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

  const callType = async () => {
    try {
      setLoading(true);
      const res = await getTypes();
      const typeName = res?.data?.results?.map(tp => tp?.name);
      setType(typeName);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const callHabitat = async () => {
    try {
      setLoading(true);
      const res = await getHabitat();
      const habitatName = res?.data?.results?.map(hb => hb?.name);
      setHabitat(habitatName);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const callRegion = async () => {
    try {
      setLoading(true);
      const res = await getRegion();
      const regionName = res?.data?.results?.map(rg => rg?.name);
      setRegion(regionName);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const callColor = async () => {
    try {
      setLoading(true);
      const res = await getColor();
      const colorName = res?.data?.results?.map(cl => cl?.name);
      setColor(colorName);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const callGeneration = async () => {
    try {
      setLoading(true);
      const res = await getGeneration();
      const generationName = res?.data?.results?.map(gn => gn?.name);
      setGeneration(generationName);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const callEggGroup =async () => {
    try {
      const res = await getEggGroup();
      const eggGroupName = res?.data?.results?.map(eg => eg?.name);
      setEggGroup(eggGroupName);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handlePreviousPage = () => {
      if (previousPageUrl) {
        callAllPokemon(20, calOffset - 40);
        setCurrentPage(currentPage - 1);
      }
    };

    const handleNextPage = () => {
      if (nextPageUrl) {
        callAllPokemon(20, calOffset);
        setCurrentPage(currentPage + 1);
      }
    };

  useEffect(() => {
    callAllPokemon(calLimit, calOffset); // 
  }, []); 

  useEffect(() => {
    if(pokemons?.length > 0) {
          callPokemonName();
        }
  }, [pokemons]);

  useEffect(() => {
      callType();
      callHabitat();
      callRegion();
      callColor();
      callGeneration();
      callEggGroup();
  }, []);

  console.log('type', type);

    return (
      <>
        <h1>Filters</h1>
        <FilterGrid>
          <Filters
            filterName={'Habitat'}
            items={habitat}
          />
          <Filters
            filterName={'Type'}
            items={type}
          />
          <Filters
            filterName={'Region'}
            items={region}
          />
          <Filters
            filterName={'Color'}
            items={color}
          />
          <Filters
            filterName={'Generation'}
            items={generation}
          />
          <Filters
            filterName={'Egg Group'}
            items={eggGroup}
          />
        </FilterGrid>
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
        </ButtonContainer>
      </>
    );
}

export default Home;