/* ══════════════════════════════════════════════════════
   HOSTELER RECORDS — app.js  v5
   SPEED FIX: All CORS proxies fire in PARALLEL.
   Promise.any() resolves with the FIRST success —
   so load time = fastest proxy, not slowest.
   Previous version tried each one sequentially and
   waited for full timeout before trying the next.
══════════════════════════════════════════════════════ */

const SHEET_CSV =
  "https://docs.google.com/spreadsheets/d/e/" +
  "2PACX-1vQU5qmeMbH_XTbOdilRG-yN1VzREzQbXRGvEFjL7iziBBigPqTmGwhHVOcqaElP8YDJq15qM4BlvWLN/" +
  "pub?output=csv";

/* ── Column definitions ── */
const COL_DEF = {
  timestamp : { name:"Timestamp",                            idx:0 },
  name      : { name:"Name",                                 idx:1 },
  branch    : { name:"Branch",                               idx:2 },
  year      : { name:"Admission Year",                       idx:3 },
  hostel    : { name:"Hosteller in",                         idx:4 },
  contact   : { name:"Contact Detailed",                     idx:5 },
  email     : { name:"Email",                                idx:6 },
  photo     : { name:"Upload Your Profile Picture",          idx:7 },
  memory    : { name:"Hostel Memories & Message to Juniors", idx:8 },
};

let COL         = {};
let allStudents = [];
let filtered    = [];

/* ══════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  startTerminalAnim();
  fetchCSV();
  initLightbox();
  initControls();
  document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.shiftKey && e.key === "D") debugDump();
  });
});

/* ══════════════════════════════════════════════════════
   THEME  (dark / light)
══════════════════════════════════════════════════════ */
function initTheme() {
  const saved = localStorage.getItem("hr-theme") || "dark";
  applyTheme(saved, false);

  document.getElementById("themeToggle").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next    = current === "dark" ? "light" : "dark";
    applyTheme(next, true);
    localStorage.setItem("hr-theme", next);
  });
}

function applyTheme(theme, animate) {
  const root = document.documentElement;
  if (animate) {
    root.style.transition = "none"; // let CSS handle element transitions
  }
  root.setAttribute("data-theme", theme);

  // Update browser theme-color meta
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.content = theme === "dark" ? "#060810" : "#f0f4ff";
  }
}

/* ══════════════════════════════════════════════════════
   TERMINAL ANIMATION
══════════════════════════════════════════════════════ */
const TERM_MSGS = [
  "fetching records",
  "loading student data",
  "syncing with google sheets",
  "building directory",
  "decrypting profiles",
];

function startTerminalAnim() {
  const el = document.getElementById("termCmd");
  if (!el) return;
  let i = 0, c = 0, fwd = true;
  const tick = () => {
    const msg = TERM_MSGS[i % TERM_MSGS.length];
    if (fwd) {
      c++; el.textContent = msg.slice(0, c);
      if (c >= msg.length) { fwd = false; setTimeout(tick, 1600); return; }
    } else {
      c--; el.textContent = msg.slice(0, c);
      if (c === 0) { fwd = true; i++; }
    }
    setTimeout(tick, fwd ? 60 : 25);
  };
  tick();
}

function setTerm(msg) {
  const el = document.getElementById("termCmd");
  if (el) el.textContent = msg;
}

/* ══════════════════════════════════════════════════════
   FETCH CSV  — PARALLEL RACE (fastest wins)
══════════════════════════════════════════════════════ */
async function fetchCSV() {
  setTerm("connecting…");

  /*
   * Each proxy returns a Promise<string> with the CSV text.
   * We fire ALL of them simultaneously with Promise.any().
   * The first one that resolves successfully wins.
   * Failed promises are ignored unless ALL fail.
   *
   * This is MUCH faster than trying them one-by-one.
   */
  const proxyAttempts = [
    tryProxy(
      u => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
      async r => {
        const j = await r.json();
        if (!j?.contents) throw new Error("empty contents");
        return j.contents;
      }
    ),
    tryProxy(
      u => `https://corsproxy.io/?${encodeURIComponent(u)}`,
      r => r.text()
    ),
    tryProxy(
      u => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
      r => r.text()
    ),
  ];

  let csvText = null;
  try {
    csvText = await Promise.any(proxyAttempts);
    console.log("[HR] CSV loaded. Preview:", csvText.slice(0, 200));
  } catch (err) {
    // All proxies failed (AggregateError)
    console.error("[HR] All proxies failed:", err);
    showError("All 3 proxies failed simultaneously.\nSee F12 console. Try disabling ad blockers.");
    return;
  }

  if (!csvText || csvText.trim().length < 10) {
    showError("Received empty CSV response.");
    return;
  }

  processCSV(csvText);
}

