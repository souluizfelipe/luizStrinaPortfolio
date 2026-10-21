// Renders every page from data.js. Each HTML file sets <body data-page="...">.
const $ = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const hl = (s) => `<span class="hl">${esc(s)}</span>`;
const credits = (lines = []) => lines.length ? `<p class="credits">${lines.map(esc).join("<br>")}</p>` : "";

const ICONS = {
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 9h3.5v11H4zM5.75 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h3.4v1.6c.5-.9 1.7-1.9 3.6-1.9 3.6 0 4.2 2.3 4.2 5.4V20h-3.5v-5.2c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20H10z"/></svg>',
};

/* ---------- media ---------- */

// The real player (used inside the pop-up and after clicking an inline thumbnail)
function videoBlock(item, vertical = false) {
  return `<div class="media${vertical ? " media--vertical" : ""}">
    <video src="${item.video}" poster="${item.poster || ""}" controls playsinline preload="none"></video>
  </div>`;
}

const youtubeFrame = (id) => `<div class="media"><iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="YouTube video"></iframe></div>`;
const instagramFrame = (id) => `<iframe src="https://www.instagram.com/reel/${id}/embed/" allowtransparency="true" allow="autoplay; encrypted-media; fullscreen" title="Instagram reel"></iframe>`;
const thumbOf = (item) => item.poster || item.still || (item.youtube ? `https://i.ytimg.com/vi/${item.youtube}/hqdefault.jpg` : "");

// Thumbnail + yellow play button, the same look as My Content. The player loads only when clicked.
// mode "pop": opens the shared pop-up · mode "inline": swaps in the player right there
function thumbBlock(item, { vertical = false, mode = "pop", id = "" } = {}) {
  return `<button class="media vthumb${vertical ? " media--vertical" : ""}" data-mode="${mode}"${id !== "" ? ` data-pop-id="${id}"` : ""}
      ${item.video ? `data-video="${item.video}"` : ""} ${item.youtube ? `data-yt="${item.youtube}"` : ""} ${item.instagram ? `data-ig="${item.instagram}"` : ""}
      data-poster="${thumbOf(item)}" aria-label="Play${item.title ? `: ${esc(item.title)}` : " video"}">
    <img src="${thumbOf(item)}" alt="" loading="lazy"><span class="play${mode === "pop" ? " play--small" : ""}"></span>
  </button>`;
}

// Kept for the project-page links etc.: YouTube as an inline thumbnail
const youtubeBlock = (item) => thumbBlock(item, { mode: "inline" });

// Items shown in grids, so the pop-up can show their title/credits and step through Prev/Next
const POP_ITEMS = [];

function workItem(item, { vertical = false } = {}) {
  const id = POP_ITEMS.push({ ...item, vertical }) - 1;
  const title = item.title ? `<h3>${esc(item.title)}</h3>` : "";
  return `<article class="work">${thumbBlock(item, { vertical, mode: "pop", id })}${title}${credits(item.credits)}</article>`;
}

// The player for any item: your own file, YouTube, or Instagram as a last resort
function playerFor(item, vertical) {
  if (item.video) return videoBlock(item, vertical).replace("<video ", "<video autoplay ");
  if (item.youtube) return youtubeFrame(item.youtube);
  if (item.instagram) return instagramFrame(item.instagram);
  return "";
}

function openGridItem(btn) {
  const grid = btn.closest(".grid, .single") || document;
  const ids = [...grid.querySelectorAll("[data-pop-id]")].map((b) => +b.dataset.popId);
  const id = +btn.dataset.popId;
  const i = ids.indexOf(id);
  const item = POP_ITEMS[id];
  const go = (k) => () => openGridItem(grid.querySelector(`[data-pop-id="${ids[(i + k + ids.length) % ids.length]}"]`));
  showPop({
    media: playerFor(item, item.vertical),
    mediaClass: !item.video && !item.youtube && item.instagram ? "pop-media--ig" : "",
    vertical: item.vertical || (!item.youtube && !!item.instagram),
    tag: document.querySelector(".page-head h1")?.textContent || "Video",
    title: item.title || document.querySelector(".page-head h1")?.textContent || "",
    creditLines: item.credits || [],
    link: item.instagram ? `<a class="text-link" href="https://www.instagram.com/reel/${item.instagram}/" target="_blank" rel="noopener">View on Instagram →</a>` : "",
    prev: go(-1),
    next: go(1),
  });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".vthumb");
  if (!btn) return;
  e.preventDefault();
  if (btn.dataset.mode === "pop" && btn.dataset.popId !== undefined) return openGridItem(btn);
  // Inline: replace the thumbnail with the player
  const item = { video: btn.dataset.video, youtube: btn.dataset.yt, instagram: btn.dataset.ig, poster: btn.dataset.poster };
  const vertical = btn.classList.contains("media--vertical");
  btn.replaceWith($(playerFor(item, vertical)));
});

