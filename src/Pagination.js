import React from "react";

// set pages up
export default function Pagination({ goToNextPage, goToPreviousPage }) {
  return (
    <div>
      {goToPreviousPage && <button onClick={goToPreviousPage}>Previous</button>}
      {goToNextPage && <button onClick={goToNextPage}>Next</button>}
    </div>
  );
}
