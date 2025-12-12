import React from "react";
import HomeIcon from "../components/Icons/HomeIcon";
import SettingsIcon from "../components/Icons/SettingsIcon";
import SidebarToggleIcon from "../components/Icons/SidebarToggleIcon";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" defaultChecked />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <SidebarToggleIcon></SidebarToggleIcon>
            </label>
            <div className="px-4">Page Title</div>
          </nav>
          {/* Page content here */}
          <div className="p-4"><Outlet></Outlet></div>
        </div>
        {/* Sidebar */}
        <div className="drawer-side is-drawer-close:overflow-visible">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                  <HomeIcon></HomeIcon>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </button>
              </li>

              {/* List item */}
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                  <SettingsIcon></SettingsIcon>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>

              {/* List item */}
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                  <SettingsIcon></SettingsIcon>
                  <span className="is-drawer-close:hidden">Add Request</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
