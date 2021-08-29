import React from "react";
import { EditText } from "react-edit-text";

export default function ShortAnswer({ id, editQuestion }) {
  return (
    <EditText
      className="edit-question"
      placeholder="Click me to edit question title ..."
      onSave={({ value }) => editQuestion(id, value)}
    />
  );
}