/* ---------- instagram feed ---------- */

const instagramHandle = () => SITE.instagram.replace(/\/$/, "").split("/").pop();

// A tile in the My Content strip. Reels play in the pop-up; photos open on Instagram.
function igPost({ image, reel, video, href, caption = "" }) {
  const link = reel ? `https://www.instagram.com/reel/${reel}/` : href || SITE.instagram;
  return `<a class="ig-post${reel ? " ig-post--reel" : ""}" href="${link}" target="_blank" rel="noopener"
    ${reel ? `data-reel="${reel}" data-caption="${esc(caption)}" data-image="${image}"${video ? ` data-video="${video}"` : ""}` : ""} aria-label="${esc((reel ? "Play: " : "") + (caption.slice(0, 80) || "View on Instagram"))}">
    <img src="${image}" alt="" loading="lazy">${reel ? '<span class="play play--small"></span>' : ""}</a>`;
}

// Replaces the fallback tiles with your latest posts from a Behold JSON feed
async function loadInstagramFeed() {
  const strip = document.getElementById("ig-strip");
  if (!strip || !MY_CONTENT.feed) return;
  try {
    const data = await (await fetch(MY_CONTENT.feed)).json();
    // Videos only: photos and carousels are skipped
    const posts = (Array.isArray(data) ? data : data.posts || []).filter((p) => p.mediaType === "VIDEO").slice(0, MY_CONTENT.count);
    if (!posts.length) return;
    strip.innerHTML = posts.map((p) => igPost({
      image: p.sizes?.medium?.mediaUrl || (p.mediaType === "VIDEO" ? p.thumbnailUrl : p.mediaUrl) || p.mediaUrl,
      reel: p.mediaType === "VIDEO" ? p.permalink.match(/\/(?:reel|p|tv)\/([\w-]+)/)?.[1] : null,
      video: p.mediaUrl && p.mediaType === "VIDEO" ? p.mediaUrl : null,
      href: p.permalink,
      caption: p.caption || p.prunedCaption || "",
    })).join("");
  } catch {
    // Keep the fallback tiles if the feed can't be reached
  }
}

// Reels open in the same pop-up as the Selected Work videos
function openReel(id) {
  const tiles = [...document.querySelectorAll("#ig-strip [data-reel]")];
  const ids = tiles.map((t) => t.dataset.reel);
  const i = ids.indexOf(id);
  const caption = tiles[i]?.dataset.caption || "";
  const tile = tiles[i];
  // Plays your own copy of the reel in the site's player; falls back to Instagram's player if there's no file
  const media = tile?.dataset.video
    ? videoBlock({ video: tile.dataset.video, poster: tile.dataset.image }, true).replace("<video ", "<video autoplay ")
    : `<iframe src="https://www.instagram.com/reel/${id}/embed/" allowtransparency="true" allow="autoplay; encrypted-media; fullscreen" title="Instagram reel"></iframe>`;
  showPop({
    media,
    mediaClass: tile?.dataset.video ? "" : "pop-media--ig",
    vertical: true,
    tag: "My Content",
    title: caption && !caption.startsWith("Reel by") ? caption : `@${instagramHandle()}`,
    creditLines: ["Platform: Instagram", `Channel: @${instagramHandle()}`, "Role: Creator & Editor"],
    link: `<a class="text-link" href="https://www.instagram.com/reel/${id}/" target="_blank" rel="noopener">View on Instagram →</a>`,
    prev: () => openReel(ids[(i - 1 + ids.length) % ids.length]),
    next: () => openReel(ids[(i + 1) % ids.length]),
  });
}

document.addEventListener("click", (e) => {
  const tile = e.target.closest("[data-reel]");
  if (!tile || e.metaKey || e.ctrlKey || e.shiftKey) return; // modifier-click still opens Instagram
  e.preventDefault();
  openReel(tile.dataset.reel);
});

