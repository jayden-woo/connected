import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function EditBtn({
	handleAdd,
	handleRemove,
	handleFinish,
	handleSelectImage,
	handleUpload,
	editOptions,
	numOptions,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const imageSelector = useRef();

	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	const clickFinish = () => {
		toggleEditing();
		handleFinish();
	};

	return (
		<div>
			{!isEditing && (
				<Button
					className="qe__btn qe__btn--blue shadow-none"
					onClick={toggleEditing}
				>
					Edit
				</Button>
			)}
			{isEditing && (
				<div>
					<Button
						className="qe__btn qe__btn--blue shadow-none"
						onClick={clickFinish}
					>
						Finish
					</Button>
					<input
						type="file"
						onChange={handleSelectImage}
						ref={imageSelector}
						accept="image/*"
					/>
					<Button
						className="qe__btn qe__btn--blue shadow-none"
						onClick={() => imageSelector.current.click()}
					>
						Add IMG
					</Button>
					<Button
						className="qe__btn qe__btn--blue shadow-none"
						onClick={handleUpload}
					>
						Upload
					</Button>
					{editOptions && (
						<div>
							<Button
								className="qe__btn qe__btn--blue shadow-none"
								onClick={handleAdd}
							>
								Add
							</Button>
							<Button
								className="qe__btn qe__btn--blue shadow-none"
								onClick={handleRemove}
								disabled={numOptions === 0}
							>
								Remove
							</Button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

EditBtn.propTypes = {
	handleAdd: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
	handleFinish: PropTypes.func.isRequired,
	handleSelectImage: PropTypes.func.isRequired,
	handleUpload: PropTypes.func.isRequired,
	editOptions: PropTypes.bool.isRequired,
	numOptions: PropTypes.number.isRequired,
};
