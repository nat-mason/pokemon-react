import React from "react";

// set the props and generate the html
export default function PokemonList({
  pokemon,
  pokeImage,
  shinyImage,
  pokeType,
  secondType,
  pokeData,
}) {
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {pokemon.map((p, index) => (
          <div className="card" style={{ width: 10 + "rem" }} key={p}>
            <img
              src={pokeImage[index]}
              className="card-img-top"
              alt={pokemon}
            />
            <img src={shinyImage[index]} className="card-img-top" alt="shiny" />
            <div className="card-body">
              <h5 className="card-title">{p}</h5>
              <p className="card-text">
                {p}'s primary type is {pokeType[index]} and{" "}
                {secondType[index] !== null
                  ? "its secondary type is " + secondType[index]
                  : "It does not have a secondary type"}
                . {pokeData[index]}
              </p>
              <button href="#" className="btn btn-primary">
                View Shiny
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
