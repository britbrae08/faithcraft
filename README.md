# FaithCraft Agency

Conversion-focused landing page for [faithcraft.agency](https://faithcraft.agency), built as a lightweight Cloudflare Worker with no framework or runtime dependencies.

## Local development

```sh
npm run build
npm run check
npm run dev
```

Then open `http://localhost:4173`.

## Deployment

After authenticating Wrangler with the Cloudflare account that owns `faithcraft.agency`:

```sh
npm install
npm run deploy
```

The Worker configuration attaches the production Worker to the apex domain as a Cloudflare Custom Domain.

