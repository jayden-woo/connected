import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function EditBtn({
	handleDelete,
	handleAdd,
	handleRemove,
	handleSelectImage,
	handleUpload,
	showEditOptions,
	numOptions,
	canUpload,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const imageSelector = useRef();

	return (
		<div>
			<Button
				className="qe__btn qe__btn--mt qe__btn--red shadow-none"
				onClick={handleDelete}
			>
				Delete
			</Button>
			{!isEditing && (
				<Button
					className="qe__btn qe__btn--blue shadow-none"
					onClick={() => setIsEditing(!isEditing)}
				>
					Edit
				</Button>
			)}
			{isEditing && (
				<div>
					<Button
						className="qe__btn qe__btn--blue shadow-none"
						onClick={() => setIsEditing(!isEditing)}
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
						disabled={!canUpload}
					>
						Upload
					</Button>
					{showEditOptions && (
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
	handleDelete: PropTypes.func.isRequired,
	handleAdd: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
	handleSelectImage: PropTypes.func.isRequired,
	handleUpload: PropTypes.func.isRequired,
	showEditOptions: PropTypes.bool.isRequired,
	numOptions: PropTypes.number.isRequired,
	canUpload: PropTypes.bool.isRequired,
};
