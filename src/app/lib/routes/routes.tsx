import { type DataRouter, createBrowserRouter } from "react-router";
import App from "@src/App";
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import Catalog from "@pages/Catalog";
import Product from "@pages/product/Product";
import Auth from "@pages/Auth";
import Profile from "@pages/profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { type AppRouteObject } from "@src/app/types/router";

const routes: AppRouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: { title: "SomeShop" },
      },
      {
        path: "catalog/",
        element: <Catalog />,
        handle: { title: "Каталог" },
      },
      { path: "product/:id", element: <Product />, handle: { title: "Профиль" } },
      // Защищенные маршруты
      {
        element: <ProtectedRoute />,
        children: [{ path: "profile/", element: <Profile />, handle: { title: "Профиль" } }],
      },
      // Публичные маршруты
      {
        element: <PublicRoute />,
        children: [
          { path: "login/", element: <Auth />, handle: { title: "Регистрация/Авторизация" } },
        ],
      },
      // пока так
      { path: "*", element: <NotFound />, handle: { title: "404" } },
    ],
  },
];

const router: DataRouter = createBrowserRouter(routes);

export default router;
