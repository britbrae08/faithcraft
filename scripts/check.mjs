import { readFile, stat } from "node:fs/promises";

const html = await readFile("public/index.html", "utf8");
const leadgenHtml = await readFile("public/leadgen/index.html", "utf8");
const css = await readFile("public/styles.css", "utf8");
const leadgenCss = await readFile("public/leadgen.css", "utf8");
const js = await readFile("public/script.js", "utf8");
const worker = await readFile("src/worker.js", "utf8");
const logo = await readFile("public/faithcraft-logo.jpg");
const sitemap = await readFile("public/sitemap.xml", "utf8");

const sampleNames = [
  "bible-decoded.webp",
  "free-bible-guides-mailer-front.webp",
  "free-bible-guides-mailer-back.webp",
  "bible-prophecy-series.webp",
  "zoom-bible-study-brand.webp",
  "live-online-discussion.webp",
  "follow-up-resource-card.webp",
  "healing-journey-follow-up.webp",
  "door-hanger-campaign.webp",
  "audience-campaign-creative.webp",
];
const sampleStats = await Promise.all(sampleNames.map((name) => stat(`public/leadgen-samples/${name}`)));

const checks = [
  ["home page title", html.includes("FaithCraft Agency | Digital Growth for Ministries")],
  ["lead generator page title", leadgenHtml.includes("Bible Study Lead Generation for Churches | FaithCraft")],
  ["single H1 per page", (html.match(/<h1/g) || []).length === 1 && (leadgenHtml.match(/<h1/g) || []).length === 1],
  ["SMS destination", html.includes("sms:8162596486?body=faithcraft") && leadgenHtml.includes("sms:8162596486?body=faithcraft")],
  ["email destination", html.includes("kalmanroller@gmail.com") && leadgenHtml.includes("kalmanroller@gmail.com") && js.includes("kalmanroller@gmail.com")],
  ["both inquiry forms", html.includes("data-email-form") && leadgenHtml.includes('data-form-type="leadgen"')],
  ["lead inquiry fields", ["name", "organization", "email", "phone", "promotion", "message"].every((name) => leadgenHtml.includes(`name="${name}"`))],
  ["email composer behavior", js.includes("mailto:") && js.includes("mail.google.com/mail/") && js.includes("Outreach goal")],
  ["home canonical URL", html.includes('href="https://faithcraft.agency/"')],
  ["lead canonical URL", leadgenHtml.includes('href="https://faithcraft.agency/leadgen"')],
  ["lead SEO metadata", leadgenHtml.includes('property="og:title"') && leadgenHtml.includes('name="twitter:card"') && leadgenHtml.includes('"@type":"Service"')],
  ["shared Lead Generator navigation", (html.match(/>Lead Generator</g) || []).length >= 3 && (leadgenHtml.match(/>Lead Generator</g) || []).length >= 3],
  ["mobile navigation", html.includes('class="mobile-nav"') && leadgenHtml.includes('class="mobile-nav"') && js.includes('event.key === "Escape"')],
  ["official logo references", (html.match(/faithcraft-logo\.jpg/g) || []).length >= 6 && (leadgenHtml.match(/faithcraft-logo\.jpg/g) || []).length >= 4],
  ["safe header logo dimensions", html.includes('width="58" height="58"') && leadgenHtml.includes('width="58" height="58"') && css.includes("max-width: 58px")],
  ["cache-busted shared assets", html.includes('/styles.css?v=20260831-1') && html.includes('/script.js?v=20260824-3') && leadgenHtml.includes('/styles.css?v=20260831-1') && leadgenHtml.includes('/leadgen.css?v=20260831-1')],
  ["source logo copied", logo.length > 100000],
  ["brand colors", ["#010c18", "#c79341", "#186059"].every((color) => css.toLowerCase().includes(color))],
  ["reduced motion", css.includes("prefers-reduced-motion")],
  ["responsive breakpoints", css.includes("@media (max-width: 760px)") && leadgenCss.includes("@media (max-width: 760px)")],
  ["progressive enhancement", js.includes("IntersectionObserver")],
  ["lead proof copy", leadgenHtml.includes(">400<") && leadgenHtml.includes("700 contacts") && leadgenHtml.includes("Results will vary")],
  ["all sample images referenced", sampleNames.every((name) => leadgenHtml.includes(`/leadgen-samples/${name}`))],
  ["campaign images distributed", !leadgenHtml.includes('id="samples"') && ["problem-samples", "outcome-samples", "system-samples", "department-samples"].every((name) => leadgenHtml.includes(name))],
  ["all sample images present", sampleStats.every((entry) => entry.size > 30000)],
  ["primary menus link both pages", html.includes('<a href="/" aria-current="page">Home</a>') && html.includes('<a class="nav-feature" href="/leadgen">Lead Generator</a>') && leadgenHtml.includes('<a href="/">Home</a>') && leadgenHtml.includes('href="/leadgen" aria-current="page">Lead Generator</a>')],
  ["reading journey footer links", [html, leadgenHtml].every((page) => page.includes('class="reading-journey-link"') && page.includes('https://tryjesusmedia.com/bibleandconflictoftheages/') && page.includes('target="_blank"')) && css.includes('.reading-journey-link') && css.includes('font-size: 1rem')],
  ["lead page in sitemap", sitemap.includes("https://faithcraft.agency/leadgen")],
  ["generated Worker", worker.includes("export default")],
  ["lead routes bundled into Worker", worker.includes('["/leadgen"') && worker.includes('["/leadgen/"')],
  ["sample images bundled into Worker", worker.includes("image/webp") && sampleNames.every((name) => worker.includes(name))],
  ["security headers", worker.includes("Content-Security-Policy") && worker.includes("X-Content-Type-Options")],
];

const failed = checks.filter(([, passed]) => !passed);
for (const [name, passed] of checks) console.log(`${passed ? "PASS" : "FAIL"} ${name}`);
if (failed.length) process.exit(1);
