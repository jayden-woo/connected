import React from "react";
import Button from "react-bootstrap/Button";

import PropTypes from "prop-types";

// import uploadImage from "../../services/uploadImageService";
// import notify from "../../services/notifyService";

import Common from "./properties/Common";
import InputType from "./properties/InputType";
import PlaceHolder from "./properties/PlaceHolder";
import Choices from "./properties/Choices";
import ColCount from "./properties/ColCount";
import Bool from "./properties/Bool";
import Rating from "./properties/Rating";
import Image from "./properties/Image";
import HTML from "./properties/HTML";

// eslint-disable-next-line no-unused-vars
export default function QuestionEditor({
  question,
  index,
  numQuestions,
  handleDelete,
  handleMoveUp,
  handleMoveDown,
  updateQuestion,
}) {
  return (
    <div>
      <Button onClick={() => handleDelete(question.name)}>Delete</Button>
      <Button onClick={() => handleMoveUp(question.name)} disabled={index === 0}>
        Move Up
      </Button>
      <Button onClick={() => handleMoveDown(question.name)} disabled={index === numQuestions - 1}>
        Move Down
      </Button>
      {!["image", "html"].includes(question.type) && <Common question={question} updateQuestion={updateQuestion} />}
      {question.type === "text" && <InputType question={question} updateQuestion={updateQuestion} />}
      {["text", "comment"].includes(question.type) && (
        <PlaceHolder question={question} updateQuestion={updateQuestion} />
      )}
      {["radiogroup", "checkbox", "dropdown", "ranking"].includes(question.type) && (
        <Choices question={question} updateQuestion={updateQuestion} />
      )}
      {["radiogroup", "checkbox"].includes(question.type) && (
        <ColCount question={question} updateQuestion={updateQuestion} />
      )}
      {question.type === "boolean" && <Bool question={question} updateQuestion={updateQuestion} />}
      {question.type === "rating" && <Rating question={question} updateQuestion={updateQuestion} />}
      {question.type === "image" && <Image question={question} updateQuestion={updateQuestion} />}
      {question.type === "html" && <HTML question={question} updateQuestion={updateQuestion} />}
    </div>
  );
}

QuestionEditor.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  numQuestions: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleMoveUp: PropTypes.func.isRequired,
  handleMoveDown: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
};
