# luizstrina.com — static portfolio

An update of the live Squarespace site (October 2026). It keeps the same style and all of the content, and adds patterns from other editors' portfolios.
It has no build step. Open `index.html` in a browser, or drag the folder onto Netlify or Vercel to publish.

## Files
- `data.js`: **all the content**: text, credits, videos, YouTube IDs, Instagram reel IDs, clients. Edit this to update the site.
- `site.js`: renders every page from `data.js`
- `styles.css`: the theme (Archivo Black + Space Grotesk, off-white `#f4f4f3`, lemon highlight)
- `*.html`: one small shell per page. Client pages are `work.html?c=offside` and so on.
- `assets/video/`: web-compressed copies of your videos. The full-quality originals are in `~/portf_video_originals/`.
- `_v1-archive-rebuild/`: the earlier rebuild from the Wayback Machine. Safe to delete.

## Homepage sections (all in `data.js`)
- `PITCH`: the rotating words in "I edit ___ people watch to the end."
- `STATS`: the render-queue numbers. "Years editing" counts from `EDITING_SINCE` and updates itself every January.
- `CLIENT_LIST`: "Who I've edited for"
- `TIMELINE`: "So far"
- `ideas.html`: reference page with the other pitch and number versions. `_saved/how-i-work/`: the "How I work" section, saved for later.

## Adding work
- **Homepage Selected Work grid:** add an entry to `PROJECTS` in `data.js` (`tag` is "YouTube", "Narrative" or "Social"; add `vertical: true` for 9:16 videos). `ALL_YOUTUBE_LIMIT` sets how many YouTube videos "All work" shows.
- **YouTube video:** add `{ title, youtube: "VIDEO_ID" }` to `YOUTUBE.videos`
- **Social video file:** drop an mp4 in `assets/video/` and add `{ title, credits: [...], video, poster }` to `SOCIAL.videos`
- **Instagram reel:** add the reel ID (from `instagram.com/reel/<ID>/`) to a client's list in `CLIENTS`

## To do
- Add your email to `SITE.email` in `data.js` to show an Email button on the Contact page.
