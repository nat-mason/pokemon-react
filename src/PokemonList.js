import React, { useState, useEffect } from "react";

// init important variables
export default function PokemonList({
  pokemon,
  pokeImage,
  shinyImage,
  pokeType,
  secondType,
  pokeData,
}) {
  // set up button state
  const [shinyModes, setShinyModes] = useState([]);

  // button function
  const toggleShinyMode = (index) => {
    setShinyModes((prevModes) => {
      const newModes = [...prevModes];
      newModes[index] = !newModes[index];
      return newModes;
    });
  };
  const cleanData = (index) => {
    return pokeData[index]
      .replace(/\f/g, "")
      .replace(/\u00ad\n/g, "")
      .replace(/\u00ad/g, "")
      .replace(/ -\n/g, " - ")
      .replace(/-\n/g, "-")
      .replace(/\n/g, " ");
  };

  useEffect(() => {
    if (pokeData && pokeData.length > 0) {
      pokemon.forEach((p, index) => {
        console.log(cleanData(index));
      });
    }
  }, [pokemon, pokeData]);

  // return bootstrap
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {pokemon.map((p, index) => (
          <div className="card" style={{ width: 12 + "rem" }} key={p}>
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
                .{cleanData(index)}
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
