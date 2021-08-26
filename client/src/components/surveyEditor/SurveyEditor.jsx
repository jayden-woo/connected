import React, { useState } from "react";
import QuestionEditor from "./QuestionEditor";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import { EditText } from "react-edit-text";
import _ from "lodash";

export default function SurveyEditor() {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const handleAdd = (type) => {
    setQuestions([
      ...questions,
      {
        question: "",
        questionType: type,
        id: uuidv4(),
      },
    ]);
  };

  const handleRemove = (id) => {
    const newQuestions = [...questions];
    const index = questions.findIndex((q) => {
      return q.id === id;
    });
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const editQuestion = (id, question) => {
    const newQuestions = [...questions];
    const index = questions.findIndex((q) => {
      return q.id === id;
    });
    newQuestions[index].question = question;
    setQuestions(newQuestions);
  };

  const editOption = (id, options) => {
    const newQuestions = [...questions];
    const index = questions.findIndex((q) => {
      return q.id === id;
    });
    newQuestions[index].choices = options;
    setQuestions(newQuestions);
  };

  const onSubmit = () => {
    if (!validate()) {
      return;
    }

    const newQuestions = [];

    questions.forEach((q, index) => {
      const newQ = _.cloneDeep(q);
      newQ.index = index;
      delete newQ.id;
      newQuestions.push(newQ);
    });

    console.log({
      title,
      subTitle,
      questions: newQuestions,
      creator: "auth0|6110b5c4c61fd70077d2819d",
    });
  };

  const validate = () => {
    if (questions.length === 0) {
      alert("Survey cannot be empty.");
      return false;
    }

    for (const q of questions) {
      if (q.question === "") {
        alert("All questions must have a title.");
        return false;
      }

      if (q.questionType !== "short answer") {
        if (q.choices.length < 2) {
          alert("Multiple option question must have at least 2 options.");
          return false;
        }

        for (const c of q.choices) {
          if (c === "") {
            alert("Question cannot have empty option.");
            return false;
          }
        }
      }
    }

    return true;
  };

  return (
    <div className="container se">
      <EditText
        className="se__title"
        placeholder="Add title here ..."
        onSave={({ value }) => setTitle(value)}
      />
      <EditText
        className="se__sub-title"
        placeholder="Add sub title here ..."
        onSave={({ value }) => setSubTitle(value)}
      />
      <div className="space-between se__add-btn-container">
        <Button
          className="se__btn-add"
          onClick={() => handleAdd("short answer")}
        >
          Add Short Answer
        </Button>
        <Button
          className="se__btn-add"
          onClick={() => handleAdd("multiple choice")}
        >
          Add Multiple Choice
        </Button>
        <Button
          className="se__btn-add"
          onClick={() => handleAdd("multiple answer")}
        >
          Add Multiple Answer
        </Button>
      </div>
      <div>
        {questions.map((q, index) => {
          return (
            <QuestionEditor
              key={q.id}
              id={q.id}
              questionType={q.questionType}
              handleRemove={handleRemove}
              editQuestion={editQuestion}
              editOption={editOption}
            />
          );
        })}
      </div>
      <Button className="se__btn-publish" onClick={onSubmit} variant="success">
        Publish
      </Button>
    </div>
  );
}
