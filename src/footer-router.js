import app from "./router.js";

const isSlingPath = (pathname) =>
  pathname === "/sling" || pathname === "/sling/" || pathname === "/sling/index.html";

const footerFaithWordsStyles = `
<style id="faithcraft-footer-faithwords-style">
  .footer-contact > span:not(.footer-meta-line) {
    display: none !important;
  }
  .footer-meta-line {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }
  .footer-faithwords-link {
    display: inline-block;
    padding-left: 8px;
    border-left: 1px solid currentColor;
    color: inherit;
    opacity: .68;
    font-size: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    text-decoration: none;
  }
  .footer-faithwords-link:hover,
  .footer-faithwords-link:focus-visible {
    opacity: 1;
    text-decoration: underline;
  }
</style>`;

export default {
  async fetch(request, env, ctx) {
    const response = await app.fetch(request, env, ctx);
    const url = new URL(request.url);
    const contentType = response.headers.get("Content-Type") || "";

    if (isSlingPath(url.pathname) || !contentType.includes("text/html")) {
      return response;
    }

    const year = new Date().getFullYear();

    return new HTMLRewriter()
      .on("head", {
        element(element) {
          element.append(footerFaithWordsStyles, { html: true });
        },
      })
      .on(".footer-contact", {
        element(element) {
          element.append(`<span class="footer-meta-line">© ${year} FaithCraft <a class="footer-faithwords-link" href="/sling">FaithWords</a></span>`, { html: true });
        },
      })
      .transform(response);
  },
};
