import app from "./router.js";

const isSlingPath = (pathname) =>
  pathname === "/sling" || pathname === "/sling/" || pathname === "/sling/index.html";

const normalizePath = (pathname) => {
  let value = pathname.replace(/\/index\.html$/i, "").replace(/\/+$/, "");
  return value || "/";
};

const footerFaithWordsStyles = `
<style id="faithcraft-footer-faithwords-style">
  .footer-contact > span:not(.footer-meta-line) { display: none !important; }
  .footer-meta-line { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
  .footer-faithwords-link { display: inline-block; padding-left: 8px; border-left: 1px solid currentColor; color: inherit; opacity: .68; font-size: inherit; line-height: inherit; letter-spacing: inherit; text-decoration: none; }
  .footer-faithwords-link:hover, .footer-faithwords-link:focus-visible { opacity: 1; text-decoration: underline; }
</style>`;

const seoStyles = `
<style id="faithcraft-seo-styles">
  .seo-service-links { width: min(1160px, calc(100% - 34px)); margin: 0 auto; padding: 94px 0 110px; }
  .seo-service-links .seo-kicker { color: #e5b55b; font: 800 .7rem/1.4 Montserrat,Arial,sans-serif; letter-spacing: .12em; text-transform: uppercase; }
  .seo-service-links h2 { max-width: 760px; margin: 14px 0 16px; }
  .seo-service-links > p { max-width: 720px; color: #aaa9a3; line-height: 1.75; }
  .seo-service-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-top: 30px; }
  .seo-service-grid a { min-height: 145px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(235,233,222,.12); border-radius: 10px; color: #ebe9de; background: rgba(255,255,255,.025); text-decoration: none; transition: transform .2s ease,border-color .2s ease,background .2s ease; }
  .seo-service-grid a:hover { transform: translateY(-3px); border-color: rgba(229,181,91,.45); background: rgba(229,181,91,.045); }
  .seo-service-grid strong { font: 700 1rem/1.3 Montserrat,Arial,sans-serif; }
  .seo-service-grid span { color: #aaa9a3; font-size: .75rem; line-height: 1.55; }
  .seo-page { min-height: 100vh; background: #010c18; color: #ebe9de; }
  .seo-page main { padding-top: 90px; }
  .seo-hero { position: relative; overflow: hidden; padding: 110px 0 88px; border-bottom: 1px solid rgba(235,233,222,.09); }
  .seo-hero::before { content:""; position:absolute; inset:-40% -20%; background:radial-gradient(circle at 70% 35%,rgba(229,181,91,.13),transparent 26%),radial-gradient(circle at 18% 60%,rgba(24,96,89,.2),transparent 30%); pointer-events:none; }
  .seo-wrap { position: relative; width: min(1040px, calc(100% - 34px)); margin: 0 auto; }
  .seo-crumbs { margin-bottom: 30px; color: #8d8d89; font-size: .68rem; letter-spacing: .04em; }
  .seo-crumbs a { color: #c7c5bd; text-decoration: none; }
  .seo-eyebrow { color: #e5b55b; font: 800 .7rem/1.4 Montserrat,Arial,sans-serif; letter-spacing: .12em; text-transform: uppercase; }
  .seo-hero h1 { max-width: 900px; margin: 16px 0 24px; font-size: clamp(2.6rem,7vw,5.6rem); line-height: .98; }
  .seo-hero h1 em { color: #e5b55b; font-style: normal; }
  .seo-lead { max-width: 760px; color: #c5c3bb; font-size: clamp(1rem,2vw,1.2rem); line-height: 1.8; }
  .seo-cta-row { margin-top: 30px; display:flex; flex-wrap:wrap; gap:12px; }
  .seo-content { padding: 90px 0 110px; }
  .seo-content-grid { display:grid; grid-template-columns: minmax(0,1.4fr) minmax(260px,.6fr); gap: 70px; }
  .seo-copy h2 { margin: 0 0 20px; font-size: clamp(2rem,4vw,3.4rem); line-height:1.05; }
  .seo-copy h3 { margin: 42px 0 12px; font: 750 1.2rem/1.3 Montserrat,Arial,sans-serif; color:#e5b55b; }
  .seo-copy p { margin: 0 0 18px; color:#bbb9b1; line-height:1.82; }
  .seo-copy ul { margin: 18px 0 30px; padding:0; display:grid; gap:10px; list-style:none; }
  .seo-copy li { padding: 14px 16px 14px 42px; position:relative; border:1px solid rgba(235,233,222,.1); border-radius:8px; color:#cfcdc5; background:rgba(255,255,255,.025); line-height:1.55; }
  .seo-copy li::before { content:"✓"; position:absolute; left:15px; color:#e5b55b; font-weight:900; }
  .seo-side { align-self:start; position:sticky; top:110px; padding:24px; border:1px solid rgba(229,181,91,.2); border-radius:12px; background:rgba(229,181,91,.035); }
  .seo-side strong { display:block; margin-bottom:10px; color:#fff; }
  .seo-side p { margin:0 0 18px; color:#aaa9a3; font-size:.82rem; line-height:1.7; }
  .seo-related { padding-top: 50px; border-top: 1px solid rgba(235,233,222,.09); }
  .seo-related h2 { margin-bottom: 22px; }
  .seo-related-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
  .seo-related-grid a { padding:18px; border:1px solid rgba(235,233,222,.1); border-radius:8px; color:#ebe9de; text-decoration:none; background:rgba(255,255,255,.02); }
  .seo-related-grid a:hover { border-color:rgba(229,181,91,.4); }
  .seo-related-grid b { display:block; margin-bottom:5px; font-size:.84rem; }
  .seo-related-grid span { color:#999892; font-size:.69rem; line-height:1.45; }
  @media(max-width:900px){ .seo-service-grid,.seo-related-grid{grid-template-columns:1fr 1fr}.seo-content-grid{grid-template-columns:1fr;gap:38px}.seo-side{position:static} }
  @media(max-width:600px){ .seo-service-links{padding:70px 0 88px}.seo-service-grid,.seo-related-grid{grid-template-columns:1fr}.seo-hero{padding:86px 0 68px}.seo-content{padding:68px 0 90px} }
</style>`;

