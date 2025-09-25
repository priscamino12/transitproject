import { Navigate } from "react-router-dom";
import { AccountService } from "../services/Account.service";

const AuthGuard = ({ children }) => {
  
  if (!AccountService.isLogged()) {
    return <Navigate to={"/auth/login"} />;
  }
  return children;
};

export default AuthGuard;
