import Footer from "./footer/Footer";
import Header from "./header/Header";
import { useLocation, useMatches } from "react-router";
import type { RouteHandle } from "@app/types/router";
import { useEffect } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const matches = useMatches();
  const location = useLocation();

  useEffect(() => {
    const routeMatch = matches.find((match) => (match.handle as RouteHandle)?.title);
    const title = (routeMatch?.handle as RouteHandle)?.title;

    if (title) {
      document.title = title;
    }
  }, [location, matches]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
