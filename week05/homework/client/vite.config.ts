import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr"; // 用于将svg转换为ReactComponent引入

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/index.scss";',
        javascriptEnabled: true,
      },
    },
  },
  build: {
    minify: true,
    target: "es2015",
    outDir: "../server/public/dist",
  },
  server: {
    port: 3000,
  },
});
