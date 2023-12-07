import React, { useState } from "react";
import CharacterCatalog from "./views/CharacterCatalog";
import CharacterModal from "./components/Modal";
import "./App.css";

const App = () => {
  return (
    <div className="p-4">
      <h1 style={{ textAlign: "center" }}>
        Welcome to the Rick and Morty's character wiki!
      </h1>
      <CharacterCatalog />
      <CharacterModal />
    </div>
  );
};

export default App;
