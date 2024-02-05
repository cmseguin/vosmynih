import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { reactScopedCssPlugin } from "rollup-plugin-react-scoped-css";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactScopedCssPlugin({ scopeStyleByDefault: true }),
    libInjectCss(),
    dts({ include: ["lib"], exclude: ["lib/**/*.stories.{ts,tsx,js,jsx}"] }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      input: Object.fromEntries(
        glob
          .sync("lib/**/*.{ts,tsx}", {
            ignore: "lib/**/*.stories.{ts,tsx,js,jsx}",
          })
          .map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative("lib", file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
});
