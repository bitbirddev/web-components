// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default {
  root: ".",
  base: "/dist/",
  publicDir: false,
  build: {
    manifest: false,
    emptyOutDir: true,
    assetsDir: "",
    outDir: "./dist",
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "lib/main.js"),
      name: "@bitbirddev/web-components",
      fileName: "web-components",
    },
    rollupOptions: {
      manifest: true,
      emptyOutDir: true,
      assetsDir: "",
      outDir: "./public/build",
    },
  },
};
