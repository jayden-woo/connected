import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function EditBtn({
	handleAdd,
	handleRemove,
	handleFinish,
	numOptions,
}) {
	const [isEditing, setIsEditing] = useState(false);

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
	);
}

EditBtn.propTypes = {
	handleAdd: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
	handleFinish: PropTypes.func.isRequired,
	numOptions: PropTypes.number.isRequired,
};
