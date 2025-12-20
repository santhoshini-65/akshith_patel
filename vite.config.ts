import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 8081
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  }
});