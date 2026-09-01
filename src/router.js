import siteWorker from "./worker.js";

// The FaithWords source currently lives in the repository that was originally
// created as `sling`. The public product URL is FaithCraft regardless of the
// temporary GitHub repository path.
const FAITHWORDS_ORIGIN = "https://britbrae08.github.io/sling/";

async function serveFaithWords(request, url) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "GET, HEAD" }
    });
  }

  if (url.pathname === "/faithwords") {
    const redirect = new URL(url);
    redirect.pathname = "/faithwords/";
    return Response.redirect(redirect.toString(), 308);
  }

  const relativePath = url.pathname.slice("/faithwords/".length);
  const upstreamUrl = new URL(relativePath || "./", FAITHWORDS_ORIGIN);
  upstreamUrl.search = url.search;

  const upstreamRequest = new Request(upstreamUrl.toString(), {
    method: request.method,
    headers: request.headers,
    redirect: "follow"
  });

  const upstream = await fetch(upstreamRequest);
  const headers = new Headers(upstream.headers);
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

    // Retire the old public game path and send any bookmarks to FaithWords.
    if (url.pathname === "/sling" || url.pathname === "/sling/" || url.pathname.startsWith("/sling/")) {
      const redirect = new URL(url);
      redirect.pathname = "/faithwords/";
      redirect.search = "";
      return Response.redirect(redirect.toString(), 308);
    }

    if (
      url.pathname === "/faithwords" ||
      url.pathname === "/faithwords/" ||
      url.pathname.startsWith("/faithwords/")
    ) {
      return serveFaithWords(request, url);
    }

    return siteWorker.fetch(request, env, ctx);
  }
};
