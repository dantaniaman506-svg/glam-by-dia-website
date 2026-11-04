import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

function localBookingApi(): Plugin {
  return {
    name: "local-booking-api",
    configureServer(server) {
      server.middlewares.use("/api/booking", async (request, response) => {
        if (request.method !== "POST") {
          response.statusCode = 405;
          response.setHeader("Allow", "POST");
          response.end();
          return;
        }

        try {
          const chunks: Buffer[] = [];
          for await (const chunk of request) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          }
          const body = JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
          const apiRequest = Object.assign(request, { body });
          const { default: handler } = await server.ssrLoadModule("/api/booking.ts");
          await handler(apiRequest, {
            status(code: number) {
              response.statusCode = code;
              return {
                json(payload: unknown) {
                  response.setHeader("Content-Type", "application/json");
                  response.end(JSON.stringify(payload));
                },
              };
            },
          });
        } catch (error) {
          console.error("Local booking API failed:", error);
          if (!response.headersSent) {
            response.statusCode = 500;
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify({ ok: false, message: "We couldn't send your request. Please try again." }));
          }
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localBookingApi()],
  resolve: { tsconfigPaths: true },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    allowedHosts: true,
    watch: {
      ignored: ["**/.cache/**", "**/.local/**", "**/.agents/**", "**/attached_assets/**", "**/dist/**"],
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
  },
});
