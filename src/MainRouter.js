import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import CreateProfile from "./components/CreateProfile/CreateProfile";
import Nav from "./components/Nav/Nav";
import Login from "./components/Login/Login";
import Icons from "./components/Icons/Icons";
import AddFriends from "./components/AddFriends/AddFriends";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const MainRouter = (props) => {
  return (
    <Router>
      <Nav user={props.user} handleUserLogout={props.handleUserLogout} />

      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      <Route exact path="./icons" component={Icons} />
      <PrivateRoute
        exact
        path="/login"
        component={Login}
        handleUserLogout={props.handleUserLogout}
      />
      <Route
        exact
        path="./login"
        render={(routerProps) => (
          <Login {...routerProps} handleUserLogin={props.handleUserLogin} />
        )}
      />

      <Route exact path="/" component={Home} />
    </Router>
  );
};

export default MainRouter;
