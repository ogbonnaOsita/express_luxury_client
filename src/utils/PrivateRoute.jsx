import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  return localStorage.getItem("JWT_TOKEN") === null ? (
    <Navigate to={"/sign_in"} />
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
