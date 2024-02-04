import React from "react";

export default function Pagination({ goToNextPage, goToPreviousPage }) {
  return (
    <div>
      <button onClick={goToPreviousPage}>Previous</button>
      <button onClick={goToNextPage}>Next</button>
    </div>
  );
}