const criticalMobileNav = `
<style id="seo-mobile-nav-critical">
  @media (max-width:980px) {
    .site-header { left:0!important; right:0!important; width:100%!important; max-width:100vw!important; transform:none!important; display:flex!important; align-items:center!important; justify-content:space-between!important; padding-left:17px!important; padding-right:17px!important; }
    .site-header .desktop-nav { display:none!important; }
    .site-header .mobile-nav { display:block!important; position:relative!important; margin-left:auto!important; visibility:visible!important; opacity:1!important; }
    .site-header .mobile-nav summary { display:block!important; min-width:78px; padding:10px 14px; border:1px solid rgba(229,181,91,.6); border-radius:5px; color:#e5b55b; background:#010c18; cursor:pointer; font:800 11px/1.3 Montserrat,Arial,sans-serif; letter-spacing:.08em; list-style:none; text-align:center; text-transform:uppercase; }
    .site-header .mobile-nav summary::-webkit-details-marker { display:none; }
    .site-header .mobile-nav nav { position:absolute; top:calc(100% + 12px); right:0; width:min(280px,calc(100vw - 34px)); padding:9px; display:grid; border:1px solid rgba(235,233,222,.14); border-radius:8px; background:#010c18; box-shadow:0 24px 60px rgba(0,0,0,.48); }
    .site-header .mobile-nav nav a { padding:13px 14px; color:#ebe9de; font:700 12px/1.4 Montserrat,Arial,sans-serif; text-decoration:none; text-transform:uppercase; }
  }
  @media(max-width:760px){ .site-header > .button{display:none!important;} }
</style>`;

