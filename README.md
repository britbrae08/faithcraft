# FaithCraft Agency

Conversion-focused website for [faithcraft.agency](https://faithcraft.agency), built as a lightweight Cloudflare Worker with no framework or runtime dependencies.

The site includes the main agency page, a dedicated Bible study lead-generation service page at `/leadgen`, and the FaithCraft game **SLING** at `/sling/`. Both pages share responsive navigation, footer links, SMS calls to action, and email inquiry behavior where applicable.

The contact form prepares a message to `kalmanroller@gmail.com` in either the visitor's default email application or Gmail in the browser. It does not transmit or store form data on the site.

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
