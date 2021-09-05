import React, { useContext } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ProgressContext from './progressContext';

export default function UploadProgressBar() {
	const { visible, progress } = useContext(ProgressContext);

	return (
		<div>
			{visible && <ProgressBar className="progress-bar" now={progress} />}
		</div>
	);
}
