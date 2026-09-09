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

const guidePage = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>The AI Advantage Guide | FaithCraft</title>
  <meta name="description" content="A simple, interactive reading experience for The AI Advantage guide from FaithCraft." />
  <meta name="theme-color" content="#010C18" />
  <link rel="canonical" href="https://faithcraft.agency/aiadvantage/guide" />
  <link rel="icon" href="/faithcraft-logo.jpg" type="image/jpeg" />
  <link rel="apple-touch-icon" href="/faithcraft-logo.jpg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css" />
  <style>
    :root {
      --guide-bg: #f5f5f7;
      --guide-card: rgba(255,255,255,.84);
      --guide-text: #1d1d1f;
      --guide-muted: #6e6e73;
      --guide-blue: #0a63d8;
      --guide-line: rgba(0,0,0,.08);
      --guide-gold: #c79341;
      --guide-navy: #010c18;
      --guide-shadow: 0 20px 60px rgba(0,0,0,.09);
    }

    html { scroll-behavior: smooth; }
    body.guide-page { margin: 0; overflow-x: hidden; background: var(--guide-bg); color: var(--guide-text); font-family: Montserrat, Arial, sans-serif; }
    .guide-page .site-header { color: #ebe9de; }
    .guide-page main { min-height: 100vh; padding-top: 92px; }

    .guide-hero {
      position: relative;
      overflow: hidden;
      padding: 76px 24px 56px;
      background: radial-gradient(circle at 75% 15%, rgba(229,181,91,.15), transparent 30%), linear-gradient(180deg, #061526, #010c18 78%);
      color: #fff;
    }
    .guide-hero::after {
      content: "";
      position: absolute;
      width: 500px;
      height: 500px;
      left: -230px;
      bottom: -340px;
      border-radius: 50%;
      background: rgba(24,96,89,.22);
      filter: blur(10px);
    }
    .guide-hero-inner { position: relative; z-index: 1; width: min(960px, 100%); margin: 0 auto; }
    .guide-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid rgba(229,181,91,.32); border-radius: 999px; color: #e5b55b; background: rgba(229,181,91,.07); font-size: .72rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    .guide-hero h1 { max-width: 820px; margin: 22px 0 18px; font-family: Cinzel, Georgia, serif; font-size: clamp(2.8rem, 7vw, 5.4rem); line-height: .98; letter-spacing: -.045em; }
    .guide-hero h1 em { color: #e5b55b; font-style: normal; }
    .guide-hero p { max-width: 720px; margin: 0; color: rgba(255,255,255,.72); font-size: clamp(1rem, 2vw, 1.17rem); line-height: 1.75; }
    .guide-hero-note { margin-top: 25px !important; padding-left: 17px; border-left: 2px solid #e5b55b; color: #fff !important; font-weight: 600; }

    .guide-shell { width: min(920px, calc(100% - 30px)); margin: -24px auto 0; position: relative; z-index: 2; padding-bottom: 100px; }
    .guide-dashboard { position: sticky; top: 86px; z-index: 20; display: grid; grid-template-columns: 1fr auto; gap: 18px; align-items: center; padding: 16px 18px; border: 1px solid rgba(255,255,255,.7); border-radius: 22px; background: rgba(255,255,255,.78); box-shadow: 0 10px 35px rgba(0,0,0,.08); backdrop-filter: blur(20px) saturate(160%); -webkit-backdrop-filter: blur(20px) saturate(160%); }
    .progress-copy { min-width: 0; }
    .progress-copy strong { display: block; margin-bottom: 8px; font-size: .82rem; }
    .progress-track { height: 7px; overflow: hidden; border-radius: 999px; background: #e9e9ed; }
    .progress-track span { display: block; width: 0; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #0a63d8, #53a2ff); transition: width .35s ease; }
    .guide-resume { border: 0; border-radius: 14px; padding: 11px 15px; color: #fff; background: #111; font: 700 .76rem/1 Montserrat, Arial, sans-serif; cursor: pointer; white-space: nowrap; }

    .guide-intro { padding: 56px 4px 20px; text-align: center; }
    .guide-intro span { color: var(--guide-blue); font-size: .72rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
    .guide-intro h2 { max-width: 740px; margin: 12px auto 15px; color: var(--guide-text); font-family: Montserrat, Arial, sans-serif; font-size: clamp(1.8rem, 5vw, 3.2rem); line-height: 1.08; letter-spacing: -.045em; }
    .guide-intro p { max-width: 650px; margin: 0 auto; color: var(--guide-muted); line-height: 1.75; }

    .lesson-stack { display: grid; gap: 14px; margin-top: 22px; }
    .lesson-window { overflow: hidden; border: 1px solid rgba(0,0,0,.07); border-radius: 26px; background: var(--guide-card); box-shadow: 0 8px 30px rgba(0,0,0,.045); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
    .lesson-window[open] { box-shadow: var(--guide-shadow); }
    .lesson-window summary { position: relative; display: grid; grid-template-columns: 46px 1fr auto; gap: 14px; align-items: center; min-height: 92px; padding: 17px 20px; cursor: pointer; list-style: none; user-select: none; }
    .lesson-window summary::-webkit-details-marker { display: none; }
    .lesson-number { width: 46px; height: 46px; display: grid; place-items: center; border-radius: 14px; color: var(--guide-blue); background: #eaf3ff; font-size: .78rem; font-weight: 800; }
    .lesson-title strong { display: block; margin-bottom: 4px; font-size: 1rem; letter-spacing: -.015em; }
    .lesson-title span { display: block; color: var(--guide-muted); font-size: .76rem; line-height: 1.45; }
    .lesson-chevron { color: #8e8e93; font-size: 1.25rem; transform: rotate(90deg); transition: transform .22s ease; }
    .lesson-window[open] .lesson-chevron { transform: rotate(-90deg); }
    .lesson-complete .lesson-number { color: #1b7f3a; background: #e8f7ec; }

    .lesson-body { padding: 0 22px 24px 80px; border-top: 1px solid var(--guide-line); }
    .lesson-body h3 { margin: 24px 0 10px; color: var(--guide-text); font-family: Montserrat, Arial, sans-serif; font-size: 1.22rem; line-height: 1.25; letter-spacing: -.025em; }
    .lesson-body p { margin: 0 0 15px; color: #3a3a3c; font-size: .92rem; line-height: 1.78; }
    .lesson-body ul { margin: 12px 0 20px; padding: 0; display: grid; gap: 9px; list-style: none; }
    .lesson-body li { position: relative; padding: 12px 14px 12px 42px; border-radius: 15px; background: #f7f7f9; color: #3a3a3c; font-size: .86rem; line-height: 1.55; }
    .lesson-body li::before { content: "✓"; position: absolute; left: 15px; top: 11px; width: 20px; height: 20px; display: grid; place-items: center; border-radius: 50%; color: #fff; background: var(--guide-blue); font-size: .65rem; font-weight: 900; }
    .guide-quote { margin: 20px 0; padding: 18px 20px; border-radius: 18px; color: #fff; background: linear-gradient(135deg, #0d2239, #061526); font-size: 1rem; font-weight: 650; line-height: 1.55; }
    .guide-quote em { color: #e5b55b; font-style: normal; }
    .mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 14px 0 20px; }
    .mini-card { padding: 17px; border: 1px solid rgba(0,0,0,.06); border-radius: 18px; background: #fff; }
    .mini-card b { display: block; margin-bottom: 6px; color: var(--guide-text); font-size: .83rem; }
    .mini-card span { color: var(--guide-muted); font-size: .75rem; line-height: 1.55; }
    .old-new { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 18px 0; }
    .old-new div { padding: 18px; border-radius: 18px; }
    .old-new .old { background: #f1f1f3; }
    .old-new .new { color: #fff; background: #0a63d8; }
    .old-new small { display: block; margin-bottom: 8px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    .old-new strong { font-size: .86rem; line-height: 1.55; }
    .lesson-action { margin-top: 24px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .mark-complete { border: 0; border-radius: 14px; padding: 12px 15px; color: #fff; background: var(--guide-blue); font: 700 .75rem/1 Montserrat, Arial, sans-serif; cursor: pointer; }
    .lesson-complete .mark-complete { color: #1b7f3a; background: #e8f7ec; }
    .lesson-action small { color: #8e8e93; font-size: .7rem; }

    .doc-option { margin: 26px 0 0; padding: 20px; display: flex; align-items: center; justify-content: space-between; gap: 18px; border: 1px solid rgba(0,0,0,.07); border-radius: 22px; background: rgba(255,255,255,.68); }
    .doc-option strong { display: block; margin-bottom: 4px; font-size: .88rem; }
    .doc-option span { color: var(--guide-muted); font-size: .75rem; line-height: 1.45; }
    .doc-option a { flex: 0 0 auto; color: var(--guide-blue); font-size: .78rem; font-weight: 800; text-decoration: none; }

    .call-reminder { margin-top: 56px; overflow: hidden; border-radius: 30px; background: linear-gradient(150deg, #07182b, #010c18); color: #fff; box-shadow: 0 30px 80px rgba(1,12,24,.25); }
    .call-reminder-inner { padding: clamp(28px, 6vw, 52px); }
    .call-reminder .pill { display: inline-flex; padding: 7px 11px; border-radius: 999px; color: #b9d9ff; background: rgba(83,162,255,.12); font-size: .68rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    .call-reminder h2 { max-width: 680px; margin: 18px 0 16px; font-family: Cinzel, Georgia, serif; font-size: clamp(2rem, 6vw, 3.5rem); line-height: 1.05; }
    .call-reminder h2 em { color: #e5b55b; font-style: normal; }
    .call-reminder p { max-width: 700px; margin: 0 0 16px; color: rgba(255,255,255,.73); line-height: 1.75; }
    .call-prep { margin-top: 24px; display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
    .call-prep div { min-height: 110px; padding: 17px; border: 1px solid rgba(255,255,255,.1); border-radius: 18px; background: rgba(255,255,255,.05); }
    .call-prep b { display: block; margin-bottom: 8px; color: #fff; font-size: .8rem; }
    .call-prep span { color: rgba(255,255,255,.62); font-size: .72rem; line-height: 1.5; }

    .guide-page footer { background: var(--guide-navy); }

    @media (max-width: 760px) {
      .guide-page main { padding-top: 72px; }
      .guide-hero { padding: 58px 18px 48px; }
      .guide-shell { width: calc(100% - 20px); }
      .guide-dashboard { top: 76px; grid-template-columns: 1fr auto; border-radius: 18px; padding: 13px 14px; }
      .guide-resume { padding: 10px 12px; font-size: .68rem; }
      .lesson-window { border-radius: 22px; }
      .lesson-window summary { grid-template-columns: 40px 1fr auto; gap: 11px; min-height: 88px; padding: 15px 15px; }
      .lesson-number { width: 40px; height: 40px; border-radius: 12px; }
      .lesson-title strong { font-size: .92rem; }
      .lesson-title span { font-size: .7rem; }
      .lesson-body { padding: 0 16px 20px; }
      .mini-grid, .old-new, .call-prep { grid-template-columns: 1fr; }
      .lesson-action, .doc-option { align-items: flex-start; flex-direction: column; }
      .doc-option a { display: inline-flex; padding: 10px 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      * { scroll-behavior: auto !important; transition: none !important; }
    }
  </style>
</head>
<body class="guide-page">
  <header class="site-header" data-header></header>

  <main id="main">
    <section class="guide-hero">
      <div class="guide-hero-inner">
        <span class="guide-badge">Your AI Advantage Guide</span>
        <h1>Build more. Create faster. Spend less. <em>Steward better.</em></h1>
        <p>This is the easy-to-follow version of your AI Advantage guide. Open one lesson at a time, move at your own pace, and mark sections complete as you go.</p>
        <p class="guide-hero-note">You already booked your FaithCraft AI Advice Call. This guide is here to help you arrive with sharper questions and a clearer idea of where AI can create leverage in your business.</p>
      </div>
    </section>

    <div class="guide-shell">
      <div class="guide-dashboard" aria-label="Guide progress">
        <div class="progress-copy">
          <strong id="progressLabel">0 of 7 lessons complete</strong>
          <div class="progress-track" aria-hidden="true"><span id="progressBar"></span></div>
        </div>
        <button class="guide-resume" id="resumeButton" type="button">Continue</button>
      </div>

      <section class="guide-intro">
        <span>How to use this guide</span>
        <h2>Think less about “learning AI” and more about what you want to accomplish.</h2>
        <p>You do not need dozens of tools or a technical background. You need a clear outcome, good context, sound judgment, and a willingness to iterate.</p>
      </section>

      <div class="lesson-stack" id="lessonStack">
        <details class="lesson-window" data-lesson="1" open>
          <summary>
            <span class="lesson-number">01</span>
            <span class="lesson-title"><strong>The new way of building</strong><span>Why AI changes the economics of creating</span></span>
            <span class="lesson-chevron">›</span>
          </summary>
          <div class="lesson-body">
            <h3>What if the next person you needed to hire… wasn’t a person?</h3>
            <p>Not because people no longer matter. Not because AI should replace wisdom, creativity, relationships, or human judgment. But because you may be paying people to spend hours doing work technology can now help you accomplish in minutes.</p>
            <div class="mini-grid">
              <div class="mini-card"><b>Build</b><span>Websites, funnels, lead magnets, presentations and prototypes.</span></div>
              <div class="mini-card"><b>Market</b><span>Content ideas, ad concepts, graphics, hooks, scripts and offers.</span></div>
              <div class="mini-card"><b>Multiply</b><span>Turn one strong idea into many useful assets and variations.</span></div>
              <div class="mini-card"><b>Experiment</b><span>Prototype an app, tool or simple interactive experience before investing heavily.</span></div>
            </div>
            <p>Things that once required coordinating copywriters, designers, developers, marketers and freelancers can increasingly be drafted, designed, coded, tested and improved with AI.</p>
            <div class="guide-quote">For a Christian entrepreneur, the question is not merely “Can AI do this?” It is: <em>Can this help me steward the time, money, ideas and opportunities God has entrusted to me?</em></div>
            <div class="lesson-action"><small>Key idea: technology should multiply your capacity, not replace your judgment.</small><button class="mark-complete" type="button">Mark complete</button></div>
          </div>
        </details>

        <details class="lesson-window" data-lesson="2">
          <summary>
            <span class="lesson-number">02</span>
            <span class="lesson-title"><strong>You don’t need to become an “AI person”</strong><span>Start with outcomes, not tools</span></span>
            <span class="lesson-chevron">›</span>
          </summary>
          <div class="lesson-body">
            <h3>You do not need to understand how artificial intelligence works.</h3>
            <p>You do not need to become a programmer. You do not need 42 AI subscriptions. And you definitely do not need to spend your evenings chasing every new tool release.</p>
            <div class="guide-quote">Ask one practical question: <em>What do I want to accomplish—and how can AI help me accomplish it?</em></div>
            <p>That is where a tool like ChatGPT becomes useful. Treat it less like a fancy search box and more like a creative and operational partner. Give it the goal, the audience, the constraints, the examples and the context. Then direct and refine the work.</p>
            <ul>
              <li>Brainstorm possibilities before you commit resources.</li>
              <li>Draft and rewrite messaging with your voice and audience in mind.</li>
              <li>Analyze files, ideas and business information to find patterns and next steps.</li>
              <li>Help create code, images, documents and lightweight digital experiences when the available tools support it.</li>
            </ul>
            <p>The skill is not “knowing AI.” The skill is learning to communicate what good looks like.</p>
            <div class="lesson-action"><small>Try this: describe one outcome you want this month in one clear sentence.</small><button class="mark-complete" type="button">Mark complete</button></div>
          </div>
        </details>

        <details class="lesson-window" data-lesson="3">
          <summary>
            <span class="lesson-number">03</span>
            <span class="lesson-title"><strong>Imagine what this means for your business</strong><span>Websites, funnels, content, ads, apps and more</span></span>
            <span class="lesson-chevron">›</span>
          </summary>
          <div class="lesson-body">
            <h3>Need a new website?</h3>
            <p>Instead of starting with a blank page and weeks of meetings, AI can help you clarify the audience, develop positioning, write the pages, structure the site, create imagery and assist with implementation.</p>
            <h3>Need a sales funnel?</h3>
            <p>Work through the offer, lead magnet, landing-page message, objections, calls to action, follow-up sequence and campaign ideas as one connected system.</p>
            <h3>Need something valuable to give prospects?</h3>
            <p>Create a guide, checklist, assessment, workbook, report, template, quiz or mini-resource that turns what you know into something useful.</p>
            <h3>Need advertising or content?</h3>
            <p>Generate more angles, hooks, headlines, scripts, offers and creative concepts. Start with one idea and expand it into short-form video, long-form video, email, social posts, ads and supporting graphics.</p>
            <h3>Need an app or game?</h3>
            <p>Use AI to work through the concept, user experience, features, screens, code, testing and iterations. Some projects can become lightweight working experiences; larger software products may still need substantial development.</p>
            <div class="guide-quote">“We can’t afford to build that” is becoming a much more interesting conversation.</div>
            <div class="lesson-action"><small>Pick the asset your business needs most right now.</small><button class="mark-complete" type="button">Mark complete</button></div>
          </div>
        </details>

        <details class="lesson-window" data-lesson="4">
          <summary>
            <span class="lesson-number">04</span>
            <span class="lesson-title"><strong>The old way vs. the AI-leveraged way</strong><span>More capacity without automatically adding overhead</span></span>
            <span class="lesson-chevron">›</span>
          </summary>
          <div class="lesson-body">
            <div class="old-new">
              <div class="old"><small>The old model</small><strong>More work → more people → more payroll → more overhead → more management.</strong></div>
              <div class="new"><small>The leverage question</small><strong>Can technology increase the capacity of the people and resources I already have?</strong></div>
            </div>
            <p>A task that used to consume ten hours may sometimes be reduced dramatically. Something that once required thousands of dollars in outside help may sometimes be prototyped for a fraction of that amount.</p>
            <p>This does not mean every project suddenly costs one percent as much or takes ten percent of the time. It means the economics of creating are changing.</p>
            <div class="guide-quote">The competitive advantage may not belong to the company with the biggest team. It may belong to the company that knows how to <em>multiply the capability of a smaller team.</em></div>
            <ul>
              <li>Prototype before you purchase a full build.</li>
              <li>Automate repetitive production before adding another recurring cost.</li>
              <li>Use specialists where their expertise creates the most value.</li>
              <li>Keep strategy and accountability human.</li>
            </ul>
            <div class="lesson-action"><small>Ask: what recurring task is absorbing the most unnecessary time?</small><button class="mark-complete" type="button">Mark complete</button></div>
          </div>
        </details>

        <details class="lesson-window" data-lesson="5">
          <summary>
            <span class="lesson-number">05</span>
            <span class="lesson-title"><strong>Keep the work human</strong><span>How to avoid generic AI and protect what makes you different</span></span>
            <span class="lesson-chevron">›</span>
          </summary>
          <div class="lesson-body">
            <h3>“Won’t AI make my business generic?”</h3>
            <p>Only if you use it generically. Bad AI sounds like AI. Good AI sounds like you—only faster.</p>
            <ul>
              <li>Your values.</li>
              <li>Your experience.</li>
              <li>Your customer knowledge.</li>
              <li>Your brand voice.</li>
              <li>Your judgment and strategy.</li>
            </ul>
            <p>AI should not replace those things. It should help you execute them.</p>
            <h3>“I tried ChatGPT and wasn’t impressed.”</h3>
            <p>One vague sentence followed by a mediocre answer is not an AI strategy. Better context, structure, examples, workflows and iteration produce better results.</p>
            <h3>“I don’t want AI replacing my employees.”</h3>
            <p>A better first question is: what repetitive work can AI remove so talented people can spend more time doing work that actually needs talented people?</p>
            <h3>“I don’t have time to learn all this.”</h3>
            <p>That is exactly why the right approach matters. The goal is not adding AI to your workload. The goal is using AI to remove workload.</p>
            <div class="lesson-action"><small>Your differentiator is still human: taste, judgment, experience and responsibility.</small><button class="mark-complete" type="button">Mark complete</button></div>
          </div>
        </details>

        <details class="lesson-window" data-lesson="6">
          <summary>
            <span class="lesson-number">06</span>
            <span class="lesson-title"><strong>A Christian business and better tools</strong><span>Use AI with wisdom, honesty and stewardship</span></span>
            <span class="lesson-chevron">›</span>
          </summary>
          <div class="lesson-body">
            <h3>A tool is not the wisdom. The person using it is.</h3>
            <p>A hammer can build a house or destroy something valuable. Christians do not need to blindly embrace every new technology, but we do not need to automatically fear useful technology either.</p>
            <p>Ask better questions:</p>
            <ul>
              <li>Does this help me serve people better?</li>
              <li>Does this help me steward money more wisely?</li>
              <li>Does this free my team from unnecessary busywork?</li>
              <li>Does this let us create something useful that was previously not economically possible?</li>
              <li>Can I use it honestly and excellently?</li>
              <li>Can I use it without compromising the values my business represents?</li>
            </ul>
            <div class="guide-quote">If the answer is yes, AI may become one of the most useful business tools available to this generation of entrepreneurs.</div>
            <div class="lesson-action"><small>Efficiency is not the highest goal. Faithful, useful work is.</small><button class="mark-complete" type="button">Mark complete</button></div>
          </div>
        </details>

        <details class="lesson-window" data-lesson="7">
          <summary>
            <span class="lesson-number">07</span>
            <span class="lesson-title"><strong>Find your AI advantage</strong><span>Know what to build, automate, keep human or stop outsourcing</span></span>
            <span class="lesson-chevron">›</span>
          </summary>
          <div class="lesson-body">
            <h3>Knowing AI can do these things is not the same as knowing how to use it well.</h3>
            <p>The internet can give you another 500 prompts. That is not what most businesses need. You need to identify where AI creates the greatest leverage in your specific business.</p>
            <ul>
              <li>What should you build first?</li>
              <li>What should you automate?</li>
              <li>What should you never automate?</li>
              <li>Which tools actually matter for your situation?</li>
              <li>What could you stop outsourcing?</li>
              <li>Where are you unnecessarily spending money?</li>
              <li>What could your existing team accomplish faster?</li>
            </ul>
            <p>Bring me the business, the bottleneck, or the thing you have been thinking about building: a website, funnel, lead generator, ad campaign, content system, graphics, client workflow, app idea—or simply the feeling that AI could help but you do not know where to start.</p>
            <div class="guide-quote">The goal is not a business run by AI. It is a <em>wiser, leaner, more capable business—with AI working for you.</em></div>
            <div class="lesson-action"><small>Write down the one bottleneck you most want to discuss on our call.</small><button class="mark-complete" type="button">Mark complete</button></div>
          </div>
        </details>
      </div>

      <div class="doc-option">
        <div><strong>Prefer the original document?</strong><span>You can read the complete Google Docs version instead at any time.</span></div>
        <a href="https://docs.google.com/document/d/1BitA_Y4EFdit0OY8ecYvs1RaiDIyujwmAd0qevz4-rM/edit?usp=drivesdk" target="_blank" rel="noopener noreferrer">View in Google Docs ↗</a>
      </div>

      <section class="call-reminder" id="call-reminder">
        <div class="call-reminder-inner">
          <span class="pill">You’re already booked</span>
          <h2>I’m looking forward to <em>our call.</em></h2>
          <p>You do not need to schedule anything else. Your AI Advantage guide was included because you already booked your FaithCraft AI Advice Call.</p>
          <p>When we talk, we will look at where AI could create the greatest practical advantage for you—saving time, reducing unnecessary costs, helping you create faster and increasing what your business is capable of producing.</p>
          <div class="call-prep">
            <div><b>Bring one bottleneck</b><span>The repetitive, slow or expensive thing you most want to improve.</span></div>
            <div><b>Bring one idea</b><span>The website, funnel, resource, app, campaign or workflow you want to build.</span></div>
            <div><b>Bring your questions</b><span>You do not need to prepare a presentation. Clarity is enough.</span></div>
          </div>
        </div>
      </section>
    </div>
  </main>

  <footer>
    <a class="brand brand-footer" href="/" aria-label="FaithCraft Agency home">
      <img class="brand-logo brand-logo-footer" src="/faithcraft-logo.jpg" alt="FaithCraft Agency" width="112" height="112" loading="lazy" />
    </a>
    <div class="footer-center">
      <p>Strategy. Creativity. Kingdom Impact.</p>
      <nav class="footer-nav" aria-label="Footer navigation"><a href="/">Home</a><a href="/aiadvantage">The AI Advantage</a><a href="/leadgen">Lead Generator</a><a href="/#contact">Contact</a></nav>
      <a class="reading-journey-link" href="https://tryjesusmedia.com/bibleandconflictoftheages/" target="_blank" rel="noopener noreferrer">Bible and Conflict of the Ages reading journey</a>
    </div>
    <div class="footer-contact"><a href="mailto:kal@faithcraft.agency">kal@faithcraft.agency</a><a href="sms:8162596486?body=faithcraft">816-259-6486</a><span>© <span id="guideYear"></span> FaithCraft Agency</span></div>
  </footer>

  <script>
    (function () {
      var lessons = Array.prototype.slice.call(document.querySelectorAll('.lesson-window'));
      var key = 'faithcraftAiAdvantageGuideProgressV1';
      var completed = {};
      try { completed = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch (error) { completed = {}; }

      var progressLabel = document.getElementById('progressLabel');
      var progressBar = document.getElementById('progressBar');
      var resumeButton = document.getElementById('resumeButton');
      var year = document.getElementById('guideYear');
      if (year) year.textContent = new Date().getFullYear();

      function update() {
        var count = 0;
        lessons.forEach(function (lesson) {
          var id = lesson.getAttribute('data-lesson');
          var button = lesson.querySelector('.mark-complete');
          var done = !!completed[id];
          lesson.classList.toggle('lesson-complete', done);
          if (button) button.textContent = done ? 'Completed ✓' : 'Mark complete';
          if (done) count += 1;
        });
        if (progressLabel) progressLabel.textContent = count + ' of ' + lessons.length + ' lessons complete';
        if (progressBar) progressBar.style.width = ((count / lessons.length) * 100) + '%';
        if (resumeButton) resumeButton.textContent = count === lessons.length ? 'Call reminder' : 'Continue';
        try { localStorage.setItem(key, JSON.stringify(completed)); } catch (error) {}
      }

      lessons.forEach(function (lesson) {
        var button = lesson.querySelector('.mark-complete');
        if (!button) return;
        button.addEventListener('click', function () {
          var id = lesson.getAttribute('data-lesson');
          completed[id] = !completed[id];
          update();
          if (completed[id]) {
            var next = lessons.find(function (item) { return !completed[item.getAttribute('data-lesson')]; });
            if (next) {
              next.open = true;
              setTimeout(function () { next.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 120);
            }
          }
        });
      });

      if (resumeButton) {
        resumeButton.addEventListener('click', function () {
          var next = lessons.find(function (item) { return !completed[item.getAttribute('data-lesson')]; });
          if (next) {
            next.open = true;
            next.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            document.getElementById('call-reminder').scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      }

      update();
    })();
  </script>
</body>
</html>`;

const isSlingPath = (pathname) =>
  pathname === "/sling" || pathname === "/sling/" || pathname === "/sling/index.html";

const isGuidePath = (pathname) =>
  pathname === "/aiadvantage/guide" || pathname === "/aiadvantage/guide/" || pathname === "/aiadvantage/guide/index.html";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const response = isGuidePath(url.pathname)
      ? new Response(guidePage, {
          headers: {
            "Content-Type": "text/html; charset=UTF-8",
            "Cache-Control": "no-cache",
          },
        })
      : await siteWorker.fetch(request, env, ctx);
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
