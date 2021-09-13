import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SurveyEditor from "./components/surveyEditor/SurveyEditor";
import About from "./components/About";
import Home from "./components/Home/Home";
import SurveyPage from "./components/surveyPage/SurveyPage";
import ProgressContext from "./components/common/progressContext";
import UploadProgressBar from "./components/common/UploadProgressBar";
import history from "./utils/history";
import GetProfileInfo from "./components/profile/GetProfileInfo";
import Submissions from "./components/submissions/Submissions";

const App = () => {
  const [progressBar, setProgressBar] = useState({
    visible: false,
    progress: 0,
  });

  return (
    <>
      <Router history={history}>
        <ToastContainer />
        <ProgressContext.Provider value={progressBar}>
          <UploadProgressBar />
          <Navigation id="top" />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/profile" component={GetProfileInfo} />
            <Route path="/create-survey" render={() => <SurveyEditor setProgressBar={setProgressBar} />} />
            <Route path="/surveys/:id" component={SurveyPage} />
            <Route path="/submissions" component={Submissions} />
          </Switch>
          <Footer />
        </ProgressContext.Provider>
      </Router>
    </>
  );
};

export default App;
