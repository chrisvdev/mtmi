// @ts-check

import { defineConfig } from "tsdown";
import { resolve } from "node:path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  alias: {
    "@": resolve("./src")
  }
});
