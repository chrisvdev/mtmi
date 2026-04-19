import { defineConfig } from "vite";
import { basename } from "node:path";
import { cwd } from "node:process";

const isGitHubPages = true;
const folderName = `${basename(cwd())}/`;
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const base = mode === "production" && isGitHubPages ? `/${folderName}` : "/";

export default defineConfig({
  root: "sandbox",
  base,
  mode,
  publicDir: "../public",
  plugins: [],
  build: {
    outDir: "../dist",
    assetsDir: "./"
  },
  resolve: {
    tsconfigPaths: true
  }
});
