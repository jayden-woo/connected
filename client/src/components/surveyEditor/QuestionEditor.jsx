import React from "react";
import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

import PropTypes from "prop-types";

// import uploadImage from "../../services/uploadImageService";
// import notify from "../../services/notifyService";

import Common from "./properties/Common";
import Choices from "./properties/Choices";

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
      {["radiogroup", "checkbox", "dropdown", "ranking"].includes(question.type) && (
        <Choices question={question} updateQuestion={updateQuestion} />
      )}
    </div>
  );
}

QuestionEditor.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  index: PropTypes.number.isRequired,
  numQuestions: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleMoveUp: PropTypes.func.isRequired,
  handleMoveDown: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  // setProgressBar: PropTypes.shape({
  //   visible: PropTypes.bool.isRequired,
  //   progress: PropTypes.number.isRequired,
  // }).isRequired,
};
