import React from "react";
import { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokeURL, setPokeURL] = useState([]);
  const [currentPageURL, setCurrentPageURL] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [pokeImage, setPokeImage] = useState();
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
    if (pokeURL && pokeURL.length > 0) {
      console.log(pokeURL[0]);
      axios
        .get(pokeURL[0])
        .then((res) => {
          console.log(res.data.sprites.front_default);
        })
        .catch((error) => {
          console.error(new Error("error getting pokemon data", error));
        });
    } else {
      console.log(Error);
    }
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
      <PokemonList pokemon={pokemon} />
      <Pagination
        goToNextPage={nextPageURL ? goToNextPage : null}
        goToPreviousPage={previousPageURL ? goToPreviousPage : null}
      />
    </>
  );
}

export default App;
