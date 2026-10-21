// All site content lives here. Edit this file to update the portfolio.
// video: local file in assets/video/ · youtube: 11-character YouTube ID · instagram: reel ID from the URL

const SITE = {
  name: "Luiz Strina",
  title: "LuizStrina_Editor",
  tagline: "A Toronto-based video editor and creative",
  email: "", // add your email to show an Email button on the Contact page
  instagram: "https://www.instagram.com/luiz.strina/",
  linkedin: "https://www.linkedin.com/in/luizstrina/",
  brands: ["Curiocity", "Offside", "blogTO", "Dished", "Daily Hive", "CULTR", "CantoMando"],
};

// Top menu: each item jumps to a spot on the homepage. "filter" also selects that category in Selected Work.
const NAV = [
  { label: "Home", section: "top" },
  { label: "YouTube", section: "youtube", filter: "YouTube" },
  { label: "Social Content", section: "social", filter: "Social" },
  { label: "Narrative", section: "narrative", filter: "Narrative" },
  { label: "About", section: "about" },
  { label: "Contact", section: "contact" },
];

const REEL = {
  title: "Luiz Strina - 2025 Editing Reel",
  video: "assets/video/reel-2025.mp4",
  poster: "assets/img/reel-2025-poster.jpg",
};

const YOUTUBE = {
  intro: "Role: Video Editor. Cutting up raw files, selecting best moments, crafting storyline, adding graphics, music and sound effects.",
  channel: "CantoMando",
  videos: [
    { title: "Which Country has the SPICIEST food? India vs China", youtube: "zx1aLl67tuk" },
    { title: "Giving a Chinese Grandpa his First Chinese Meal in 80 Years", youtube: "abi9YzdjSp0" },
    { title: "American Students try Dim Sum for the First Time!", youtube: "oV1CR1lWTBg" },
    { title: "Chinese Noodle Master tries Italian Pasta for the first time", youtube: "HetTjiD5vV8" },
    { title: "Cowboy tries Chinese Hotpot for the First Time", youtube: "VVlwBDVzIsI" },
    { title: "Chinese Baker tries French Pastries for the first time!", youtube: "s1wbT82Vg1k" },
  ],
};

const SOCIAL = {
  intro: "Working for over 2 years as a full-time content creator producing and editing at Curiocity Media Group, creating content for brands such as:",
  brands: "Curiocity, Offside, blogTO, Dished, Daily Hive and CULTR",
  videos: [
    { title: "Rogers Centre World Series Watch Party", credits: ["Platform: Instagram, TikTok, Facebook", "Channel: Offside", "Role: Editor"], video: "assets/video/watchparty.mp4", poster: "assets/img/watchparty-poster.jpg" },
    { title: "Canada’s Wonderland AlpenFury Preview", credits: ["Platform: Instagram", "Channel: CULTR Toronto", "Role: Editor"], video: "assets/video/wonderland.mp4", poster: "assets/img/wonderland-poster.jpg" },
    { title: "Toronto’s Coffee Party", credits: ["Platform: Instagram", "Channel: CULTR Toronto", "Role: Editor"], video: "assets/video/coffee-party.mp4", poster: "assets/img/coffee-party-poster.jpg" },
    { title: "Toronto’s Tiny Traveller - Long Point", credits: ["Platform: Instagram", "Channel: Curiocity Toronto", "Role: Editor"], video: "assets/video/longpoint.mp4", poster: "assets/img/longpoint-poster.jpg" },
    { title: "Alfie’s Sandwiches+Market", credits: ["Platform: Instagram, TikTok", "Channel: Dished Toronto", "Role: Editor + Videographer"], video: "assets/video/alfies.mp4", poster: "assets/img/alfies-poster.jpg" },
    { title: "Oroshi Fish Co.", credits: ["Platform: Instagram, TikTok", "Channel: Dished Toronto", "Role: Editor"], video: "assets/video/oroshi.mp4", poster: "assets/img/oroshi-poster.jpg" },
  ],
};