/* Wrap a single proxy call — resolves with CSV text or rejects */
async function tryProxy(buildUrl, extract) {
  const url = buildUrl(SHEET_CSV);
  console.log("[HR] Trying:", url.slice(0, 60) + "…");
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await extract(res);
  if (!text || text.trim().length < 10) throw new Error("empty");
  return text;
}

/* ══════════════════════════════════════════════════════
   PARSE CSV
══════════════════════════════════════════════════════ */
function processCSV(text) {
  let rows = [], headers = [];

  if (window.Papa) {
    const r = Papa.parse(text.trim(), {
      header: true, skipEmptyLines: true,
      transformHeader: h => h.trim(),
    });
    rows    = r.data;
    headers = r.meta.fields || [];
    if (r.errors.length) console.warn("[HR] PapaParse warnings:", r.errors.slice(0, 3));
  } else {
    const p = fallbackParse(text);
    rows    = p.rows;
    headers = p.headers;
  }

  console.log("[HR] Headers:", headers);
  console.log("[HR] Rows:", rows.length);

  COL = resolveColumns(headers);
  console.log("[HR] Column map:", COL);

  allStudents = rows.filter(r => (r[COL.name] || "").trim());
  filtered    = [...allStudents];

  if (!allStudents.length) {
    showError(`Parsed OK but 0 students found.\nDetected headers:\n[${headers.join(", ")}]\n\nCheck COL_DEF names match your sheet headers exactly.`);
    return;
  }

  buildFilters();
  updateStats();
  renderCards(filtered);
  setTerm(`${allStudents.length} records loaded ✓`);
}

/* Map COL keys → actual CSV header strings */
function resolveColumns(headers) {
  const map = {};
  for (const [key, def] of Object.entries(COL_DEF)) {
    const exact = headers.find(h => h.toLowerCase().trim() === def.name.toLowerCase().trim());
    if (exact) { map[key] = exact; continue; }

    const word = def.name.split(" ")[0].toLowerCase();
    const part = headers.find(h => h.toLowerCase().includes(word));
    if (part) { map[key] = part; continue; }

    if (def.idx < headers.length) {
      console.warn(`[HR] "${key}" → index fallback: "${headers[def.idx]}"`);
      map[key] = headers[def.idx];
    } else {
      map[key] = "__MISSING__";
    }
  }
  return map;
}

/* Built-in CSV parser fallback */
function fallbackParse(raw) {
  const lines = [];
  let cur = "", inQ = false;
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i], nx = raw[i + 1];
    if (c === '"') {
      if (inQ && nx === '"') { cur += '"'; i++; }
      else { inQ = !inQ; }
    } else if ((c === '\r' || c === '\n') && !inQ) {
      if (c === '\r' && nx === '\n') i++;
      if (cur) { lines.push(cur); cur = ""; }
    } else { cur += c; }
  }
  if (cur.trim()) lines.push(cur);

  const split = line => {
    const cells = []; let cell = "", q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i], nx = line[i + 1];
      if (c === '"') {
        if (q && nx === '"') { cell += '"'; i++; }
        else { q = !q; }
      } else if (c === ',' && !q) { cells.push(cell.trim()); cell = ""; }
      else { cell += c; }
    }
    cells.push(cell.trim());
    return cells;
  };

  if (!lines.length) return { headers: [], rows: [] };
  const headers = split(lines[0]).map(h => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const vals = split(lines[i]);
    const obj  = {};
    headers.forEach((h, idx) => { obj[h] = (vals[idx] || "").trim(); });
    rows.push(obj);
  }
  return { headers, rows };
}

