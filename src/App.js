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
        //setPokeURL(res.data.results.map((p) => p.url));
        console.log(res.data.results);
      });
    return () => cancel();
  }, [currentPageURL]);

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
