import React from "react";

function Character(props) {
  return props.givenCharacter === props.typedCharacter ? (
    <span className="text-dark fw-bolder fs-2">{props.givenCharacter}</span>
  ) : props.typedCharacter === null ? (
    <span className="text-danger fw-bolder fs-2">{props.givenCharacter}</span>
  ) : (
    <span className="text-info text-decoration-underline fw-bolder fs-2">
      {props.givenCharacter}
    </span>
  );
}

export default Character;
