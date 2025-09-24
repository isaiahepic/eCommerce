import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@Router": path.resolve(__dirname, "src/Router"),
      "@Data": path.resolve(__dirname, "src/Data"),
      "@store": path.resolve(__dirname, "src/store"),
    },
  },
  server: {
    host: true,
    // host: "0.0.0.0",
    port: 3848, // default 5173
  },
});
