import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from'./components/Footer'
import SurveyEditor from './components/surveyEditor/SurveyEditor';
import About from './components/About';

function App() {
	return (
		<div> 
			<Layout>
				<Navigation id="top" />
				<BrowserRouter>
					<Switch>
						<Route path="/create-survey" component={SurveyEditor} />
					</Switch>
				</BrowserRouter>
			</Layout>
		</div>
	);
};

export default App;
