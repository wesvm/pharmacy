import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import Layout from "./layout";
import UsersPage from "@/pages/UsersPage";
import RolesPage from "@/pages/RolePage";
import SuppliersPage from "@/pages/SuppliersPage";
import CategoriesPage from "@/pages/CategoriesPage";
import ProductsPage from "@/pages/ProductsPage";
import CreateSalesPage from "@/pages/CreateSalesPage";
import SalesPage from "@/pages/SalesPage";
import DeliveriesPage from "@/pages/DeliveriesPage";
import PurchasesPage from "@/pages/PurchasesPage";
import CreatePurchasePage from "@/pages/CreatePurchasePage";
import HomePage from "@/pages/HomePage";

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
        element: <HomePage />
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
            element: <SalesPage />
          },
          {
            path: 'new',
            element: <CreateSalesPage />
          },
          {
            path: 'delivery',
            element: <DeliveriesPage />
          }
        ]
      },
      {
        path: 'purchases',
        children: [
          {
            index: true,
            element: <PurchasesPage />
          },
          {
            path: 'new',
            element: <CreatePurchasePage />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <div>404</div>
  }
]);