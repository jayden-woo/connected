import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import SurveyEditor from './components/surveyEditor/SurveyEditor';
import About from './components/About';

const { Header, Content } = Layout;

function App() {
	return (
		<div> 
			<Layout>
				<Header>
					{' '}
					<Navigation />{' '}
				</Header>
				<Content>
					<BrowserRouter>
						<Switch>
							<Route path="/create-survey" component={SurveyEditor} />
							<Route path='/about' component={About}/>
						</Switch>
					</BrowserRouter>
				</Content>
			</Layout>
		</div>
	);
};

export default App;
