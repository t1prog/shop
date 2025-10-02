import { ChildProcess, spawn } from "child_process";
import type { Plugin } from "vite";

export function devServerPlugin(): Plugin {
  let serverProcess: ChildProcess | null = null;

  return {
    name: "dev-server-plugin",

    buildStart() {
      if (process.env.NODE_ENV === "development" && !serverProcess) {
        console.log("Запуск демо сервера");

        serverProcess = spawn("node", ["server/index.js"], {
          stdio: "inherit",
          shell: true,
        });
      }
    },

    buildEnd() {
      if (serverProcess) {
        serverProcess.kill();
      }
    },
  };
}
