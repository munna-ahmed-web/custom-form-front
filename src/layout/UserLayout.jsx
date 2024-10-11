import React from "react";
import ResponsiveNavbar from "../components/nav-bar/Navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <ResponsiveNavbar />
      <Outlet />
    </>
  );
};

export default UserLayout;
