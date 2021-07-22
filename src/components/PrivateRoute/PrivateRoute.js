import { Route, Redirect } from "react-router-dom";
import UserAuth from "../utils/UserAuth";

const PrivateRoute = ({ component: Component, handleUserLogout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routerProps) =>
        UserAuth() ? (
          <Component {...routerProps} handleUserLogout={handleUserLogout} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute;
