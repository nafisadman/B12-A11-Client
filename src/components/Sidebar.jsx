import React from "react";
import HomeIcon from "../components/Icons/HomeIcon";
import SettingsIcon from "../components/Icons/SettingsIcon";
import { NavLink } from "react-router";
import CreateIcon from "./Icons/CreateIcon";
import AllUsersIcon from "./Icons/AllUsersIcon";
import DashboardIcon from "./Icons/DashboardIcon";

const Sidebar = () => {
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Sidebar content here */}
        <ul className="menu w-full grow">
          {/* List item */}
          <li>
            <NavLink to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
              <HomeIcon></HomeIcon>
              <span className="is-drawer-close:hidden">Homepage</span>
            </NavLink>
          </li>

          {/* List item */}
          <li>
            <NavLink to="/dashboard" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
              <DashboardIcon></DashboardIcon>
              <span className="is-drawer-close:hidden">Dashboard</span>
            </NavLink>
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
            <NavLink to="/dashboard/all-users" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Users">
              <AllUsersIcon></AllUsersIcon>
              <span className="is-drawer-close:hidden">All Users</span>
            </NavLink>
          </li>

          {/* List item */}
          <li>
            <NavLink to="/dashboard/create-donation-request" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Request">
              <CreateIcon></CreateIcon>
              <span className="is-drawer-close:hidden">Add Request</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