/* ---------- selected work (big list filters + grids + pop-up) ---------- */

const inAllWork = (() => {
  const yt = PROJECTS.filter((p) => p.tag === "YouTube").map((p) => p.id);
  return (p) => p.tag !== "YouTube" || yt.indexOf(p.id) < ALL_YOUTUBE_LIMIT;
})();

// One tile: the brand name appears over the frame on hover
function workTile(p) {
  return `<a class="wtile${p.vertical ? " wtile--vertical" : ""}" href="project.html?p=${p.id}" data-id="${p.id}" data-tag="${p.tag}"${inAllWork(p) ? "" : ' data-in-all="false" hidden'}>
    <div class="wtile-media"><img src="${p.still}" alt="" loading="lazy"><span class="play play--small"></span>
      <div class="wtile-over"><span class="wtile-brand">${esc(p.client)}</span><span class="wtile-title">${esc(p.title)}</span></div>
    </div>
    <p class="wtile-caption"><strong>${esc(p.client)}</strong> | ${esc(p.title)}</p></a>`;
}

function selectedWork() {
  const rows = [{ key: "All", title: "All work" }, ...WORK_FILTERS].map((c, i) => `<button class="biglist-row${i ? "" : " is-on"}" data-filter="${c.key}"
      ${c.clip ? `data-clip="${c.clip}" data-poster="${c.poster}" data-shape="${c.shape}"` : ""}><span>${esc(c.title)}</span></button>`).join("");
  return `<section class="work-section" id="work" aria-label="Selected work">
      <div class="biglist">${rows}</div>
      <div id="work-grids">
        <div class="wgrid">${PROJECTS.filter((p) => !p.vertical).map(workTile).join("")}</div>
        <div class="wgrid wgrid--vertical">${PROJECTS.filter((p) => p.vertical).map(workTile).join("")}</div>
        <p class="work-empty" hidden>New videos coming soon.</p>
      </div>
      <div class="float-preview" id="float-preview"></div>
    </section>`;
}

