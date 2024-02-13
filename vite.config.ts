import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import alias from "@rollup/plugin-alias";
import autoprefixer from "autoprefixer";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: {
        "@app": path.resolve(__dirname, "src/1_app/"),
        "@processes": path.resolve(__dirname, "src/2_processes/"),
        "@pages": path.resolve(__dirname, "src/3_pages/"),
        "@widgets": path.resolve(__dirname, "src/4_widgets/"),
        "@features": path.resolve(__dirname, "src/5_features/"),
        "@entities": path.resolve(__dirname, "src/6_entities/"),
        "@shared": path.resolve(__dirname, "src/7_shared/"),
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer({ remove: false })],
    },
  },
});
