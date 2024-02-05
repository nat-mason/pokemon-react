import React from "react";

export default function PokemonList({ pokemon, pokeURL }) {
  return (
    <>
      <div>
        {pokemon.map((p) => (
          <div key={p}>{p}</div>
        ))}
        <img src={pokeURL} alt="Pokemon" />
        <script>console.log(pokeURL)</script>
      </div>
    </>
  );
}
