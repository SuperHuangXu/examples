import React, { useContext } from "react";
import { BookContext } from "../contexts/BooxContext";

const Nabar = () => {
  const { books } = useContext(BookContext);
  return (
    <div className="navbar">
      <h1>Reading List</h1>
      <p>Currently you have {books.length} books to great through...</p>
    </div>
  );
};

export default Nabar;
