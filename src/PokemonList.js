import React, { useState } from "react";

export default function PokemonList({
  pokemon,
  pokeImage,
  shinyImage,
  pokeType,
  secondType,
  pokeData,
}) {
  const [shinyModes, setShinyModes] = useState([]);

  const toggleShinyMode = (index) => {
    setShinyModes((prevModes) => {
      const newModes = [...prevModes];
      newModes[index] = !newModes[index];
      return newModes;
    });
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {pokemon.map((p, index) => (
          <div className="card" style={{ width: 10 + "rem" }} key={p}>
            <img
              src={shinyModes[index] ? shinyImage[index] : pokeImage[index]}
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
                {shinyModes[index] ? "View Regular" : "View Shiny"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
