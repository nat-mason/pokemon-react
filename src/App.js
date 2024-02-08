import React from "react";
import { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

// Set the state variables
function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokeURL, setPokeURL] = useState([]);
  const [pokeType, setPokeType] = useState([]);
  const [secondType, setSecondType] = useState([]);
  const [currentPageURL, setCurrentPageURL] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [infoURL, setInfoURL] = useState([]);
  const [pokeData, setPokeData] = useState([]);
  const [pokeImage, setPokeImage] = useState([]);
  const [shinyImage, setShinyImage] = useState([]);
  const [nextPageURL, setNextPageURL] = useState();
  const [previousPageURL, setPreviousPageURL] = useState();
  const [loading, setLoading] = useState(true);

  //hook to retireve pokemon urls
  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageURL, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageURL(res.data.next);
        setPreviousPageURL(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
        setPokeURL(res.data.results.map((p) => p.url));
      });
    return () => cancel();
  }, [currentPageURL]);

  // Hook to retrieve pokemon info
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        if (pokeURL && pokeURL.length > 0) {
          const promises = pokeURL.map(async (url) => {
            const res = await axios.get(url);
            let secondaryType;
            res.data.types.length > 1
              ? (secondaryType = res.data.types[1].type.name)
              : (secondaryType = null);
            const primaryType = res.data.types[0].type.name;
            console.log(res.data.species.url);
            const info = res.data.species.url;
            const normal = res.data.sprites.front_default;
            const shiny = res.data.sprites.front_shiny;
            return { normal, shiny, primaryType, secondaryType, info };
          });
          // parse all the data into appropriate state variables
          const spriteURLs = await Promise.all(promises);
          setInfoURL(spriteURLs.map((url) => url.info));
          setSecondType(spriteURLs.map((type) => type.secondaryType));
          setPokeType(spriteURLs.map((type) => type.primaryType));
          setPokeImage(spriteURLs.map((sprites) => sprites.normal));
          setShinyImage(spriteURLs.map((sprites) => sprites.shiny));
        } else {
          console.error(new Error("No Pokemon URLs available"));
        }
      } catch (error) {
        console.error(new Error("Error getting pokemon data", error));
      }
    };
    // run the fetch
    fetchPokemonData();
    return;
  }, [pokeURL]);

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      try {
        const promises = infoURL.map(async (url) => {
          const res = await axios.get(url);
          const entryData = res.data.flavor_text_entries[1].flavor_text;
          console.log(res.data.flavor_text_entries[1]);
          return { entryData };
        });
        const dataInfo = await Promise.all(promises);
        setPokeData(dataInfo.map((data) => data.entryData));
      } catch (error) {
        console.error(new Error("Error pokedex gathering"));
      }
    };
    fetchPokemonInfo();
    return;
  }, [infoURL]);

  // function to go to the next page
  function goToNextPage() {
    setCurrentPageURL(nextPageURL);
  }

  // function to load previous page
  function goToPreviousPage() {
    setCurrentPageURL(previousPageURL);
  }

  // set the loading function
  if (loading) return "Loading......";

  // return the components and set important variables
  return (
    <>
      <PokemonList
        pokemon={pokemon}
        pokeImage={pokeImage}
        shinyImage={shinyImage}
        pokeType={pokeType}
        secondType={secondType}
        pokeData={pokeData}
      />
      <Pagination
        goToNextPage={nextPageURL ? goToNextPage : null}
        goToPreviousPage={previousPageURL ? goToPreviousPage : null}
      />
    </>
  );
}

export default App;
