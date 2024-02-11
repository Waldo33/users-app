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
        "@app": path.resolve(__dirname, "src/app/"),
        "@processes": path.resolve(__dirname, "src/processes/"),
        "@pages": path.resolve(__dirname, "src/pages/"),
        "@widgets": path.resolve(__dirname, "src/widgets/"),
        "@features": path.resolve(__dirname, "src/features/"),
        "@entities": path.resolve(__dirname, "src/entities/"),
        "@shared": path.resolve(__dirname, "src/shared/"),
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer({ remove: false })],
    },
  },
});
