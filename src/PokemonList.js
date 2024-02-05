import React from "react";

export default function PokemonList({ pokemon, pokeImage }) {
  return (
    <>
      <div>
        {pokemon.map((p) => (
          <div key={p}>{p}</div>
        ))}
        <img src={pokeImage} alt="Pokemon" />
        <script>console.log(pokeImage)</script>
      </div>
    </>
  );
}