function initSelectedWork() {
  const grids = document.getElementById("work-grids");
  if (!grids) return;

  // Big list rows filter the grids
  const rows = document.querySelectorAll(".biglist-row");
  rows.forEach((row) => row.addEventListener("click", () => {
    const key = row.dataset.filter;
    rows.forEach((r) => r.classList.toggle("is-on", r === row));
    grids.querySelectorAll(".wtile").forEach((t) => {
      t.hidden = key === "All" ? t.dataset.inAll === "false" : t.dataset.tag !== key;
    });
    grids.querySelectorAll(".wgrid").forEach((g) => { g.hidden = !g.querySelector(".wtile:not([hidden])"); });
    // A category with no videos yet shows a short "coming soon" note
    grids.querySelector(".work-empty").hidden = !!grids.querySelector(".wtile:not([hidden])");
  }));

  // Hovering a category shows a preview clip that follows the cursor
  const float = document.getElementById("float-preview");
  document.querySelectorAll(".biglist-row[data-clip]").forEach((row) => {
    row.addEventListener("mouseenter", () => {
      float.className = `float-preview is-on float-preview--${row.dataset.shape}`;
      float.innerHTML = `<video src="${row.dataset.clip}" poster="${row.dataset.poster}" muted loop playsinline autoplay></video>`;
      const v = float.querySelector("video");
      const start = parseFloat(row.dataset.clip.split("#t=")[1]) || 0;
      v.addEventListener("loadedmetadata", () => { v.currentTime = start; }, { once: true });
    });
    row.addEventListener("mouseleave", () => { float.className = "float-preview"; float.innerHTML = ""; });
    row.addEventListener("mousemove", (e) => { float.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 90}px)`; });
  });

  // Clicking a video opens the pop-up (desktop and phones); modifier-click still opens the project page
  grids.addEventListener("click", (e) => {
    const tile = e.target.closest(".wtile");
    if (!tile || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    openProject(tile.dataset.id);
  });
}

// Shared pop-up: video on one side, title + credits + Prev/Next on the other
function showPop({ media, mediaClass = "", vertical, tag, title, creditLines, link = "", prev, next }) {
  let box = document.getElementById("project-pop");
  if (!box) {
    box = document.createElement("dialog");
    box.id = "project-pop";
    box.className = "pop";
    box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
    box.addEventListener("close", () => { box.innerHTML = ""; });
    box.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") box.querySelector("[data-go=prev]")?.click();
      if (e.key === "ArrowRight") box.querySelector("[data-go=next]")?.click();
    });
    document.body.append(box);
  }
  box.innerHTML = `<div class="pop-inner${vertical ? " pop-inner--vertical" : ""}">
      <button class="lightbox-close" aria-label="Close">×</button>
      <div class="pop-media ${mediaClass}">${media}</div>
      <div class="pop-info">
        <p class="label">#${esc(tag)}</p>
        <h2>${hl(title)}</h2>
        ${credits(creditLines)}
        ${link}
        <div class="pop-nav">
          <button data-go="prev" aria-label="Previous">← Prev</button>
          <button data-go="next" aria-label="Next">Next →</button>
        </div>
      </div>
    </div>`;
  box.querySelector(".lightbox-close").addEventListener("click", () => box.close());
  box.querySelector("[data-go=prev]").addEventListener("click", prev);
  box.querySelector("[data-go=next]").addEventListener("click", next);
  if (!box.open) box.showModal();
}

// Project pop-up: the same video and info as project.html, without leaving the page
function openProject(id) {
  const visible = [...document.querySelectorAll("#work-grids .wtile:not([hidden])")].map((t) => t.dataset.id);
  const i = visible.indexOf(id);
  const p = PROJECTS.find((x) => x.id === id);
  showPop({
    media: p.youtube ? youtubeFrame(p.youtube) : videoBlock({ ...p, poster: p.still }, p.vertical).replace("<video ", "<video autoplay "),
    mediaClass: p.wide ? "project-media--wide" : "",
    vertical: p.vertical,
    tag: p.tag,
    title: `${p.client} | ${p.title}`,
    creditLines: p.credits,
    link: p.clientPage ? `<a class="text-link" href="work.html?c=${p.clientPage}">More ${esc(p.client)} work →</a>` : "",
    prev: () => openProject(visible[(i - 1 + visible.length) % visible.length]),
    next: () => openProject(visible[(i + 1) % visible.length]),
  });
}

/* ---------- contact form ---------- */

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = form.querySelector(".form-status");
  const button = form.querySelector("button[type=submit]");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.botcheck.value) return; // spam bots fill the hidden field
    const data = Object.fromEntries(new FormData(form));
    button.disabled = true;
    status.className = "form-status";
    status.textContent = "Sending…";
    try {
      if (!CONTACT_FORM.web3formsKey) throw new Error("Contact form not connected: add CONTACT_FORM.web3formsKey in data.js");
      const res = await fetch(CONTACT_FORM.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: CONTACT_FORM.web3formsKey, from_name: data.name, replyto: data.email, ...data }),
      });
      const ok = (await res.json()).success;
      if (!ok) throw new Error();
      form.reset();
      status.classList.add("is-ok");
      status.textContent = "Thanks! Your message is on its way. I’ll get back to you soon.";
    } catch (err) {
      console.error(err);
      status.classList.add("is-error");
      status.textContent = "Something went wrong sending your message. Please try again, or message me on Instagram.";
    } finally {
      button.disabled = false;
    }
  });
}

/* ---------- layout ---------- */

function header(page) {
  // On the homepage the links scroll to each section; on other pages they go back to the homepage at that spot
  const base = page === "home" ? "" : "index.html";
  const links = NAV.map((n) => `<a href="${base}#${n.section}" data-section="${n.section}">${n.label}</a>`).join("");
  return `<header class="site-header">
    <a class="logo" href="index.html">${esc(SITE.title)}</a>
    <nav class="nav" id="nav">${links}</nav>
    <div class="header-end">
      <a class="icon" href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a>
      <a class="icon" href="${SITE.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICONS.linkedin}</a>
      <a class="btn btn--small" href="contact.html">Let’s work</a>
      <button class="menu" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span><span></span></button>
    </div>
  </header>`;
}

/* ---------- homepage: pitch, numbers, clients, timeline ---------- */

const pitchButtons = () => `<div class="btn-row"><a class="btn" href="contact.html">Get a quote</a><a class="btn btn--ghost" href="#work">See my work ↓</a></div>`;

// "I edit ___ people watch to the end." with a rotating highlighted word
function pitchSection() {
  return `<section class="pitch">
      <p class="pitch-line">I edit <span class="rotator">${hl(PITCH.words[0])}</span><br>people watch to the end.</p>
      <p class="pitch-sub">${esc(PITCH.sub)}</p>
      ${pitchButtons()}
    </section>`;
}

// Numbers strip styled like an editor's render queue; numbers count up when it scrolls into view
function numbersSection() {
  const items = STATS.map((s) => `<div class="rq-item"><p class="rq-file"><span class="rq-dot"></span>${esc(s.file)}</p>
      <p class="stat-num"><span data-count="${s.value}">${s.value}</span>${s.suffix}</p><p class="stat-label">${esc(s.label)}</p>
      <div class="rq-bar"><span></span></div><p class="rq-status">Rendering…</p></div>`).join("");
  return `<section class="numbers" aria-label="In numbers"><div class="rq">${items}</div></section>`;
}

function clientsSection() {
  const rows = CLIENT_LIST.map((c) => {
    const tag = c.link ? `a href="${c.link}"` : "div";
    return `<${tag} class="cl-row"${c.thumb ? ` data-thumb="${c.thumb}"` : ""}>
      <span class="cl-name">${esc(c.name)}</span><span class="cl-role">${esc(c.role)}</span>
      <span class="cl-years">${esc(c.years)}</span><span class="cl-what">${esc(c.what)}</span>
      <span class="cl-stat">${c.link ? "View work →" : ""}</span></${c.link ? "a" : "div"}>`;
  }).join("");
  return `<section class="clients-list">
      <h2>${hl("Who I’ve edited for")}</h2>
      <div class="cl-head" aria-hidden="true"><span>Client</span><span>Role</span><span>Years</span><span>What I did</span><span></span></div>
      <div class="cl-list">${rows}</div><div class="cl-thumb" id="cl-thumb"></div>
    </section>`;
}

function timelineSection() {
  const items = TIMELINE.map((t) => `<li><span class="tl-year">${esc(t.date)}</span><span class="tl-text">${esc(t.text)}</span></li>`).join("");
  return `<section class="timeline-sec"><h2>${hl("So far")}</h2><ol class="timeline">${items}</ol></section>`;
}

function initHomeExtras() {
  // Rotating pitch word
  const rot = document.querySelector(".pitch .rotator");
  if (rot && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let w = 0;
    setInterval(() => {
      w = (w + 1) % PITCH.words.length;
      rot.classList.add("is-out");
      setTimeout(() => { rot.innerHTML = hl(PITCH.words[w]); rot.classList.remove("is-out"); }, 250);
    }, 2200);
  }

  // Numbers count up and the render bars fill when the strip scrolls into view
  const numbers = document.querySelector(".numbers");
  if (numbers) {
    numbers.querySelectorAll("[data-count]").forEach((el) => { el.textContent = "0"; });
    new IntersectionObserver((entries, io) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      numbers.classList.add("is-done");
      numbers.querySelectorAll("[data-count]").forEach((el) => {
        const end = +el.dataset.count, t0 = performance.now();
        const tick = (t) => { const k = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      });
    }), { threshold: 0.3 }).observe(numbers);
  }

  // Client rows: show a frame next to the cursor
  const thumb = document.getElementById("cl-thumb");
  document.querySelectorAll(".clients-list .cl-row[data-thumb]").forEach((row) => {
    row.addEventListener("mouseenter", () => { thumb.innerHTML = `<img src="${row.dataset.thumb}" alt="">`; thumb.classList.add("is-on"); });
    row.addEventListener("mouseleave", () => thumb.classList.remove("is-on"));
    row.addEventListener("mousemove", (e) => { thumb.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 80}px)`; });
  });
}

