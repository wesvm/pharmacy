import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import Layout from "./layout";
import UsersPage from "@/pages/UsersPage";

export const router = createBrowserRouter([
  {
    id: "root",
    index: true,
    path: '/login',
    element: <LoginPage />
  },
  {
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <div>home</div>
      },
      {
        path: 'users',
        element: <UsersPage />
      }
    ]
  },
  {
    path: '*',
    element: <div>404</div>
  }
]);