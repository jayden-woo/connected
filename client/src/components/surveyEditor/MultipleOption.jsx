import React, { useState } from "react";
import EditBtn from "./EditBtn";
import { EditText } from "react-edit-text";

export default function MultipleOption({
  id,
  editQuestion,
  editOption,
  questionType,
}) {
  const [options, setOptions] = useState([]);

  const handleAdd = () => {
    const newOptions = [...options];
    newOptions.push("");
    editOption(id, newOptions);
    setOptions(newOptions);
  };

  const handleRemove = () => {
    const newOptions = [...options];
    newOptions.pop();
    editOption(id, newOptions);
    setOptions(newOptions);
  };

  const handleFinish = () => {
    editOption(id, options);
  };

  const handleSave = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    editOption(id, newOptions);
    setOptions(newOptions);
  };

  return (
    <div>
      <EditText
        className="edit-question"
        placeholder="Click me to edit question title ..."
        onSave={({ value }) => editQuestion(id, value)}
      />
      {options.map((o, index) => {
        return (
          <div key={index}>
            {questionType === "multiple choice" && (
              <i className="far fa-dot-circle edit-option__icon"></i>
            )}
            {questionType === "multiple answer" && (
              <i className="far fa-check-square edit-option__icon"></i>
            )}

            <EditText
              className="edit-option__option"
              placeholder="Click me to edit option ..."
              onSave={({ value }) => handleSave(index, value)}
            />
          </div>
        );
      })}
      <EditBtn
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleFinish={handleFinish}
        numOptions={options.length}
      />
    </div>
  );
}
