// "How I work" section, saved for later (October 2026).
// Four steps showing the full service: before the shoot, on set, in the edit, delivery.
// To bring it back: add this file before site.js, add how-i-work.css after styles.css,
// and insert howIWork() into PAGES.home() in site.js (it was placed right after "Who I've edited for").
// Needs esc() and hl() from site.js.

const HOW_I_WORK_STEPS = [
  { n: "01", title: "Before the shoot", text: "Plan the story and the hook, and set up camera, light and sound." },
  { n: "02", title: "On set", text: "Shoot vertical and horizontal in the same day, on camera or behind it." },
  { n: "03", title: "In the edit", text: "Cut for retention: hook, pacing, captions, music, SFX and graphics." },
  { n: "04", title: "Delivery", text: "Exports for YouTube, Reels, TikTok and Shorts, ready to post." },
];

function howIWork() {
  const steps = HOW_I_WORK_STEPS.map((s) => `<div class="step"><p class="step-n">${s.n}</p><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join("");
  return `<section class="how">
