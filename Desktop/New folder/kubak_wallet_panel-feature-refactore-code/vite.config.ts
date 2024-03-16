import ImportMetaEnvPlugin from "@import-meta-env/unplugin";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("ion-"),
        },
      },
    }),
    ImportMetaEnvPlugin.vite({
      example: ".env.example",
    }),
  ],
  test: {
    coverage: {
      reporter: ["text", "json", "html"],
    },
    environment: "happy-dom",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "esnext",
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
});
