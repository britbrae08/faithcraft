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
</style>`;
