import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";

import MainRouter from "./MainRouter";
import AxiosAuthToken from "./components/utils/AxiosAuthToken";

import "./App.css";

export class App extends Component {
  state = {
    user: null,
  };

  //handle use login info
  handleUserLogin = (user) => {
    this.setState({
      user: {
        email: user.email,
      },
    });
  };

  //handle user logout process
  handleUserLogout = () => {
    window.localStorage.removeItem("jwtToken");
    AxiosAuthToken(null);
    this.setState({
      user: null,
    });
  };

  render() {
    return (
      <>
        <ToastContainer position="top-center" />

        <MainRouter
          user={this.state.user}
          handleUserLogin={this.handleUserLogin}
          handleUserLogout={this.handleUserLogin}
        />
      </>
    );
  }
}

export default App;
