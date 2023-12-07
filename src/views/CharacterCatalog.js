import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CardSkeleton from "../components/CardSkeleton";
import CharacterCard from "../components/CharacterCard";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { PaginationControl } from "react-bootstrap-pagination-control";

const CharacterCatalog = (props) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [slice, setSlice] = useState([]);
  const skeleton = [1, 2, 3, 4];
  const updateName = (e) => setName(e.target.value);

  const onChangePage = (page) => setPage(page);
  const resetName = () => setName("");

  const fetchCharacters = async () => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await fetch(
        `${process.env.BACKEND_URL}/characters/name/${name}`
      );

      if (!response.ok) {
        throw new Error("Character not found!");
      }
      const responseData = await response.json();
      setCharacters(responseData);
    } catch (e) {
      setError("There was an error!");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setCharacters([]);
    setSlice([]);
    let searchCharacter = null;

    if (name.trim() !== "") {
      searchCharacter = setTimeout(() => {
        clearTimeout(searchCharacter);
        fetchCharacters();
      }, 200);
    }

    return () => {
      clearTimeout(searchCharacter);
    };
  }, [name]);

  useEffect(() => {
    if (characters) {
      setSlice(characters.slice(page * 4 - 4, page * 4));
    }
  }, [page, characters, name]);

  return (
    <>
      <SearchBar value={name} updateName={updateName} resetName={resetName} />
      <div
        className="d-flex flex-wrap justify-content-around align-items-center"
        style={{ minHeight: "60vh" }}
      >
        {isLoading
          ? skeleton.map((item) => <CardSkeleton key={item} />)
          : slice.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                status={character.status}
                gender={character.gender}
                location={character.location}
                image={character.image}
              />
            ))}
        {error && (
          <div className="d-flex flex-column align-items-center">
            <Image
              src="https://pm1.aminoapps.com/6857/3c0d917294e8b4e52d93731a4d59c6d5d3f10424v2_hq.jpg"
              alt="Rude Rick"
              className="img-fluid"
              style={{ width: "300px" }}
            ></Image>
            <Alert variant="danger" className="mt-2">
              Ocurrió un error! Inténtalo más tarde!
            </Alert>
          </div>
        )}
        {characters.length === 0 && !isLoading && !error && (
          <div className="d-flex flex-column align-items-center">
            <Alert variant="danger">
              No hay elementos disponibles. Busca un personaje!
            </Alert>
            <p style={{ fontSize: "3rem" }}>:c</p>
          </div>
        )}
      </div>
      <div className="mt-4">
        <PaginationControl
          page={page}
          between={4}
          total={characters?.length || 0}
          limit={4}
          changePage={onChangePage}
          ellipsis={1}
        />
      </div>
    </>
  );
};

export default CharacterCatalog;
