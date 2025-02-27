import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import terser from "@rollup/plugin-terser"
import { defineConfig } from "vite"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    emptyOutDir: true,
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/hashparser.js"),
      name: "HashParser",
      // the proper extensions will be added
      fileName: "hashparser",
    },
    rollupOptions: {
      output: [
        // Non‑minified version
        {
          format: "es",
          dir: "dist",
        },
        // Minified version with source map
        {
          format: "es",
          entryFileNames: "hashparser.min.js",
          plugins: [terser({
            compress: true,
            sourceMap: true,
          })],
        },
      ],
    },
    target: "modules",
  },
  test: {
    environment: "jsdom",
  },
})
