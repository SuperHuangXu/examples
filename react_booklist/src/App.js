import React from "react";
import "./App.css";
import BookContextProvider from "./contexts/BooxContext";
import Nabar from "./components/Navbar";
import BookList from "./components/BookList";
import NewBookForm from './components/BookForm';

function App() {
  return (
    <div className="App">
      <BookContextProvider>
        <Nabar />
        <BookList />
        <NewBookForm/>
      </BookContextProvider>
    </div>
  );
}

export default App;