/* ══════════════════════════════════════════════════════
   FILTERS & SEARCH
══════════════════════════════════════════════════════ */
function buildFilters() {
  const yf = document.getElementById("yearFilter");
  const bf = document.getElementById("branchFilter");
  uniq(allStudents.map(s => s[COL.year])).sort()
    .forEach(y => yf.appendChild(new Option("Batch " + y, y)));
  uniq(allStudents.map(s => s[COL.branch])).sort()
    .forEach(b => bf.appendChild(new Option(b, b)));
}

function initControls() {
  const si = document.getElementById("searchInput");
  const yf = document.getElementById("yearFilter");
  const bf = document.getElementById("branchFilter");
  const cl = document.getElementById("clearSearch");
  const rs = document.getElementById("resetFilters");

  const apply = () => {
    const q  = si.value.toLowerCase().trim();
    const yr = yf.value;
    const br = bf.value;
    cl.classList.toggle("visible", q.length > 0);

    filtered = allStudents.filter(s => {
      const hay = [
        s[COL.name], s[COL.branch], s[COL.year],
        s[COL.hostel], s[COL.memory], s[COL.contact],
      ].join(" ").toLowerCase();
      return (!q || hay.includes(q)) &&
             (!yr || s[COL.year]   === yr) &&
             (!br || s[COL.branch] === br);
    });

    renderCards(filtered);
    updateResultsBar(q, yr, br);
  };

  si.addEventListener("input",  apply);
  yf.addEventListener("change", apply);
  bf.addEventListener("change", apply);
  cl.addEventListener("click", () => { si.value = ""; apply(); si.focus(); });
  rs.addEventListener("click", () => { si.value = ""; yf.value = ""; bf.value = ""; apply(); });
}

function updateStats() {
  setEl("totalCount",  allStudents.length);
  setEl("branchCount", uniq(allStudents.map(s => s[COL.branch])).length);
  setEl("yearCount",   uniq(allStudents.map(s => s[COL.year])).length);
}

function updateResultsBar(q, yr, br) {
  const bar = document.getElementById("resultsBar");
  if (!q && !yr && !br) { bar.textContent = ""; return; }
  const parts = [];
  if (q)  parts.push(`"${q}"`);
  if (yr) parts.push(`Year: ${yr}`);
  if (br) parts.push(`Branch: ${br}`);
  bar.textContent = `${filtered.length} of ${allStudents.length} students  ·  ${parts.join("  ")}`;
}

/* ══════════════════════════════════════════════════════
   RENDER
══════════════════════════════════════════════════════ */
function renderCards(data) {
  const grid  = document.getElementById("cardsGrid");
  const empty = document.getElementById("emptyState");
  grid.innerHTML = "";
  if (!data.length) { empty.style.display = "block"; return; }
  empty.style.display = "none";
  data.forEach((s, i) => grid.appendChild(makeCard(s, i)));
}

function makeCard(s, idx) {
  const name     = (s[COL.name]    || "").trim();
  const branch   = (s[COL.branch]  || "").trim();
  const year     = (s[COL.year]    || "—").trim();
  const hostel   = (s[COL.hostel]  || "").trim();
  const contact  = (s[COL.contact] || "").trim();
  const emailRaw = (s[COL.email]   || "").trim();
  const photoRaw = (s[COL.photo]   || "").trim();
  const memory   = (s[COL.memory]  || "").trim();

  const phone    = contact.replace(/\D/g, "");
  const email    = isEmail(emailRaw) ? emailRaw : "";
  const photoSrc = buildPhotoUrl(photoRaw);

  const card = document.createElement("div");
  card.className = "card";
  card.style.animationDelay = Math.min(idx * 0.05, 0.5) + "s";

  // Photo
  card.appendChild(makePhotoSection(photoSrc, name, year));

  // Body
  const body = document.createElement("div");
  body.className = "card-body";
  body.innerHTML = `
    <div class="card-name">${esc(name)}</div>
    ${branch ? `<div class="card-branch">
      <i class="fa fa-microchip" style="font-size:.6rem;opacity:.6;"></i>
      ${esc(branch)}
    </div>` : ""}
    ${hostel ? `<div class="card-info-row">
      <i class="fa fa-building card-info-icon"></i>
      <span>In: <strong style="color:var(--t1)">${esc(hostel)}</strong></span>
    </div>` : ""}
   
   ${memory ? `<div class="card-memory" onclick="toggleMemory(this)" title="Click to expand">"${esc(memory)}"</div>` : ""}
  `;
  card.appendChild(body);

  // Actions
  const act = document.createElement("div");
  act.className = "card-actions";
  act.appendChild(phone
    ? mkLink("btn-call", "fa-phone", "CALL", `tel:${phone}`)
    : mkDead("btn-call", "fa-phone", "CALL")
  );
  act.appendChild(phone
    ? mkLink("btn-whatsapp", "fa-brands fa-whatsapp", "WHATSAPP",
        `https://wa.me/91${phone}?text=${encodeURIComponent("Hi " + name + "! Found you on Hosteler Records 👋")}`)
    : mkDead("btn-whatsapp", "fa-brands fa-whatsapp", "WHATSAPP")
  );
  act.appendChild(email
    ? mkLink("btn-email", "fa-envelope", "EMAIL",
        `mailto:${email}?subject=${encodeURIComponent("Hello " + name + " — Hosteler Records")}`)
    : mkDead("btn-email", "fa-envelope", "EMAIL")
  );
  card.appendChild(act);
  return card;
}

