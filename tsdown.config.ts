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
  outputOptions: {
    comments: {
      annotation: true,
      legal: true,
      jsdoc: true
    }
  },
  plugins: [
    {
      name: 'fix-vite-ignore',
      generateBundle(_, bundle) {
        for (const chunk of Object.values(bundle)) {
          if (chunk.type === 'chunk' && chunk.code.includes('@vite-ignore')) {
            chunk.code = chunk.code.replace(
              /import\(\s*\/\*!?\s*@vite-ignore\s*\*\/\s*/g,
              'import(/* @vite-ignore */ '
            )
          }
        }
      }
    }
  ],
  inputOptions: {
    transform: {
      define: {
        'import.meta.env': '{}'
      }
    }
  }
});
