# Supreme Meat Pte Ltd. — Website

Public marketing website for **Supreme Meat Pte Ltd.** (Kari Kadai), a fresh goat/mutton and chicken supplier in Singapore.

This is a plain static site (HTML/CSS/JS, no build step) so it can be hosted directly on **GitHub Pages**.

## Structure

```
index.html            Main page (single-page site: hero, about, products, contact)
assets/css/style.css   All styling
assets/js/script.js    Mobile nav toggle, footer year, header shadow on scroll
assets/images/         Logo, hero banner, favicon
```

## Run locally

No build step needed. Just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository (see below).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`.
4. Choose branch `main` and folder `/ (root)`, then **Save**.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a few minutes.

## Editing content

- **Business info** (address, phone, UEN): search `index.html` for the `contact` section.
- **Product list**: edit the `.product-card` blocks inside the `products` section — copy an existing card to add a new item.
- **Colors**: edit the CSS variables at the top of `assets/css/style.css`.
