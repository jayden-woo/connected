import React, { useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navigation from './components/Navigation';
import SurveyEditor from './components/surveyEditor/SurveyEditor';
import SurveyPage from './components/surveyPage/SurveyPage';
import ProgressContext from './components/common/progressContext';
import UploadProgressBar from './components/common/UploadProgressBar';

function App() {
	const [progressBar, setProgressBar] = useState({
		visible: false,
		progress: 0,
	});

	return (
		<div>
			<ToastContainer />
			<ProgressContext.Provider value={progressBar}>
				<UploadProgressBar />
				<Layout>
					<Navigation id="top" />
					<BrowserRouter>
						<Switch>
							<Route
								path="/create-survey"
								render={() => <SurveyEditor setProgressBar={setProgressBar} />}
							/>
							<Route
								path="/surveys/:id"
								// eslint-disable-next-line react/prop-types
								render={(props) => <SurveyPage id={props.match.params.id} />}
							/>
						</Switch>
					</BrowserRouter>
				</Layout>
			</ProgressContext.Provider>
		</div>
	);
}

export default App;
