import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const SearchBar = (props) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon1">Buscar</InputGroup.Text>
      <Form.Control
        value={props.value}
        onChange={props.updateName}
        placeholder="Rick and Morty's character"
        aria-label="character"
        aria-describedby="basic-addon1"
      />
      <Button variant="danger" onClick={props.resetName}>
        Limpiar
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