const NARRATIVE = [
  { title: "Thelma & Louise - Short", credits: ["Producer: Film Farm", "Role: Editor"], video: "assets/video/thelma-louise.mp4", poster: "assets/img/thelma-louise-poster.jpg" },
];

// Client pages (work.html?c=<id>). Cover images are the logo tiles on the homepage.
const CLIENTS = [
  {
    // Videos coming soon: add { title, credits, video, poster } items (files in assets/video/knownfour/)
    id: "knownfour", name: "Known Four", cover: null,
    credits: ["Platform: Instagram", "Show: Known Four (@knownfourshow)", "Host: @tpatzz", "Role: Editor"],
    work: "A social guessing-game show, “Guess what they’re known for”",
    items: [],
  },
  {
    // Videos coming soon: add { title, credits, video, poster } items (files in assets/video/blogto/)
    id: "blogto", name: "blogTO Social Content", cover: null,
    credits: ["Platform: Instagram & TikTok", "Channel: blogTO", "Role: Producer & Editor"],
    work: "Cutting up raw footage, selecting best moments, creating the story arc, adding music, SFX and GFX",
    items: [],
  },
  {
    id: "cantomando", name: "CantoMando - YouTube", cover: "assets/img/cantomando.webp",
    credits: ["Platform: YouTube", "Channel: CantoMando", "Role: Editor"],
    work: "Cutting up raw footage, selecting best moments, creating the story arc, adding music, SFX and GFX",
    items: [
      { title: "Which Country has the SPICIEST food? India vs China", youtube: "zx1aLl67tuk" },
      { title: "Chinese Noodle Master tries Italian Pasta for the first time", youtube: "HetTjiD5vV8" },
      { title: "Giving a Chinese Grandpa his First Chinese Meal in 80 Years", youtube: "abi9YzdjSp0" },
    ],
  },
  {
    id: "offside", name: "Offside Social Content", cover: "assets/img/offside.webp",
    credits: ["Platform: Instagram", "Channel: Offside"],
    items: [
      { title: "World Series Watch Party", credits: ["Role: Editor"], video: "assets/video/watchparty.mp4", poster: "assets/img/watchparty-poster.jpg" },
      { title: "Best Spot to Watch a Blue Jays Game With a General Admission Ticket", credits: ["Role: Host/Videographer/Editor"], video: "assets/video/bluejays-ga.mp4", poster: "assets/img/bluejays-ga-poster.jpg" },
      { title: "Rockin Rick Blue Jays Drummer - Profile", credits: ["Role: Editor"], video: "assets/video/rockin-rick.mp4", poster: "assets/img/rockin-rick-poster.jpg" },
      { title: "Valorant Masters Toronto 2025 Finals", credits: ["Role: Videographer/Editor"], video: "assets/video/valorant.mp4", poster: "assets/img/valorant-poster.jpg" },
    ],
  },
  {
    id: "dished", name: "Dished Toronto Social Content", cover: "assets/img/dished.webp",
    credits: ["Platform: Instagram & TikTok", "Channel: Dished Toronto", "Role: Producer & Editor"],
    work: "Cutting up raw footage, selecting best moments, creating the story arc, adding music, SFX and GFX",
    items: ["DJNmIVJOBaJ", "DIPsMpLy82A", "DFOreuKSlPG", "DFRXHw8yJsv", "DIkL0wYRYFK", "DIKjHXDy3tk", "DHrpDhByrhx", "DL6HbCZvpkg"].map((id) => ({ instagram: id, video: `assets/video/clients/dished-${id}.mp4`, poster: `assets/img/clients/dished-${id}.jpg` })),
  },
  {
    id: "cultr", name: "CULTR Toronto Social Content", cover: "assets/img/cultr.webp",
    credits: ["Platform: Instagram", "Channel: CULTR Toronto", "Role: Producer & Editor"],
    work: "Cutting up raw footage, selecting best moments, creating the story arc, adding music, SFX and GFX",
    items: ["DH4g-mKSr1J", "DHHg5eoyqJ5", "DGmBd_NSwC7", "DHuPpPcyRKl", "DG1rNLJSOPn"].map((id) => ({ instagram: id, video: `assets/video/clients/cultr-${id}.mp4`, poster: `assets/img/clients/cultr-${id}.jpg` })),
  },
  {
    id: "curiocity", name: "Curiocity Toronto Social Content", cover: "assets/img/curiocity.webp",
    credits: ["Platform: Instagram & TikTok", "Channel: Curiocity Toronto", "Role: Producer & Editor"],
    work: "Cutting up raw footage, selecting best moments, creating the story arc, adding music, SFX and GFX",
    items: ["DMtgXnfpMMy", "DL8sMdSMTNe", "DMoW2jSyPuo", "DI-CllShNGS"].map((id) => ({ instagram: id, video: `assets/video/clients/curiocity-${id}.mp4`, poster: `assets/img/clients/curiocity-${id}.jpg` })),
  },
];

