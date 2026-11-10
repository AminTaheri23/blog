## My blog

Source of my blog, built with [Zola](https://www.getzola.org) 0.23.6.

Live at: <https://amintaheri23.github.io/blog>

The design is shared with my main site ([AminTaheri23/AminTaheri23.github.io](https://github.com/AminTaheri23/AminTaheri23.github.io)):
[Hallmark](https://github.com/nutlope/hallmark), Rim theme, locked in [design.md](design.md). Font: [Switzer](https://www.fontshare.com/fonts/switzer) (Fontshare).
Icons: [Font Awesome Free 6](https://fontawesome.com) ([CC BY 4.0](https://fontawesome.com/license/free)), inlined as SVG.

### Features

- Posts list, category pages (`/category/<name>/`) and an About page
- RSS feed at `/feed.xml` and a sitemap at `/sitemap.xml`
- Search over post titles and text (Zola search index, small vanilla JS, keyboard accessible)
- Related posts and older/newer links
- Disqus comments, loaded when you scroll to them
- Link previews for Telegram and other apps: Open Graph and Twitter tags, the post's opening text as its description, and a share card per post drawn at build time (`scripts/og-cards.mjs`)
- Google Analytics
- Old Jekyll URLs keep working as redirect pages

### Quick start

1. Install Zola **0.23.6**: <https://www.getzola.org/documentation/getting-started/installation/>
2. `zola serve` and open <http://127.0.0.1:1111/blog/>
3. `zola build` writes the site to `public/` (git-ignored); it must build with 0 warnings.

### Structure

```
.
├── config.toml               # Site configuration (base URL, feed, search, taxonomies, analytics, Disqus)
├── content/
│   ├── _index.md             # Home: all posts, newest first
│   ├── posts/                # One file per post: YYYY-MM-DD-slug.md
│   └── pages/about.md        # /about/
├── templates/                # Tera 2 templates; macros.html holds the shared components
├── static/
│   ├── css/                  # tokens.css, base.css, site.css, blog.css
│   ├── js/site.js            # Nav toggle, search, Disqus loader
│   ├── static/img/posts/     # Post images, served at /blog/static/img/posts/
│   ├── category/*.html       # Redirects from the old /category/<name>.html URLs
│   └── projects/index.html   # Redirect to the main site's projects
├── scripts/og-cards.mjs      # Draws the link-preview cards into public/og/ after zola build (CI runs it)
├── design.md                 # The locked design system
└── .github/workflows/zola.yml  # CI: validate, build, assert outputs, deploy to GitHub Pages
```

### Adding a post

Create `content/posts/YYYY-MM-DD-slug.md`:

```toml
+++
title = "Your Title"
date = 2026-01-15T19:51:02-02:30

[taxonomies]
category = ["python", "idea"]
tags = ["foo", "bar"]
+++

Your post in Markdown.
```

The post is published at `/blog/posts/<slug>/` (lower-cased). Categories need no extra file. Put images in
`static/static/img/posts/` and link them as `/blog/static/img/posts/<file>`.

### Deployment

`.github/workflows/zola.yml` builds and deploys to GitHub Pages on every push to `master`.
**Settings → Pages → Build and deployment → Source** must be **GitHub Actions**.

### Credits

Originally forked from [A simple grey theme for Jekyll](https://github.com/liamsymonds/simplygrey-jekyll)
via Agus ([agusmakmun](https://agusmakmun.github.io)); migrated to Zola in 2026.