const services = {
  "/christian-digital-marketing": {
    title: "Christian Digital Marketing Agency | FaithCraft",
    description: "FaithCraft is a Christian digital marketing agency helping churches, ministries, Christian businesses, and faith-driven creators grow through strategy, websites, content, lead generation, advertising, and AI.",
    eyebrow: "Christian digital marketing",
    h1: "Digital marketing built for <em>faith-driven work.</em>",
    lead: "FaithCraft helps Christian organizations become easier to discover, easier to trust, and easier to engage with online—without separating marketing strategy from the mission behind the work.",
    heading: "A Christian marketing agency focused on reach, trust, and action.",
    intro: "Good digital marketing should do more than make an organization look current. It should help the right people find you, understand what you offer, trust what they see, and take a meaningful next step. FaithCraft brings strategy, creative execution, technology, lead generation, and AI-assisted production together so faith-driven organizations can build momentum without managing a maze of disconnected vendors.",
    sections: [
      ["What FaithCraft can help you build", "Whether you are a church trying to reach your community, a ministry expanding beyond an existing audience, or a Christian business building a stronger digital presence, the work starts with the outcome—not a random list of tactics.", ["Search-friendly websites and landing pages", "Lead-generation funnels and outreach campaigns", "Content systems for social, video, email, and web", "Paid campaign concepts and conversion paths", "AI-assisted marketing workflows that save time and reduce unnecessary overhead"]],
      ["Why faith-driven organizations need a different approach", "Faith-based marketing has to communicate with clarity without becoming generic, manipulative, or disconnected from the values behind the organization. The goal is not to imitate the loudest brand online. It is to make a worthy message easier to find and easier to act on.", []],
      ["Start with the bottleneck", "You do not need to know which platform, funnel, ad format, or software stack you need. Bring the problem: low visibility, an outdated website, inconsistent content, weak follow-up, a launch that needs structure, or an idea you are not sure how to build. We can work backward from there.", []]
    ]
  },
  "/christian-web-design": {
    title: "Christian Web Design for Churches & Businesses | FaithCraft",
    description: "Christian web design from FaithCraft for churches, ministries, Christian businesses, and faith-driven organizations that need a clear, credible, conversion-focused website.",
    eyebrow: "Christian web design",
    h1: "A website that makes your mission <em>clear at a glance.</em>",
    lead: "FaithCraft designs websites for churches, ministries, Christian businesses, and faith-driven organizations that need more than a beautiful homepage. Your website should help people understand, trust, and respond.",
    heading: "Christian web design should connect mission with usability.",
    intro: "A visitor often decides whether to keep reading within seconds. Strong web design makes the next step obvious: visit, contact, register, request a resource, book a call, learn what you believe, or understand what makes your organization different. FaithCraft combines messaging, structure, visual design, conversion thinking, mobile usability, and technical implementation into one process.",
    sections: [
      ["What a FaithCraft website is built to do", "The goal is not simply to put information online. The site should create a path from first impression to meaningful action.", ["Clarify who you serve and what you offer", "Load quickly and work cleanly on mobile", "Use search-friendly titles, headings, and page structure", "Guide visitors toward one clear next step", "Connect naturally with lead generation, content, and campaigns"]],
      ["For churches and ministries", "Your website may be the first doorway someone walks through. People may check service times, beliefs, sermons, ministries, Bible studies, events, or whether your organization feels active and welcoming before they ever contact you. The website should answer those questions without friction.", []],
      ["For Christian businesses", "A strong website has to communicate professional competence and genuine values at the same time. Faith should be integrated naturally into the brand rather than treated as decoration. We help structure the message so customers understand the offer first—and understand the convictions behind the business as part of the trust story.", []]
    ]
  },
  "/christian-branding": {
    title: "Christian Branding & Brand Strategy | FaithCraft",
    description: "FaithCraft helps Christian businesses, ministries, and faith-driven organizations build clear brands, messaging, visual identity, positioning, and practical brand systems.",
    eyebrow: "Christian branding",
    h1: "Build a brand people can <em>recognize and trust.</em>",
    lead: "FaithCraft helps faith-driven organizations turn their mission, audience, values, and offer into a clear brand system that can guide websites, campaigns, content, and future growth.",
    heading: "Branding is the system behind the impression.",
    intro: "A brand is more than a logo. It is the collection of signals people use to decide what you are, who you are for, whether you understand them, and whether they should trust you. Strong Christian branding does not need to rely on clichés. It needs clarity, consistency, and a point of view rooted in the actual mission and audience.",
    sections: [
      ["What we can develop", "FaithCraft can use strategy and AI-assisted creative workflows to move from a loose idea to a useful working brand much faster than a traditional drawn-out process.", ["Positioning and audience definition", "Brand voice and core messaging", "Naming, taglines, and offer language", "Visual direction and identity concepts", "Website and campaign application", "Reusable guidelines for future content"]],
      ["Faith should feel integrated, not pasted on", "For some organizations, faith is explicit in every message. For others, it shapes how the business operates, serves, communicates, and makes decisions. The brand should reflect the right level of expression for the audience instead of forcing religious language where it does not belong.", []],
      ["A practical brand, not a presentation deck", "The work is most valuable when it makes future decisions easier. Your brand should help you know what to say on a landing page, how a social post should sound, what an ad should emphasize, how your website should feel, and what belongs—or does not belong—in the story.", []]
    ]
  },
  "/ai-marketing": {
    title: "AI Marketing for Christian Entrepreneurs | FaithCraft",
    description: "Learn practical AI marketing for Christian entrepreneurs and small businesses. FaithCraft helps you use AI for branding, websites, funnels, content, offers, lead generation, and workflows.",
    eyebrow: "AI marketing",
    h1: "Use AI to market faster—without making your brand <em>sound like AI.</em>",
    lead: "FaithCraft helps Christian entrepreneurs, small businesses, marketers, and agencies use AI as leverage for real marketing work while keeping strategy, judgment, values, and accountability human.",
    heading: "AI marketing is useful when it removes friction from work you already need to do.",
    intro: "The opportunity is not to collect more AI tools. It is to shorten the distance between an idea and a useful finished asset. With the right context and direction, AI can help you research, position, write, design, prototype, analyze, repurpose, and iterate. That can reduce outside costs, speed up launches, and give a smaller team more production capacity.",
    sections: [
      ["Where AI can create leverage", "The strongest use cases are usually connected to actual business bottlenecks rather than novelty.", ["Develop brand and messaging directions", "Plan and draft websites and landing pages", "Build funnels, offers, lead magnets, and follow-up", "Create content angles, scripts, ads, and email", "Prototype apps and interactive resources", "Analyze marketing information and generate next-step options"]],
      ["Keep the strategy human", "AI can produce options quickly, but it does not replace responsibility. Your audience knowledge, values, experience, taste, and judgment are still the difference between generic output and effective marketing. FaithCraft's approach is to use AI to multiply those things, not erase them.", []],
      ["Start with one workflow", "Instead of trying to transform everything at once, choose a repetitive or expensive marketing task. Build a repeatable AI-assisted workflow around it, measure whether it actually saves time or improves output, then expand from there.", []]
    ]
  },
  "/marketing-for-ministries": {
    title: "Digital Marketing for Ministries & Churches | FaithCraft",
    description: "Digital marketing for ministries and churches from FaithCraft: websites, outreach, Bible study lead generation, content, social media, paid campaigns, and digital strategy.",
    eyebrow: "Marketing for ministries",
    h1: "Help more people <em>find the ministry.</em>",
    lead: "FaithCraft helps churches and ministries build digital systems that increase discovery, trust, engagement, and opportunities for real-world ministry.",
    heading: "A strong ministry message still needs distribution.",
    intro: "People search for churches, Bible studies, answers, community, events, sermons, and spiritual resources online every day. A ministry can be doing meaningful work and still remain almost invisible outside its existing circle. Digital marketing helps build the bridges that let the message travel farther.",
    sections: [
      ["Ways FaithCraft can support ministry growth", "The exact mix depends on the ministry, community, resources, and desired next step.", ["Church and ministry website strategy", "Bible study lead-generation campaigns", "Landing pages and response forms", "Sermon and long-form content repurposing", "Short-form video and social campaign planning", "Community advertising, print, QR-code, email, and text follow-up"]],
      ["Visibility should lead somewhere", "Views and impressions are not the finish line. A campaign should make it easier for someone to visit, request a resource, join a Bible study, attend an event, watch a message, ask a question, or take another meaningful step.", []],
      ["Build a system your team can sustain", "The best marketing plan is not the one with the most channels. It is the one your ministry can consistently execute. FaithCraft can simplify the system, use AI where it saves production time, and focus your team's energy on the channels most connected to the mission.", []]
    ]
  },
  "/marketing-for-christian-businesses": {
    title: "Marketing for Christian Businesses | FaithCraft",
    description: "FaithCraft helps Christian businesses and entrepreneurs with digital marketing, branding, websites, lead generation, AI marketing, content, and conversion strategy.",
    eyebrow: "Marketing for Christian businesses",
    h1: "Grow the business without disconnecting from <em>what you believe.</em>",
    lead: "FaithCraft helps Christian business owners build brands, websites, marketing systems, and AI-assisted workflows that are commercially useful and consistent with the values behind the company.",
    heading: "Professional marketing and Christian conviction are not opposites.",
    intro: "A Christian business still has to communicate a strong offer, solve a real problem, earn trust, and compete for attention. Faith can shape how you serve and how you operate without replacing the fundamentals of good marketing. FaithCraft helps you build those fundamentals with a clear strategy and modern execution.",
    sections: [
      ["Build the parts that create momentum", "Depending on the stage of the business, the highest-leverage project may be a clearer offer, a stronger website, a better follow-up system, or a marketing workflow that no longer consumes your week.", ["Brand strategy and positioning", "Conversion-focused websites and landing pages", "Lead magnets and lead-generation funnels", "Content and campaign systems", "AI-assisted production and marketing operations", "Offer, messaging, and customer journey refinement"]],
      ["Express faith with the right level of clarity", "Some Christian businesses serve an explicitly Christian audience. Others serve a broad market while operating from Christian convictions. Your marketing should reflect the real business and customer relationship instead of forcing a tone that feels performative.", []],
      ["Use technology as stewardship", "AI and automation can help reduce repetitive work, test ideas faster, and lower the cost of creating. The goal is not automation for its own sake. It is freeing time and resources for the work that requires human judgment, relationships, and responsibility.", []]
    ]
  }
};

