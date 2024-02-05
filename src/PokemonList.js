import React from "react";

export default function PokemonList({ pokemon, pokeImage }) {
  return (
    <>
      <div>
        {pokemon.map((p, index) => (
          <div key={p}>
            {p}
            <img src={pokeImage[index]} alt={pokemon} />
          </div>
        ))}
      </div>
    </>
  );
}
