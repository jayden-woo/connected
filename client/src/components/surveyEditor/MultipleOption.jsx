import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EditText } from 'react-edit-text';
import PropTypes from 'prop-types';
import EditBtn from './EditBtn';

export default function MultipleOption({
	id,
	editQuestion,
	editOption,
	questionType,
}) {
	const [options, setOptions] = useState([]);

	const handleAdd = () => {
		const newOptions = [...options];
		newOptions.push({
			id: uuidv4(),
			content: '',
		});
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

	const handleSave = (oid, value) => {
		const newOptions = [...options];
		const index = options.findIndex((o) => o.id === oid);
		newOptions[index].content = value;
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
			{options.map((o) => (
				<div key={o.id}>
					{questionType === 'multiple choice' && (
						<i className="far fa-dot-circle edit-option__icon" />
					)}
					{questionType === 'multiple answer' && (
						<i className="far fa-check-square edit-option__icon" />
					)}

					<EditText
						className="edit-option__option"
						placeholder="Click me to edit option ..."
						onSave={({ value }) => handleSave(o.id, value)}
					/>
				</div>
			))}
			<EditBtn
				handleAdd={handleAdd}
				handleRemove={handleRemove}
				handleFinish={handleFinish}
				numOptions={options.length}
			/>
		</div>
	);
}

MultipleOption.propTypes = {
	id: PropTypes.string.isRequired,
	editQuestion: PropTypes.func.isRequired,
	editOption: PropTypes.func.isRequired,
	questionType: PropTypes.string.isRequired,
};
