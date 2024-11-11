import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import Layout from "./layout";
import UsersPage from "@/pages/UsersPage";
import RolesPage from "@/pages/RolePage";

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
      },
      {
        path: 'roles',
        element: <RolesPage />
      },
      {
        path: 'store',
        children: [
          {
            path: 'products',
            element: <div>all products</div>
          },
          {
            path: 'categories',
            element: <div>all categories</div>
          },
          {
            path: 'suppliers',
            element: <div>all suppliers</div>
          }
        ]
      },
      {
        path: 'sales',
        children: [
          {
            index: true,
            path: 'new',
            element: <div>sale product</div>
          },
          {
            path: 'delivery',
            element: <div>all deliveries</div>
          }
        ]
      },
      {
        path: 'purchases',
        element: <div>all purchases</div>
      }
    ]
  },
  {
    path: '*',
    element: <div>404</div>
  }
]);