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

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "catalog/", element: <Catalog /> },
      { path: "product/:id", element: <Product /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
];

const router: DataRouter = createBrowserRouter(routes);

export default router;
