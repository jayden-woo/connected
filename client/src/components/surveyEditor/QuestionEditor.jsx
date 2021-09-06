import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import _ from "lodash";

// import uploadImage from "../../services/uploadImageService";
// import notify from "../../services/notifyService";

// import EditBtn from "./EditBtn";
// import Option from "./Option";

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
  // export default function QuestionEditor({ question, handleDelete, updateQuestion, setProgressBar }) {
  // const [options, setOptions] = useState([]);
  // const [image, setImage] = useState({ src: "", alt: "" });
  const [title, setTitle] = useState("");
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    setTitle(question.title);
    setChoices(question.choices);
  }, []);

  // const handleAddOption = () => {
  //   const newOptions = [...options];
  //   newOptions.push({
  //     id: uuidv4(),
  //     content: "",
  //   });
  //   updateQuestion(question.name, "choices", newOptions);
  //   setOptions(newOptions);
  // };

  // const handleRemoveOption = () => {
  //   const newOptions = [...options];
  //   newOptions.pop();
  //   updateQuestion(question.name, "choices", newOptions);
  //   setOptions(newOptions);
  // };

  const handleAddChoice = () => {
    const newChoices = [...question.choices];
    newChoices.push({
      id: uuidv4(),
      value: "",
    });
    updateQuestion(question.name, "choices", newChoices);
    setChoices(question.choices);
  };

  const handleEditChoice = (e, id) => {
    const newChoices = [...choices];
    const choice = _.find(newChoices, { id });
    choice.value = e.target.value;
    setChoices(newChoices);
  };

  const handleRemoveAll = () => {
    updateQuestion(question.name, "choices", []);
    setChoices([]);
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter question title here ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => updateQuestion(question.name, "title", title)}
          />
        </Form.Group>

        {question.type !== "text" && (
          <Form.Group>
            <Form.Label>Choices</Form.Label>
            <Button onClick={handleAddChoice}>Add New</Button>
            <Button onClick={handleRemoveAll}>Remove All</Button>
            {choices &&
              choices.map((c) => (
                <Form.Group key={c.id}>
                  <Form.Control
                    key={c.id}
                    type="text"
                    placeholder="Add choice here ..."
                    value={c.value}
                    onChange={(e) => handleEditChoice(e, c.id)}
                    onBlur={() => updateQuestion(question.name, "choices", choices)}
                  />
                </Form.Group>
              ))}
          </Form.Group>
        )}
      </Form>
      <Button onClick={() => handleDelete(question.name)}>Delete</Button>
      <Button onClick={() => handleMoveUp(question.name)} disabled={index === 0}>
        Move Up
      </Button>
      <Button onClick={() => handleMoveDown(question.name)} disabled={index === numQuestions - 1}>
        Move Down
      </Button>
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
