import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { EditText } from 'react-edit-text';
import { toast, ToastContainer } from 'react-toastify';
import EditBtn from './EditBtn';
import Option from './Option';
import uploadImage from '../../services/uploadImageService';
import 'react-toastify/dist/ReactToastify.css';

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
		<div>
			<Container className="qe">
				<Row>
					<Col sm={10} style={{ borderRight: '1px solid #ccc' }}>
						<EditText
							className="edit-text qe__question"
							placeholder="Click me to edit question title ..."
							onSave={({ value }) => updateQuestion(qid, 'question', value)}
						/>
						{image.src && (
							<Image src={image.src} alt={image.alt} className="qe__image" />
						)}
						{isUploading && (
							<ProgressBar className="qe__progress-bar" now={progress} />
						)}
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
							handleSelect={(e) => uploadImage.handleSelect(e, setImage)}
							handleUpload={async () => {
								updateQuestion(
									qid,
									'image',
									await uploadImage.handleUpload(
										setIsUploading,
										setProgress,
										image,
										successNotify,
										errorNotify,
									),
								);
							}}
							showEditOptions={questionType !== 'short answer'}
							numOptions={options.length}
							canUpload={!!image.src}
						/>
					</Col>
				</Row>
			</Container>
			<ToastContainer />
		</div>
	);
}

QuestionEditor.propTypes = {
	id: PropTypes.string.isRequired,
	questionType: PropTypes.string.isRequired,
	handleDelete: PropTypes.func.isRequired,
	updateQuestion: PropTypes.func.isRequired,
};
