import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from'./components/Footer'
import SurveyEditor from './components/surveyEditor/SurveyEditor';
import About from './components/About';

function App() {
	return (
		<div> 
			<Navigation id="top" />
			<BrowserRouter>
				<Switch>
					<Route path="/create-survey" component={SurveyEditor} />
					<Route path="/about" component={About} />
				</Switch>
			</BrowserRouter>
			<Footer/>
		</div>
	);
};

export default App;
