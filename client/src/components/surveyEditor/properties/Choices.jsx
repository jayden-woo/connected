import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

export default function Choices({ question, updateQuestion }) {
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    setChoices(question.choices);
  }, []);

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
    const index = newChoices.findIndex((c) => c.id === id);
    newChoices[index].value = e.target.value;
    setChoices(newChoices);
  };

  const handleRemoveAll = () => {
    updateQuestion(question.name, "choices", []);
    setChoices([]);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Choices</Form.Label>
        <Button onClick={handleAddChoice}>Add New</Button>
        <Button onClick={handleRemoveAll}>Remove All</Button>
        {choices &&
          choices.map((c) => (
            <Form.Group key={c.id}>
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add choice here ..."
                value={c.value}
                onChange={(e) => handleEditChoice(e, c.id)}
                onBlur={() => updateQuestion(question.name, "choices", choices)}
              />
            </Form.Group>
          ))}
      </Form.Group>
    </Form>
  );
}

Choices.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired
    ),
  }).isRequired,
  updateQuestion: PropTypes.func.isRequired,
};
