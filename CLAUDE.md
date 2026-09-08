# Blog project notes

Jekyll blog (GitHub Pages) at https://amintaheri23.github.io/blog. Deploys automatically
on push to `master` via `.github/workflows/jekyll.yml` — no local build needed to verify;
just push and poll the live URL after the Action finishes (~30-60s).

## Writing style

- **Never use em dashes (—).** Replace with a period, comma, colon, semicolon, or
  parentheses depending on what reads most naturally in context. This applies to every
  post, not just past ones — check with `grep -rn "—" _posts/` before considering a post done.
- The user is an ESL C2 speaker who often writes posts as fast, unpunctuated
  stream-of-consciousness. When turning a draft into a post: fix grammar, punctuation,
  and sentence boundaries, but keep the user's own voice, phrasing, and first-person
  narrative style. Don't sanitize it into generic blog-speak.

## Post conventions

- New posts go in `_posts/YYYY-MM-DD-slug.md` with this frontmatter (comments included,
  matching existing posts):
  ```
  ---
  layout: post
  title: "..."
  date: YYYY-MM-DD HH:MM:SS -0230
  categories: [cat1, cat2]
  tags: [tag1, tag2, ...]
  ---
  ```
- Every category listed in `categories:` needs a matching file at `category/<name>.md`
  (copy an existing one, e.g. `category/idea.md`, and swap the name).
- Post date/time: use the actual local time at time of writing, `-0230` (Newfoundland).

## Images

- **Local images go in `static/img/posts/` (no underscore).** Jekyll's default file
  reader silently excludes any directory whose name starts with `_`, even nested ones
  (e.g. `static/img/_posts/`) — files placed there build successfully but 404 on the
  live site. This isn't obvious from the build output, so always verify a newly added
  image actually returns 200 on the live URL after deploy, not just that the Action
  succeeded. Some post frontmatter comments still say `static/img/_posts` — that's
  wrong, ignore it.
- Reference local images as `/blog/static/img/posts/<file>.jpeg` (site `baseurl` is
  `/blog`).
- When the user shares their own photos for a post, use those over stock photos where
  they cover the same beat — prefer authenticity. Stock photos (Unsplash, verified via
  WebFetch on the photo page for a real `images.unsplash.com` CDN URL, not guessed) are
  fine to fill gaps the user has no photo for.

## Git

- Commit and push when a post is ready to go live (this is a static personal blog with
  no staging environment — pushing to `master` is the publish action).
