import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { characterActions } from "../store/character-slice";
import genderFormatter from "../utils/gender-formatter";

const CharacterModal = () => {
  const dispatch = useDispatch();
  const characterId = useSelector((state) => state.character.characterId);
  const [characterData, setCharacterData] = useState(null);
  const [formattedCreated, setformattedCreated] = useState("");
  const [genderFormatted, setGenderFormatted] = useState("");
  const [statusFormatted, setStatusFormatted] = useState("");
  const openModalFlag = !!characterId;

  const resetCharacterId = () => dispatch(characterActions.removeCharacterId());

  const fetchInfoOfSingleCharacter = async () => {
    if (!characterId) return;

    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/characters/${characterId}`
      );

      if (!response.ok) {
        throw new Error("Error while fetching user!");
      }

      const responseData = await response.json();
      console.log(responseData);
      setCharacterData(responseData);
      if (responseData?.created) {
        setformattedCreated(responseData?.created?.split("T")[0]);
      }
      if (responseData?.gender) {
        setGenderFormatted(genderFormatter(responseData?.gender));
      }
      if (responseData?.status) {
        if (responseData.status === "Alive") {
          setStatusFormatted(`${responseData.status} 👍`);
        } else if (responseData.status === "Dead") {
          setStatusFormatted(`${responseData.status} 💀`);
        } else {
          setStatusFormatted(`${responseData.status} ❓`);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (characterId) {
      fetchInfoOfSingleCharacter();
    }

    return () => {
      setCharacterData(null);
    };
  }, [characterId]);
  return (
    <>
      {characterData && (
        <Modal
          size="lg"
          show={openModalFlag}
          onHide={resetCharacterId}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="example-modal-sizes-title-lg"
              className="display-4"
            >
              {characterData?.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0">
            <div className="container-fluid p-0">
              <div className="row">
                <div className="col-md-6">
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={characterData?.image}
                    alt={characterData?.name}
                    className="img-fluid"
                  />
                </div>
                <ListGroup className="col-md-6 px-3 list-group-flush">
                  <ListGroup.Item>
                    {" "}
                    <p className="lead">
                      <strong>Created: </strong>
                      <Badge bg="info">{formattedCreated ?? "--"}</Badge>
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <p className="lead">
                      <strong>Episodes: </strong>
                      <Badge bg="dark">
                        {characterData?.episode?.length ?? "--"}
                      </Badge>
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <p className="lead">
                      <strong>Gender: </strong> {genderFormatted ?? "--"}
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <p className="lead">
                      <strong>Location: </strong>{" "}
                      {characterData?.name
                        ? `${characterData.name} 📍🗺️`
                        : "--"}
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <p className="lead">
                      <strong>Origin: </strong>{" "}
                      {characterData?.origin?.name
                        ? `${characterData.origin.name} 🏠`
                        : "--"}
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <p className="lead">
                      <strong>Species: </strong>{" "}
                      {characterData?.species ?? "--"}
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <p className="lead">
                      <strong>Status: </strong> {statusFormatted ?? "--"}
                    </p>
                  </ListGroup.Item>

                  {characterData?.type && (
                    <ListGroup.Item>
                      <p className="lead">
                        <strong>Type: </strong> {characterData?.type ?? "--"}
                      </p>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <div
                      className="d-flex justify-content-end"
                      onClick={resetCharacterId}
                    >
                      <Button variant="danger">Close</Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default CharacterModal;