const serviceOrder = [
  ["/christian-digital-marketing", "Christian Digital Marketing", "Strategy, websites, campaigns, content and growth."],
  ["/christian-web-design", "Christian Web Design", "Clear, credible websites designed to create action."],
  ["/christian-branding", "Christian Branding", "Positioning, messaging and identity for faith-driven brands."],
  ["/ai-marketing", "AI Marketing", "Use AI to build and market faster with human judgment."],
  ["/marketing-for-ministries", "Marketing for Ministries", "Digital outreach for churches and ministry organizations."],
  ["/marketing-for-christian-businesses", "Marketing for Christian Businesses", "Modern growth systems aligned with Christian values."]
];

const canonicalHeader = `
<header class="site-header" data-header>
  <a class="brand" href="/" aria-label="FaithCraft home"><img class="brand-logo brand-logo-header" src="/faithcraft-logo.jpg" alt="FaithCraft" width="58" height="58" /></a>
  <nav class="desktop-nav" aria-label="Primary navigation"><a href="/">Home</a><a class="nav-feature" href="/aiadvantage">The AI Advantage</a><a href="/leadgen">Lead Generator</a><a href="/#contact">Contact</a></nav>
  <details class="mobile-nav"><summary aria-label="Open navigation menu">Menu</summary><nav aria-label="Mobile navigation"><a href="/">Home</a><a href="/aiadvantage">The AI Advantage</a><a href="/leadgen">Lead Generator</a><a href="/#contact">Contact</a></nav></details>
  <a class="button button-small button-outline" href="/#contact">Contact FaithCraft</a>
</header>`;