// "My Content" on the homepage. With a feed URL it shows your latest Instagram posts automatically.
// Get a free feed URL at https://behold.so (connect @luiz.strina → create a JSON feed → copy its URL).
// Without one, it shows the fallback tiles below: your 10 latest reels (October 2026), newest first.
// Only videos (reels) are shown; each plays in the same pop-up as Selected Work.
// To add a reel: cover in assets/img/reels/<ID>.jpg and video in assets/video/reels/<ID>.mp4.
const MY_CONTENT = {
  feed: "", // e.g. "https://feeds.behold.so/XXXXXXXXXXXX"
  count: 10,
  fallback: [
    { image: "assets/img/mine-2.webp", reel: "DXDMOx2gD4j", video: "assets/video/reels/DXDMOx2gD4j.mp4", caption: "Eu gosto de coisas simples" },
    { image: "assets/img/mine-3.webp", reel: "DWSmV5ZgOLr", video: "assets/video/reels/DWSmV5ZgOLr.mp4", caption: "Minha lente nova / My new lens" },
    { image: "assets/img/mine-4.webp", reel: "DV98YHijNIh", video: "assets/video/reels/DV98YHijNIh.mp4", caption: "Minha Camcorder / My Camcorder" },
    { image: "assets/img/mine-5.webp", reel: "DVuOIUQj7hX", video: "assets/video/reels/DVuOIUQj7hX.mp4", caption: "A criatividade é o inimigo / Creativity is the enemy" },
    ...["DVdyAnvjU53", "DVXik6dDTG_", "DVIGnA6jRJA", "DU18BuiDenK", "DUhcMWwDUzb", "DUCgrTjDcGa"]
      .map((id) => ({ image: `assets/img/reels/${id}.jpg`, reel: id, video: `assets/video/reels/${id}.mp4`, caption: "Reel by @luiz.strina" })),
  ],
};

const ABOUT = {
  heading: "Hi, I’m Luiz!",
  photo: "assets/img/hero.webp",
  paragraphs: [
    "I’m a Toronto-based Brazilian video editor and content creator who loves turning ideas into engaging videos.",
    "I specialise in social media and YouTube content, and I do my best work in fast-paced, creative environments.",
    "I believe stories are meant to be told, and video and photography are how I choose to tell mine. When I’m not editing, I’m usually documenting my life, shooting on film, or simply enjoying what life has to offer.",
    "I have over 5 years of experience creating and editing content for YouTube and social platforms such as Instagram, TikTok, and YouTube Shorts.",
    "When I’m not working, you’ll probably find me watching content about cars, enjoying a proper Brazilian BBQ and the summer. So, if you need help with creating a video, feel free to reach out!",
  ],
};

// Contact form. Your email is never in the page: messages go through Web3Forms to your inbox.
// Get a free access key at https://web3forms.com (enter your email, they send the key) and paste it below.
const CONTACT_FORM = {
  web3formsKey: "w3f_4a32c51422376b040f30f717cf37a732b845702835e0ccb8",
  endpoint: "https://api.w3forms.com/submit",
  subject: "New message from luizstrina.com",
  services: ["YouTube editing", "Reels / TikTok / Shorts", "Short film / narrative", "Social show", "Shooting + editing", "Something else"],
  budgets: ["Not sure yet", "Under $200", "$200 – $500", "$500 – $1,000", "$1,000 – $2,000", "$2,000+"],
};

