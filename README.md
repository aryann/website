# www.aryan.app

Personal website, served by GitHub Pages from the `docs/` directory. The
site is plain HTML and CSS with no build step: `docs/` is the source of
truth and is edited directly.

The homepage has three visual themes (midnight, editorial, split),
switchable via the dots in the top-right corner. The choice persists in
localStorage; midnight is the default. A theme can also be forced with
`?theme=<name>` in the URL. All themes share one HTML file and one
stylesheet, keyed off the `data-theme` attribute on `<html>`.

## Layout

- `docs/index.html` — the homepage (bio, talks, projects)
- `docs/assets/` — stylesheet, self-hosted fonts, and images
- `docs/randomstuff/` — self-contained HTML5 canvas demos
- `docs/showy/` — image gallery app
- `docs/seam-carving/` — built output of the `seam-carving-js` submodule
- `docs/projects/` — redirect stub for the old `/projects/` URL
- `docs/CNAME` — GitHub Pages custom-domain record

## Development

Run `./serve` and open <http://localhost:4000>.

The only thing with a build step is the seam-carving app; `./build`
rebuilds it from the submodule and copies it into `docs/seam-carving/`.

## Adding a blog later

The site intentionally has no generator. To add a blog:

- **By hand:** create `docs/blog/index.html` plus one page per post,
  reusing `docs/assets/styles.css`, and link `/blog/` from the homepage.
- **With a generator:** point any static site generator's output at
  `docs/blog/` (or reintroduce a generator for the whole site). Nothing
  in the current setup will conflict with it.
