import React from "react";
import Button from "react-bootstrap/Button";
import ShortAnswer from "./ShortAnswer";
import MultipleOption from "./MultipleOption";

const QuestionEditor = ({
  id,
  questionType,
  handleRemove,
  editQuestion,
  editOption,
}) => {
  return (
    <div className="qe">
      {questionType === "short answer" && (
        <ShortAnswer id={id} editQuestion={editQuestion} />
      )}
      {questionType !== "short answer" && (
        <MultipleOption
          id={id}
          questionType={questionType}
          editQuestion={editQuestion}
          editOption={editOption}
        />
      )}
      <Button
        className="qe__remove"
        variant="danger"
        onClick={() => handleRemove(id)}
      >
        Remove
      </Button>
    </div>
  );
};

export default QuestionEditor;
