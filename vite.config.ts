import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";
import { devServerPlugin } from "./vite/dev-server-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    tailwindcss(),
    devServerPlugin(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]--[hash:base64:5]",
    },
  },
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/app/hooks"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@store": path.resolve(__dirname, "./src/app/store"),
      "@lib": path.resolve(__dirname, "./src/app/lib"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@src": path.resolve(__dirname, "./src"),
      "@srv": path.resolve(__dirname, "./server"),
    },
  },
});
