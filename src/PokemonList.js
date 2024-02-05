import React from "react";

export default function PokemonList({ pokemon, pokeImage }) {
  return (
    <>
      <div>
        {pokemon.map((p) => (
          <div key={p}>
            {p}
            {pokeImage.map((p) => (
              <img src={p} alt={pokemon} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
