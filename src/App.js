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

  componentDidMount() {}
}

export default App;
