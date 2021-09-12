import React from "react";
import PropTypes from "prop-types";

export default function List({ responses }) {
  return (
    <div className="sb__list">
      <ul>
        {responses.map((r, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

List.propTypes = {
  responses: PropTypes.arrayOf(PropTypes.string).isRequired,
};
