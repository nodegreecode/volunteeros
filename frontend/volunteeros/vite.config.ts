import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: {
        quality: 75,
      },
      png: {
        quality: 75,
      },
      webp: {
        quality: 75,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),

      app: path.resolve(__dirname, "src/app"),
      routes: path.resolve(__dirname, "src/routes"),
      layouts: path.resolve(__dirname, "src/layouts"),
      pages: path.resolve(__dirname, "src/pages"),
      features: path.resolve(__dirname, "src/features"),
      components: path.resolve(__dirname, "src/components"),
      api: path.resolve(__dirname, "src/api"),
      utils: path.resolve(__dirname, "src/utils"),
      theme: path.resolve(__dirname, "src/theme"),
      assets: path.resolve(__dirname, "src/assets"),
    },
  },
});
