import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Survey from 'survey-react';
import PropTypes from 'prop-types';
import http from '../../services/httpService';
import loadingIcon from '../../assets/loading.svg';

Survey.StylesManager.applyTheme('modern');

export default function SurveyPage({ id }) {
	const [isLoading, setIsLoading] = useState(true);
	const [survey, setSurvey] = useState({});

	const history = useHistory();

	useEffect(async () => {
		try {
			// TODO: remove delay
			setTimeout(async () => {
				const res = await http.get(`http://localhost:3000/api/surveys/${id}`);

				setIsLoading(false);
				setSurvey(res.data);
			}, 200);
		} catch (e) {
			// TODO: redirect to not found page
			if (e.response.status === 404) {
				history.push('/');
			}
		}
	}, []);

	const handleComplete = async (sender) => {
		const submission = {
			survey: id,
			responses: sender.data,
		};

		// TODO:
		try {
			// const res = await http.post(
			// 	'http://localhost:3000/api/submissions',
			// 	submission,
			// );
			// console.log(res.data);
			console.log(submission);
		} catch (e) {
			console.log(e.response.data.message);
		}
	};

	return (
		<div
			style={{
				minHeight: 'calc(100vh - 66.25px)',
				maxWidth: '1000px',
				width: '100%',
				margin: '0 auto',
			}}
		>
			{isLoading && (
				<img
					src={loadingIcon}
					alt="Loading"
					style={{ display: 'block', margin: '10rem auto' }}
				/>
			)}
			{!isLoading && (
				<Survey.Survey json={survey} onComplete={handleComplete} />
			)}
		</div>
	);
}

SurveyPage.propTypes = {
	id: PropTypes.string.isRequired,
};
