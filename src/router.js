import siteWorker from "./worker.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Keep old SLING bookmarks working while using the FaithWords page shell.
    if (url.pathname === "/sling" || url.pathname === "/sling/" || url.pathname.startsWith("/sling/")) {
      const redirect = new URL(url);
      redirect.pathname = "/faithwords/";
      redirect.search = "";
      return Response.redirect(redirect.toString(), 308);
    }

    return siteWorker.fetch(request, env, ctx);
  }
};