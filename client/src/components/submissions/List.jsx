import React from "react";
import PropTypes from "prop-types";

export default function List({ responses }) {
  console.log(responses);
  return (
    <div className="sb__list">
      <ul>
        {responses.map((r) => (
          <li>{r}</li>
        ))}
      </ul>
    </div>
  );
}

List.propTypes = {
  responses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
