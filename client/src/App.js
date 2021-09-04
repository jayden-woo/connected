import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import Navigation from './components/Navigation';
import SurveyEditor from './components/surveyEditor/SurveyEditor';
import SurveyPage from './components/surveyPage/SurveyPage';

function App() {
	return (
		<div>
			<ToastContainer />
			<Layout>
				<Navigation id="top" />
				<BrowserRouter>
					<Switch>
						<Route path="/create-survey" component={SurveyEditor} />
						<Route
							path="/surveys/:id"
							render={(props) => <SurveyPage id={props.match.params.id} />}
						/>
					</Switch>
				</BrowserRouter>
			</Layout>
		</div>
	);
}

App.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}).isRequired,
};

export default App;
