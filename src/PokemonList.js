import React from "react";

export default function PokemonList({ pokemon, pokeImage, shinyImage }) {
  return (
    <>
      <div>
        {pokemon.map((p, index) => (
          <div key={p}>
            <h1>{p}</h1>
            <img src={pokeImage[index]} alt={pokemon} />
            <img src={shinyImage[index]} alt="shiny" />
          </div>
        ))}
      </div>
    </>
  );
}
