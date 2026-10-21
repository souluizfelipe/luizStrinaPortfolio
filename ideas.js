// Reference page: the ideas from abiscoitado.com with all their variants (pitch A–C, both number styles).
// The chosen versions (pitch B, render-queue numbers, clients, timeline) are live on the homepage.
// Safe to delete ideas.html, ideas.js and ideas.css whenever you no longer need this.

const ph = (s) => `<span class="ph" title="Placeholder: tell me the real value">${s}</span>`;
const isNew = (label) => `<span class="new-tag">New · ${label}</span>`;

// "Years editing" updates itself every January: years since you started editing professionally
const IDEA_EDITING_SINCE = 2020;
const ideaYearsEditing = () => new Date().getFullYear() - IDEA_EDITING_SINCE;

const IDEA_STATS = [
  { value: 700, suffix: "+", label: "videos edited", file: "EDITED_ALL.mp4" },
  { value: 50, suffix: "M+", label: "views on Instagram & TikTok", file: "VIEWS_SOCIAL.mp4" },
  { value: 11, suffix: "M+", label: "views on YouTube", file: "VIEWS_YOUTUBE.mp4" },
  { value: 13, suffix: "", label: "brands & channels", file: "CLIENTS.prproj" },
  { value: ideaYearsEditing(), suffix: "+", label: "years editing", file: "YEARS_EDITING.mp4" },
];

const IDEA_CLIENTS = [
  { name: "blogTO", role: "Producing, shooting & editing", years: "Aug 2023 – today", what: "Toronto food, events and city stories for Instagram & TikTok.", link: "work.html?c=blogto", thumb: null },
  { name: "Known Four", role: "Editing", years: "2025 – today", what: "Social guessing-game show, “Guess what they’re known for”, hosted by @tpatzz.", link: "work.html?c=knownfour", thumb: null },
  { name: "CantoMando", role: "Editing", years: "Sep 2024 – 2025", what: "Long-form YouTube food & culture videos: story, pacing, music, SFX and graphics.", link: "work.html?c=cantomando", thumb: "https://i.ytimg.com/vi/zx1aLl67tuk/hqdefault.jpg" },
  { name: "Curiocity Toronto", role: "Producing, shooting & editing", years: "Mar 2024 – today", what: "Travel and city guides for Instagram & TikTok, like Toronto’s Tiny Traveller.", link: "work.html?c=curiocity", thumb: "assets/img/longpoint-poster.jpg" },
  { name: "Offside", role: "Producing, shooting & editing", years: "Jan 2025 – today", what: "Sports culture: Blue Jays watch parties, Valorant Masters, Rockin’ Rick.", link: "work.html?c=offside", thumb: "assets/img/watchparty-poster.jpg" },
  { name: "Dished Toronto", role: "Producing, shooting & editing", years: "Oct 2023 – today", what: "Food reels: Best Kept Secret, Worth the Hype and restaurant features.", link: "work.html?c=dished", thumb: "assets/img/alfies-poster.jpg" },
  { name: "CULTR Toronto", role: "Producing, shooting & editing", years: "Feb 2025 – today", what: "Culture and events: Canada’s Wonderland, Coffee Party, St. Lawrence Market.", link: "work.html?c=cultr", thumb: "assets/img/coffee-party-poster.jpg" },
  { name: "Film Farm", role: "Editing", years: "Jan 2025", what: "Thelma & Louise, a narrative short film.", link: "project.html?p=thelma-louise", thumb: "assets/img/thelma-louise-poster.jpg" },
];

const IDEA_TIMELINE = [
  { year: "2011", text: "Shot my first video" },
  { year: "2012", text: "Edited my first video" },
  { year: "2015", text: "Started taking editing gigs" },
  { year: "Jun 2018", text: "Graduated in Design (university)" },
  { year: "Feb 2020", text: "Finished a postgrad in Filmmaking" },
  { year: "Mar 2020", text: "Started my first YouTube channel" },
  { year: "Sep 2021", text: "Moved to Toronto" },
  { year: "Apr 2023", text: "Graduated in Media Communications at Humber" },
  { year: "Aug 2023", text: "Started at Curiocity Media Group / ZoomerMedia" },
  { year: "Sep 2024", text: "Started editing for CantoMando" },
  { year: "Jan 2025", text: "Edited my first short film: Thelma & Louise for Film Farm" },
  { year: "Jan 2025", text: "Crossed 500 videos edited" },
  { year: "Mar 2025", text: "“Which Country has the SPICIEST food?” comes out, now at 7.4M views" },
  { year: "Jan 2026", text: "Started making my own content on Instagram" },
  { year: "Jun 2026", text: "Crossed 700 videos edited" },
];

