import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";

export class Nav extends Component {
  render() {
    return (
      <nav className="Navbar">
        <div className="h1-logo">
          <h1>
            <Link to="/">HOMEPAGE</Link>
          </h1>
        </div>

        <div className="right-side-nav">
          <ul>
            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/logged-in">
                  You are logged in!
                </NavLink>
              ) : (
                ""
              )}
            </li>
            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/questionnaire">
                  Questionnaires
                </NavLink>
              ) : (
                ""
              )}
            </li>

            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/iconfinder">
                  Browse Icons
                </NavLink>
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