const CONTACT = {
  heading: "Get in Touch",
  text: "Hey, nice to see you here! Drop me a message about your project and I’ll get back to you!",
  photo: "assets/img/headshot.webp",
};

// Selected Work on the homepage. Big category names filter the grid; hovering one plays a preview clip.
// key must match a project's tag. clip = video + start time (#t=seconds); shape = preview frame (yt, film, social).
const WORK_FILTERS = [
  { key: "YouTube", title: "YouTube", clip: "assets/video/reel-2025.mp4#t=6", poster: "assets/img/cantomando.webp", shape: "yt" },
  { key: "Narrative", title: "Narrative", clip: "assets/video/thelma-louise.mp4#t=60", poster: "assets/img/thelma-louise-poster.jpg", shape: "film" },
  { key: "Social", title: "Social Content", clip: "assets/video/watchparty.mp4#t=8", poster: "assets/img/watchparty-poster.jpg", shape: "social" },
  // Shows you create end to end (concept → shooting → editing). Add a clip/poster once the Known Four videos are in.
  { key: "Social Show", title: "Social Show" },
];

// "All work" shows only this many YouTube videos (the first ones in PROJECTS); the YouTube filter shows them all
const ALL_YOUTUBE_LIMIT = 3;

// Every project in the Selected Work grid, and its page (project.html?p=<id>).
// Horizontal videos show in the top grid; vertical: true puts a video in the 9:16 grid below.
// tag: "YouTube", "Narrative", "Social" or "Social Show".

