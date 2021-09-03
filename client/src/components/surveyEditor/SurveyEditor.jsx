import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { toast, ToastContainer } from 'react-toastify';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { EditText } from 'react-edit-text';
import QuestionEditor from './QuestionEditor';
import uploadImage from '../../services/uploadImageService';

export default function SurveyEditor() {
	const [questions, setQuestions] = useState([]);
	const [title, setTitle] = useState('');
	const [subTitle, setSubTitle] = useState('');
	const [thumbnail, setThumbnail] = useState({ src: '', alt: '' });
	const [thumbnailURL, setThumbnailURL] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const [progress, setProgress] = useState(0);

	const imageSelector = useRef();

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

		const survey = {
			title,
			subTitle,
			questions: newQuestions,
			creator: 'auth0|6110b5c4c61fd70077d2819d',
			thumbnail: thumbnailURL,
		};

		if (!survey.thumbnail) delete survey.thumbnail;

		console.log(survey);
	};

	const successNotify = () => {
		toast.success('Successfully Uploaded!', {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 2000,
		});
	};

	const errorNotify = (message) => {
		toast.error(message, {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 2000,
		});
	};

	return (
		<div className="se__container">
			<div className="se__top-cut-off" />
			<div className="se__title-section">
				<Container className="se__title-container">
					<Row>
						<Col sm={9}>
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
						</Col>
						<Col>
							{thumbnail.src && (
								<Image
									className="se__thumbnail"
									src={thumbnail.src}
									alt={thumbnail.alt}
								/>
							)}
							{!thumbnail.src && <div className="se__thumbnail" />}
							<input
								type="file"
								onChange={(e) => {
									uploadImage.handleSelect(e, setThumbnail);
								}}
								ref={imageSelector}
								accept="image/*"
							/>
							<Button
								className="se__thumbnail-btn shadow-none"
								onClick={() => imageSelector.current.click()}
							>
								Add Thumbnail
							</Button>
							<Button
								className="se__thumbnail-btn shadow-none"
								disabled={!thumbnail.src}
								onClick={async () => {
									setThumbnailURL(
										await uploadImage.handleUpload(
											setIsUploading,
											setProgress,
											thumbnail,
											successNotify,
											errorNotify,
										),
									);
								}}
							>
								Upload
							</Button>
						</Col>
					</Row>
					{isUploading && (
						<ProgressBar className="se__progress-bar" now={progress} />
					)}
				</Container>
			</div>
			<div className="se__content">
				<Container>
					<Row className="align-items-center justify-content-between">
						<Col className="text-start" style={{ padding: 0 }}>
							<Button
								className="se__btn-add btn--red shadow-none"
								onClick={() => handleAdd('short answer')}
							>
								+ Add Short Answer
							</Button>
						</Col>
						<Col className="text-center" style={{ padding: 0 }}>
							<Button
								className="se__btn-add btn--blue shadow-none"
								onClick={() => handleAdd('single choice')}
							>
								+ Add Single Choice
							</Button>
						</Col>
						<Col className="text-end" style={{ padding: 0 }}>
							<Button
								className="se__btn-add btn--green shadow-none"
								onClick={() => handleAdd('multiple choice')}
							>
								+ Add Multiple Choice
							</Button>
						</Col>
					</Row>
				</Container>
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
			<ToastContainer />
		</div>
	);
}
