import { Outlet } from "react-router";
import "./index.css";
import Layout from "./layout/Layout";
import { useTheme } from "@app/hooks/redux";
import { useEffect } from "react";
import { storageSet } from "@app/utils/localStorage";
import Container from "@app/ui/Container";

const App = () => {
  const theme = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    storageSet("theme", theme);
  }, [theme]);

  return (
    <Layout>
      <main className="flex-1">
        <Container>
          <Outlet />
        </Container>
      </main>
    </Layout>
  );
};

export default App;
