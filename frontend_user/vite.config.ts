import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5003,
    watch: {
      usePolling: true,
    },
  },
});

