import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

export default function Image({ question, updateQuestion }) {
  const [imageHeight, setImageHeight] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageFit, setImageFit] = useState("");

  useEffect(() => {
    setImageHeight(question.imageHeight);
    setImageWidth(question.imageWidth);
    setImageFit(question.imageFit);
  }, []);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Image Height</Form.Label>
        <Form.Control
          type="text"
          value={imageHeight}
          onChange={(e) => setImageHeight(e.target.value)}
          onBlur={() => updateQuestion(question.name, "imageHeight", imageHeight)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image Width</Form.Label>
        <Form.Control
          type="text"
          value={imageWidth}
          onChange={(e) => setImageWidth(e.target.value)}
          onBlur={() => updateQuestion(question.name, "imageWidth", imageWidth)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image Fit</Form.Label>
        <Form.Select
          onChange={(e) => {
            updateQuestion(question.name, "imageFit", e.target.value);
            setImageFit(e.target.value);
          }}
          value={imageFit}
        >
          <option>none</option>
          <option>contain</option>
          <option>cover</option>
          <option>fill</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
}

Image.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageHeight: PropTypes.string.isRequired,
    imageWidth: PropTypes.string.isRequired,
    imageFit: PropTypes.string.isRequired,
  }).isRequired,
  updateQuestion: PropTypes.func.isRequired,
};
