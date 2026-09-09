import { mkdir, readFile, writeFile } from "node:fs/promises";

const canonicalEmail = "kal@faithcraft.agency";
const legacyEmails = ["kalmanroller@gmail.com"];

const canonicalHeader = `    <header class="site-header" data-header>
      <a class="brand" href="/" aria-label="FaithCraft Agency home">
        <img class="brand-logo brand-logo-header" src="/faithcraft-logo.jpg" alt="FaithCraft Agency" width="58" height="58" />
      </a>
      <nav class="desktop-nav" aria-label="Primary navigation">
        <a href="/">Home</a>
        <a class="nav-feature" href="/aiadvantage">The AI Advantage</a>
        <a href="/leadgen">Lead Generator</a>
        <a href="/#contact">Contact</a>
      </nav>
      <details class="mobile-nav">
        <summary aria-label="Open navigation menu">Menu</summary>
        <nav aria-label="Mobile navigation">
          <a href="/">Home</a>
          <a href="/aiadvantage">The AI Advantage</a>
          <a href="/leadgen">Lead Generator</a>
          <a href="/#contact">Contact</a>
        </nav>
      </details>
      <a class="button button-small button-outline" href="/#contact">Contact FaithCraft</a>
    </header>`;

const canonicalFooter = `    <footer>
      <a class="brand brand-footer" href="/" aria-label="FaithCraft Agency home">
        <img class="brand-logo brand-logo-footer" src="/faithcraft-logo.jpg" alt="FaithCraft Agency" width="112" height="112" loading="lazy" />
      </a>
      <div class="footer-center">
        <p>Strategy. Creativity. Kingdom Impact.</p>
        <nav class="footer-nav" aria-label="Footer navigation"><a href="/">Home</a><a href="/aiadvantage">The AI Advantage</a><a href="/leadgen">Lead Generator</a><a href="/#contact">Contact</a></nav>
        <a class="reading-journey-link" href="https://tryjesusmedia.com/bibleandconflictoftheages/" target="_blank" rel="noopener noreferrer">Bible and Conflict of the Ages reading journey</a>
      </div>
      <div class="footer-contact"><a href="mailto:kal@faithcraft.agency">kal@faithcraft.agency</a><a href="sms:8162596486?body=faithcraft">816-259-6486</a><span>© <span data-year></span> FaithCraft Agency</span></div>
    </footer>`;

const canonicalMobileCta = `    <a class="mobile-cta" href="/#contact"><span>Contact FaithCraft</span><b>↗</b></a>`;

const aiCalendarStyles = `    <style id="ai-calendar-styles">
      .ai-calendar-section { width: var(--container); margin: 0 auto; padding: 118px 0 130px; scroll-margin-top: 100px; }
      .ai-calendar-intro { max-width: 830px; margin: 0 auto 38px; text-align: center; }
      .ai-calendar-intro .eyebrow { justify-content: center; }
      .ai-calendar-intro h2 { margin: 18px 0 20px; }
      .ai-calendar-intro p { max-width: 690px; margin: 0 auto; color: var(--muted); }
      .ai-calendar-frame { overflow: hidden; min-height: 760px; border: 1px solid rgba(229,181,91,.28); border-radius: 12px; background: #fff; box-shadow: 0 28px 80px rgba(0,0,0,.34); }
      .ai-calendar-frame iframe { display: block; width: 100%; height: 760px; border: 0; background: #fff; }
      @media (max-width: 760px) {
        .ai-calendar-section { width: calc(100% - 20px); padding: 88px 0 105px; }
        .ai-calendar-frame, .ai-calendar-frame iframe { min-height: 720px; height: 720px; }
      }
    </style>`;

const aiCalendarSection = `      <section class="ai-calendar-section" id="calendar" aria-labelledby="calendar-title">
        <div class="ai-calendar-intro" data-reveal>
          <p class="eyebrow"><span></span>Book your free AI Advantage call</p>
          <h2 id="calendar-title">Pick a time with Kal and get <em>The AI Advantage guide free.</em></h2>
          <p>Choose a time below. Bring the business, marketing bottleneck, or idea you want to build, and we’ll look for practical ways AI can help you move faster and spend smarter.</p>
        </div>
        <div class="ai-calendar-frame" data-reveal>
          <iframe src="https://calendly.com/kalroller/kal?hide_gdpr_banner=1" title="Book a free AI Advantage call with Kal" loading="lazy"></iframe>
        </div>
      </section>`;

