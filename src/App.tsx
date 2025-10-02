import { Outlet } from "react-router";
import { useEffect } from "react";
import { useTheme, useAuth } from "@app/hooks/redux";
import { storage } from "@app/utils/localStorage";
import Container from "@app/ui/Container";
import Layout from "@components/layout/Layout";
import { AuthService } from "@app/services/authService";
import "./index.css";

const App = () => {
  const theme = useTheme();
  const { token } = useAuth();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    storage.set("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (token) {
      AuthService.setToken(token);
    } else {
      AuthService.clearToken();
    }
  }, [token]);

  return (
    <Layout>
      <main className="flex-1 flex">
        <Container className="border flex-1">
          <Outlet />
        </Container>
      </main>
    </Layout>
  );
};

export default App;