function ctaBand() {
  return `<section class="cta-band" id="contact">
    <h2>${hl("Let’s work together")}</h2>
    <p>YouTube, social content or short films — tell me about your project.</p>
    <a class="btn" href="contact.html">Get in touch</a>
  </section>`;
}

function footer() {
  return `<footer class="site-footer">
    <span>© ${new Date().getFullYear()} ${esc(SITE.name)} · Toronto</span>
    <span><a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a> · <a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a></span>
  </footer>`;
}

function pageHead(title, intro = "") {
  return `<section class="page-head"><h1>${hl(title)}</h1>${intro}</section>`;
}

/* ---------- pages ---------- */

const PAGES = {
  home() {
    return `
      <section class="hero" id="top">
        <img src="assets/img/hero.webp" alt="Luiz Strina holding a waffle at a fair" fetchpriority="high">
        <div class="hero-text">
          <h1>${hl(`Hello, I’m ${SITE.name}`)}</h1>
          <p class="hero-sub">${hl(SITE.tagline)}</p>
        </div>
      </section>
      ${pitchSection()}

      <section class="reel">
        <h2>${hl(REEL.title)}</h2>
        ${thumbBlock(REEL, { mode: "inline" })}
      </section>
      ${numbersSection()}

      ${selectedWork()}
      ${clientsSection()}

      <section class="my-content">
        <div class="section-head">
          <h2>${hl("My Content")}</h2>
          <a class="text-link" href="${SITE.instagram}" target="_blank" rel="noopener">@${instagramHandle()} on Instagram →</a>
        </div>
        <div class="strip" id="ig-strip">${MY_CONTENT.fallback.map(igPost).join("")}</div>
      </section>

      <section class="about-teaser" id="about">
        <img src="${CONTACT.photo}" alt="Portrait of Luiz Strina" loading="lazy">
        <div>
          <h2>${hl(ABOUT.heading)}</h2>
          <p>${esc(ABOUT.paragraphs[0])} ${esc(ABOUT.paragraphs[1])}</p>
          <a class="text-link" href="about.html">More about me →</a>
        </div>
      </section>
      ${timelineSection()}
      ${ctaBand()}`;
  },

  youtube() {
    return pageHead("YouTube content", `<p class="lede">${esc(YOUTUBE.intro)}</p><p class="label">Channel: ${esc(YOUTUBE.channel)}</p>`) +
      `<section class="grid grid--2">${YOUTUBE.videos.map((v) => workItem(v)).join("")}</section>` + ctaBand();
  },

  social() {
    return pageHead("Social Content", `<p class="lede">${esc(SOCIAL.intro)} <strong>${esc(SOCIAL.brands)}</strong></p>`) +
      `<section class="grid grid--3">${SOCIAL.videos.map((v) => workItem(v, { vertical: true })).join("")}</section>` + ctaBand();
  },

  narrative() {
    return pageHead("Narrative", `<p class="label">Short films</p>`) +
      `<section class="single">${NARRATIVE.map((v) => workItem(v)).join("")}</section>` + ctaBand();
  },

  about() {
    return `<section class="about">
      <img src="${ABOUT.photo}" alt="Luiz Strina" loading="lazy">
      <div>
        <h1>${hl(ABOUT.heading)}</h1>
        ${ABOUT.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
        <a class="btn" href="contact.html">Get in touch</a>
      </div>
    </section>`;
  },

  contact() {
    const opt = (list) => list.map((v) => `<option>${esc(v)}</option>`).join("");
    return `<section class="contact">
      <img src="${CONTACT.photo}" alt="Portrait of Luiz Strina">
      <div>
        <h1>${hl(CONTACT.heading)}</h1>
        <p class="lede">${esc(CONTACT.text)}</p>
        <form class="contact-form" id="contact-form" name="contact" method="POST">
          <input type="hidden" name="subject" value="${esc(CONTACT_FORM.subject)}">
          <p class="hp" aria-hidden="true"><label>Leave this empty <input name="botcheck" tabindex="-1" autocomplete="off"></label></p>
          <div class="field-row">
            <label>Name<input name="name" required autocomplete="name"></label>
            <label>Email<input name="email" type="email" required autocomplete="email"></label>
          </div>
          <div class="field-row">
            <label>What do you need?<select name="service">${opt(CONTACT_FORM.services)}</select></label>
            <label><span>Budget <span class="opt">(optional)</span></span><select name="budget">${opt(CONTACT_FORM.budgets)}</select></label>
          </div>
          <label>Tell me about your project<textarea name="message" rows="5" required placeholder="Channel or brand, how many videos, deadline, links to footage or references…"></textarea></label>
          <button class="btn" type="submit">Send message</button>
          <p class="form-status" role="status" aria-live="polite"></p>
        </form>
        <p class="contact-alt">Prefer DMs? <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a> · <a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a></p>
      </div>
    </section>`;
  },

  project() {
    const id = new URLSearchParams(location.search).get("p");
    const i = Math.max(0, PROJECTS.findIndex((x) => x.id === id));
    const p = PROJECTS[i];
    const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
    const next = PROJECTS[(i + 1) % PROJECTS.length];
    document.title = `${p.client} | ${p.title} — ${SITE.title}`;
    const media = thumbBlock({ ...p, poster: p.still }, { vertical: p.vertical, mode: "inline" });
    const client = p.clientPage ? `<a class="text-link" href="work.html?c=${p.clientPage}">More ${esc(p.client)} work →</a>` : "";
    return `<section class="project">
      <div class="project-media${p.vertical ? " project-media--vertical" : ""}${p.wide ? " project-media--wide" : ""}">${media}</div>
      <div class="project-info">
        <p class="label">#${esc(p.tag)}</p>
        <h1>${hl(`${p.client} | ${p.title}`)}</h1>
        ${credits(p.credits)}
        ${client}
      </div>
    </section>
    <nav class="project-nav">
      <a href="project.html?p=${prev.id}"><span class="label">← Previous</span>${esc(prev.client)} | ${esc(prev.title)}</a>
      <a href="project.html?p=${next.id}"><span class="label">Next →</span>${esc(next.client)} | ${esc(next.title)}</a>
    </nav>` + ctaBand();
  },

  work() {
    const id = new URLSearchParams(location.search).get("c");
    const c = CLIENTS.find((x) => x.id === id) || CLIENTS[0];
    document.title = `${c.name} — ${SITE.title}`;
    const vertical = c.items.some((i) => i.video);
    const cols = c.items[0]?.youtube ? "grid--2" : "grid--3";
    const others = CLIENTS.filter((x) => x !== c).map((x) => `<a href="work.html?c=${x.id}">${esc(x.name)}</a>`).join("");
    const items = c.items.length
      ? `<section class="grid ${cols}">${c.items.map((i) => workItem(i, { vertical })).join("")}</section>`
      : `<section class="single"><p class="lede">Videos coming soon.</p></section>`;
    return pageHead(c.name, credits([...c.credits, ...(c.work ? [`Work: ${c.work}`] : [])])) +
      `${items}
       <nav class="more-work"><p class="label">More work</p>${others}</nav>` + ctaBand();
  },
};

