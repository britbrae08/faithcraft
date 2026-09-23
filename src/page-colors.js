// The same destination palette drives both page themes and navigation.
export const pageColors = {
  '/': ['#010C18', '#E5B55B'],
  '/aiadvantage': ['#C79341', '#010C18'],
  '/leadgen': ['#186059', '#FDFAF2'],
  '/privacy': ['#EBE9DE', '#010C18'],
  '/faithwords': ['#298075', '#FDFAF2'],
  '/sling': ['#298075', '#FDFAF2'],
  '/aiadvantage/guide': ['color-mix(in srgb,#E5B55B 60%,#FDFAF2)', '#010C18'],
  '/christian-digital-marketing': ['#03101D', '#E5B55B'],
  '/christian-web-design': ['#FDFAF2', '#010C18'],
  '/christian-branding': ['#A3712D', '#FDFAF2'],
  '/ai-marketing': ['#E5B55B', '#010C18'],
  '/marketing-for-ministries': ['color-mix(in srgb,#186059 65%,#03101D)', '#FDFAF2'],
  '/marketing-for-christian-businesses': ['#60675E', '#FDFAF2'],
};

export function pageColorStyles(path) {
  const [color, ink] = pageColors[path] || pageColors['/'];
  return `<style id="faithcraft-page-colors">
  body{--page-color:${color};--page-ink:${ink};background:linear-gradient(135deg,color-mix(in srgb,var(--page-color) 42%,#010C18),#010C18 90%)!important;background-attachment:fixed!important}
  main{border-top:8px solid var(--page-color)}
  main>section{background-color:transparent!important}
  main>section:first-child{background:linear-gradient(135deg,color-mix(in srgb,var(--page-color) 30%,#010C18),transparent)!important}
  main>section:first-child p{color:#EBE9DE}
  @media(max-width:760px){main>section>*{min-width:0}h1{font-size:clamp(2rem,9vw,2.7rem)!important;overflow-wrap:anywhere}.ai-hero,.hero{grid-template-columns:minmax(0,1fr)!important}}
  .site-header,.site-header.is-scrolled{border-bottom:3px solid var(--page-color)}
  a[data-page-color]:is(.button,.site-booking-sticky,.seo-service-grid>a,.seo-related-grid>a){background:var(--destination-color)!important;color:var(--destination-ink)!important;border:2px solid color-mix(in srgb,var(--destination-color) 65%,#EBE9DE)!important}
  a[data-page-color]:is(.button,.site-booking-sticky,.seo-service-grid>a,.seo-related-grid>a) *{color:inherit!important}
  :is(.desktop-nav,.mobile-nav nav,#fc-mobile-menu,.fc-footer nav) a[data-page-color]{background:var(--destination-color)!important;color:var(--destination-ink)!important;border:1px solid color-mix(in srgb,var(--destination-color) 65%,#EBE9DE)!important;border-radius:6px;padding:8px 12px!important;text-decoration:none}
  a[data-page-color]:hover{filter:brightness(1.12)}
  a[data-page-color]:focus-visible{outline:3px solid #FDFAF2;outline-offset:4px}
  </style>`;
}

export function colorPageLink(element, currentPath = '/') {
  const href = element.getAttribute('href');
  if (!href) return;
  let url;
  try { url = new URL(href, 'https://faithcraft.agency' + currentPath); } catch { return; }
  if (url.hostname !== 'faithcraft.agency') return;
  const path = url.pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/';
  const palette = pageColors[path];
  if (!palette) return;
  element.setAttribute('data-page-color', path);
  element.setAttribute('style', `${element.getAttribute('style') || ''};--destination-color:${palette[0]};--destination-ink:${palette[1]}`);
}
