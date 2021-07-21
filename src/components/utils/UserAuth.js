import jwtDecode from "jwt-decode";
import AxiosAuthToken from "./AxiosAuthToken";

const UserAuth = () => {
  let getJwtToken = window.localStorage.getItem("jwtToken");

  if (getJwtToken) {
    const currentTime = Date.now() / 1000;
    let decodedToken = jwtDecode(getJwtToken);

    if (decodedToken.exp < currentTime) {
      AxiosAuthToken(null);
      return false;
    } else {
      AxiosAuthToken(getJwtToken);
      return true;
    }
  } else {
    return false;
  }
};

export default UserAuth;
