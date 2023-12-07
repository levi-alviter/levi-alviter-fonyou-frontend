import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import classes from "./CharacterCard.module.css";
import { useDispatch } from "react-redux";
import { characterActions } from "../store/character-slice";
import genderFormatter from "../utils/gender-formatter";
import classesTransitions from "./CardTransitions.module.css";

const CharacterCard = (props) => {
  const dispatch = useDispatch();

  let genderFormatted = null,
    badgeColor = "warning",
    statusFormmated = null;

  genderFormatted = genderFormatter(props.gender);

  if (props.status === "Alive") {
    statusFormmated = `💓`;
    badgeColor = "success";
  } else if (props.status === "Dead") {
    statusFormmated = `💀`;
    badgeColor = "dark";
  } else {
    statusFormmated = `❓`;
  }

  const setupCharacterId = () =>
    dispatch(
      characterActions.setCharacterId({
        characterId: props.id,
      })
    );

  return (
    <div className={classes["card-box"]} onClick={setupCharacterId}>
      <h5>
        <Badge className={classes["card-badge"]} pill bg={badgeColor}>
          Status {statusFormmated}
        </Badge>
      </h5>
      <Card className={classesTransitions["card-animation"]}>
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Gender: {genderFormatted}</ListGroup.Item>
          <ListGroup.Item>Location: {props.location} 📍</ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-end">
            <Badge bg="secondary">See more...</Badge>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default CharacterCard;
