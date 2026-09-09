import app from "./router.js";

const isSlingPath = (pathname) =>
  pathname === "/sling" || pathname === "/sling/" || pathname === "/sling/index.html";

const footerFaithWordsStyles = `
<style id="faithcraft-footer-faithwords-style">
  .footer-faithwords-link {
    display: inline-block;
    margin-top: 10px;
    color: inherit;
    opacity: .62;
    font-size: .68rem;
    line-height: 1.4;
    letter-spacing: .04em;
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

    return new HTMLRewriter()
      .on("head", {
        element(element) {
          element.append(footerFaithWordsStyles, { html: true });
        },
      })
      .on("footer", {
        element(element) {
          element.append('<a class="footer-faithwords-link" href="/sling">FaithWords</a>', { html: true });
        },
      })
      .transform(response);
  },
};
