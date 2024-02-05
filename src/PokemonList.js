import React from "react";

export default function PokemonList({ pokemon, pokeImage }) {
  return (
    <>
      <div>
        {pokemon.map((p) => (
          <div key={p}>
            {p}
            <img src={pokeImage} alt="Pokemon" />
          </div>
        ))}
      </div>
    </>
  );
}
