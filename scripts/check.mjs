import { readFile } from "node:fs/promises";

const html = await readFile("public/index.html", "utf8");
const css = await readFile("public/styles.css", "utf8");
const js = await readFile("public/script.js", "utf8");
const worker = await readFile("src/worker.js", "utf8");
const logo = await readFile("public/faithcraft-logo.jpg");

const checks = [
  ["page title", html.includes("FaithCraft Agency | Digital Growth for Ministries")],
  ["single H1", (html.match(/<h1/g) || []).length === 1],
  ["SMS destination", html.includes("sms:8162596486?body=faithcraft")],
  ["email destination", html.includes("kalmanroller@gmail.com") && js.includes("kalmanroller@gmail.com")],
  ["desktop contact form", html.includes("data-email-form") && html.includes("Open in Gmail")],
  ["email composer behavior", js.includes("mailto:") && js.includes("mail.google.com/mail/")],
  ["canonical URL", html.includes('href="https://faithcraft.agency/"')],
  ["official logo references", (html.match(/faithcraft-logo\.jpg/g) || []).length >= 6],
  ["safe header logo dimensions", html.includes('width="58" height="58"') && css.includes("max-width: 58px")],
  ["cache-busted contact assets", html.includes('/styles.css?v=20260824-2') && html.includes('/script.js?v=20260824-2')],
  ["custom-drawn brand mark removed", !html.includes("brand-mark") && !css.includes(".mark-f")],
  ["source logo copied", logo.length > 100000],
  ["brand colors", ["#010c18", "#c79341", "#186059"].every((color) => css.toLowerCase().includes(color))],
  ["reduced motion", css.includes("prefers-reduced-motion")],
  ["mobile breakpoint", css.includes("@media (max-width: 760px)")],
  ["progressive enhancement", js.includes("IntersectionObserver")],
  ["generated Worker", worker.includes("export default")],
  ["logo bundled into Worker", worker.includes("image/jpeg") && worker.includes('"encoding":"base64"')],
];

const failed = checks.filter(([, passed]) => !passed);
for (const [name, passed] of checks) console.log(`${passed ? "PASS" : "FAIL"} ${name}`);
if (failed.length) process.exit(1);

