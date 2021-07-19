import React, { Component } from "react";
import jwtDecode from "jwt-decode";

import { toast } from "react-toastify";
import Axios from "../../utils/Axios";
import UserAuth from "../../utils/UserAuth";
import AxiosAuthToken from "../../utils/AxiosAuthToken";

import "./Login.css";

export class Login extends Component {
  state = {
    email: "",
    emailError: "",
    emailOnFocus: false,
    password: "",
    passwordError: "",
    passwordOnFocus: false,
    canSubmit: true,
  };

  render() {
    const { email, emailError, password, passwordError, canSubmit } =
      this.state;

    return (
    <div className="container">
      <div className="form-text">Login</div>

      <div className="home-container"

      <div className="form-div">
        <form className="form">
          <div className="form-group-block">

            <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    placeholder="Email"
                    name="email"
                    onChange=
                    onFocus=
                    autoFocus
                /> 
                <div className="errorMessage">
                    {emailError && emailError}
                </div>
            </div>

            <div className="form-group-block">
                <div className="block-container">
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        id="password"
                        value={password}
                        placeholder="Password"
                        name="password"
                        onChange=
                    />
                    <div className="errorMessage">
                        {passwordError && passwordError}
                    </div>
                </div>
            </div>

            <div className="button-container">
                <button type="submit">Log me in!</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    );
};
}
export default Login;
