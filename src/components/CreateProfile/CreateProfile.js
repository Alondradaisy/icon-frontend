import React, { Component } from "react";
import jwtDecode from "jwt-decode";
// import validators here -> check out validator npm docs
import { toast } from "react-toastify";
import Axios from "../../utils/Axios";
import UserAuth from "../../utils/UserAuth";

import "./CreateProfile.css";

export class CreateProfile extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    usernameError: "",
    passwordError: "",
    confirmPasswordError: "",
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      emailError,
      usernameError,
      passwordError,
      confirmPasswordError,
    } = this.state;

    return (
      <div className="container">
        <div className="form-text">Create Profile</div>

        <div className="form-div">
          <form className="form" onSubmit>
            <div className="form-group-inline">
              <div className="inline-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  placeholder="Enter your first name"
                  name="firstName"
                  autoFocus
                  onBlur
                  onFocus
                />
                <div className="errorMessage">
                  {firstNameError && firstNameError}
                </div>
              </div>

              <div className="inline-container">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  placeholder="Enter your last name"
                  name="lastName"
                  onBlur
                  onFocus
                />
                <div className="errorMessage">
                  {lastNameError && lastNameError}
                </div>
              </div>

              <div className="inline-container">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Enter your email"
                  name="email"
                  onBlur
                  onFocus
                />
                <div className="errorMessage">{emailError && emailError}</div>
              </div>

              <div className="inline-container">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Enter a username: letters only"
                  name="username"
                  onBlur
                  onFocus
                />
                <div className="errorMessage">
                  {usernameError && usernameError}
                </div>
              </div>

              <div className="inline-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  placeholder="Enter an alphanumerical password (letters and numbers only)"
                  name="password"
                  onBlur
                  onFocus
                />
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>

              <div className="inline-container">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="text"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onBlur
                  onFocus
                />
                <div className="errorMessage">
                  {confirmPasswordError && confirmPasswordError}
                </div>
              </div>
            </div>

            <div className="button-container">
              <button>Save and Take me to Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateProfile;
