import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    id: "root",
    index: true,
    path: '/',
    element: <div>this app works!</div>
  },
]);