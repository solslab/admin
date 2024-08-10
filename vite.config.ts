import { readFileSync } from "fs";
import path from "path";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";
import { fileURLToPath } from "url";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import inject from "@rollup/plugin-inject";
import { sveltekit } from "@sveltejs/kit/vite";

const file = fileURLToPath(new URL("package.json", import.meta.url));
const json = readFileSync(file, "utf8");
const pkg = JSON.parse(json);

const config: import("vite").UserConfig = {
  server: {
    port: 5174,
  },
  plugins: [
    sveltekit(),
    {
      name: "updateHMR",
      handleHotUpdate({ modules }: { modules: any[] }) {
        modules.map((m) => {
          try {
            // m.importedModules = new Set();
            m.importers = new Set();
          } catch (e) {}
        });

        return modules;
      },
    },
  ],

  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        //@ts-ignore
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          // crypto: true
        }),
      ],
    },
  },
  build: {
    sourcemap: false,
    // rollupOptions: {
    // 	plugins: [inject({ Buffer: ['Buffer', 'Buffer'] })]
    // },
    rollupOptions: {
      plugins: [
        // Svelte 버전 업그레이드로 인해 Buffer를 사용하는 방법 변경되었는지 확인 필요
        //@ts-ignore
        inject({ Buffer: ["buffer", "Buffer"] }),
        NodeGlobalsPolyfillPlugin({
          buffer: true,

          // crypto: true
        }),
        // Svelte 버전 업그레이드로 인해 Polyfill 방법 변경되었는지 확인 필요
        //@ts-ignore
        rollupNodePolyFill(),
      ],
    },
  },

  // ssr: {
  // 	external: ['three', 'chart.js']
  // }
};

export default config;
