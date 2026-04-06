async function loadTrip() {
  const response = await fetch("./assets/data/tokyo-family-trip-2026.json");
  if (!response.ok) {
    throw new Error(`Failed to load trip data: ${response.status}`);
  }
  return response.json();
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
    </article>
  `).join("");
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
    fillHero(data);
    fillIntro(data);
    renderTeam(data);
    renderComms(data);
    renderPhotos(data);
    renderItinerary(data);
    renderOptions(data);
    renderMaps(data);
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