const assets = [
  ["/", "public/index.html", "text/html; charset=UTF-8", "no-cache", false],
  ["/index.html", "public/index.html", "text/html; charset=UTF-8", "no-cache", false],
  ["/aiadvantage", "public/aiadvantage/index.html", "text/html; charset=UTF-8", "no-cache", false],
  ["/aiadvantage/", "public/aiadvantage/index.html", "text/html; charset=UTF-8", "no-cache", false],
  ["/aiadvantage/index.html", "public/aiadvantage/index.html", "text/html; charset=UTF-8", "no-cache", false],
  ["/leadgen", "public/leadgen/index.html", "text/html; charset=UTF-8", "no-cache", false],
  ["/leadgen/", "public/leadgen/index.html", "text/html; charset=UTF-8", "no-cache", false],
  ["/leadgen/index.html", "public/leadgen/index.html", "text/html; charset=UTF-8", "no-cache", false],
  ["/faithwords", "public/faithwords/index.html", "text/html; charset=UTF-8", "no-cache", false],
  ["/faithwords/", "public/faithwords/index.html", "text/html; charset=UTF-8", "no-cache", false],
  ["/faithwords/index.html", "public/faithwords/index.html", "text/html; charset=UTF-8", "no-cache", false],
  ["/sling", "public/sling/index.html", "text/html; charset=UTF-8", "no-cache", false],
  ["/sling/", "public/sling/index.html", "text/html; charset=UTF-8", "no-cache", false],
  ["/sling/index.html", "public/sling/index.html", "text/html; charset=UTF-8", "no-cache", false],
  ["/styles.css", "public/styles.css", "text/css; charset=UTF-8", "public, max-age=3600", false],
  ["/aiadvantage.css", "public/aiadvantage.css", "text/css; charset=UTF-8", "public, max-age=3600", false],
  ["/leadgen.css", "public/leadgen.css", "text/css; charset=UTF-8", "public, max-age=3600", false],
  ["/script.js", "public/script.js", "text/javascript; charset=UTF-8", "public, max-age=3600", false],
  ["/faithcraft-logo.jpg", "public/faithcraft-logo.jpg", "image/jpeg", "public, max-age=604800, immutable", true],
  ["/leadgen-samples/bible-decoded.webp", "public/leadgen-samples/bible-decoded.webp", "image/webp", "public, max-age=604800, immutable", true],
  ["/leadgen-samples/free-bible-guides-mailer-front.webp", "public/leadgen-samples/free-bible-guides-mailer-front.webp", "image/webp", "public, max-age=604800, immutable", true],
  ["/leadgen-samples/free-bible-guides-mailer-back.webp", "public/leadgen-samples/free-bible-guides-mailer-back.webp", "image/webp", "public, max-age=604800, immutable", true],
  ["/leadgen-samples/bible-prophecy-series.webp", "public/leadgen-samples/bible-prophecy-series.webp", "image/webp", "public, max-age=604800, immutable", true],
  ["/leadgen-samples/zoom-bible-study-brand.webp", "public/leadgen-samples/zoom-bible-study-brand.webp", "image/webp", "public, max-age=604800, immutable", true],
  ["/leadgen-samples/live-online-discussion.webp", "public/leadgen-samples/live-online-discussion.webp", "image/webp", "public, max-age=604800, immutable", true],
  ["/leadgen-samples/follow-up-resource-card.webp", "public/leadgen-samples/follow-up-resource-card.webp", "image/webp", "public, max-age=604800, immutable", true],
  ["/leadgen-samples/healing-journey-follow-up.webp", "public/leadgen-samples/healing-journey-follow-up.webp", "image/webp", "public, max-age=604800, immutable", true],
  ["/leadgen-samples/door-hanger-campaign.webp", "public/leadgen-samples/door-hanger-campaign.webp", "image/webp", "public, max-age=604800, immutable", true],
  ["/leadgen-samples/audience-campaign-creative.webp", "public/leadgen-samples/audience-campaign-creative.webp", "image/webp", "public, max-age=604800, immutable", true],
  ["/robots.txt", "public/robots.txt", "text/plain; charset=UTF-8", "public, max-age=3600", false],
  ["/sitemap.xml", "public/sitemap.xml", "application/xml; charset=UTF-8", "public, max-age=3600", false],
];

const normalizeContactEmail = (text) =>
  legacyEmails.reduce((value, email) => value.replaceAll(email, canonicalEmail), text);

