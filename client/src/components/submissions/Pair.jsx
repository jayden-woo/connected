import React from "react";
import * as Survey from "survey-react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";

import Chart from "./Chart";

export default function Pair({ question, responses }) {
  const survey = {
    questions: [{ ...question }],
  };

  return (
    <Row className="sb__pair">
      <Col sm={12} md={6}>
        <Survey.Survey json={survey} showQuestionNumbers="off" focusFirstQuestionAutomatic={false} />
      </Col>
      <Col sm={12} md={6}>
        {responses.length !== 0 &&
          ["boolean", "dropdown", "radiogroup", "rating", "checkbox"].includes(question.type) && (
            <Chart responses={responses} />
          )}
        {responses.length === 0 && <p>No responses yet.</p>}
      </Col>
    </Row>
  );
}

Pair.propTypes = {
  question: PropTypes.shape().isRequired,
  responses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
