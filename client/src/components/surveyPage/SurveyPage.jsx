import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import _ from 'lodash';
import * as Survey from 'survey-react';
import PropTypes from 'prop-types';
import http from '../../services/httpService';

Survey.StylesManager.applyTheme('modern');

const handleComplete = (sender) => {
	console.log(sender.data);
	console.log(JSON.stringify(sender.data));
};

export default function SurveyPage({ id }) {
	const [isLoading, setIsLoading] = useState(true);
	const [survey, setSurvey] = useState({});

	const history = useHistory();

	useEffect(async () => {
		try {
			const res = await http.get(`http://localhost:3000/api/surveys/${id}`);

			setIsLoading(false);
			setSurvey(res.data);
		} catch (e) {
			// TODO: redirect to not found page
			if (e.response.status === 404) {
				history.push('/');
			}
		}
	}, []);

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
				<p
					style={{
						fontSize: '5rem',
						textAlign: 'center',
					}}
				>
					Loading Survey Details ...{' '}
				</p>
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
