import "./Layout.css";

import { Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../../features/auth/authApiSlice";
import Loading from "../Loading/Loading";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = () => {
  const { isLoading } = useGetProfileQuery();

  const content = isLoading ? (
    <Loading />
  ) : (
    <div className="main">
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
  return content;
};

export default Layout;
