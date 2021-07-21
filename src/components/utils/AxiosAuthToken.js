import axios from "axios";
import Axios from "./Axios";

const AxiosAuthToken = (jwtToken) => {
  if (jwtToken) {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  } else {
    delete Axios.defaults.headers.common["Authorization"];
  }
};

export default AxiosAuthToken;