/* ══════════════════════════════════════════════════════
   PHOTO
══════════════════════════════════════════════════════ */
function makePhotoSection(src, name, year) {
  const wrap  = document.createElement("div");
  wrap.className = "card-photo-wrap";

  const badge = document.createElement("div");
  badge.className = "year-badge";
  badge.textContent = year;
  wrap.appendChild(badge);

  if (src) {
    const img       = document.createElement("img");
    img.className   = "card-photo";
    img.alt         = name + " photo";
    img.loading     = "lazy";
    img.decoding    = "async";
    img.onerror     = () => {
      img.remove();
      wrap.insertBefore(makePlaceholder(name), badge);
    };
    img.src = src;

    const ov = document.createElement("div");
    ov.className = "photo-overlay";
    ov.innerHTML = `<div class="photo-overlay-chip"><i class="fa fa-expand-alt"></i>&nbsp;VIEW</div>`;

    wrap.appendChild(img);
    wrap.appendChild(ov);
    wrap.style.cursor = "pointer";
    wrap.addEventListener("click", () => openLightbox(src, name));
  } else {
    wrap.insertBefore(makePlaceholder(name), badge);
  }
  return wrap;
}

function makePlaceholder(name) {
  const ph = document.createElement("div");
  ph.className = "photo-placeholder";
  const init = name.trim().split(/\s+/).map(w => w[0] || "").slice(0, 2).join("").toUpperCase();
  ph.innerHTML = `
    <div class="placeholder-initials">${init || "?"}</div>
    <div class="placeholder-label">NO PHOTO</div>`;
  return ph;
}

/* ══════════════════════════════════════════════════════
   IMAGE URL  — wsrv.nl proxy (bypasses Drive CORS)
══════════════════════════════════════════════════════ */
function buildPhotoUrl(raw) {
  if (!raw || !raw.trim()) return "";

  // Direct image URL (not Drive)
  if (/\.(jpe?g|png|webp|gif|bmp)(\?|$)/i.test(raw) && !raw.includes("drive.google")) {
    return `https://wsrv.nl/?url=${encodeURIComponent(raw)}&w=600&output=webp`;
  }

  const id = getDriveId(raw);
  if (!id) { console.warn("[HR] No Drive ID in:", raw.slice(0, 80)); return ""; }

  // Drive direct URL → proxy through wsrv.nl
  const direct = `https://drive.google.com/uc?export=view&id=${id}`;
  return `https://wsrv.nl/?url=${encodeURIComponent(direct)}&w=600&output=webp`;
}

function getDriveId(url) {
  const pats = [
    /\/file\/d\/([a-zA-Z0-9_-]{15,})/,
    /[?&]id=([a-zA-Z0-9_-]{15,})/,
    /\/d\/([a-zA-Z0-9_-]{15,})/,
    /open\?id=([a-zA-Z0-9_-]{15,})/,
  ];
  for (const p of pats) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

/* ══════════════════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════════════════ */
function initLightbox() {
  const lb  = document.getElementById("lightbox");
  const bg  = document.getElementById("lbBackdrop");
  const btn = document.getElementById("lbClose");
  const close = () => lb.classList.remove("open");
  bg.addEventListener("click", close);
  btn.addEventListener("click", close);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && lb.classList.contains("open")) close();
  });
}

