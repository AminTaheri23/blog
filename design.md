# Design: amintaheri23.github.io/blog

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.
Shared with amintaheri23.github.io: the blog uses the main site's locked Rim system (its `design.md`, tokens, controls and surfaces), so the blog and the homepage read as one site.

## System
- Genre: editorial (a blog: essays and notes, read in long form)
- Shape: Long Document (kept). Home: the blog title as a masthead over a ruled, numbered index of every post. Posts: the title over the reading column. Category pages: the same masthead, the category chips, then the posts by year. About and 404: the post layout.
- Theme: Rim (by request), colourway `night`, the same as the main site
- Axes: dark/grotesk-sans/warm · posture: committed · hero: Banner (a compact head), kept

## Tokens
`static/css/tokens.css` is the source of truth: the main site's tokens verbatim, plus a few reading tokens for the blog. The roles:
```css
:root {
  --color-paper: oklch(9% 0.008 75);  --color-paper-2: oklch(12.5% 0.009 75);  --color-paper-3: oklch(6.5% 0.007 75);
  --color-ink: oklch(94% 0.010 80);  --color-ink-2: oklch(84% 0.011 80);  --color-muted: oklch(68% 0.012 80);  --color-muted-2: oklch(50% 0.010 80);
  --color-rule: oklch(25% 0.010 78);  --color-rule-2: oklch(16% 0.009 78);
  --color-accent: oklch(72% 0.17 45);  --color-accent-ink: oklch(10% 0.02 45);  --color-accent-soft: oklch(24% 0.06 45);
  --color-accent-2: oklch(74% 0.12 250);  --color-focus: oklch(78% 0.15 45);
  --font-display: "Switzer", ui-sans-serif, system-ui, sans-serif;  --font-body: var(--font-display);
  --font-outlier: "Geist Mono", ui-monospace, monospace;
  --radius-card: 0;  --radius-pill: 0;  --rule-hair: 1px;  --shadow-card: none;
  --tracking-display: -0.04em;  --display-weight: 500;
  /* blog only */
  --text-read: 1.0625rem;  --leading-read: 1.65;  --measure: 58ch;
  --code-ink: var(--color-ink-2);  --code-comment: var(--color-muted);  --code-keyword: var(--color-accent);
  --code-constant: var(--color-accent-2);  --code-string: var(--color-success);  --code-entity: var(--color-ink);  --code-error: var(--color-error);
}
```
The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `tokens.css`.
Switzer 500 for heads, 400 for body, from Fontshare. Prose is 17px (`--text-read`) at 1.65, 16px on phones, capped at `--measure`. Mono is for code only: inline code and code blocks.
Orange is the current state (the pressed chip, the current nav link, the open menu, the active search result) and the code keywords; sky-blue marks code constants. Nothing else is coloured.

## Controls
- Primary: orange fill, `--color-accent-ink` text · square · 44px high · one per screen at most (the blog has none today)
- Secondary: 1px `--color-rule` outline on `--color-paper-2` · square · same height (Search, Load comments, the phone Menu toggle)
- Chip: 1px `--color-rule`, square, 44px high, links to the category pages; current (`aria-current="page"`) = `--color-accent-soft` fill, `--color-accent` edge
- Field: square, `--color-paper`, 1px `--color-muted` edge, 44px, the same height as its button
- Search results: a `--color-paper-2` list under the field, rows parted by `--color-rule-2`; the active row is `--color-accent-soft` with a 1px `--color-accent` edge
- Focus: 2px `--color-focus` outline, 2px offset, on every control, instant

## Surfaces
- Warm black ground in three steps; hairlines do the dividing (`--color-rule` under heads and around the pager, `--color-rule-2` between rows); nothing round, no shadow, glow or gradient.
- Every picture is framed (`.frame`, or `.prose img` with the same recipe) on `--color-paper-3` and shows in true colour; Rim's `sat=-20 con=10` photo treatment is not applied, at the owner's request.
- Code blocks sit on `--color-paper-3` with a 1px rule edge and scroll sideways inside their own box; tables are blocks that scroll inside their own box, their cells wrap first. A box that scrolls takes keyboard focus (`site.js`).

## Reading layout
- Desktop (64rem and up): a rail of a quarter of the container on the left holds the post's date and categories (and the years on category pages); the title, the prose, related posts, the pager and comments sit in the column to its right, where the old site's content column was.
- Heads in a post step down the scale (h1 `--text-3xl`, h2 `--text-2xl`, h3 `--text-xl`, h4 `--text-lg`) with twice the space above as below.
- The pager is two ruled rows, « older and newer », one line each; a long title ends in an ellipsis and keeps the full title in its `title`.

## Phones (40rem and under)
- One column, no rail; the gutter is 16px; prose 16px.
- The nav folds behind the Menu toggle (with JS; without it the links wrap); the search field and its button take the full width under the brand.
- Long URLs and inline code wrap anywhere; nothing on the page scrolls sideways at 320px.

## Motion
- Character: still. Only colour changes on hover at `--dur-short`, inside the reduced-motion guard; no reveals, parallax or hover lifts.

## Exports
`static/css/tokens.css` in this project. Tailwind, DTCG or shadcn blocks are added here on request, per `export-formats.md`.
