import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import AddRequest from "../pages/Dashboard/AddRequest";
import DashboardLayout from "../layouts/DashboardLayout";
import AllUsers from "../pages/Dashboard/AllUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  },
  {
    path: "/auth",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/registration",
        Component: Registration,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard",
        Component: UserDashboard,
      },
      {
        path: "/dashboard/create-donation-request",
        Component: AddRequest,
      },
      {
        path: "/dashboard/all-users",
        Component: AllUsers,
      },
    ],
  },
]);

export default router;
