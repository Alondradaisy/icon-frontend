import React, { Component } from "react";
import jwtDecode from "jwt-decode";
// import validators here -> check out validator npm docs
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import UserAuth from "../utils/UserAuth";

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
    isButtonDisabled: true,
    firstNameOnFocus: false,
    lastNameOnFocus: false,
    emailOnFocus: false,
    usernameOnFocus: false,
    passwordOnFocus: false,
    confirmPasswordOnFocus: false,
  };

  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: name.target.value,
      },
      () => {
        if (
          event.target.name === "firstName" ||
          event.target.name === "lastName"
        ) {
          this.handleFirstNameAndLastNameInput(event);
        }

        if (event.target.name === "email") {
          this.handleEmailInput();
        }

        if (event.target.name === "username") {
          this.handleUsernameInput();
        }

        if (event.target.name === "password") {
          this.handlePasswordInput();
        }

        if (event.target.name === "confirmPassword") {
          this.handleConfirmPasswordInput();
        }
      }
    );
  };

  handleConfirmPasswordInput = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: "Password does not match - try again",
        isButtonDisabled: true,
      });
    } else {
      this.setState({
        confirmPasswordError: "",
      });
    }
  };

  handlePasswordInput = () => {
    if (this.state.confirmPasswordOnFocus) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          confirmPasswordError: "Password does not match - try again",
          isButtonDisabled: true,
        });
      } else {
        this.setState({
          confirmPasswordError: "",
        });
      }
    }
    if (this.state.password.length === 0) {
      this.setState({
        passwordError: "Password field cannot be empty",
        isButtonDisabled: true.valueOf,
      });
    } else {
      if (isStrongPassword(this.state.password)) {
        this.setState({
          passwordError: "",
        });
      } else {
        this.setState({
          passwordError:
            "Password must contain 1 uppercase, 1 lowercase, 1 special character, 1 number and a minimum of 8 characters",
          isButtonDisabled: true,
        });
      }
    }
  };

  handleEmailInput = () => {
    if (this.state.email.length === 0) {
      this.setState({
        emailError: "Email field cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      if (isEmail(this.state.email)) {
        this.setState({
          emailError: "",
        });
      } else {
        this.setState({
          emailError: "Please enter a valid email!",
          isButtonDisabled: true,
        });
      }
    }
  };

  handleFirstNameAndLastNameInput = (event) => {
    if (this.state[event.target.name].length > 0) {
      if (isAlpha(this.state[event.target.name])) {
        this.setState({
          [`${event.target.name}Error`]: "",
        });
      } else {
        this.setState({
          [`${event.target.name}Error`]: `${event.target.placeholder} may only include alphabet letters`,
          isButtonDisabled: true,
        });
      }
    } else {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} field cannot be empty`,
        isButtonDisabled: true,
      });
    }
  };

  handleUsernameInput = () => {
    if (this.state.username.length === 0) {
      this.setState({
        usernameError: "Username field cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      if (isAlphanumeric(this.state.username)) {
        this.setState({
          usernameError: "",
        });
      } else {
        this.setState({
          usernameError:
            "Username field may only contain alphabet letters and numbers",
          isButtonDisabled: true,
        });
      }
    }
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let userInputObject = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email.email,
        username: this.state.username,
        password: this.state.password,
      };

      let successful = await Axios.post(
        "/api/user/create-profile",
        userInputObject
      );
      console.log(successful);
      toast.success(`${success.data.message}`);
    } catch (e) {
      toast.error(`${e.response.data.message}`);
    }
  };

  handleOnBlur = (event) => {
    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} field cannot be empty`,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.isButtonDisabled);

    if (prevState.isButtonDisabled === true) {
      if (
        this.state.firstNameOnFocus &&
        this.state.lastNameOnFocus &&
        this.state.emailOnFocus &&
        this.state.usernameOnFocus &&
        this.state.passwordOnFocus &&
        this.state.confirmPasswordOnFocus
      ) {
        if (
          this.state.firstNameError.length === 0 &&
          this.state.lastNameError.length === 0 &&
          this.state.emailError.length === 0 &&
          this.state.usernameError.length === 0 &&
          this.state.passwordError.length === 0 &&
          this.state.confirmPasswordError.length === 0 &&
          this.state.password === this.state.confirmPassword
        ) {
          this.setState({
            isButtonDisabled: false,
          });
        }
      }
    }
  }

  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
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
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="form-group-inline">
              <div className="inline-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  placeholder="Enter your first name"
                  name="firstName"
                  onChange={this.handleOnChange}
                  autoFocus
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
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
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {lastNameError && lastNameError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Enter your email"
                  name="email"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">{emailError && emailError}</div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Enter a username: letters only"
                  name="username"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {usernameError && usernameError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  placeholder="Enter an alphanumerical password (letters and numbers only)"
                  name="password"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="text"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {confirmPasswordError && confirmPasswordError}
                </div>
              </div>
            </div>

            <div className="button-container">
              <button type="Submit" disabled={this.state.isButtonDisabled}>
                Save and Take me to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateProfile;
