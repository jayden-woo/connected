import React from 'react';
import { EditText } from 'react-edit-text';
import PropTypes from 'prop-types';

export default function Option({ questionType, onSave }) {
	return (
		<div>
			{questionType === 'single choice' && (
				<i className="far fa-dot-circle fa-2x qe__option-icon" />
			)}
			{questionType === 'multiple choice' && (
				<i className="far fa-check-square fa-2x qe__option-icon" />
			)}
			<EditText
				className="edit-text qe__option"
				placeholder="Click me to edit option ..."
				onSave={onSave}
			/>
		</div>
	);
}

Option.propTypes = {
	questionType: PropTypes.string.isRequired,
	onSave: PropTypes.func.isRequired,
};
