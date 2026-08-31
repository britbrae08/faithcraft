import siteWorker from "./worker.js";

const SLING_ORIGIN = "https://britbrae08.github.io/sling/";

async function serveSling(request, url) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "GET, HEAD" }
    });
  }

  // Keep one canonical play URL so relative game assets and the PWA service
  // worker are scoped cleanly beneath /sling/.
  if (url.pathname === "/sling") {
    const redirect = new URL(url);
    redirect.pathname = "/sling/";
    return Response.redirect(redirect.toString(), 308);
  }

  const relativePath = url.pathname.slice("/sling/".length);
  const upstreamUrl = new URL(relativePath || "./", SLING_ORIGIN);
  upstreamUrl.search = url.search;

  const upstreamRequest = new Request(upstreamUrl.toString(), {
    method: request.method,
    headers: request.headers,
    redirect: "follow"
  });

  const upstream = await fetch(upstreamRequest);
  const headers = new Headers(upstream.headers);

  // The public-facing product lives at FaithCraft. Keep HTML fresh while
  // allowing short asset caching for fast mobile play.
  const isHtml = relativePath === "" || relativePath === "index.html";
  headers.set("Cache-Control", isHtml ? "no-cache" : "public, max-age=300");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.delete("content-security-policy");
  headers.delete("x-frame-options");

  return new Response(request.method === "HEAD" ? null : upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (
      url.pathname === "/sling" ||
      url.pathname === "/sling/" ||
      url.pathname.startsWith("/sling/")
    ) {
      return serveSling(request, url);
    }

    return siteWorker.fetch(request, env, ctx);
  }
};
