import "./layout.scss";
import Navbar from "../../components/navbar/Navbar"
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../context/authContext";

export const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  );
}
export const RequireAuth = () => {
  const {currentUser} = useContext(authContext)
  return !currentUser?(
    <Navigate to = "/login"/>
  ) : (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  );
}
