import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    allowedHosts: true,
    watch: {
      ignored: [
        "**/.cache/**",
        "**/.local/**",
        "**/.agents/**",
        "**/attached_assets/**",
        "**/dist/**",
      ],
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
  },
});
