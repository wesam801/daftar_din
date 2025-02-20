import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // هذا السطر مهم إذا كنت بتستخدم React Router
  },
});
