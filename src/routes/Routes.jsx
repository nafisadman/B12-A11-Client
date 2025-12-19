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
import Donate from "../pages/Home/Donate";
import PaymentSuccess from "../pages/Home/PaymentSuccess";
import PaymentCancelled from "../pages/Home/PaymentCancelled";
import Search from "../pages/Home/Search";
import Requests from "../pages/Home/Requests";
import Profile from "../pages/Dashboard/Profile";
import AllBloodDonationReq from "../pages/Dashboard/AllBloodDonationReq";
import RequestsDetails from "../pages/Home/RequestsDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/search",
        Component: Search,
      },
      {
        path: "/requests",
        Component: Requests,
      },
      {
        path: "/requests/:id",
        element: <PrivateRoute><RequestsDetails></RequestsDetails></PrivateRoute>,
      },
      {
        path: "/donate",
        element: <PrivateRoute><Donate></Donate></PrivateRoute>,
      },
      {
        path: "/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/payment-cancelled",
        Component: PaymentCancelled,
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
      {
        path: "/dashboard/profile",
        Component: Profile,
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
      {
        path: "/dashboard/all-blood-donation-request",
        Component: AllBloodDonationReq,
      },
    ],
  },
]);

export default router;
