import siteWorker from "./worker.js";

const canonicalHeader = `
<header class="site-header" data-header>
  <a class="brand" href="/" aria-label="FaithCraft Agency home">
    <img class="brand-logo brand-logo-header" src="/faithcraft-logo.jpg" alt="FaithCraft Agency" width="58" height="58" />
  </a>
  <nav class="desktop-nav" aria-label="Primary navigation">
    <a href="/">Home</a>
    <a class="nav-feature" href="/aiadvantage">The AI Advantage</a>
    <a href="/leadgen">Lead Generator</a>
    <a href="/#contact">Contact</a>
  </nav>
  <a class="fc-mobile-menu-toggle" href="#fc-mobile-menu" aria-label="Open navigation menu">Menu</a>
  <nav class="fc-mobile-menu-panel" id="fc-mobile-menu" aria-label="Mobile navigation">
    <a class="fc-mobile-menu-close" href="#" aria-label="Close navigation menu">Close ×</a>
    <a href="/">Home</a>
    <a href="/aiadvantage">The AI Advantage</a>
    <a href="/leadgen">Lead Generator</a>
    <a href="/#contact">Contact</a>
  </nav>
  <a class="button button-small button-outline" href="/#contact">Contact FaithCraft</a>
</header>`;

const runtimeNavStyles = `
<style id="faithcraft-runtime-nav">
  .fc-mobile-menu-toggle,
  .fc-mobile-menu-panel { display: none; }

  @media (max-width: 980px) {
    html,
    body {
      width: 100% !important;
      max-width: 100% !important;
      overflow-x: hidden !important;
    }

    .site-header {
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      max-width: 100vw !important;
      transform: none !important;
      padding-left: 17px !important;
      padding-right: 17px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
    }

    .site-header.is-scrolled {
      left: 10px !important;
      right: 10px !important;
      width: auto !important;
      max-width: calc(100vw - 20px) !important;
      transform: none !important;
      padding-left: 14px !important;
      padding-right: 14px !important;
    }

    .site-header .brand {
      flex: 0 0 auto !important;
      min-width: 0 !important;
    }

    .site-header .desktop-nav { display: none !important; }

    .fc-mobile-menu-toggle {
      position: relative !important;
      z-index: 10001 !important;
      flex: 0 0 auto !important;
      margin-left: auto !important;
      margin-right: 0 !important;
      min-width: 78px !important;
      max-width: calc(100vw - 110px) !important;
      padding: 10px 14px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border: 1px solid rgba(229,181,91,.65) !important;
      border-radius: 5px !important;
      color: #e5b55b !important;
      background: rgba(1,12,24,.94) !important;
      font: 800 11px/1.3 Montserrat, Arial, sans-serif !important;
      letter-spacing: .08em !important;
      text-decoration: none !important;
      text-transform: uppercase !important;
      visibility: visible !important;
      opacity: 1 !important;
    }

    .fc-mobile-menu-panel {
      position: fixed !important;
      z-index: 10000 !important;
      top: 82px !important;
      left: 17px !important;
      right: 17px !important;
      width: auto !important;
      max-width: none !important;
      padding: 10px !important;
      border: 1px solid rgba(235,233,222,.18) !important;
      border-radius: 8px !important;
      background: #010c18 !important;
      box-shadow: 0 24px 60px rgba(0,0,0,.55) !important;
    }

    #fc-mobile-menu:target { display: grid !important; }

    .fc-mobile-menu-panel a {
      padding: 13px 14px !important;
      border-radius: 4px !important;
      color: #ebe9de !important;
      font: 700 12px/1.4 Montserrat, Arial, sans-serif !important;
      letter-spacing: .05em !important;
      text-decoration: none !important;
      text-transform: uppercase !important;
    }

    .fc-mobile-menu-panel .fc-mobile-menu-close {
      margin-bottom: 4px !important;
      color: #e5b55b !important;
      text-align: right !important;
    }
  }

  @media (max-width: 760px) {
    .site-header > .button { display: none !important; }
  }
</style>`;

const isSlingPath = (pathname) =>
  pathname === "/sling" || pathname === "/sling/" || pathname === "/sling/index.html";

export default {
  async fetch(request, env, ctx) {
    const response = await siteWorker.fetch(request, env, ctx);
    const url = new URL(request.url);
    const contentType = response.headers.get("Content-Type") || "";

    if (isSlingPath(url.pathname) || !contentType.includes("text/html")) {
      return response;
    }

    return new HTMLRewriter()
      .on("head", {
        element(element) {
          element.append(runtimeNavStyles, { html: true });
        },
      })
      .on("header.site-header", {
        element(element) {
          element.replace(canonicalHeader, { html: true });
        },
      })
      .transform(response);
  },
};
