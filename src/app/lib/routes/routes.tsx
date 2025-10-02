import { type RouteObject, type DataRouter, createBrowserRouter } from "react-router";
import App from "@src/App";
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import Catalog from "@pages/Catalog";
import Product from "@pages/product/Product";
import Auth from "@pages/Auth";
import Profile from "@pages/profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

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
        element: <Catalog />,
      },
      { path: "product/:id", element: <Product /> },
      // Защищенные руоты
      { element: <ProtectedRoute />, children: [{ path: "profile/", element: <Profile /> }] },
      // Публичные маршруты
      { element: <PublicRoute />, children: [{ path: "login/", element: <Auth /> }] },
      // пока так
      { path: "*", element: <NotFound /> },
    ],
  },
];

const router: DataRouter = createBrowserRouter(routes);

export default router;
