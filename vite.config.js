export default {
  root: ".",
  base: "/dist/",
  publicDir: false,
  build: {
    lib: {
      entry: "./index.js",
      name: "bitbirddev-web-components",
      fileName: "bitbirddev-web-components",
    },
    target: "esnext",
    manifest: false,
    emptyOutDir: true,
    assetsDir: "",
    outDir: "./dist",
  },
};
