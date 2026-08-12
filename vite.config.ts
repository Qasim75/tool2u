import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { defineConfig } from "vite";

async function parseJsonBody(req) {
  if (req.method === 'GET' || req.method === 'HEAD') return null;
  let body = '';
  for await (const chunk of req) {
    body += chunk.toString();
  }
  if (!body) return null;
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

function createLocalApiMiddleware() {
  return {
    name: 'vite-local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next();

        try {
          const url = new URL(req.url, 'http://localhost');
          req.body = await parseJsonBody(req);
          req.query = Object.fromEntries(url.searchParams.entries());
          req.url = url.pathname;

          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (payload) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(payload));
          };

          if (url.pathname === '/api/execute') {
            const handler = (await import(pathToFileURL(path.resolve(import.meta.dirname, 'api', 'execute.js')).href)).default;
            await handler(req, res);
            return;
          }

          if (url.pathname === '/api/languages') {
            const handler = (await import(pathToFileURL(path.resolve(import.meta.dirname, 'api', 'languages.js')).href)).default;
            await handler(req, res);
            return;
          }

          next();
        } catch (err) {
          next(err);
        }
      });
    },
  };
}

const plugins = [react(), tailwindcss(), createLocalApiMiddleware()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
