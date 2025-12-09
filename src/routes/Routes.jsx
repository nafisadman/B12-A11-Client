import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
        {
            path: "/",
            Component: Home
        }
    ]
  },
  {
    path: "/auth",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/auth/login",
        Component: Login
      },
      {
        path: "/auth/registration",
        Component: Registration
      }
    ]
  }
]);

export default router;