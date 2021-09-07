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
        isRequired: question.isRequired,
        placeHolder: ["text", "comment"].includes(question.type) ? question.placeHolder : undefined,
        inputType: question.type === "text" ? question.inputType : undefined,
        colCount: ["radiogroup", "checkbox"].includes(question.type) ? question.colCount : undefined,
        choices: ["radiogroup", "checkbox", "dropdown", "ranking", "imagepicker"].includes(question.type)
          ? question.choices.map((c) => c.value)
          : undefined,
        label: question.type === "boolean" ? question.label : undefined,
        labelTrue: question.type === "boolean" ? question.labelTrue : undefined,
        labelFalse: question.type === "boolean" ? question.labelFalse : undefined,
        showTitle: question.type === "boolean" ? question.showTitle : undefined,
        rateMin: question.type === "rating" ? question.rateMin : undefined,
        rateMax: question.type === "rating" ? question.rateMax : undefined,
        rateStep: question.type === "rating" ? question.rateStep : undefined,
        minRateDescription: question.type === "rating" ? question.minRateDescription : undefined,
        maxRateDescription: question.type === "rating" ? question.maxRateDescription : undefined,
        imageHeight:
          question.type === ["image", "imagepicker"].includes(question.type) ? question.imageHeight : undefined,
        imageWidth:
          question.type === ["image", "imagepicker"].includes(question.type) ? question.imageWidth : undefined,
        imageFit: question.type === ["image", "imagepicker"].includes(question.type) ? question.imageFit : undefined,
        imageLink: question.type === "image" ? question.imageLink : undefined,
        html: question.type === "html" ? question.html : undefined,
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
      <Survey.Survey json={json} showQuestionNumbers="off" focusFirstQuestionAutomatic={false} />
    </div>
  );
}

QuestionPreview.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    placeHolder: PropTypes.string,
    inputType: PropTypes.string,
    colCount: PropTypes.number,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired
    ),
    label: PropTypes.string,
    labelTrue: PropTypes.string,
    labelFalse: PropTypes.string,
    showTitle: PropTypes.bool,
    rateMin: PropTypes.number,
    rateMax: PropTypes.number,
    rateStep: PropTypes.number,
    minRateDescription: PropTypes.string,
    maxRateDescription: PropTypes.string,
    imageHeight: PropTypes.string,
    imageWidth: PropTypes.string,
    imageFit: PropTypes.string,
    imageLink: PropTypes.string,
    html: PropTypes.string,
  }).isRequired,
  setActiveQuestion: PropTypes.func.isRequired,
};
