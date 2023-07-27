import React, { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon, getColor, getGeneration, getRegion, getHabitat, getTypes, getEggGroup, getRegionPokemon } from '../../api/services.ts';
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
  //estados para los filtros seleccionados
  const [selectedHabitat, setSelectedHabitat] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [selectedEggGroup, setSelectedEggGroup] = useState('');
  //Estado para los Pokemon filtrados
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);

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

  const fetchFiltersData = async () => {
    try {
      setLoading(true);
      
      // Llamadas a las funciones para obtener los datos de los filtros
      const typesRes = await getTypes();
      const habitatRes = await getHabitat();
      const regionRes = await getRegion();
      const colorRes = await getColor();
      const generationRes = await getGeneration();
      const eggGroupRes = await getEggGroup();

      // Valores de los dropdown
      const types = typesRes?.data?.results?.map(tp => tp?.name);
      const habitats = habitatRes?.data?.results?.map(hb => hb?.name);
      const regions = regionRes?.data?.results?.map(rg => rg?.name);
      const colors = colorRes?.data?.results?.map(cl => cl?.name);
      const generations = generationRes?.data?.results?.map(gn => gn?.name);
      const eggGroups = eggGroupRes?.data?.results?.map(eg => eg?.name);

      // Actualización de los estados correspondientes
      setType(types);
      setHabitat(habitats);
      setRegion(regions);
      setColor(colors);
      setGeneration(generations);
      setEggGroup(eggGroups);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getPokemonByHabitat = async (ht) => {
    try {
      const res = await getHabitat(ht);
      return res?.data?.pokemon_species?.map(h => h?.name);
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener los Pokémon por hábitat');
    }
  };

  const getPokemonByType = async (te) => {
    try {
      const res = await getTypes(te);
      return res?.data?.pokemon?.map((t) => t?.pokemon?.name);
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener los Pokémon por tipo');
    }
  }

  const getPokemonByRegion = async (rn) => {
    try {
      const res = await getRegionPokemon(rn);
      return res?.data?.pokemon_entries?.map((entry) => entry?.pokemon_species?.name);
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener los Pokémon por region');
    }
  }

  const getPokemonByColor = async (cr) => {
    try {
      const res = await getColor(cr);
      return res?.data?.pokemon_species?.map(c => c?.name);
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener los Pokémon por color');
    }
  }

  const getPokemonByGeneration = async (gn) => {
    try {
      const res = await getGeneration(gn);
      return res?.data?.pokemon_species?.map(g => g?.name);
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener los Pokémon por generación');
    }
  }

  const getPokemonByEggGroup = async (eg) => {
    try {
      const res = await getEggGroup(eg);
      return res?.data?.pokemon_species?.map(ep => ep?.name);
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener los Pokémon por Egg Group');
    }
  }

  const fetchAllPokemonNames = async () => {
    try {
      const allPokemonNames = [];
      let offset = 0;
      const limit = 100;
  
      while (true) {
        const res = await getAllPokemon(limit, offset);
        const pokemonNames = res?.data?.results?.map(pokemon => pokemon.name);
        allPokemonNames.push(...pokemonNames);
  
        if (!res?.data?.next) {
          break;
        }
  
        offset += limit;
      }
      
      return allPokemonNames;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener los nombres de los Pokémon');
    }
  };

  const filterPokemons = async () => {
    try {
      setLoading(true);
  
      const allPokemonNames = await fetchAllPokemonNames();
  
      let filteredData = [...allPokemonNames];
  
      if (selectedHabitat) {
        const pokemonByHabitat = await getPokemonByHabitat(selectedHabitat);
        filteredData = filteredData?.filter(name => pokemonByHabitat?.includes(name));
      }
  
      if (selectedType) {
        console.log('selectedType', selectedType);
        const pokemonByType = await getPokemonByType(selectedType);
        filteredData = filteredData?.filter(name => pokemonByType?.includes(name));
        console.log('pokemonByType', pokemonByType);

      }
      
      if (selectedRegion) {
        console.log('selected region:', selectedRegion);

        let updatedRegion = selectedRegion;

        if(selectedRegion === 'johto') {
          updatedRegion = 'updated-johto';
        } else if(selectedRegion === 'sinnoh') {
          updatedRegion = 'extended-sinnoh';
        } else if(selectedRegion === 'unova') {
          updatedRegion = 'updated-unova';
        } else if(selectedRegion === 'kalos') {
          updatedRegion = 'kalos-central';
        } else if(selectedRegion === 'alola') {
          updatedRegion = 'updated-alola';
        }
        console.log('Updated Region:', updatedRegion);

        const pokemonByRegion = await getPokemonByRegion(updatedRegion);
        console.log('Pokemon By Region:', pokemonByRegion);
        filteredData = filteredData?.filter(name => pokemonByRegion?.includes(name));
        console.log('Filtered Data:', filteredData);
      }

      if (selectedColor) {
        const pokemonByColor = await getPokemonByColor(selectedColor);
        filteredData = filteredData?.filter(name => pokemonByColor?.includes(name));
      }

      if (selectedGeneration) {
        const pokemonByGeneration = await getPokemonByGeneration(selectedGeneration);
        filteredData = filteredData?.filter(name => pokemonByGeneration?.includes(name));
      }

      if (selectedEggGroup) {
        const pokemonByEggGroup = await getPokemonByEggGroup(selectedEggGroup);
        filteredData = filteredData?.filter(name => pokemonByEggGroup?.includes(name));
      }
      //console.log('filteredData', filteredData);
      setFilteredPokemonData(filteredData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  {/* const fetchFilteredPokemonData = async () => {
    try {
      setLoading(true);
      

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  } */}

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

    const handleHabitatSelect = (selectedHabitat) => {
      setSelectedHabitat(selectedHabitat);
    };
  
    const handleTypeSelect = (selectedType) => {
      setSelectedType(selectedType);
    };
  
    const handleRegionSelect = (selectedRegion) => {
      setSelectedRegion(selectedRegion);
    };
  
    const handleColorSelect = (selectedColor) => {
      setSelectedColor(selectedColor);
    };
  
    const handleGenerationSelect = (selectedGeneration) => {
      setSelectedGeneration(selectedGeneration);
    };
  
    const handleEggGroupSelect = (selectedEggGroup) => {
      setSelectedEggGroup(selectedEggGroup);
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
      fetchFiltersData();
  }, []);

  useEffect(() => {
    filterPokemons();
  }, [selectedHabitat, selectedType, selectedRegion, selectedColor, selectedGeneration, selectedEggGroup])

    return (
      <>
        <h1>Filters</h1>
        <FilterGrid>
          <Filters
            filterName={'Habitat'}
            items={habitat}
            handleFilterSelect={handleHabitatSelect}
          />
          <Filters
            filterName={'Type'}
            items={type}
            handleFilterSelect={handleTypeSelect}
          />
          <Filters
            filterName={'Region'}
            items={region}
            handleFilterSelect={handleRegionSelect}
          />
          <Filters
            filterName={'Color'}
            items={color}
            handleFilterSelect={handleColorSelect}
          />
          <Filters
            filterName={'Generation'}
            items={generation}
            handleFilterSelect={handleGenerationSelect}
          />
          <Filters
            filterName={'Egg Group'}
            items={eggGroup}
            handleFilterSelect={handleEggGroupSelect}
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