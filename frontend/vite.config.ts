import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  // This is for local development!
  server: {
    proxy: {
      "/api/gateway/": {
        target: process.env.GATEWAY_URL || "http://localhost:6523",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/gateway/, ""),
      },
    },
  },
});
