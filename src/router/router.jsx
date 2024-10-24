import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import LogIn from "../pages/login/LogIn";
import Register from "../pages/register/Register";
import UserLayout from "../layout/UserLayout";
import ContactUs from "../pages/contact/ContactUs";
import NotFound from "../pages/not-found/NotFound";
import UserDasboard from "../pages/dashboard/UserDasboard";
import { AdminGuard } from "../components/auth/AdminGuard";
import AuthGuard from "../components/auth/AuthGuard";
import CreateTemplate from "../pages/template/CreateTemplate";
import TemplateManageByUser from "../pages/template/TemplateManageByUser";
import CreateForm from "../pages/form/CreateForm";
import Answers from "../pages/answer/Answers";

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
        element: (
          <AdminGuard>
            <UserDasboard />
          </AdminGuard>
        ),
      },
      {
        path: "template/create",
        element: (
          <AuthGuard>
            <CreateTemplate />
          </AuthGuard>
        ),
      },
      {
        path: "template/create/:id",
        element: (
          <AuthGuard>
            <CreateTemplate />
          </AuthGuard>
        ),
      },
      {
        path: "template/user/:id",
        element: (
          <AuthGuard>
            <TemplateManageByUser />
          </AuthGuard>
        ),
      },
      {
        path: "form/:templateId",
        element: <CreateForm />,
      },
      {
        path: "answer/:templateId",
        element: (
          <AuthGuard>
            <Answers />
          </AuthGuard>
        ),
      },
      {
        path: "answer/user/:userId",
        element: (
          <AuthGuard>
            <Answers />
          </AuthGuard>
        ),
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
