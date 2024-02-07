import React from "react";
import { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokeURL, setPokeURL] = useState([]);
  const [pokeType, setPokeType] = useState([]);
  const [secondType, setSecondType] = useState([]);
  const [currentPageURL, setCurrentPageURL] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [pokeImage, setPokeImage] = useState([]);
  const [shinyImage, setShinyImage] = useState([]);
  const [nextPageURL, setNextPageURL] = useState();
  const [previousPageURL, setPreviousPageURL] = useState();
  const [loading, setLoading] = useState(true);

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
        console.log(res.data.results);
      });
    return () => cancel();
  }, [currentPageURL]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        if (pokeURL && pokeURL.length > 0) {
          const promises = pokeURL.map(async (url) => {
            const res = await axios.get(url);
            console.log(res.data.types[0].type.name);
            let secondaryType;
            res.data.types.length > 1
              ? (secondaryType = res.data.types[1].type.name)
              : (secondaryType = null);
            const primaryType = res.data.types[0].type.name;
            console.log(res.data.types.length);
            //let secondaryType;
            //res.data.types[1].type.name.length > 0
            // ? (secondaryType = res.data.types[1].type.name)
            // : (secondaryType = "");
            //let secondaryType;
            //res.data.types[1].type.name
            //? console.log(res.data.types[1].type.name)
            //: console.log("no second type");
            // res.data.types[1].type.name
            //? secondaryType === res.data.types[1].type.name
            //: secondaryType === null;

            const normal = res.data.sprites.front_default;
            console.log(normal);
            const shiny = res.data.sprites.front_shiny;
            return { normal, shiny, primaryType, secondaryType };
          });

          const spriteURLs = await Promise.all(promises);
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

    fetchPokemonData();
    return;
  }, [pokeURL]);

  function goToNextPage() {
    setCurrentPageURL(nextPageURL);
  }

  function goToPreviousPage() {
    setCurrentPageURL(previousPageURL);
  }

  if (loading) return "Loading......";

  return (
    <>
      <PokemonList
        pokemon={pokemon}
        pokeImage={pokeImage}
        shinyImage={shinyImage}
        pokeType={pokeType}
        secondType={secondType}
      />
      <Pagination
        goToNextPage={nextPageURL ? goToNextPage : null}
        goToPreviousPage={previousPageURL ? goToPreviousPage : null}
      />
    </>
  );
}

export default App;
