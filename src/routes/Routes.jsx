import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import AddRequest from "../pages/Dashboard/AddRequest";
import DashboardLayout from "../layouts/DashboardLayout";
import AllUsers from "../pages/Dashboard/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequests from "../pages/Dashboard/MyRequests";

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
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        Component: UserDashboard,
      },
      // Donor Dashboard
      {
        path: "/dashboard/my-donation-requests",
        Component: MyRequests,
      },
      {
        path: "/dashboard/create-donation-request",
        Component: AddRequest,
      },
      // Admin Dashboard
      {
        path: "/dashboard/all-users",
        Component: AllUsers,
      },
    ],
  },
]);

export default router;
