import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { EditText } from 'react-edit-text';
import QuestionEditor from './QuestionEditor';

export default function SurveyEditor() {
	const [questions, setQuestions] = useState([]);
	const [title, setTitle] = useState('');
	const [subTitle, setSubTitle] = useState('');

	const handleAdd = (type) => {
		setQuestions([
			...questions,
			{
				question: '',
				questionType: type,
				id: uuidv4(),
			},
		]);
	};

	const handleDelete = (id) => {
		const newQuestions = [...questions];
		const index = questions.findIndex((q) => q.id === id);
		newQuestions.splice(index, 1);
		setQuestions(newQuestions);
	};

	const updateQuestion = (id, key, value) => {
		const newQuestions = [...questions];
		const index = questions.findIndex((q) => q.id === id);
		newQuestions[index][key] = value;
		setQuestions(newQuestions);
	};

	const validate = () => {
		if (questions.length === 0) {
			alert('Survey cannot be empty.');
			return false;
		}

		/* eslint-disable-next-line */
		for (const q of questions) {
			if (q.question === '') {
				alert('All questions must have a title.');
				return false;
			}

			if (q.questionType !== 'short answer') {
				if (!q.choices || q.choices.length < 2) {
					alert('Multiple option question must have at least 2 options.');
					return false;
				}

				/* eslint-disable-next-line */
				for (const c of q.choices) {
					if (c === '') {
						alert('Question cannot have empty option.');
						return false;
					}
				}
			}
		}

		return true;
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

			if (newQ.choices) {
				const choices = newQ.choices.map((c) => c.content);
				newQ.choices = choices;
			}

			newQuestions.push(newQ);
		});

		console.log({
			title,
			subTitle,
			questions: newQuestions,
			creator: 'auth0|6110b5c4c61fd70077d2819d',
		});
	};

	return (
		<div className="se__container" id="top">
			<div className="se__top-cut-off" />
			<div className="se__title-section">
				<EditText
					className="edit-text se__title"
					placeholder="Add title here ..."
					onSave={({ value }) => setTitle(value)}
				/>
				<EditText
					className="edit-text se__sub-title"
					placeholder="Add sub title here ..."
					onSave={({ value }) => setSubTitle(value)}
				/>
			</div>
			<div className="se__content">
				<div className="se__add-btn-container">
					<Button
						className="se__btn-add se__btn--red shadow-none"
						onClick={() => handleAdd('short answer')}
					>
						+ Add Short Answer
					</Button>
					<Button
						className="se__btn-add se__btn--blue shadow-none"
						onClick={() => handleAdd('single choice')}
					>
						+ Add Single Choice
					</Button>
					<Button
						className="se__btn-add se__btn--green shadow-none"
						onClick={() => handleAdd('multiple choice')}
					>
						+ Add Multiple Choice
					</Button>
				</div>
				{questions.map((q) => (
					<QuestionEditor
						key={q.id}
						id={q.id}
						questionType={q.questionType}
						handleDelete={handleDelete}
						updateQuestion={updateQuestion}
					/>
				))}
			</div>
			<div className="se__bottom-cut-off">
				<a href="#top">BACK TO TOP</a>
			</div>
			<div className="se__publish">
				<Button className="se__btn-cancel shadow-none">Cancel</Button>
				<Button className="se__btn-publish shadow-none" onClick={onSubmit}>
					Publish
				</Button>
			</div>
		</div>
	);
}
