# Blog project notes

Zola blog (GitHub Pages project site) at https://amintaheri23.github.io/blog. Built with
**Zola 0.23.6** and deployed automatically on push to `master` by
`.github/workflows/zola.yml` ("Build and deploy (Zola)": validate, build, assert outputs,
deploy). Pushing to `master` is the publish action; there is no staging environment.
Settings → Pages → Source must stay on **GitHub Actions**.

## Writing style

- **Never use em dashes (—).** Replace with a period, comma, colon, semicolon, or
  parentheses depending on what reads most naturally in context. This applies to every
  post, not just past ones — check with `grep -rn "—" content/posts/` before considering a post done.
- The user is an ESL C2 speaker who often writes posts as fast, unpunctuated
  stream-of-consciousness. When turning a draft into a post: fix grammar, punctuation,
  and sentence boundaries, but keep the user's own voice, phrasing, and first-person
  narrative style. Don't sanitize it into generic blog-speak.

## Post conventions

- New posts go in `content/posts/YYYY-MM-DD-slug.md` with TOML front matter:
  ```toml
  +++
  title = "..."
  date = YYYY-MM-DDTHH:MM:SS-02:30

  [taxonomies]
  category = ["cat1", "cat2"]
  tags = ["tag1", "tag2"]
  +++
  ```
  Optional, under `[extra]`: `image = "file.jpeg"` (og:image, file in
  `static/static/img/posts/`). Zola rejects unknown top-level keys, so anything custom
  goes under `[extra]`.
- Post date/time: use the actual local time at time of writing, `-02:30` (Newfoundland).
- **Categories need no extra file.** Any name in `category = [...]` gets its page at
  `/blog/category/<name>/` automatically, and `/blog/category/` lists them all.
  Lower-case names; reuse an existing one where it fits (`ai`, `python`, `idea`,
  `blindtyping`, `philosophy`, `running`, `fitness`, `linux`, `cloud`, `others`, `other`).
  The old empty categories (bash, codefights, django, jekyll, nginx, raspberry, ruby,
  security, server, ssl, ubuntu) have redirect stubs at `static/category/<name>.html`
  pointing to `/blog/category/`: if a new post is the first to use one of them, edit
  that stub to point at `/blog/category/<name>/`.
- **URL scheme:** a new post's URL comes from its filename, without the date, lower-cased:
  `content/posts/2026-01-15-My-Post.md` → `https://amintaheri23.github.io/blog/posts/my-post/`.
  Don't rename a published post's file (that changes its URL); if you must, add the old
  path to `aliases = [...]`.
- **Old posts** keep their old Jekyll URLs (`/blog/<categories>/<yyyy>/<mm>/<dd>/<slug>.html`)
  as `aliases`, and `[extra] legacy_url` / `legacy_guid` keep the old URL and feed GUID.
  Never edit those, or Disqus threads and feed readers lose track of the post. Disqus
  threads are keyed on `https://amintaheri23.github.io/blog_` + the post title (or
  `[extra] disqus_title` when set), so **don't change a published post's title**
  without first setting `disqus_title` to the old one.

## Images

- **Local images go in `static/static/img/posts/`.** Zola copies `static/` to the site
  root, so that folder is served at `/blog/static/img/posts/`.
- Reference local images in posts as `/blog/static/img/posts/<file>.jpeg`.
- Check before pushing: `zola build`, then `ls public/static/img/posts/<file>.jpeg`
  (the CI "validate" job also fails if a post references a missing local image). After
  deploy, check the live URL returns 200, not just that the Action succeeded.
- When the user shares their own photos for a post, use those over stock photos where
  they cover the same beat — prefer authenticity. Stock photos (Unsplash, verified via
  WebFetch on the photo page for a real `images.unsplash.com` CDN URL, not guessed) are
  fine to fill gaps the user has no photo for.

## Build and check locally

- Install Zola 0.23.6 (release binary), then `zola serve` (http://127.0.0.1:1111/blog/)
  or `zola build` (output in `public/`, git-ignored). The build must show 0 warnings.
- Templates use Tera 2 (Zola 0.23): components (`{% component %}`), not macros.

## Design

- The design system is locked in `design.md` (Hallmark, Rim theme, shared with the main
  site AminTaheri23/AminTaheri23.github.io). CSS: `static/css/tokens.css`, `base.css`,
  `site.css` (Hallmark stamp on line 1), `blog.css`.

## Git

- Commit and push when a post is ready to go live (this is a static personal blog with
  no staging environment — pushing to `master` is the publish action).