const canonicalFooter = `
<footer>
  <a class="brand brand-footer" href="/" aria-label="FaithCraft home"><img class="brand-logo brand-logo-footer" src="/faithcraft-logo.jpg" alt="FaithCraft" width="112" height="112" loading="lazy" /></a>
  <div class="footer-center"><p>Strategy. Creativity. Kingdom Impact.</p><nav class="footer-nav" aria-label="Footer navigation"><a href="/">Home</a><a href="/aiadvantage">The AI Advantage</a><a href="/leadgen">Lead Generator</a><a href="/#contact">Contact</a></nav><a class="reading-journey-link" href="https://tryjesusmedia.com/bibleandconflictoftheages/" target="_blank" rel="noopener noreferrer">Bible and Conflict of the Ages reading journey</a></div>
  <div class="footer-contact"><a href="mailto:kal@faithcraft.agency">kal@faithcraft.agency</a><a href="sms:8162596486?body=faithcraft">816-259-6486</a><span>© <span data-year></span> FaithCraft</span></div>
</footer>`;

const serviceLinksMarkup = () => `
<section class="seo-service-links" aria-labelledby="seo-services-title">
  <span class="seo-kicker">Explore FaithCraft services</span>
  <h2 id="seo-services-title">Build the parts of your digital presence that create momentum.</h2>
  <p>FaithCraft combines Christian digital marketing, web design, branding, lead generation, and practical AI strategy for churches, ministries, Christian businesses, and faith-driven entrepreneurs.</p>
  <div class="seo-service-grid">${serviceOrder.map(([href,name,copy]) => `<a href="${href}"><strong>${name}</strong><span>${copy}</span></a>`).join("")}</div>
</section>`;

