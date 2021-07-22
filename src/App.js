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

  componentDidMount() {
    let getJwtToken = window.localStorage.getItem("jwtToken");
    const currentTime = Date.now() / 1000; //current time of use

    let decodedJWTToken = jwtDecode(getJwtToken);

    // if the jwt token time is less than current, expire the session
    if (decodedJWTToken.exp < currentTime) {
      this.handleUserLogout();
    } else {
      this.handleUserLogin(decodedJWTToken);
    }
  }

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
