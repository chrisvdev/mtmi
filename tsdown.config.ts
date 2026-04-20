// @ts-check

import { defineConfig } from "tsdown";
import { resolve } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  minify: true,
  alias: {
    "@": resolve("./src")
  },
  outExtensions: ({ format }) => ({
    js: format === "es" ? ".js" : ".cjs",
  }),
  hooks: {
    "build:done": async () => {
      for (const file of ["badges.json", "badges.full.json"]) {
        const json = JSON.parse(readFileSync(`public/${file}`, "utf-8"));
        writeFileSync(`dist/${file}`, JSON.stringify(json));
      }
    }
  },
  // copy: [
  //   { from: "public/badges.json", to: "dist" },
  //   { from: "public/badges.full.json", to: "dist" },
  // ],
  plugins: [],
  inputOptions(options, format) {
    // options.transform = {
    //   define: {
    //     'import.meta.env': '{}'
    //   }
    // }

    if (format === 'cjs') {
      const originalOnLog = options.onLog
      options.onLog = (level, log, handler) => {
        if (log.code === 'EMPTY_IMPORT_META') return
        originalOnLog?.(level, log, handler) ?? handler(level, log)
      }
    }

    return options
  },
  // outputOptions: {
  //   comments: {
  //     annotation: true
  //   }
  // }
});
