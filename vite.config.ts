import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
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
      // "@types": path.resolve(__dirname, "./src/app/types"),
      "@store": path.resolve(__dirname, "./src/app/store"),
      "@lib": path.resolve(__dirname, "./src/app/lib"),
      "@app": path.resolve(__dirname, "./src/app"),
    },
  },
});
