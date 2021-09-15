import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

const HTML = ({ question, updateQuestion }) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    setHtml(question.html);
  }, []);

  return (
    <Form>
      <Form.Group>
        <Form.Label>HTML</Form.Label>
        <Form.Control
          className="shadow-none"
          as="textarea"
          placeholder="Enter html here ..."
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          onBlur={() => {
            if (html) {
              updateQuestion(question.name, "html", html);
            } else {
              updateQuestion(question.name, "html", "Enter html here ...");
            }
          }}
        />
      </Form.Group>
    </Form>
  );
};

HTML.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  }).isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default HTML;
