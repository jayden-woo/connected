import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SurveyEditor from "./components/surveyEditor/SurveyEditor";

const { Header, Content } = Layout;

function App() {
  return (
    <div>
      {/* <Layout>
        <Header style={{ height: "8vh" }}>
          {" "}
          <Navigation />{" "}
        </Header>
        <Content style={{ height: "92vh" }}>
          <BrowserRouter>
            <Switch>
            </Switch>
          </BrowserRouter>
        </Content>
      </Layout> */}
      <SurveyEditor />
    </div>
  );
}

export default App;
