export const readableType = `<style id="faithcraft-readable-type">
html{font-size:20px}
body :is(p,a,span,li,label,small,input,textarea,select,button,summary,dt,dd,th,td){font-size:max(18px,1em)!important;line-height:1.6}
body :is(p,li,label,small,dt,dd){overflow-wrap:anywhere}
.site-header{flex-wrap:wrap;height:auto;min-height:80px;gap:12px;padding:12px 18px}
.desktop-nav{flex-wrap:wrap;gap:12px 20px}
.site-header .fc-mobile-menu-toggle,#fc-mobile-menu a{font-size:18px!important}
.audience-strip>div{min-width:0;max-width:100%;grid-template-columns:repeat(2,minmax(0,1fr))}
.audience-strip span{white-space:normal;overflow-wrap:anywhere}
.button{white-space:normal;text-align:center;height:auto}
.site-booking-sticky{max-width:min(560px,calc(100vw - 36px));padding:12px 20px;min-height:64px}
body.has-booking-sticky{padding-bottom:130px!important}
@media(max-width:980px){.site-header .desktop-nav{display:none!important}.site-header .fc-mobile-menu-toggle{display:inline-flex!important}.site-header>.button{display:none!important}}
@media(max-width:760px){.site-header{width:calc(100% - 24px)}.site-booking-sticky{max-width:calc(100vw - 20px)}.fc-footer{padding-bottom:140px}}
/* Larger type needs real layout space rather than overlapping illustration cards. */
@media(max-width:1100px){
  .hero-visual{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;min-height:0;transform:none;margin:0;width:100%}
  .hero-visual .signal-card{position:relative;inset:auto;transform:none!important;width:auto;min-width:0;min-height:0;animation:none}
  .hero-visual .signal-card-main{grid-column:1/-1;padding:24px}
  .hero-visual .signal-card:not(.signal-card-main){padding:18px}
  .hero-visual .orbit{display:none}
}
@media(max-width:760px){
  .site-header,.site-header.is-scrolled{position:relative!important;top:auto!important;left:auto!important;right:auto!important;transform:none!important;width:calc(100% - 24px)!important;height:auto!important;margin:12px auto;min-height:80px}
  .hero-visual{grid-template-columns:1fr}
  .hero-visual .signal-card-main{grid-column:auto}
  .audience-strip{flex-direction:column;gap:16px}
  .audience-strip>div{display:grid;grid-template-columns:1fr;gap:14px}
  .site-booking-sticky{position:relative;inset:auto;margin:24px auto;width:calc(100% - 24px);max-width:none;padding:18px;box-sizing:border-box}
  body.has-booking-sticky{padding-bottom:0!important}
  .fc-footer{padding-bottom:32px}
}
</style>`;