const PROJECTS = [
  { id: "spiciest-food", title: "Which Country has the SPICIEST food?", client: "CantoMando", clientPage: "cantomando", tag: "YouTube",
    still: "https://i.ytimg.com/vi/zx1aLl67tuk/maxresdefault.jpg", youtube: "zx1aLl67tuk",
    credits: ["Platform: YouTube", "Channel: CantoMando", "Role: Editor"] },
  { id: "thelma-louise", title: "Thelma & Louise", client: "Film Farm", tag: "Narrative",
    still: "assets/img/thelma-louise-poster.jpg", video: "assets/video/thelma-louise.mp4", wide: true,
    credits: ["Producer: Film Farm", "Role: Editor"] },
  { id: "world-series-watch-party", title: "Rogers Centre World Series Watch Party", client: "Offside", clientPage: "offside", tag: "Social",
    still: "assets/img/watchparty-poster.jpg", video: "assets/video/watchparty.mp4", vertical: true,
    credits: ["Platform: Instagram, TikTok, Facebook", "Channel: Offside", "Role: Editor"] },
  { id: "long-point", title: "Toronto’s Tiny Traveller - Long Point", client: "Curiocity", clientPage: "curiocity", tag: "Social",
    still: "assets/img/longpoint-poster.jpg", video: "assets/video/longpoint.mp4", vertical: true,
    credits: ["Platform: Instagram", "Channel: Curiocity Toronto", "Role: Editor"] },
  { id: "alfies", title: "Alfie’s Sandwiches+Market", client: "Dished", clientPage: "dished", tag: "Social",
    still: "assets/img/alfies-poster.jpg", video: "assets/video/alfies.mp4", vertical: true,
    credits: ["Platform: Instagram, TikTok", "Channel: Dished Toronto", "Role: Editor + Videographer"] },
  { id: "coffee-party", title: "Toronto’s Coffee Party", client: "CULTR", clientPage: "cultr", tag: "Social",
    still: "assets/img/coffee-party-poster.jpg", video: "assets/video/coffee-party.mp4", vertical: true,
    credits: ["Platform: Instagram", "Channel: CULTR Toronto", "Role: Editor"] },
  { id: "valorant-masters", title: "Valorant Masters Toronto 2025 Finals", client: "Offside", clientPage: "offside", tag: "Social",
    still: "assets/img/valorant-poster.jpg", video: "assets/video/valorant.mp4", vertical: true,
    credits: ["Platform: Instagram", "Channel: Offside", "Role: Videographer/Editor"] },
  { id: "oroshi", title: "Oroshi Fish Co.", client: "Dished", clientPage: "dished", tag: "Social",
    still: "assets/img/oroshi-poster.jpg", video: "assets/video/oroshi.mp4", vertical: true,
    credits: ["Platform: Instagram, TikTok", "Channel: Dished Toronto", "Role: Editor"] },
  { id: "grandpa-first-meal", title: "Giving a Chinese Grandpa his First Chinese Meal in 80 Years", client: "CantoMando", clientPage: "cantomando", tag: "YouTube",
    still: "https://i.ytimg.com/vi/abi9YzdjSp0/maxresdefault.jpg", youtube: "abi9YzdjSp0",
    credits: ["Platform: YouTube", "Channel: CantoMando", "Role: Editor"] },
  { id: "dim-sum-students", title: "American Students try Dim Sum for the First Time!", client: "CantoMando", clientPage: "cantomando", tag: "YouTube",
    still: "https://i.ytimg.com/vi/oV1CR1lWTBg/maxresdefault.jpg", youtube: "oV1CR1lWTBg",
    credits: ["Platform: YouTube", "Channel: CantoMando", "Role: Editor"] },
  { id: "noodle-master-pasta", title: "Chinese Noodle Master tries Italian Pasta for the first time", client: "CantoMando", clientPage: "cantomando", tag: "YouTube",
    still: "https://i.ytimg.com/vi/HetTjiD5vV8/maxresdefault.jpg", youtube: "HetTjiD5vV8",
    credits: ["Platform: YouTube", "Channel: CantoMando", "Role: Editor"] },
  { id: "cowboy-hotpot", title: "Cowboy tries Chinese Hotpot for the First Time", client: "CantoMando", clientPage: "cantomando", tag: "YouTube",
    still: "https://i.ytimg.com/vi/VVlwBDVzIsI/maxresdefault.jpg", youtube: "VVlwBDVzIsI",
    credits: ["Platform: YouTube", "Channel: CantoMando", "Role: Editor"] },
  { id: "baker-french-pastries", title: "Chinese Baker tries French Pastries for the first time!", client: "CantoMando", clientPage: "cantomando", tag: "YouTube",
    still: "https://i.ytimg.com/vi/s1wbT82Vg1k/maxresdefault.jpg", youtube: "s1wbT82Vg1k",
    credits: ["Platform: YouTube", "Channel: CantoMando", "Role: Editor"] },
  { id: "wonderland-alpenfury", title: "Canada’s Wonderland AlpenFury Preview", client: "CULTR", clientPage: "cultr", tag: "Social",
    still: "assets/img/wonderland-poster.jpg", video: "assets/video/wonderland.mp4", vertical: true,
    credits: ["Platform: Instagram", "Channel: CULTR Toronto", "Role: Editor"] },
  { id: "rockin-rick", title: "Rockin Rick Blue Jays Drummer - Profile", client: "Offside", clientPage: "offside", tag: "Social",
    still: "assets/img/rockin-rick-poster.jpg", video: "assets/video/rockin-rick.mp4", vertical: true,
    credits: ["Platform: Instagram", "Channel: Offside", "Role: Editor"] },
  { id: "bluejays-ga", title: "Best Spot to Watch a Blue Jays Game With a GA Ticket", client: "Offside", clientPage: "offside", tag: "Social",
    still: "assets/img/bluejays-ga-poster.jpg", video: "assets/video/bluejays-ga.mp4", vertical: true,
    credits: ["Platform: Instagram", "Channel: Offside", "Role: Host/Videographer/Editor"] },
];

/* ---------- Homepage: pitch, numbers, clients, timeline ---------- */

// Pitch under the hero: "I edit ___ people watch to the end." The highlighted word rotates through these.
const PITCH = {
  words: ["YouTube videos", "Reels", "TikToks", "short films", "social shows"],
  sub: "Video editor and videographer in Toronto, from the first cut to the final export.",
};

// "Years editing" updates itself every January: years since you started editing professionally
const EDITING_SINCE = 2020;

