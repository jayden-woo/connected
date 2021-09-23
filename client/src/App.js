import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SurveyEditor from "./components/surveyEditor/SurveyEditor";
import About from "./components/About";
import Home from "./components/home/Home";
import SurveyPage from "./components/surveyPage/SurveyPage";
import SurveyList from "./components/surveyPage/SurveyList";
import ProgressContext from "./components/common/progressContext";
import UploadProgressBar from "./components/common/UploadProgressBar";
import Post from "./components/post/Post";
import history from "./utils/history";
import Submissions from "./components/submissions/Submissions";
import AddPost from "./components/post/AddPost";
import Error from "./components/Error";

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
            <Route path="/surveys" component={SurveyList} />
            <Route path="/about" exact component={About} />
            <Route path="/create-survey" exact render={() => <SurveyEditor setProgressBar={setProgressBar} />} />
            <Route path="/posts/add" exact component={AddPost} />
            <Route path="/posts/:id" component={Post} />
            <Route path="/surveys/:id" component={SurveyPage} />
            <Route path="/submissions" exact component={Submissions} />
            <Route component={Error} />
          </Switch>
          <Footer />
        </ProgressContext.Provider>
      </Router>
    </>
  );
};

export default App;
