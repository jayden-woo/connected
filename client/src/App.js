import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import SurveyEditor from './components/surveyEditor/SurveyEditor';

function App() {
	return (
		<div>
			<Layout>
				<Navigation />
				<BrowserRouter>
					<Switch>
						<Route path="/create-survey" component={SurveyEditor} />
					</Switch>
				</BrowserRouter>
			</Layout>
		</div>
	);
}

export default App;
