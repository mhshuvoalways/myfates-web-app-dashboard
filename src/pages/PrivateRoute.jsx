import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userReducer = useSelector((store) => store.userReducer);

  if (!userReducer.isAuthenticate) {
    return <Navigate to="/login" />;
  }
  if (!userReducer.isProfile) {
    return <Navigate to="/userinfo" />;
  }
  if (!userReducer.isExpired) {
    return <Navigate to="/answer" />;
  }

  return children;
};

export default PrivateRoute;
