# Oxygen Gym Website

A mobile-first marketing website for **Oxygen Gym** in Bogura, Bangladesh. Built with HTML5, CSS3, and vanilla JavaScript — deployed on [Netlify](https://www.netlify.com/).

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Conversion funnel, free trial form |
| About | `about.html` | Mission, trainers, facility gallery |
| Classes | `classes.html` | Class descriptions + weekly schedule |
| Membership | `membership.html` | Pricing tiers + FAQ |
| Contact | `contact.html` | Location, map, lead capture form |
| Thank you | `thank-you.html` | Post-form confirmation |

## Local development

No build step required. Open any HTML file in a browser, or serve the folder:

```bash
npx serve .
```

Then visit `http://localhost:3000`.

## Design system

- **Primary:** `#0056D2` (Electric Blue)
- **Dark background:** `#121212`
- **Light background:** `#F8F9FA`
- **Fonts:** Oswald (headings), Inter (body)

CSS lives in `css/` — start with `variables.css` for tokens.

## Updating content

### Weekly class schedule

Edit the table in `classes.html` inside `.schedule-table`. Each cell uses:

```html
<td class="class-cell">Class Name<small>IN</small></td>
```

Update the instructor key at the bottom of the schedule section.

Also update the mini preview list on `index.html` to stay in sync.

### Membership pricing

Edit prices and features in `membership.html` inside `.pricing-card` blocks.

### Contact details

Update phone, email, address, and hours in:

- `contact.html` (contact info + JSON-LD)
- `index.html` (footer + JSON-LD)
- Footer on all pages

### Images

Replace Unsplash placeholder URLs with your own files in `assets/images/` and update `src` attributes.

### Google Maps

In `contact.html`, replace the iframe `src` with your embed code from Google Maps → Share → Embed a map.

## Netlify Forms

Two forms are configured:

1. **trial-request** — Homepage free trial (`index.html`)
2. **lead-capture** — Contact page (`contact.html`)

After deploying to Netlify:

1. Go to **Site configuration → Forms**
2. Confirm both forms appear
3. Enable email notifications for new submissions

Submissions redirect to `thank-you.html`.

## Deploy to Netlify

1. Push this repo to GitHub
2. [Netlify](https://app.netlify.com/) → **Add new site** → **Import from Git**
3. Build command: *(leave empty)*
4. Publish directory: `.`
5. Deploy

`netlify.toml` is included with security headers.

## Analytics (optional)

To enable GA4, add your measurement ID before `</head>` on each page:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

CTA buttons use `data-track` attributes wired in `js/main.js`.

## Future integrations

- **Mindbody / Glofox:** Replace the table in `classes.html` `.schedule-embed` with your provider's iframe embed code
- **Zapier:** Trigger welcome emails when Netlify receives a form submission

## License

© Oxygen Gym Bogura. All rights reserved.
