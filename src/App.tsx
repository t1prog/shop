import { Outlet } from "react-router";
import { useEffect } from "react";
import { useTheme } from "@app/hooks/redux";
import { storage } from "@app/utils/localStorage";
import Container from "@app/ui/Container";
import Layout from "@components/layout/Layout";
import { useAppDispatch } from "@app/hooks/redux";
import "./index.css";
import { initializeAuth } from "@app/store/authSlice";

const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    storage.set("theme", theme);
  }, [theme]);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Layout>
      <main className="flex-1 flex">
        <Container className="flex-1">
          <Outlet />
        </Container>
      </main>
    </Layout>
  );
};

export default App;