/* ---------- the five new sections ---------- */

// Pitch: several versions to compare (switch them in the preview bar)
const IDEA_PITCH_WORDS = ["YouTube videos", "Reels", "TikToks", "short films", "social shows"];
const ideaPitchButtons = `<div class="btn-row"><a class="btn" href="contact.html">Get a quote</a><a class="btn btn--ghost" href="#work">See my work ↓</a></div>`;

function ideaPitch() {
  return `<section class="new-sec pitch" id="pitch" data-v="b">${isNew("C · Pitch")}
      <div class="pv" data-v="current">
        <p class="label">Video editor &amp; videographer · Toronto</p>
        <p class="pitch-line">I take your raw footage and deliver a video people ${hl("watch to the end")}.</p>
        <p class="pitch-sub">YouTube long-form, Reels, TikTok and short films for creators and brands like CantoMando, Curiocity and Offside.</p>
        ${ideaPitchButtons}
      </div>

      <div class="pv" data-v="a">
        <p class="pitch-line">Editing that keeps people ${hl("watching")}.</p>
        <p class="pitch-sub">I’m Luiz, a Toronto-based video editor and videographer. 700+ videos for creators and brands like CantoMando, blogTO and Curiocity.</p>
        ${ideaPitchButtons}
      </div>

      <div class="pv" data-v="b">
        <p class="pitch-line">I edit <span class="rotator">${hl(IDEA_PITCH_WORDS[0])}</span><br>people watch to the end.</p>
        <p class="pitch-sub">Video editor and videographer in Toronto, from the first cut to the final export.</p>
        ${ideaPitchButtons}
      </div>

      <div class="pv pv--note" data-v="c">
        <p class="note-hi">Hey, I’m Luiz.</p>
        <p class="note-line">Send me your raw footage. I’ll send back a video people actually ${hl("finish")}.</p>
        <p class="pitch-sub">YouTube, Reels, TikTok and short films · Toronto · working with creators and brands since 2020.</p>
        ${ideaPitchButtons}
      </div>
    </section>`;
}

function ideaNumbers() {
  const num = (s) => `<span data-count="${s.value}">0</span>${s.suffix}`;
  const tiles = IDEA_STATS.map((s) => `<div class="stat"><p class="stat-num">${num(s)}</p><p class="stat-label">${esc(s.label)}</p></div>`).join("");
  const queue = IDEA_STATS.map((s) => `<div class="rq-item"><p class="rq-file"><span class="rq-dot"></span>${s.file}</p>
      <p class="stat-num">${num(s)}</p><p class="stat-label">${esc(s.label)}</p>
      <div class="rq-bar"><span></span></div><p class="rq-status">Rendering…</p></div>`).join("");
  return `<section class="new-sec numbers" data-style="queue">${isNew("A · Numbers")}
      <div class="stats">${tiles}</div><div class="rq">${queue}</div>
    </section>`;
}

function ideaClients() {
  const rows = IDEA_CLIENTS.map((c) => `<${c.link ? `a href="${c.link}"${c.link.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}` : "div"} class="cl-row"${c.thumb ? ` data-thumb="${c.thumb}"` : ""}>
      <span class="cl-name">${esc(c.name)}</span><span class="cl-role">${esc(c.role)}</span>
      <span class="cl-years">${c.years ? esc(c.years) : ph("20XX – 20XX")}</span>
      <span class="cl-what">${esc(c.what)}</span><span class="cl-stat">${c.link?.startsWith("http") ? "View on Instagram ↗" : "View work →"}</span></${c.link ? "a" : "div"}>`).join("");
  return `<section class="new-sec clients-list">${isNew("B · Clients")}
      <h2>${hl("Who I’ve edited for")}</h2>
      <div class="cl-head"><span>Client</span><span>Role</span><span>Years</span><span>What I did</span><span></span></div>
      <div class="cl-list">${rows}</div><div class="cl-thumb" id="cl-thumb"></div>
    </section>`;
}

