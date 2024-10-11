import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import LogIn from "../pages/login/LogIn";
import Register from "../pages/register/Register";
import UserLayout from "../layout/UserLayout";
import ContactUs from "../pages/contact/ContactUs";
import NotFound from "../pages/not-found/NotFound";
import UserDasboard from "../pages/dashboard/UserDasboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "dashboard",
        element: <UserDasboard />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
