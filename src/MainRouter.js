import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import CreateProfile from "./components/CreateProfile/CreateProfile";
import Nav from "./components/Nav/Nav";
import Login from "./components/Login/Login";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import Icons from "./components/Icons/Icons";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const MainRouter = (props) => {
  return (
    <Router>
      <Nav user={props.user} handleUserLogout={props.handleUserLogout} />

      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      <PrivateRoute exact path="/questionnaire" component={Questionnaire} />
      <PrivateRoute
        exact
        path="/login"
        component={Login}
        handleUserLogout={props.handleUserLogout}
      />

      <Route exact path="./icons" component={Icons} />
      <Route
        exact
        path="./login"
        render={(routerProps) => (
          <Login {...routerProps} handleUserLogin={props.handleUserLogin} />
        )}
      />
      <PrivateRoute
        exact
        path="./questionnaire/:questions"
        component={Questionnaire}
      />
      <Route exact path="/" component={Home} />
    </Router>
  );
};

export default MainRouter;
