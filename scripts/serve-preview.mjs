/**
 * Password-gated static preview server.
 *
 * Serves ./out (the `pnpm build` output) over HTTP Basic Auth so the
 * prototype can be shared with a short-lived public tunnel without being
 * world-readable.
 *
 * Usage:
 *   PREVIEW_USER=scentmoon PREVIEW_PASS=<password> node scripts/serve-preview.mjs
 *
 * The password is read from the environment only — never commit credentials.
 */
import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { timingSafeEqual } from "node:crypto";

const ROOT = join(process.cwd(), "out");
const PORT = Number(process.env.PORT ?? 8787);
const USER = process.env.PREVIEW_USER ?? "";
const PASS = process.env.PREVIEW_PASS ?? "";

if (!USER || !PASS) {
  console.error("Set PREVIEW_USER and PREVIEW_PASS before starting.");
  process.exit(1);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".woff2": "font/woff2",
  ".wasm": "application/wasm",
};

function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function authorized(req) {
  const header = req.headers.authorization ?? "";
  if (!header.startsWith("Basic ")) return false;
  const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
  const colon = decoded.indexOf(":");
  if (colon < 0) return false;
  const user = decoded.slice(0, colon);
  const pass = decoded.slice(colon + 1);
  return safeEqual(user, USER) && safeEqual(pass, PASS);
}

function send(req, res, status, body, type = "text/plain; charset=utf-8") {
  const headers = {
    "Content-Type": type,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  };
  if (status === 401) {
    headers["WWW-Authenticate"] = 'Basic realm="scentmoon preview"';
  }
  res.writeHead(status, headers);
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (!authorized(req)) {
    send(req, res, 401, "需要密碼。請輸入預覽帳號。");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    send(req, res, 400, "Bad request");
    return;
  }

  if (pathname.endsWith("/")) pathname += "index.html";
  const filePath = normalize(join(ROOT, pathname));
  if (!filePath.startsWith(ROOT)) {
    send(req, res, 403, "Forbidden");
    return;
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    const notFound = join(ROOT, "404.html");
    const body = existsSync(notFound)
      ? createReadStream(notFound)
      : "404";
    if (typeof body === "string") {
      send(req, res, 404, body);
    } else {
      res.writeHead(404, {
        "Content-Type": MIME[".html"],
        "Cache-Control": "no-store",
      });
      body.pipe(res);
    }
    return;
  }

  res.writeHead(200, {
    "Content-Type": MIME[extname(filePath)] ?? "application/octet-stream",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  createReadStream(filePath).pipe(res);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Preview server: http://127.0.0.1:${PORT} (Basic Auth enabled)`);
});
