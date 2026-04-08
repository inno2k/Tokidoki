async function loadTrip() {
  const response = await fetch("./assets/data/tokyo-family-trip-2026.json");
  if (!response.ok) {
    throw new Error(`Failed to load trip data: ${response.status}`);
  }
  return response.json();
}

let tripMap;
let mapMarkers = [];
let routeLine;

function normalizeStationName(value) {
  return value.replace(/\s+Station$/i, "").trim();
}

function transitUrl(from, to) {
  const normalizedFrom = normalizeStationName(from);
  const normalizedTo = normalizeStationName(to);
  return `https://transit.yahoo.co.jp/search/result/${encodeURIComponent(`${normalizedFrom}-${normalizedTo}`)}`;
}

function mapRouteUrl(from, to) {
  const normalizedFrom = normalizeStationName(from);
  const normalizedTo = normalizeStationName(to);
  return `https://map.yahoo.co.jp/route/train?from=${encodeURIComponent(normalizedFrom)}&to=${encodeURIComponent(normalizedTo)}`;
}

function todoKey(day, index) {
  return `tokidoki-todo-${day}-${index}`;
}

function renderTodoList(dayLabel, todos = []) {
  if (!todos.length) {
    return "";
  }

  return `
    <div class="todo-list">
      ${todos.map((todo, index) => {
        const checked = localStorage.getItem(todoKey(dayLabel, index)) === "1";
        return `
          <label class="todo-item ${checked ? "done" : ""}">
            <input type="checkbox" data-day="${dayLabel}" data-index="${index}" ${checked ? "checked" : ""}/>
            <span>${todo}</span>
          </label>
        `;
      }).join("")}
    </div>
  `;
}

function renderTimelineItem(item) {
  const typeLabel = item.type === "meal"
    ? "Meal"
    : item.type === "attraction"
      ? "Attraction"
      : "Move";

  const links = item.from && item.to ? `
    <div class="timeline-links">
      <a class="timeline-link" href="${mapRouteUrl(item.from, item.to)}" target="_blank" rel="noreferrer">Yahoo Map 루트</a>
      <a class="timeline-link" href="${transitUrl(item.from, item.to)}" target="_blank" rel="noreferrer">Yahoo 노선정보</a>
    </div>
  ` : "";

  const meta = [];
  if (item.meal) {
    meta.push(`식사: ${item.meal.name}`);
    meta.push(`예산: ${item.meal.budget}`);
    meta.push(`추천: ${item.meal.picks}`);
  }
  if (item.attraction) {
    meta.push(`어트렉션: ${item.attraction.name}`);
    meta.push(`포인트: ${item.attraction.why}`);
    if (item.attraction.budget) {
      meta.push(`예산: ${item.attraction.budget}`);
    }
  }

  return `
    <article class="timeline-item">
      <div class="timeline-head">
        <span class="timeline-time">${item.time}</span>
        <span class="timeline-type">${typeLabel}</span>
      </div>
      <h4 class="timeline-title">${item.title}</h4>
      <p>${item.detail}</p>
      ${meta.length ? `<div class="timeline-meta">${meta.map((line) => `<span>${line}</span>`).join("")}</div>` : ""}
      ${links}
    </article>
  `;
}

function attachTodoHandlers() {
  document.querySelectorAll(".todo-item input").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      localStorage.setItem(todoKey(checkbox.dataset.day, checkbox.dataset.index), checkbox.checked ? "1" : "0");
      checkbox.closest(".todo-item").classList.toggle("done", checkbox.checked);
    });
  });
}

/**
 * Adds a decorative sakura overlay that stays behind content and respects reduced motion.
 */
function createSakuraLayer() {
  const root = document.getElementById("sakura-layer");
  if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const petalCount = window.innerWidth < 720 ? 24 : 36;
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < petalCount; index += 1) {
    const petal = document.createElement("div");
    petal.className = "sakura-petal";
    petal.style.setProperty("--start-x", `${Math.random() * 100}%`);
    petal.style.setProperty("--petal-size", `${7 + Math.random() * 7}px`);
    petal.style.setProperty("--petal-opacity", `${0.64 + Math.random() * 0.2}`);
    petal.style.setProperty("--fall-duration", `${16 + Math.random() * 10}s`);
    petal.style.setProperty("--fall-delay", `${Math.random() * -22}s`);
    petal.style.setProperty("--spin-duration", `${4.2 + Math.random() * 2.8}s`);
    petal.style.setProperty("--drift", `${14 + Math.random() * 10}vw`);

    const blossom = document.createElement("div");
    blossom.className = "sakura-blossom";
    petal.appendChild(blossom);
    fragment.appendChild(petal);
  }

  root.replaceChildren(fragment);
}

function fillHero(data) {
  document.getElementById("hero-kicker").textContent = data.hero.kicker;
  document.getElementById("hero-title").textContent = data.hero.title;
  document.getElementById("hero-summary").textContent = data.hero.summary;
  document.getElementById("hero-meta").innerHTML = data.hero.meta.map((item) => `
    <div>
      <span class="meta-label">${item.label}</span>
      <strong>${item.value}</strong>
    </div>
  `).join("");
  document.getElementById("hero-stats").innerHTML = data.hero.stats.map((item) => `
    <div class="stat-card ${item.accent ? "accent" : ""}">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </div>
  `).join("");
}