const rewriteAnchorButtons = (html, href, label) => {
  let value = html.replace(/<a([^>]*class="[^"]*\bbutton\b[^"]*"[^>]*)>[\s\S]*?<\/a>/g, (_match, attrs) => {
    const cleaned = attrs
      .replace(/\s+href="[^"]*"/g, "")
      .replace(/\s+target="[^"]*"/g, "")
      .replace(/\s+rel="[^"]*"/g, "");
    return `<a${cleaned} href="${href}"><span class="button-icon" aria-hidden="true">↗</span>${label}</a>`;
  });

  value = value.replace(/<a([^>]*class="mobile-cta"[^>]*)>[\s\S]*?<\/a>/g, (_match, attrs) => {
    const cleaned = attrs
      .replace(/\s+href="[^"]*"/g, "")
      .replace(/\s+target="[^"]*"/g, "")
      .replace(/\s+rel="[^"]*"/g, "");
    return `<a${cleaned} href="${href}"><span>${label}</span><b>↗</b></a>`;
  });

  return value;
};

const normalizeSiteShell = (text, path) => {
  let value = normalizeContactEmail(text);
  if (!value.includes("<html")) return value;

  if (path === "/sling" || path === "/sling/" || path === "/sling/index.html") return value;

  if (value.includes('class="site-header"')) {
    value = value.replace(/\s*<header class="site-header" data-header>[\s\S]*?<\/header>/, `\n${canonicalHeader}`);
  } else {
    value = value.replace(/(<body[^>]*>)/, `$1\n${canonicalHeader}`);
  }

  if (value.includes("<footer")) {
    value = value.replace(/\s*<footer(?:\s+class="[^"]*")?>[\s\S]*?<\/footer>/, `\n${canonicalFooter}`);
  } else {
    value = value.replace(/\s*<\/body>/, `\n${canonicalFooter}\n  </body>`);
  }

  if (value.includes('<script src="/script.js') && !value.includes('class="mobile-cta"')) {
    value = value.replace(/\s*(<script src="\/script\.js[^>]*><\/script>)/, `\n${canonicalMobileCta}\n    $1`);
  }

  const isAiPage = value.includes('class="ai-page"');

  if (isAiPage) {
    if (!value.includes('id="ai-calendar-styles"')) {
      value = value.replace(/\s*<\/head>/, `\n${aiCalendarStyles}\n  </head>`);
    }
    if (!value.includes('id="calendar"')) {
      value = value.replace(/\s*<\/main>/, `\n${aiCalendarSection}\n    </main>`);
    }
    value = rewriteAnchorButtons(value, "#calendar", "Book a Call + Get the AI Advantage Guide Free");
  } else {
    const contactHref = value.includes('id="contact"') ? "#contact" : "/#contact";
    value = rewriteAnchorButtons(value, contactHref, "Contact FaithCraft");
  }

  return value;
};

const loaded = await Promise.all(
  assets.map(async ([path, file, contentType, cacheControl, binary]) => {
    const body = await readFile(file);
    return [
      path,
      {
        body: binary ? body.toString("base64") : normalizeSiteShell(body.toString("utf8"), path),
        contentType,
        cacheControl,
        encoding: binary ? "base64" : "utf8",
      },
    ];
  }),
);

const worker = `// Generated by scripts/build.mjs. Edit files in public/ instead.\n` +
`const assets = new Map(${JSON.stringify(loaded)});\n` +
`const securityHeaders = {\n` +
`  "Content-Security-Policy": "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self'; img-src 'self' data:; connect-src 'self'; frame-src https://britbrae08.github.io https://calendly.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:",\n` +
`  "Referrer-Policy": "strict-origin-when-cross-origin",\n` +
`  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",\n` +
`  "X-Content-Type-Options": "nosniff",\n` +
`  "X-Frame-Options": "DENY",\n` +
`  "Cross-Origin-Opener-Policy": "same-origin",\n` +
`};\n` +
`export default {\n` +
`  async fetch(request) {\n` +
`    const url = new URL(request.url);\n` +
`    if (request.method !== "GET" && request.method !== "HEAD") {\n` +
`      return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });\n` +
`    }\n` +
`    const asset = assets.get(url.pathname);\n` +
`    if (!asset) {\n` +
`      return new Response("Not Found", { status: 404, headers: securityHeaders });\n` +
`    }\n` +
`    const headers = new Headers(securityHeaders);\n` +
`    headers.set("Content-Type", asset.contentType);\n` +
`    headers.set("Cache-Control", asset.cacheControl);\n` +
`    const body = asset.encoding === "base64" ? Uint8Array.from(atob(asset.body), (char) => char.charCodeAt(0)) : asset.body;\n` +
`    return new Response(request.method === "HEAD" ? null : body, { status: 200, headers });\n` +
`  },\n` +
`};\n`;

await mkdir("src", { recursive: true });
await writeFile("src/worker.js", worker);
console.log(`Built src/worker.js with ${loaded.length} routes.`);
