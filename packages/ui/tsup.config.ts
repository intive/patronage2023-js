import { defineConfig } from "tsup";

export default defineConfig({
  minify: true,
  target: "es2018",
  external: ["react"],
  sourcemap: false,
  dts: true,
  format: ["esm", "cjs"],
});
