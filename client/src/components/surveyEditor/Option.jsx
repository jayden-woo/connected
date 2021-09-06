import React from "react";
import { EditText } from "react-edit-text";
import PropTypes from "prop-types";

export default function Option({ type, onSave, value }) {
  return (
    <div>
      {type === "radiogroup" && <i className="far fa-dot-circle fa-2x qe__option-icon" />}
      {type === "checkbox" && <i className="far fa-check-square fa-2x qe__option-icon" />}
      <EditText
        className="edit-text qe__option"
        placeholder="Click me to edit option ..."
        value={value}
        onSave={onSave}
      />
    </div>
  );
}

Option.propTypes = {
  type: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