const servicePage = (path, data) => {
  const related = serviceOrder.filter(([href]) => href !== path).slice(0, 6);
  const canonical = `https://faithcraft.agency${path}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${data.title}</title>
  <meta name="description" content="${data.description}" />
  <meta name="theme-color" content="#010C18" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" href="/faithcraft-logo.jpg" type="image/jpeg" />
  <link rel="apple-touch-icon" href="/faithcraft-logo.jpg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css" />
  <meta property="og:type" content="website" /><meta property="og:url" content="${canonical}" /><meta property="og:title" content="${data.title}" /><meta property="og:description" content="${data.description}" /><meta property="og:image" content="https://faithcraft.agency/faithcraft-logo.jpg" />
  <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${data.title}" /><meta name="twitter:description" content="${data.description}" />
  ${criticalMobileNav}${seoStyles}
</head>
<body class="seo-page">
  <a class="skip-link" href="#main">Skip to content</a>
  ${canonicalHeader}
  <main id="main">
    <section class="seo-hero"><div class="seo-wrap"><div class="seo-crumbs"><a href="/">Home</a> / ${data.eyebrow}</div><span class="seo-eyebrow">${data.eyebrow}</span><h1>${data.h1}</h1><p class="seo-lead">${data.lead}</p><div class="seo-cta-row"><a class="button button-primary" href="/#contact"><span class="button-icon" aria-hidden="true">↗</span>Contact FaithCraft</a><a class="button button-outline" href="/aiadvantage">Explore The AI Advantage</a></div></div></section>
    <section class="seo-content"><div class="seo-wrap"><div class="seo-content-grid"><article class="seo-copy"><h2>${data.heading}</h2><p>${data.intro}</p>${data.sections.map(([heading,copy,items]) => `<h3>${heading}</h3><p>${copy}</p>${items.length ? `<ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}`).join("")}<h3>Make the next step simple</h3><p>If you know exactly what you need, we can talk about the build. If you do not, bring the business, ministry, bottleneck, or idea and we can identify the highest-leverage place to start.</p></article><aside class="seo-side"><strong>FaithCraft</strong><p>Strategy, creativity, technology, and AI-assisted execution for churches, ministries, Christian businesses, and faith-driven entrepreneurs.</p><a class="button button-primary" href="/#contact">Start a conversation</a></aside></div><div class="seo-related"><h2>Related FaithCraft services</h2><div class="seo-related-grid">${related.map(([href,name,copy]) => `<a href="${href}"><b>${name}</b><span>${copy}</span></a>`).join("")}<a href="/leadgen"><b>Bible Study Lead Generation</b><span>Outreach systems for churches and ministries.</span></a><a href="/aiadvantage"><b>The AI Advantage</b><span>Practical AI strategy for faster, leaner marketing.</span></a></div></div></div></section>
  </main>
  ${canonicalFooter}
  <script src="/script.js"></script>
