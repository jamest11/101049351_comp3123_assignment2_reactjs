import { Navigate } from 'react-router-dom';
import { useAuth } from "./AuthContextProvider";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return (<Navigate to="/login" />);
  }
  return children;
};

export default PrivateRoute;