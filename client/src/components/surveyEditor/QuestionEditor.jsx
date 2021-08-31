import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { EditText } from 'react-edit-text';
import EditBtn from './EditBtn';

export default function QuestionEditor({
	id: qid,
	questionType,
	handleRemove: handleDelete,
	editQuestion,
	editOption,
}) {
	const [options, setOptions] = useState([]);

	const handleAddOption = () => {
		const newOptions = [...options];
		newOptions.push({
			id: uuidv4(),
			content: '',
		});
		editOption(qid, newOptions);
		setOptions(newOptions);
	};

	const handleRemoveOption = () => {
		const newOptions = [...options];
		newOptions.pop();
		editOption(qid, newOptions);
		setOptions(newOptions);
	};

	const handleFinishEditOptions = () => {
		editOption(qid, options);
	};

	const handleSaveOption = (oid, value) => {
		const newOptions = [...options];
		const index = options.findIndex((o) => o.id === oid);
		newOptions[index].content = value;
		editOption(qid, newOptions);
		setOptions(newOptions);
	};

	return (
		<Container className="qe">
			<Row>
				<Col sm={10}>
					<EditText
						className="edit-text edit-question"
						placeholder="Click me to edit question title ..."
						onSave={({ value }) => editQuestion(qid, value)}
					/>
					{questionType !== 'short answer' &&
						options.map((o) => (
							<div key={o.id}>
								{questionType === 'multiple choice' && (
									<i className="far fa-dot-circle fa-2x edit-option__icon" />
								)}
								{questionType === 'multiple answer' && (
									<i className="far fa-check-square fa-2x edit-option__icon" />
								)}
								<EditText
									className="edit-text edit-option__option"
									placeholder="Click me to edit option ..."
									onSave={({ value }) => handleSaveOption(o.id, value)}
								/>
							</div>
						))}
				</Col>
				<Col>
					<Button
						className="qe__btn qe__btn--mt shadow-none"
						variant="danger"
						onClick={() => handleDelete(qid)}
					>
						Delete
					</Button>
					{questionType !== 'short answer' && (
						<EditBtn
							handleAdd={handleAddOption}
							handleRemove={handleRemoveOption}
							handleFinish={handleFinishEditOptions}
							numOptions={options.length}
						/>
					)}
				</Col>
			</Row>
		</Container>
	);
}

QuestionEditor.propTypes = {
	id: PropTypes.string.isRequired,
	questionType: PropTypes.string.isRequired,
	handleRemove: PropTypes.func.isRequired,
	editQuestion: PropTypes.func.isRequired,
	editOption: PropTypes.func.isRequired,
};