</body>
</html>`;
};

const seoByPath = {
  "/": {
    title: "Christian Digital Marketing Agency | FaithCraft",
    description: "FaithCraft is a Christian digital marketing agency helping churches, ministries, Christian businesses, creators, and faith-driven organizations grow through websites, lead generation, content, advertising, and AI.",
    canonical: "https://faithcraft.agency/",
    ogTitle: "Christian Digital Marketing for Kingdom Impact | FaithCraft",
    schema: { type: "ProfessionalService", name: "FaithCraft", serviceType: "Christian digital marketing" }
  },
  "/aiadvantage": {
    title: "AI Marketing for Christian Entrepreneurs | FaithCraft",
    description: "Learn practical AI marketing for Christian entrepreneurs, small businesses, marketers, and agencies. Build brands, websites, funnels, content, offers, lead generators, and apps faster with FaithCraft.",
    canonical: "https://faithcraft.agency/aiadvantage",
    ogTitle: "The AI Advantage for Christian Entrepreneurs | FaithCraft",
    schema: { type: "Service", name: "AI Marketing Strategy", serviceType: "AI marketing for Christian entrepreneurs and small businesses" }
  },
  "/leadgen": {
    title: "Bible Study Lead Generation for Churches | FaithCraft",
    description: "FaithCraft helps churches and ministries generate Bible study leads with landing pages, community ads, print outreach, QR codes, lead capture, and follow-up systems.",
    canonical: "https://faithcraft.agency/leadgen",
    ogTitle: "Bible Study Lead Generation for Churches | FaithCraft",
    schema: { type: "Service", name: "Bible Study Lead Generation", serviceType: "Bible study lead generation for churches and ministries" }
  },
  "/faithwords": {
    title: "FaithWords – Free Bible Word Game | FaithCraft",
    description: "Play FaithWords, a free Bible word game where you find words, solve Bible-themed puzzles, and uncover Scripture. A simple Christian word puzzle from FaithCraft.",
    canonical: "https://faithcraft.agency/faithwords/",
    ogTitle: "FaithWords – Free Bible Word Game | FaithCraft",
    schema: { type: "WebApplication", name: "FaithWords", applicationCategory: "GameApplication" }
  }
};

for (const [path, data] of Object.entries(services)) {
  seoByPath[path] = {
    title: data.title,
    description: data.description,
    canonical: `https://faithcraft.agency${path}`,
    ogTitle: data.title,
    schema: { type: "Service", name: data.eyebrow.replace(/\b\w/g, char => char.toUpperCase()), serviceType: data.eyebrow }
  };
}

