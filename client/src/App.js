import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SurveyEditor from "./components/surveyEditor/SurveyEditor";
import About from "./components/About";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <Navigation id="top" />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create-survey" component={SurveyEditor} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
