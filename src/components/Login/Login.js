import React, { Component } from "react";
import { isEmpty, isEmail } from "validator";
import jwtDecode from "jwt-decode";

import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import UserAuth from "../utils/UserAuth";
import AxiosAuthToken from "../utils/AxiosAuthToken";

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

  componentDidMount() {
    let isUserAuth = UserAuth();

    if (isAuth) {
      this.props.history.push("/questionnaire");
    }
  }

  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (event.target.name === "email") {
          if (isEmpty(this.state.email)) {
            this.setState({
              emailError: "Email field cannot be empty",
              canSubmit: true,
            });
          } else {
            this.setState({
              emailError: "",
            }),
          }
        }
        if (event.target.name === "password") {
          if (isEmpty(this.state.password)) {
            this.setState({
              passwordError: "Password field cannot be empty",
              canSubmit: true,
            });
          } else {
            this.setState({
              passwordError: "",
            });
          }
        }
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.canSubmit === true) {
      if (this.state.emailOnFocus && this.state.passwordOnFocus) {
        if (
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0
        ) {
          this.setState({
            canSubmit: false,
          });
        } else {
          this.setState({ 
            canSubmit: true,
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

  handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let result = await Axios.post("/api/user/login", {
        email: this.state.email,
        password: this.state.password,
      });

      let jwtToken = result.data.payload;

      console.log(jwtToken);
      //call setAxiosAuthToken here
      setAxiosAuthToken(jwtToken);

      let decodedToken = jwtDecode(jwtToken);
      console.log(decodedToken);

      this.props.handleUserLogin(decodedToken);

      window.localStorage.setItem("jwtToken", jwtToken);
      toast.success("Successfully logged in!");

      this.props.history.push("/questionnaire");

    } catch (e) {
      if (e.response.status === 429) {
        toast.error(e.response.data);
      } else {
        toast.error(e.response.data.payload);
      }
    }
  };

  render() {
    const { email, emailError, password, passwordError, canSubmit } =
      this.state;

    return (
      <div className="container">
        <div className="form-text">Login</div>

        <div className="home-container">
          <div className="form-div">
            <form className="form" onSubmit={this.handleOnSubmit}>
              <div className="form-group-block">
                <div className="block-container">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    placeholder="Email"
                    name="email"
                    onChange={this.handleOnChange}
                    onFocus={this.handleInputOnFocus}
                    autoFocus
                  />
                  <div className="errorMessage">{emailError && emailError}
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
                      onChange={this.handleOnChange}
                      onFocus={this.handleInputOnFocus}
                    />
                    <div className="errorMessage">
                      {passwordError && passwordError}
                    </div>
                  </div>
                </div>

                <div className="button-container">
                  <button type="submit" disabled={canSubmit}>Log me in!</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