function openLightbox(src, name) {
  const lb   = document.getElementById("lightbox");
  const img  = document.getElementById("lbImg");
  const meta = document.getElementById("lbMeta");
  // Larger size for lightbox
  img.src        = src.replace("&w=600", "&w=1200");
  meta.innerHTML = `<span style="color:var(--cyan)">⬡</span>&nbsp;${esc(name.toUpperCase())}`;
  lb.classList.add("open");
}

/* ══════════════════════════════════════════════════════
   ERROR
══════════════════════════════════════════════════════ */
function showError(msg) {
  setTerm("failed ✗");
  document.getElementById("cardsGrid").innerHTML = `
    <div class="loading-wrap" style="gap:14px;max-width:500px;margin:0 auto;text-align:center;">
      <div style="font-size:2.4rem;">⚠️</div>
      <div class="loader-label" style="color:var(--orange);">COULD NOT LOAD RECORDS</div>
      <div style="font-size:.73rem;color:var(--t3);line-height:1.8;text-align:left;">
        <code style="color:rgba(255,107,0,.65);font-size:.66rem;white-space:pre-wrap">${esc(msg)}</code><br><br>
        <strong style="color:var(--t2)">Try:</strong><br>
        1. Open F12 → Console for error details.<br>
        2. Sheet must be published: File → Share → Publish to web → CSV.<br>
        3. Disable ad blockers — they block CORS proxies.<br>
        4. Use the 📋 Paste CSV button below.
      </div>
      <button onclick="location.reload()" style="
        padding:9px 20px;border-radius:9px;cursor:pointer;
        background:rgba(0,229,255,.1);border:1px solid rgba(0,229,255,.3);
        color:var(--cyan);font-family:monospace;font-size:.7rem;letter-spacing:.08em;">
        ↺ &nbsp;Retry
      </button>
    </div>`;
  const fb = document.getElementById("manualFallback");
  if (fb) fb.style.display = "block";
}

/* ══════════════════════════════════════════════════════
   MANUAL FALLBACK
══════════════════════════════════════════════════════ */
function toggleManualInput() {
  const b = document.getElementById("manualInputBox");
  if (b) b.style.display = b.style.display === "flex" ? "none" : "flex";
}
function closeManualInput() {
  const b = document.getElementById("manualInputBox");
  if (b) b.style.display = "none";
}
function loadManualCSV() {
  const ta = document.getElementById("manualCsvText");
  if (!ta || !ta.value.trim()) { alert("Paste CSV text first."); return; }
  processCSV(ta.value.trim());
  closeManualInput();
  const fb = document.getElementById("manualFallback");
  if (fb) fb.style.display = "none";
}

/* ══════════════════════════════════════════════════════
   DEBUG  Ctrl+Shift+D
══════════════════════════════════════════════════════ */
function debugDump() {
  const info = allStudents[0]
    ? `COL MAP:\n${JSON.stringify(COL, null, 2)}\n\nFIRST ROW:\n${JSON.stringify(allStudents[0], null, 2)}`
    : "No data loaded yet.";
  alert("[HOSTELER RECORDS DEBUG]\n\n" + info);
}

/* ══════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════ */
function mkLink(cls, icon, label, href) {
  const a = document.createElement("a");
  a.className = `action-btn ${cls}`;
  a.href = href; a.target = "_blank"; a.rel = "noopener noreferrer";
  a.innerHTML = `<i class="fa ${icon}"></i>${label}`;
  return a;
}
function mkDead(cls, icon, label) {
  const s = document.createElement("span");
  s.className = `action-btn ${cls} btn-disabled`;
  s.innerHTML = `<i class="fa ${icon}"></i>${label}`;
  return s;
}
function isEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s); }
function uniq(arr)  { return [...new Set(arr.filter(Boolean))]; }
function setEl(id, val) { const e = document.getElementById(id); if (e) e.textContent = val; }
function esc(s) {
  return String(s ?? "")
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}
function toggleMemory(el) {
  const expanded = el.classList.toggle("memory-expanded");
  el.title = expanded ? "Click to collapse" : "Click to expand";
}
