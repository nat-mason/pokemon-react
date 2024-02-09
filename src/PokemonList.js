import React, { useState } from "react";

export default function PokemonList({
  pokemon,
  pokeImage,
  shinyImage,
  pokeType,
  secondType,
  pokeData,
}) {
  const [shinyMode, setShinyMode] = useState(false);

  const toggleShinyMode = (index) => {
    setShinyMode((prevMode) => !prevMode);
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {pokemon.map((p, index) => (
          <div className="card" style={{ width: 10 + "rem" }} key={p}>
            <img
              src={shinyMode ? shinyImage[index] : pokeImage[index]}
              className="card-img-top"
              alt={pokemon}
            />
            <div className="card-body">
              <h5 className="card-title">{p}</h5>
              <p className="card-text">
                {p}'s primary type is {pokeType[index]} and{" "}
                {secondType[index] !== null
                  ? "its secondary type is " + secondType[index]
                  : "It does not have a secondary type"}
                . {pokeData[index]}
              </p>
              <button
                onClick={() => toggleShinyMode(index)}
                className="btn btn-primary"
              >
                {shinyMode ? "View Regular" : "View Shiny"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
