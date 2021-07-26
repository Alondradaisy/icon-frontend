import React from "react";
import UpdateMyProfile from "./UpdateMyProfile";

import "./MyProfile.css";

function MyProfile({ handleUserLogout, history }) {
  return (
    <UpdateMyProfile
      handleUserLogout={this.handleUserLogout}
      history={this.props.history}
    />
  );
}

export default MyProfile;
