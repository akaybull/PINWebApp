import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const AuthGuard = ({ children }) => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      Cookies.remove("token");
      return <Navigate to="/login" />;
    }

    return children;
  } catch (error) {
    Cookies.remove("token");
    return <Navigate to="/login" />;
  }
};

export default AuthGuard;
