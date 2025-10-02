// types/router.ts
import { type RouteObject } from "react-router";

export interface RouteHandle {
  title?: string;
  requiresAuth?: boolean;
  breadcrumb?: string;
}

export type AppRouteObject = RouteObject & {
  handle?: RouteHandle;
};
