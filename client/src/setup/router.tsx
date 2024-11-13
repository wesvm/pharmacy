import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import Layout from "./layout";
import UsersPage from "@/pages/UsersPage";
import RolesPage from "@/pages/RolePage";
import SuppliersPage from "@/pages/SuppliersPage";
import CategoriesPage from "@/pages/CategoriesPage";
import ProductsPage from "@/pages/ProductsPage";
import SalesPage from "@/pages/SalesPage";

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
        element: <ProtectedRoute requiredRoles={['administrador']} />,
        children: [
          {
            path: 'users',
            element: <UsersPage />
          },
          {
            path: 'roles',
            element: <RolesPage />
          }
        ]
      },
      {
        path: 'store',
        children: [
          {
            path: 'products',
            element: <ProductsPage />
          },
          {
            path: 'categories',
            element: <CategoriesPage />
          },
          {
            path: 'suppliers',
            element: <SuppliersPage />
          }
        ]
      },
      {
        path: 'sales',
        children: [
          {
            index: true,
            path: 'new',
            element: <SalesPage />
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