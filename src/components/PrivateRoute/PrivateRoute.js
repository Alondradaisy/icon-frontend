import { Router } from "express";
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import UserAuth from "../utils/UserAuth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routerProps) =>
        UserAuth() ? <Component {...routerProps} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