function ideaTimeline() {
  const items = IDEA_TIMELINE.map((t) => `<li><span class="tl-year">${t.year}</span><span class="tl-text">${esc(t.text)}</span></li>`).join("");
  return `<section class="new-sec timeline-sec">${isNew("E · Timeline")}
      <h2>${hl("So far")}</h2><ol class="timeline">${items}</ol>
    </section>`;
}

/* ---------- homepage + new sections, in the proposed order ---------- */

const EXTRA_PAGES = {
  ideas() {
    return `<div class="preview-bar">
        <span><strong>Reference</strong> · the ideas and their variants. The homepage uses pitch B and the render queue.</span>
        <span class="preview-actions">Pitch:
          <button data-pitch="current">Original</button><button data-pitch="a">A</button><button data-pitch="b" class="is-on">B</button><button data-pitch="c">C</button>
          &nbsp;Numbers:
          <button data-numstyle="tiles">Tiles</button><button data-numstyle="queue" class="is-on">Render queue</button>
          <label><input type="checkbox" id="show-tags" checked> Show labels</label></span>
      </div>
      <section class="page-head"><h1>${hl("Ideas reference")}</h1>
        <p class="lede">Inspired by abiscoitado.com. “How I work” is saved separately in <code>_saved/how-i-work/</code>.</p></section>
      ${ideaPitch()}${ideaNumbers()}${ideaClients()}${ideaTimeline()}`;
  },
};

/* ---------- interactions ---------- */

window.addEventListener("load", () => {
  // Count-up numbers + render bars when the strip scrolls into view
  const numbers = document.querySelector(".numbers");
  const run = () => numbers.querySelectorAll(`.${numbers.dataset.style === "tiles" ? "stats" : "rq"} [data-count]`).forEach((el) => {
    const end = +el.dataset.count, t0 = performance.now();
    const tick = (t) => { const k = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
    numbers.classList.add("is-done");
  });
  new IntersectionObserver((entries, io) => entries.forEach((e) => { if (e.isIntersecting) { io.disconnect(); run(); } }), { threshold: 0.4 }).observe(numbers);

  // Pitch switcher
  const pitch = document.getElementById("pitch");
  document.querySelectorAll("[data-pitch]").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll("[data-pitch]").forEach((x) => x.classList.toggle("is-on", x === b));
    pitch.dataset.v = b.dataset.pitch;
    document.body.dataset.pitch = b.dataset.pitch;
  }));
  document.body.dataset.pitch = "b";

  // Version B: rotate the highlighted word
  const rot = document.querySelector(".rotator");
  let w = 0;
  setInterval(() => {
    w = (w + 1) % IDEA_PITCH_WORDS.length;
    rot.classList.add("is-out");
    setTimeout(() => { rot.innerHTML = hl(IDEA_PITCH_WORDS[w]); rot.classList.remove("is-out"); }, 250);
  }, 2200);

  // Preview controls
  document.querySelectorAll("[data-numstyle]").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll("[data-numstyle]").forEach((x) => x.classList.toggle("is-on", x === b));
    numbers.dataset.style = b.dataset.numstyle;
    numbers.classList.remove("is-done");
    requestAnimationFrame(run);
  }));
  document.getElementById("show-tags").addEventListener("change", (e) => document.body.classList.toggle("hide-tags", !e.target.checked));

  // Client rows: show a frame next to the cursor
  const thumb = document.getElementById("cl-thumb");
  document.querySelectorAll(".cl-row[data-thumb]").forEach((row) => {
    row.addEventListener("mouseenter", () => { thumb.innerHTML = `<img src="${row.dataset.thumb}" alt="">`; thumb.classList.add("is-on"); });
    row.addEventListener("mouseleave", () => thumb.classList.remove("is-on"));
    row.addEventListener("mousemove", (e) => { thumb.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 80}px)`; });
  });
});