const schemaMarkup = (path, seo) => {
  const item = seo.schema || {};
  const graph = [
    { "@type": "Organization", "@id": "https://faithcraft.agency/#organization", name: "FaithCraft", url: "https://faithcraft.agency/", logo: "https://faithcraft.agency/faithcraft-logo.jpg", email: "kal@faithcraft.agency", telephone: "+1-816-259-6486" },
    { "@type": "WebSite", "@id": "https://faithcraft.agency/#website", url: "https://faithcraft.agency/", name: "FaithCraft", publisher: { "@id": "https://faithcraft.agency/#organization" } },
    { "@type": item.type || "WebPage", "@id": `${seo.canonical}#primary`, url: seo.canonical, name: item.name || seo.title, description: seo.description, ...(item.serviceType ? { serviceType: item.serviceType, provider: { "@id": "https://faithcraft.agency/#organization" } } : {}), ...(item.applicationCategory ? { applicationCategory: item.applicationCategory, operatingSystem: "Web" } : {}) }
  ];
  if (path !== "/") graph.push({ "@type": "BreadcrumbList", itemListElement: [{ "@type":"ListItem", position:1, name:"Home", item:"https://faithcraft.agency/" }, { "@type":"ListItem", position:2, name: item.name || seo.title, item:seo.canonical }] });
  return `<script type="application/ld+json">${JSON.stringify({ "@context":"https://schema.org", "@graph":graph })}</script>`;
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = normalizePath(url.pathname);
    if (isSlingPath(url.pathname)) return app.fetch(request, env, ctx);

    const service = services[path];
    const response = service
      ? new Response(request.method === "HEAD" ? null : servicePage(path, service), { status: 200, headers: { "Content-Type":"text/html; charset=UTF-8", "Cache-Control":"no-cache" } })
      : await app.fetch(request, env, ctx);

    const contentType = response.headers.get("Content-Type") || "";
    if (!contentType.includes("text/html")) return response;

    const year = new Date().getFullYear();
    const seo = seoByPath[path];
    const isGuide = path === "/aiadvantage/guide";

    let rewriter = new HTMLRewriter()
      .on("head", {
        element(element) {
          element.append(footerFaithWordsStyles + seoStyles, { html: true });
          if (seo) element.append(schemaMarkup(path, seo), { html: true });
          if (isGuide) element.append('<meta name="robots" content="noindex,follow" />', { html: true });
        },
      })
      .on(".footer-contact", {
        element(element) {
          element.append(`<span class="footer-meta-line">© ${year} FaithCraft <a class="footer-faithwords-link" href="/sling">FaithWords</a></span>`, { html: true });
        },
      });

    if (seo) {
      rewriter = rewriter
        .on("title", { element(element) { element.setInnerContent(seo.title); } })
        .on('meta[name="description"]', { element(element) { element.setAttribute("content", seo.description); } })
        .on('link[rel="canonical"]', { element(element) { element.setAttribute("href", seo.canonical); } })
        .on('meta[property="og:title"]', { element(element) { element.setAttribute("content", seo.ogTitle || seo.title); } })
        .on('meta[property="og:description"]', { element(element) { element.setAttribute("content", seo.description); } })
        .on('meta[property="og:url"]', { element(element) { element.setAttribute("content", seo.canonical); } })
        .on('meta[name="twitter:title"]', { element(element) { element.setAttribute("content", seo.ogTitle || seo.title); } })
        .on('meta[name="twitter:description"]', { element(element) { element.setAttribute("content", seo.description); } });
    }

    if (path === "/") {
      rewriter = rewriter
        .on(".hero-support", { element(element) { element.setInnerContent("FaithCraft is a Christian digital marketing agency helping churches, ministries, Christian businesses, creators, and faith-driven organizations build websites, lead-generation systems, content, campaigns, and AI-powered marketing that make them easier to discover, trust, and engage with online."); } })
        .on("main", { element(element) { element.append(serviceLinksMarkup(), { html: true }); } });
    }

    return rewriter.transform(response);
  },
};
