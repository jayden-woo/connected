import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { EditText } from 'react-edit-text';
import EditBtn from './EditBtn';
import Option from './Option';
import http from '../../services/httpService';

const cloudinaryApiEndpoint =
	'https://api.cloudinary.com/v1_1/ip-connected/image/upload';

export default function QuestionEditor({
	id: qid,
	questionType,
	handleDelete,
	updateQuestion,
}) {
	const [options, setOptions] = useState([]);
	const [image, setImage] = useState({ src: '', alt: '' });
	const [isUploading, setIsUploading] = useState(false);
	const [progress, setProgress] = useState(0);

	const handleAddOption = () => {
		const newOptions = [...options];
		newOptions.push({
			id: uuidv4(),
			content: '',
		});
		updateQuestion(qid, 'choices', newOptions);
		setOptions(newOptions);
	};

	const handleRemoveOption = () => {
		const newOptions = [...options];
		newOptions.pop();
		updateQuestion(qid, 'choices', newOptions);
		setOptions(newOptions);
	};

	const handleSaveOption = (oid, value) => {
		const newOptions = [...options];
		const index = options.findIndex((o) => o.id === oid);
		newOptions[index].content = value;
		updateQuestion(qid, 'choices', newOptions);
		setOptions(newOptions);
	};

	const handleSelectImage = (e) => {
		const i = e.target.files[0];
		if (!i) return;
		if (i.size >= 10 * 1024 * 1024) {
			alert('Image size is limited to 10MB.');
			return;
		}
		setImage({ src: URL.createObjectURL(i), alt: i.name });
	};

	const uploadImage = (file) => {
		const data = new FormData();
		data.append('file', file);
		data.append('upload_preset', 'jbqt2xhd');
		return http.post(cloudinaryApiEndpoint, data, {
			onUploadProgress: (progressEvent) => {
				setProgress(
					Math.round((progressEvent.loaded / progressEvent.total) * 100),
				);
			},
		});
	};

	const handleUpload = async () => {
		try {
			setIsUploading(true);
			setProgress(0);
			const file = await fetch(image.src).then((r) => r.blob());
			const res = await uploadImage(file);
			updateQuestion(qid, 'image', res.data.secure_url);
			console.log(res.data.secure_url);
		} catch (e) {
			console.log('Errors in uploading:', e.message);
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<Container className="qe">
			<Row>
				<Col sm={10}>
					<EditText
						className="edit-text qe__question"
						placeholder="Click me to edit question title ..."
						onSave={({ value }) => updateQuestion(qid, 'question', value)}
					/>
					<Image
						src={image.src || null}
						alt={image.alt || null}
						className="qe__image"
					/>
					{isUploading && <ProgressBar now={progress} />}
					{questionType !== 'short answer' &&
						options.map((o) => (
							<Option
								key={o.id}
								questionType={questionType}
								onSave={({ value }) => handleSaveOption(o.id, value)}
							/>
						))}
				</Col>
				<Col>
					<EditBtn
						handleDelete={() => handleDelete(qid)}
						handleAdd={handleAddOption}
						handleRemove={handleRemoveOption}
						handleSelectImage={handleSelectImage}
						handleUpload={handleUpload}
						showEditOptions={questionType !== 'short answer'}
						numOptions={options.length}
						canUpload={!!image.src}
					/>
				</Col>
			</Row>
		</Container>
	);
}

QuestionEditor.propTypes = {
	id: PropTypes.string.isRequired,
	questionType: PropTypes.string.isRequired,
	handleDelete: PropTypes.func.isRequired,
	updateQuestion: PropTypes.func.isRequired,
};