// Numbers strip ("render queue" style). value counts up when it scrolls into view.
const STATS = [
  { value: 700, suffix: "+", label: "videos edited", file: "EDITED_ALL.mp4" },
  { value: 50, suffix: "M+", label: "views on Instagram & TikTok", file: "VIEWS_SOCIAL.mp4" },
  { value: 11, suffix: "M+", label: "views on YouTube", file: "VIEWS_YOUTUBE.mp4" },
  { value: 13, suffix: "", label: "brands & channels", file: "CLIENTS.prproj" },
  { value: new Date().getFullYear() - EDITING_SINCE, suffix: "+", label: "years editing", file: "YEARS_EDITING.mp4" },
];

// "Who I've edited for". link = client page; thumb = frame shown on hover (optional).
const CLIENT_LIST = [
  { name: "blogTO", role: "Producing, shooting & editing", years: "Aug 2023 – today", what: "Toronto food, events and city stories for Instagram & TikTok.", link: "work.html?c=blogto" },
  { name: "Known Four", role: "Editing", years: "2025 – today", what: "Social guessing-game show, “Guess what they’re known for”, hosted by @tpatzz.", link: "work.html?c=knownfour" },
  { name: "CantoMando", role: "Editing", years: "Sep 2024 – 2025", what: "Long-form YouTube food & culture videos: story, pacing, music, SFX and graphics.", link: "work.html?c=cantomando", thumb: "https://i.ytimg.com/vi/zx1aLl67tuk/hqdefault.jpg" },
  { name: "Curiocity Toronto", role: "Producing, shooting & editing", years: "Mar 2024 – today", what: "Travel and city guides for Instagram & TikTok, like Toronto’s Tiny Traveller.", link: "work.html?c=curiocity", thumb: "assets/img/longpoint-poster.jpg" },
  { name: "Offside", role: "Producing, shooting & editing", years: "Jan 2025 – today", what: "Sports culture: Blue Jays watch parties, Valorant Masters, Rockin’ Rick.", link: "work.html?c=offside", thumb: "assets/img/watchparty-poster.jpg" },
  { name: "Dished Toronto", role: "Producing, shooting & editing", years: "Oct 2023 – today", what: "Food reels: Best Kept Secret, Worth the Hype and restaurant features.", link: "work.html?c=dished", thumb: "assets/img/alfies-poster.jpg" },
  { name: "CULTR Toronto", role: "Producing, shooting & editing", years: "Feb 2025 – today", what: "Culture and events: Canada’s Wonderland, Coffee Party, St. Lawrence Market.", link: "work.html?c=cultr", thumb: "assets/img/coffee-party-poster.jpg" },
  { name: "Film Farm", role: "Editing", years: "Jan 2025", what: "Thelma & Louise, a narrative short film.", link: "project.html?p=thelma-louise", thumb: "assets/img/thelma-louise-poster.jpg" },
];

// Career timeline ("So far"), oldest first
const TIMELINE = [
  { date: "2011", text: "Shot my first video" },
  { date: "2012", text: "Edited my first video" },
  { date: "2015", text: "Started taking editing gigs" },
  { date: "Jun 2018", text: "Graduated in Design (university)" },
  { date: "Feb 2020", text: "Finished a postgrad in Filmmaking" },
  { date: "Mar 2020", text: "Started my first YouTube channel" },
  { date: "Sep 2021", text: "Moved to Toronto" },
  { date: "Apr 2023", text: "Graduated in Media Communications at Humber" },
  { date: "Aug 2023", text: "Started at Curiocity Media Group / ZoomerMedia" },
  { date: "Sep 2024", text: "Started editing for CantoMando" },
  { date: "Jan 2025", text: "Edited my first short film: Thelma & Louise for Film Farm" },
  { date: "Jan 2025", text: "Crossed 500 videos edited" },
  { date: "Mar 2025", text: "“Which Country has the SPICIEST food?” comes out, now at 7.4M views" },
  { date: "Jan 2026", text: "Started making my own content on Instagram" },
  { date: "Jun 2026", text: "Crossed 700 videos edited" },
];
