import React from "react";
import SidebarToggleIcon from "../components/Icons/SidebarToggleIcon";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <SidebarToggleIcon></SidebarToggleIcon>
            </label>
            <div className="px-4">Page Title</div>
          </nav>
          {/* Page content here */}
          <div className="p-4">
            <Outlet></Outlet>
          </div>
        </div>
        {/* Sidebar */}
        <Sidebar></Sidebar>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
