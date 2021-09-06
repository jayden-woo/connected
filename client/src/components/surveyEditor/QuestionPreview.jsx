import React from "react";
import * as Survey from "survey-react";
import PropTypes from "prop-types";

export default function QuestionPreview({ question, setActiveQuestion }) {
  const json = {
    questions: [
      {
        type: question.type,
        title: question.title ? question.title : "Question Preview",
        name: question.name,
        choices: question.choices ? question.choices.map((c) => c.content) : undefined,
      },
    ],
  };

  return (
    // eslint-disable-next-line
    <div
      onClick={() => {
        console.log(question.name);
        setActiveQuestion(question.name);
      }}
    >
      <Survey.Survey json={json} showQuestionNumbers="off" />
    </div>
  );
}

QuestionPreview.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  setActiveQuestion: PropTypes.func.isRequired,
};
