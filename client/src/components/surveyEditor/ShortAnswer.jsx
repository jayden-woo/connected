import React from 'react';
import PropTypes from 'prop-types';
import { EditText } from 'react-edit-text';

export default function ShortAnswer({ id, editQuestion }) {
	return (
		<EditText
			className="edit-text edit-question"
			placeholder="Click me to edit question title ..."
			onSave={({ value }) => editQuestion(id, value)}
		/>
	);
}

ShortAnswer.propTypes = {
	id: PropTypes.string.isRequired,
	editQuestion: PropTypes.func.isRequired,
};
