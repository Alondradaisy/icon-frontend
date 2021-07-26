import React, { Component } from "react";
import { toast } from "../utils/Axios";

export class UpdateMyProfile extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  };

  componentDidMount() {
    this.handleFetchUserInfo();
  }

  handleFetchUserInfo = async () => {
    try {
      letFetchUserInfo = await Axios.get("/api/user/get-user-info");
      this.setState({
        firstName: fetchedUserInfo.data.payload.firstName,
        lastName: fetchedUserInfo.data.payload.lastName,
        username: fetchedUserInfo.data.payload.username,
        email: fetchedUserInfo.data.payload.email,
      });
    } catch (e) {
      toast.error(e.response.data.payload);
    }
  };

  handleUserUpdateOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleUserUpdateSubmit = async (event) => {
    event.preventDefault();

    try {
      let updatedUserProfile = await Axios.put(
        "/api/user/update-user-profile",
        {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          username: this.state.username,
          password: this.state.password,
        }
      );

      if (updatedUserProfile.status === 202) {
        console.log(this.props);
        this.props.handleUserLogout();
        this.props.history.push("/login");
      } else {
        this.setState({
          firstName: updatedUserProfile.data.payload.firstName,
          lastName: updatedUserProfile.data.payload.lastName,
          username: updatedUserProfile.data.payload.username,
        });
      }
      toast.success("Profile was successfully updated!");
    } catch (e) {
      toast.error(e.response.data.payload);
    }
  };

  render() {
    return (
      <div className="update-container">
        <h2>Update My Profile</h2>
        <form onSubmit={this.handleUserUpdateSubmit}>
          <div className="input-div">
            <input
              name="firstName"
              value={this.state.firstName}
              placeholder="First Name"
              onChange={this.handleUserInputOnChange}
            />
          </div>

          <div className="input div">
            <input
              name="lastName"
              value={this.state.lastName}
              placeholder="Last Name"
              onChange={this.handleUserInputOnChange}
            />
          </div>

          <div className="input-div">
            <input
              name="username"
              value={this.state.username}
              placeholder="Username"
              onChange={this.handleUserInputOnChange}
            />
          </div>

          <div className="input-div">
            <input
              placeholder="Email"
              defaultValue={this.state.email}
              disabled={true}
            />
          </div>

          <div className="input-div">
            <input
              placeholder="Password"
              name="password"
              onChange={this.handleUserInputOnChange}
            />
          </div>

          <div className="button-div">
            <button>Update</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdateMyProfile;
