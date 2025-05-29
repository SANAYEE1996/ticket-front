import { defineConfig, loadEnv } from "vite";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_BASE_URL,
    plugins: [
      react(),
      legacy({
        targets: ["defaults"],
        modernPolyfills: true,
      }),
    ],
    build: {
      sourcemap: false,
      emptyOutDir: true,
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (warning.code === "SOURCEMAP_ERROR") {
            return;
          }
          defaultHandler(warning);
        },
        output: {
          assetFileNames: (assetInfo: any) => {
            let extType = assetInfo.name.split(".").at(1);
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "images";
            } else if (/eot|ttf|woff|woff2/i.test(extType)) {
              extType = "fonts";
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          manualChunks: {
            react: ["react", "react-dom"],
            reactRouter: ["react-router-dom"],
            reactQuery: [
              "@tanstack/react-query",
              "@tanstack/react-query-devtools",
            ],
            reactTable: ["@tanstack/react-table"],
            ky: ["ky"],
            reactHookForm: ["react-hook-form"],
            zustand: ["zustand"],
          },
        },
      },
    },
    server: {
      host: true,
      proxy: {
        "/dev": {
          target: "http://localhost:3600",
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "~app": path.resolve("src/app"),
        "~entities": path.resolve("src/entities"),
        "~features": path.resolve("src/features"),
        "~pages": path.resolve("src/pages"),
        "~shared": path.resolve("src/shared"),
        "~widgets": path.resolve("src/widgets"),
        "~assets": path.resolve("src/assets"),
      },
    },
  };
});
