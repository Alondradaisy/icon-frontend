import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";

export class Nav extends Component {
  render() {
    return (
      <nav className="Navbar">
        <div className="h1-logo">
          <h1>
            <Link to="/">HOME</Link>
          </h1>
        </div>

        <div className="right-side-nav">
          <ul>
            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="create-profile">
                  Create A Profile
                </NavLink>
              ) : (
                ""
              )}
            </li>
            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/login">
                  You are logged in! {this.props.user.email}
                </NavLink>
              ) : (
                ""
              )}
            </li>

            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/questionnaire">
                  Questionnaire
                </NavLink>
              ) : (
                <NavLink activeClassName="selected" to="/icons">
                  Browse Icons
                </NavLink>
              )}
            </li>

            <li>
              {this.props.user ? (
                <NavLink
                  activeStyle={{ borderBottom: "2px solid white" }}
                  to="/login"
                  onClick={this.props.handleUserLogout}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  activeStyle={{ borderBottom: "2px solid white" }}
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
