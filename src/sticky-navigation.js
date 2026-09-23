const header = `<header class="fc-topbar" aria-label="Site navigation">
<a class="fc-top-brand" href="/" aria-label="FaithCraft home"><img src="/faithcraft-logo.jpg" alt="FaithCraft" width="48" height="48"></a>
<details class="fc-top-menu"><summary>Menu</summary><nav aria-label="Main navigation"><a href="/">Home</a><a href="/aiadvantage">The AI Advantage</a><a href="/leadgen">Lead Generator</a><a href="/privacy">Privacy Policy</a><a href="/sling">FaithWords</a></nav></details>
<a class="button fc-top-book" href="https://faithcraft.agency/aiadvantage#calendar">Book a Call</a>
</header>`;
const styles = `<style id="faithcraft-sticky-navigation">
html{scroll-padding-top:110px!important}html,body{overflow-x:clip!important;overflow-y:visible!important}
.fc-topbar{position:sticky;top:0;z-index:30000;display:flex;align-items:center;gap:16px;width:100%;padding:12px max(16px,calc((100% - 1180px)/2));background:#010C18;border-bottom:2px solid var(--page-color,#C79341);box-shadow:0 5px 18px #0003;box-sizing:border-box}
.fc-top-brand{margin-right:auto;flex-shrink:0}.fc-top-brand img{display:block;width:48px;height:48px}
.fc-top-menu{position:relative}.fc-top-menu summary{list-style:none;cursor:pointer;color:#EBE9DE;border:1px solid #C79341;border-radius:6px;padding:10px 16px;font-weight:700}.fc-top-menu summary::-webkit-details-marker{display:none}
.fc-top-menu nav{position:absolute;right:0;top:calc(100% + 12px);width:260px;max-width:calc(100vw - 32px);display:grid;gap:10px;background:#010C18;border:1px solid #C79341;padding:16px;border-radius:8px;box-shadow:0 12px 28px #0006;max-height:calc(100dvh - 110px);overflow:auto}
.fc-top-menu nav a{display:block;padding:10px 12px;color:var(--destination-ink,#EBE9DE);background:var(--destination-color,#186059);border:1px solid #60675E;border-radius:5px;text-decoration:none}
.fc-topbar .fc-top-book{display:flex!important;justify-content:center;align-items:center;min-height:48px;margin:0;padding:10px 18px;font-weight:800;white-space:nowrap;letter-spacing:0;text-transform:none}
body.has-booking-sticky{padding-bottom:0!important}.site-booking-sticky{display:none!important}
@media(max-width:480px){.fc-topbar{gap:10px;padding:10px 12px}.fc-top-brand img{width:38px;height:38px}.fc-top-menu summary{padding:8px 12px}.fc-topbar .fc-top-book{padding:8px 12px}.fc-top-menu nav{position:fixed;left:12px;right:12px;top:80px;width:auto}}
</style>`;
export function withStickyNavigation(response) {
  return new HTMLRewriter()
    .on('.site-header,.site-booking-sticky', { element(e) { e.remove(); } })
    .on('head', { element(e) { e.append(styles, { html: true }); } })
    .on('body', { element(e) { e.prepend(header, { html: true }); } })
    .transform(response);
}
