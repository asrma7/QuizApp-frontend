import "./Navbar.css";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import { logOut } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../features/auth/authApiSlice";

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(logOut());
  };

  const authNav = token ? (
    <ul className="nav-right">
      <li className="nav-item">
        <Link to="/profile" className="nav-link">
          Hi {user.fullName ? user.fullName : ""}!
        </Link>
      </li>
      <li className="nav-item">
        <span
          className="nav-button nav-link"
          onClick={isLoading ? null : handleLogout}
        >
          Logout
        </span>
      </li>
    </ul>
  ) : (
    <ul className="nav-right">
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
    </ul>
  );

  const content = (
    <nav>
      <ul className="nav-left">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/topicslist" className="nav-link">
            Topics
          </Link>
        </li>
      </ul>
      {authNav}
    </nav>
  );

  return content;
};
export default Navbar;