/* ---------- boot ---------- */

const page = document.body.dataset.page;
document.body.prepend($(header(page)));
document.getElementById("main").append($((PAGES[page] || (typeof EXTRA_PAGES !== "undefined" && EXTRA_PAGES[page]))()));
document.body.append($(footer()));

const menu = document.querySelector(".menu");
menu.addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  menu.setAttribute("aria-expanded", open);
});

/* ---------- menu: jump to homepage sections ---------- */

function goToSection(section, smooth = true) {
  const item = NAV.find((n) => n.section === section);
  if (item?.filter) document.querySelector(`.biglist-row[data-filter="${item.filter}"]`)?.click();
  const target = item?.filter ? document.getElementById("work") : document.getElementById(section);
  if (section === "top") window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  else target?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  setCurrentNav(section);
}

function setCurrentNav(section) {
  document.querySelectorAll(".nav a").forEach((a) => {
    if (a.dataset.section === section) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  });
}

if (page === "home") {
  document.querySelector(".nav").addEventListener("click", (e) => {
    const link = e.target.closest("a[data-section]");
    if (!link) return;
    e.preventDefault();
    history.replaceState(null, "", `#${link.dataset.section}`);
    document.body.classList.remove("nav-open");
    menu.setAttribute("aria-expanded", "false");
    goToSection(link.dataset.section);
  });
  // Arriving from another page with a #section in the address
  const start = location.hash.slice(1);
  if (NAV.some((n) => n.section === start)) requestAnimationFrame(() => goToSection(start, false));
  else setCurrentNav("top");

  // Highlight the menu item for the part of the page in view
  const spy = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((e) => {
      if (e.target.id !== "work") return setCurrentNav(e.target.id);
      const key = document.querySelector(".biglist-row.is-on")?.dataset.filter;
      setCurrentNav(NAV.find((n) => n.filter === key)?.section || "");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["top", "work", "about", "contact"].forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
}

initSelectedWork();
initContactForm();
if (page === "home") initHomeExtras();
loadInstagramFeed();

