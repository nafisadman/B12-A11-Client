import React, { use } from "react";
import DropdownIcon from "./Icons/DropdownIcon";
import { AuthContext } from "../providers/AuthProvider";
import { Link, NavLink } from "react-router";
import { FaHeartPulse } from "react-icons/fa6";

// Updated
const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then(() => console.log("User signed out"))
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="navbar shadow-sm sticky top-0 z-50 glass">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <DropdownIcon />
          </div>
          <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/search">Search</NavLink>
            </li>
            <li>
              <NavLink to="/requests">Requests</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/donate">Donate</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/resources">Resources</NavLink>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <FaHeartPulse /> LifeLine
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/search">Search</NavLink>
          </li>
          <li>
            <NavLink to="/requests">Requests</NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/donate">Donate</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/resources">Resources</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                  <img src={user?.photoURL || "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"} />
                </div>
              </div>
              <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <Link onClick={handleSignOut}>Logout</Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to={`/auth/login`} className="btn btn-neutral">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
