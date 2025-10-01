import {
  type RouteObject,
  type DataRouter,
  createBrowserRouter,
} from "react-router";
import App from "@components/App";
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import Catalog from "@pages/Catalog";
import Product from "@pages/product/Product";
import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Profile from "@pages/profile/Profile";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "catalog/",
        element: (
          <PublicRoute>
            <Catalog />
          </PublicRoute>
        ),
      },
      { path: "product/:id", element: <Product /> },
      {
        path: "profile/",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
];

const router: DataRouter = createBrowserRouter(routes);

export default router;
