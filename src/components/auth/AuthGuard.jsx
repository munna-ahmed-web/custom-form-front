import NotPermitted from "../../pages/not-found/Not Permitted";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <NotPermitted />;
};

export default AuthGuard;