function fillIntro(data) {
  document.getElementById("trip-lens").innerHTML = data.tripLens.map((item) => `<li>${item}</li>`).join("");
  document.getElementById("memory-angle").textContent = data.memoryAngle;
}

function renderTeam(data) {
  document.getElementById("team-grid").innerHTML = data.team.map((member) => `
    <article class="team-card">
      <span class="role">${member.role}</span>
      <h3>${member.title}</h3>
      <p>${member.summary}</p>
      <div class="tag-row">
        ${member.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderComms(data) {
  document.getElementById("comm-feed").innerHTML = data.comms.map((item) => `
    <article class="comm-item">
      <div class="comm-route">${item.route}</div>
      <div class="comm-body">${item.body}</div>
    </article>
  `).join("");
}

function renderPhotos(data) {
  document.getElementById("photo-grid").innerHTML = data.photos.map((photo) => `
    <article class="photo-card">
      <img src="${photo.image}" alt="${photo.alt}" loading="lazy" />
      <div class="photo-copy">
        <small class="section-label">${photo.label}</small>
        <h3>${photo.title}</h3>
        <p>${photo.description}</p>
        <span class="photo-credit">Photo: <a href="${photo.creditUrl}" target="_blank" rel="noreferrer">${photo.credit}</a></span>
      </div>
    </article>
  `).join("");
}

function renderItinerary(data) {
  document.getElementById("itinerary-grid").innerHTML = data.itinerary.map((item) => `
    <article class="day-card">
      <div class="day-top">
        <div>
          <div class="day-label">${item.day} · ${item.label}</div>
          <h3>${item.title}</h3>
        </div>
        <div class="day-time">${item.time}</div>
      </div>
      <p>${item.summary}</p>
      <div class="route-list">
        ${item.route.map((step) => `<span>${step}</span>`).join("")}
      </div>
      <div class="micro-list">
        ${item.notes.map((note) => `<span>${note}</span>`).join("")}
      </div>
      ${renderTodoList(item.day, item.todos)}
      ${item.timeline ? `<div class="timeline-list">${item.timeline.map(renderTimelineItem).join("")}</div>` : ""}
    </article>
  `).join("");
  attachTodoHandlers();
}

function renderOptions(data) {
  document.getElementById("option-grid").innerHTML = data.options.map((item) => `
    <article class="option-card">
      <div class="option-top">
        <div>
          <div class="option-label">${item.label}</div>
          <h3>${item.title}</h3>
        </div>
        <div class="option-pill">${item.pill}</div>
      </div>
      <p>${item.summary}</p>
      <div class="micro-list">
        ${item.list.map((entry) => `<span>${entry}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderMapToolbar(data) {
  const root = document.getElementById("map-toolbar");
  const days = ["all", ...new Set(data.mapPoints.map((point) => point.day))];
  root.innerHTML = days.map((day, index) => `
    <button class="${index === 0 ? "active" : ""}" data-day="${day}">
      ${day === "all" ? "전체" : day}
    </button>
  `).join("");

  root.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      root.querySelectorAll("button").forEach((el) => el.classList.remove("active"));
      button.classList.add("active");
      drawMapPoints(data, button.dataset.day);
    });
  });
}

function renderPhrases(data) {
  const root = document.getElementById("phrase-grid");
  if (!root || !data.phrasesByDay) {
    return;
  }

  root.innerHTML = data.phrasesByDay.map((group) => `
    <article class="phrase-card">
      <span class="day-badge">${group.day}</span>
      <h3>${group.title}</h3>
      <p>${group.summary}</p>
      <div class="phrase-list">
        ${group.phrases.map((phrase) => `
          <div class="phrase-item">
            <strong>${phrase.scene}</strong>
            <div class="phrase-jp">${phrase.jp}</div>
            <div class="phrase-romaji">${phrase.romaji}</div>
            <div class="phrase-ko">${phrase.ko}</div>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function renderOpsCards(data, key, targetId) {
  const root = document.getElementById(targetId);
  if (!root || !data[key]) {
    return;
  }

  root.innerHTML = data[key].map((item) => `
    <article class="ops-card">
      <span class="day-badge">${item.label}</span>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <ul>
        ${item.items.map((line) => `<li>${line}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

function renderMaps(data) {
  document.getElementById("map-grid").innerHTML = data.mapAnchors.map((item) => `
    <article class="map-card">
      <small>${item.day}</small>
      <h3>${item.name}</h3>
      <p>${item.note}</p>
      <div class="map-links">
        <a class="map-link" href="${item.google}" target="_blank" rel="noreferrer">Google Maps</a>
        <a class="map-link" href="${item.osm}" target="_blank" rel="noreferrer">OpenStreetMap</a>
      </div>
    </article>
  `).join("");
}

function initMap(data) {
  if (!window.L) {
    return;
  }

  tripMap = L.map("trip-map", {
    zoomControl: true,
    scrollWheelZoom: false
  }).setView(data.mapCenter, data.mapZoom);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(tripMap);

  renderMapToolbar(data);
  drawMapPoints(data, "all");
}

function drawMapPoints(data, selectedDay) {
  if (!tripMap) {
    return;
  }

  mapMarkers.forEach((marker) => tripMap.removeLayer(marker));
  mapMarkers = [];

  if (routeLine) {
    tripMap.removeLayer(routeLine);
  }

  const points = selectedDay === "all"
    ? data.mapPoints
    : data.mapPoints.filter((point) => point.day === selectedDay);

  const latlngs = [];

  points.forEach((point) => {
    const marker = L.circleMarker(point.coords, {
      radius: 8,
      weight: 2,
      color: "#944123",
      fillColor: point.highlight ? "#d26a42" : "#6f8c61",
      fillOpacity: 0.9
    }).addTo(tripMap);

    marker.bindPopup(`
      <strong>${point.name}</strong><br/>
      ${point.day}<br/>
      ${point.note}<br/>
      <a href="${point.google}" target="_blank" rel="noreferrer">Google Maps</a>
    `);

    mapMarkers.push(marker);
    latlngs.push(point.coords);
  });

  if (latlngs.length > 1) {
    routeLine = L.polyline(latlngs, {
      color: "#3c5d53",
      weight: 4,
      opacity: 0.7,
      dashArray: "7 8"
    }).addTo(tripMap);
    tripMap.fitBounds(routeLine.getBounds(), { padding: [30, 30] });
  } else if (latlngs.length === 1) {
    tripMap.setView(latlngs[0], 12);
  }
}

function renderBudgetSwitch(data) {
  const root = document.getElementById("budget-switch");
  const keys = Object.keys(data.budgets);
  root.innerHTML = keys.map((key, index) => `
    <button class="${index === 1 ? "active" : ""}" data-budget="${key}">
      ${data.budgets[key].name}
    </button>
  `).join("");

  root.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      root.querySelectorAll("button").forEach((el) => el.classList.remove("active"));
      button.classList.add("active");
      renderBudgetPanel(data, button.dataset.budget);
    });
  });
}

function renderBudgetPanel(data, key) {
  const budget = data.budgets[key];
  document.getElementById("budget-panel").innerHTML = `
    <div class="budget-summary">
      <div>
        <p class="section-label">Family Local Spend</p>
        <h3>${budget.name}</h3>
        <div class="price-display">
          <strong>${budget.total}</strong>
          <span>가족 3인 현지 체류비</span>
        </div>
        <p>${budget.description}</p>
        <p class="budget-line" style="border-bottom: 0; padding-bottom: 0;">
          <span>설계 메모</span>
          <strong>${budget.note}</strong>
        </p>
      </div>
      <div class="budget-lines">
        ${budget.lines.map(([label, price]) => `
          <div class="budget-line">
            <span>${label}</span>
            <strong>${price}</strong>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderFood(data) {
  document.getElementById("nostalgia-list").innerHTML = data.nostalgiaFoods.map((item) => `<li>${item}</li>`).join("");
  document.getElementById("verified-list").innerHTML = data.verifiedFoods.map((item) => `
    <div class="verified-item">
      <strong>${item.name}</strong>
      <p>${item.detail}</p>
      <a href="${item.link}" target="_blank" rel="noreferrer">운영 정보 보기</a>
    </div>
  `).join("");
}

function renderGuide(data) {
  document.getElementById("guide-grid").innerHTML = data.guideNotes.map((item) => `
    <article class="guide-card">
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join("");
}

function renderSources(data) {
  document.getElementById("sources-list").innerHTML = data.sources.map((item) => `
    <article class="source-card">
      <strong>${item.title}</strong>
      <p>${item.note}</p>
      <a href="${item.url}" target="_blank" rel="noreferrer">${item.url}</a>
    </article>
  `).join("");
  document.getElementById("recheck-note").textContent = data.recheckNote;
}

async function main() {
  try {
    const data = await loadTrip();
    createSakuraLayer();
    fillHero(data);
    fillIntro(data);
    renderTeam(data);
    renderComms(data);
    renderPhotos(data);
    renderItinerary(data);
    renderPhrases(data);
    renderOpsCards(data, "reservationOps", "reservation-grid");
    renderOpsCards(data, "familyComfortOps", "comfort-grid");
    renderOpsCards(data, "memoryMissions", "memory-grid");
    renderOptions(data);
    renderMaps(data);
    initMap(data);
    renderBudgetSwitch(data);
    renderBudgetPanel(data, "balanced");
    renderFood(data);
    renderGuide(data);
    renderSources(data);
  } catch (error) {
    document.body.innerHTML = `<main style="padding:40px;font-family:sans-serif;"><h1>여행 데이터를 불러오지 못했습니다.</h1><p>${error.message}</p></main>`;
  }
}

main();
