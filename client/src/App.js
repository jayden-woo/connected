import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SurveyEditor from "./components/surveyEditor/SurveyEditor";
import About from "./components/About";
import Home from "./components/Home/Home";
import { ToastContainer } from 'react-toastify';
import SurveyPage from './components/surveyPage/SurveyPage';
import ProgressContext from './components/common/progressContext';
import UploadProgressBar from './components/common/UploadProgressBar';

function App() {
	const [progressBar, setProgressBar] = useState({
		visible: false,
		progress: 0,
	});

	return (
			<ToastContainer />
			<ProgressContext.Provider value={progressBar}>
				<UploadProgressBar />
				<Layout>
					<Navigation id="top" />
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
				</Layout>
			</ProgressContext.Provider>
	);
          <Route path="/about" component={About} />
      <Footer />
      <Router>
      </Router>
          <Route path="/" exact component={Home} />
    </>
    <>
}

export default App;
