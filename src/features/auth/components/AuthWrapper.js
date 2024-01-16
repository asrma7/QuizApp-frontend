import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../authSlice";

export const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export const RequireAdmin = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    user.isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to="/welcome" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export const RequireNoAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return !token ? (
    <Outlet />
  ) : (
    <Navigate to="/welcome" state={{ from: location }} replace />
  );
};
