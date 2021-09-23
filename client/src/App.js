import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./utils/Protected-routes";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SurveyEditor from "./pages/surveyPages/SurveyEditor";
import SurveyList from "./pages/surveyPages/SurveyList";
import SurveyPage from "./pages/surveyPages/SurveyPage";
import Submissions from "./pages/surveyPages/Submissions";
import About from "./pages/About";
import Home from "./components/home/Home";
import Post from "./components/post/Post";
import AddPost from "./components/post/AddPost";
import Error from "./pages/Error";

const App = () => (
  <>
    <ToastContainer />
    <Navigation id="top" />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route path="/posts/add" exact component={AddPost} />
      <Route path="/posts/:id" exact component={Post} />
      <Route path="/surveys/:id" exact component={SurveyPage} />
      <Route path="/surveys" exact component={SurveyList} />
      <ProtectedRoute path="/create-survey" exact component={SurveyEditor} />
      <ProtectedRoute path="/submissions" exact component={Submissions} />
      <Route component={Error} />
    </Switch>
    <Footer />
  </>
);
export default App;
