const APP_VERSION = "video-place-2";

let tripMap;
let mapMarkers = [];
let routeLine;
let currentWeatherMode = localStorage.getItem("tokidoki-weather-mode") || "clear";
let currentContentTab = localStorage.getItem("tokidoki-content-tab") || "overview";
let tabObserver;
let sectionObserver;
let navSyncFrame = null;

async function loadTrip() {
  const response = await fetch(`./assets/data/tokyo-family-trip-2026.json?v=${APP_VERSION}`);
  if (!response.ok) {
    throw new Error(`여행 데이터를 불러오지 못했습니다: ${response.status}`);
  }
  const trip = await response.json();
  const [foodResult, placeResult] = await Promise.allSettled([
    fetch(`./assets/data/video-food-picks-2026.json?v=${APP_VERSION}`),
    fetch(`./assets/data/video-place-expansions-2026.json?v=${APP_VERSION}`)
  ]);

  let videoFoodPicks = [];
  let itineraryExpansions = {};
  let guideNotesAppend = [];
  let mapPointsAppend = [];
  let mapAnchorsAppend = [];

  if (foodResult.status === "fulfilled" && foodResult.value.ok) {
    videoFoodPicks = await foodResult.value.json();
  }

  if (placeResult.status === "fulfilled" && placeResult.value.ok) {
    const placeData = await placeResult.value.json();
    itineraryExpansions = placeData.itineraryExpansions || {};
    guideNotesAppend = placeData.guideNotesAppend || [];
    mapPointsAppend = placeData.mapPointsAppend || [];
    mapAnchorsAppend = placeData.mapAnchorsAppend || [];
  }

  const mergedMapPoints = [...(trip.mapPoints || []), ...mapPointsAppend].sort(compareDayObjects);
  const mergedMapAnchors = [...(trip.mapAnchors || []), ...mapAnchorsAppend].sort(compareDayObjects);

  return {
    ...trip,
    guideNotes: [...(trip.guideNotes || []), ...guideNotesAppend],
    mapPoints: mergedMapPoints,
    mapAnchors: mergedMapAnchors,
    videoFoodPicks,
    itineraryExpansions
  };
}

function dayRank(day) {
  const match = String(day || "").match(/Day\s+(\d+)/i);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function compareDayObjects(left, right) {
  const dayCompare = dayRank(left?.day) - dayRank(right?.day);
  if (dayCompare !== 0) {
    return dayCompare;
  }

  const leftOrder = Number(left?.sortOrder ?? 0);
  const rightOrder = Number(right?.sortOrder ?? 0);
  if (leftOrder !== rightOrder) {
    return leftOrder - rightOrder;
  }
  return 0;
}

function normalizeStationName(value) {
  return String(value || "").replace(/\s+Station$/i, "").trim();
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

function opsKey(group, label, index) {
  return `tokidoki-ops-${group}-${label}-${index}`;
}

function timelineKey(day, index, mode = currentWeatherMode) {
  return `tokidoki-timeline-${day}-${mode}-${index}`;
}

function timelineSkipKey(day, index, mode = currentWeatherMode) {
  return `tokidoki-timeline-skip-${day}-${mode}-${index}`;
}

function optionalSpotKey(day, spotId) {
  return `tokidoki-optional-spot-${day}-${spotId}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function weatherModeLabel(mode) {
  if (mode === "rain") return "비 운영";
  if (mode === "fatigue") return "피곤 운영";
  return "맑음 운영";
}

function weatherVariantFor(item) {
  return item.weatherVariants?.[currentWeatherMode] || null;
}

function timelineFor(item) {
  if (currentWeatherMode !== "clear" && item.timelineVariants?.[currentWeatherMode]?.length) {
    return item.timelineVariants[currentWeatherMode];
  }
  return item.timeline || [];
}

function copyButton(value, label = "복사") {
  return `<button class="action-chip" type="button" data-copy="${escapeHtml(value)}">${label}</button>`;
}

function renderTrace(item) {
  if (!item?.owner && !item?.decision && !item?.outcome) {
    return "";
  }

  return `
    <div class="trace-box">
      ${item.owner ? `<div class="trace-line"><strong>담당</strong><span>${item.owner}</span></div>` : ""}
      ${item.decision ? `<div class="trace-line"><strong>판단</strong><span>${item.decision}</span></div>` : ""}
      ${item.outcome ? `<div class="trace-line"><strong>반영</strong><span>${item.outcome}</span></div>` : ""}
    </div>
  `;
}

function renderTodoList(dayLabel, todos = []) {
  if (!todos.length) {
    return "";
  }

  return `
    <div class="todo-list">
      ${todos
        .map((todo, index) => {
          const checked = localStorage.getItem(todoKey(dayLabel, index)) === "1";
          return `
            <label class="todo-item ${checked ? "done" : ""}">
              <input type="checkbox" data-day="${dayLabel}" data-index="${index}" ${checked ? "checked" : ""}/>
              <span>${todo}</span>
            </label>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderOpsChecklist(groupKey, label, items = []) {
  return `
    <div class="ops-checklist">
      ${items
        .map((item, index) => {
          const checked = localStorage.getItem(opsKey(groupKey, label, index)) === "1";
          return `
            <label class="todo-item ${checked ? "done" : ""}">
              <input type="checkbox" data-group="${groupKey}" data-label="${label}" data-index="${index}" ${checked ? "checked" : ""}/>
              <span>${item}</span>
            </label>
          `;
        })
        .join("")}
    </div>
  `;
}

function attachTodoHandlers() {
  document.querySelectorAll(".todo-item input[data-day]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      localStorage.setItem(todoKey(checkbox.dataset.day, checkbox.dataset.index), checkbox.checked ? "1" : "0");
      checkbox.closest(".todo-item").classList.toggle("done", checkbox.checked);
    });
  });
}

function attachOpsHandlers() {
  document.querySelectorAll(".ops-checklist input").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      localStorage.setItem(
        opsKey(checkbox.dataset.group, checkbox.dataset.label, checkbox.dataset.index),
        checkbox.checked ? "1" : "0"
      );
      checkbox.closest(".todo-item").classList.toggle("done", checkbox.checked);
    });
  });
}

function renderRiskBadges(items = []) {
  if (!items.length) {
    return "";
  }

  return `
    <div class="badge-row">
      ${items.map((item) => `<span class="risk-badge">${item}</span>`).join("")}
    </div>
  `;
}

function renderSupportList(title, items = [], className = "") {
  if (!items.length) {
    return "";
  }

  return `
    <div class="support-box ${className}">
      <strong>${title}</strong>
      <div class="micro-list">
        ${items.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </div>
  `;
}

function scrollToTabPanel(tab) {
  const panel = document.querySelector(`[data-tab-panel="${tab}"]`);
  if (!panel) {
    return;
  }

  const targetTop = panel.getBoundingClientRect().top + window.scrollY - currentStickyOffset();
  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: "smooth"
  });
}

function currentStickyOffset() {
  const tabBar = document.querySelector(".content-tabs");
  const jumpBar = document.querySelector(".section-jumpbar");
  return (tabBar?.offsetHeight || 0) + (jumpBar?.offsetHeight || 0) + 34;
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) {
    return;
  }

  const targetTop = section.getBoundingClientRect().top + window.scrollY - currentStickyOffset();
  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: "smooth"
  });
}

function scheduleNavigationSync() {
  if (navSyncFrame) {
    return;
  }

  navSyncFrame = window.requestAnimationFrame(() => {
    navSyncFrame = null;
    syncNavigationFromScroll();
  });
}

function syncNavigationFromScroll() {
  const panels = Array.from(document.querySelectorAll("[data-tab-panel]"));
  if (!panels.length) {
    return;
  }

  const line = window.scrollY + currentStickyOffset() + 16;
  let activePanel = panels[0];

  panels.forEach((panel) => {
    const top = panel.getBoundingClientRect().top + window.scrollY;
    if (top <= line) {
      activePanel = panel;
    }
  });

  const nextTab = activePanel.dataset.tabPanel;
  if (nextTab && nextTab !== currentContentTab) {
    setContentTab(nextTab, false, false);
  }

  const sections = panelSectionsFor(currentContentTab);
  if (!sections.length) {
    return;
  }

  let activeSection = sections[0];
  sections.forEach((section) => {
    const top = section.element.getBoundingClientRect().top + window.scrollY;
    if (top <= line) {
      activeSection = section;
    }
  });

  setActiveSectionChip(activeSection.id);
}

function revealAllTabPanels() {
  document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
    panel.hidden = false;
  });
}

function panelSectionsFor(tab) {
  const panel = document.querySelector(`[data-tab-panel="${tab}"]`);
  if (!panel) {
    return [];
  }

  if (tab === "itinerary") {
    return Array.from(panel.querySelectorAll("#plan .day-card")).map((card, index) => {
      if (!card.id) {
        card.id = `itinerary-day-${index + 1}`;
      }

      const customLabel = card.dataset.navLabel?.trim();
      const heading = card.querySelector(".day-label")?.textContent?.trim();
      const label = customLabel || heading || `Day ${index + 1}`;

      return {
        id: card.id,
        label,
        element: card
      };
    });
  }

  return Array.from(panel.querySelectorAll(":scope > .section")).map((section, index) => {
    if (!section.id) {
      section.id = `${tab}-section-${index + 1}`;
    }

    const customLabel = section.dataset.navLabel?.trim();
    const heading = section.querySelector(".section-head h2")?.textContent?.trim();
    const label = customLabel || heading || `섹션 ${index + 1}`;

    return {
      id: section.id,
      label,
      element: section
    };
  });
}

function setActiveSectionChip(sectionId) {
  document.querySelectorAll(".section-jumpbar button").forEach((button) => {
    const active = button.dataset.sectionTarget === sectionId;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "true" : "false");
  });
}

function initSectionObserver(tab) {
  if (sectionObserver) {
    sectionObserver.disconnect();
  }

  const sections = panelSectionsFor(tab);
  if (!sections.length) {
    return;
  }

  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible?.target?.id) {
        return;
      }

      setActiveSectionChip(visible.target.id);
    },
    {
      root: null,
      threshold: [0.2, 0.45, 0.7],
      rootMargin: `-${currentStickyOffset()}px 0px -45% 0px`
    }
  );

  sections.forEach((section) => sectionObserver.observe(section.element));
}

function renderSectionJumpbar(tab) {
  const root = document.getElementById("section-jumpbar");
  if (!root) {
    return;
  }

  const sections = panelSectionsFor(tab);
  if (!sections.length) {
    root.innerHTML = "";
    root.hidden = true;
    return;
  }

  root.hidden = false;
  root.innerHTML = `
    <div class="section-jumpbar-track">
      ${sections
        .map(
          (section, index) => `
            <button type="button" data-section-target="${section.id}" ${index === 0 ? 'aria-current="true"' : 'aria-current="false"'}>
              ${section.label}
            </button>
          `
        )
        .join("")}
    </div>
  `;

  root.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveSectionChip(button.dataset.sectionTarget);
      scrollToSection(button.dataset.sectionTarget);
    });
  });

  setActiveSectionChip(sections[0].id);
  initSectionObserver(tab);
  scheduleNavigationSync();
}

function setContentTab(tab, focusButton = false, shouldScroll = false) {
  currentContentTab = tab;
  localStorage.setItem("tokidoki-content-tab", currentContentTab);

  document.querySelectorAll("[data-content-tab]").forEach((button) => {
    const active = button.dataset.contentTab === currentContentTab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
    if (active && focusButton) {
      button.focus();
    }
  });

  renderSectionJumpbar(currentContentTab);

  if (shouldScroll) {
    scrollToTabPanel(tab);
  }
}

function initScrollSpy() {
  if (tabObserver) {
    tabObserver.disconnect();
  }

  if (sectionObserver) {
    sectionObserver.disconnect();
  }

  if (!window.__TOKIDOKI_SCROLL_SYNC_BOUND__) {
    window.addEventListener("scroll", scheduleNavigationSync, { passive: true });
    window.addEventListener("resize", scheduleNavigationSync);
    window.__TOKIDOKI_SCROLL_SYNC_BOUND__ = true;
  }
  scheduleNavigationSync();
}

function initContentTabs() {
  const buttons = Array.from(document.querySelectorAll("[data-content-tab]"));
  if (!buttons.length) {
    return;
  }

  const validTabs = new Set(buttons.map((button) => button.dataset.contentTab));
  if (!validTabs.has(currentContentTab)) {
    currentContentTab = "overview";
  }

  revealAllTabPanels();

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setContentTab(button.dataset.contentTab, false, true);
    });

    button.addEventListener("keydown", (event) => {
      const currentIndex = buttons.indexOf(button);
      if (event.key === "ArrowRight") {
        event.preventDefault();
        const next = buttons[(currentIndex + 1) % buttons.length];
        setContentTab(next.dataset.contentTab, true, true);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const prev = buttons[(currentIndex - 1 + buttons.length) % buttons.length];
        setContentTab(prev.dataset.contentTab, true, true);
      }
      if (event.key === "Home") {
        event.preventDefault();
        setContentTab(buttons[0].dataset.contentTab, true, true);
      }
      if (event.key === "End") {
        event.preventDefault();
        setContentTab(buttons[buttons.length - 1].dataset.contentTab, true, true);
      }
    });
  });

  setContentTab(currentContentTab, false, false);
  initScrollSpy();
}

function bindContentTabEvents() {
  if (window.__TOKIDOKI_TABS_BOUND__) {
    return;
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-content-tab]");
    if (!button) {
      return;
    }
    event.preventDefault();
    setContentTab(button.dataset.contentTab, false, true);
  });

  window.__TOKIDOKI_TABS_BOUND__ = true;
}

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
  document.getElementById("hero-meta").innerHTML = data.hero.meta
    .map(
      (item) => `
        <div>
          <span class="meta-label">${item.label}</span>
          <strong>${item.value}</strong>
        </div>
      `
    )
    .join("");
  document.getElementById("hero-stats").innerHTML = data.hero.stats
    .map(
      (item) => `
        <div class="stat-card ${item.accent ? "accent" : ""}">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </div>
      `
    )
    .join("");
}

function fillIntro(data) {
  document.getElementById("trip-lens").innerHTML = data.tripLens.map((item) => `<li>${item}</li>`).join("");
  document.getElementById("memory-angle").textContent = data.memoryAngle;
}

function renderTeam(data) {
  document.getElementById("team-grid").innerHTML = data.team
    .map(
      (member) => `
        <article class="team-card">
          <span class="role">${member.role}</span>
          <h3>${member.title}</h3>
          <p>${member.summary}</p>
          <div class="tag-row">
            ${member.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderComms(data) {
  document.getElementById("comm-feed").innerHTML = data.comms
    .map(
      (item, index) => `
        <article class="comm-item">
          <div class="comm-step">${String(index + 1).padStart(2, "0")}</div>
          <div class="comm-route">${item.route}</div>
          <div class="comm-body">${item.body}</div>
        </article>
      `
    )
    .join("");
}

function renderPhotos(data) {
  document.getElementById("photo-grid").innerHTML = data.photos
    .map(
      (photo) => `
        <article class="photo-card">
          <img src="${photo.image}" alt="${photo.alt}" loading="lazy" />
          <div class="photo-copy">
            <small class="section-label">${photo.label}</small>
            <h3>${photo.title}</h3>
            <p>${photo.description}</p>
            <span class="photo-credit">Photo: <a href="${photo.creditUrl}" target="_blank" rel="noreferrer">${photo.credit}</a></span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderTimelineItem(item, dayLabel, index) {
  const typeLabel = item.type === "meal" ? "식사" : item.type === "attraction" ? "어트랙션" : "이동";
  const done = localStorage.getItem(timelineKey(dayLabel, index)) === "1";
  const skipped = localStorage.getItem(timelineSkipKey(dayLabel, index)) === "1";

  const links =
    item.from && item.to
      ? `
        <div class="timeline-links">
          <a class="timeline-link" href="${mapRouteUrl(item.from, item.to)}" target="_blank" rel="noreferrer">Yahoo 지도 루트</a>
          ${copyButton(mapRouteUrl(item.from, item.to))}
          <a class="timeline-link" href="${transitUrl(item.from, item.to)}" target="_blank" rel="noreferrer">Yahoo 노선정보</a>
          ${copyButton(transitUrl(item.from, item.to))}
        </div>
      `
      : "";

  const meta = [];
  if (item.meal) {
    meta.push(`식당: ${item.meal.name}`);
    if (item.meal.genre) {
      meta.push(`장르: ${item.meal.genre}`);
    }
    meta.push(`예산: ${item.meal.budget}`);
    meta.push(`추천 주문: ${item.meal.picks}`);
    if (item.meal.reason) {
      meta.push(`선정 이유: ${item.meal.reason}`);
    }
  }
  if (item.attraction) {
    meta.push(`장소: ${item.attraction.name}`);
    meta.push(`이유: ${item.attraction.why}`);
    if (item.attraction.budget) {
      meta.push(`예산: ${item.attraction.budget}`);
    }
  }
  if (item.cutline) {
    meta.push(`복귀 기준: ${item.cutline}`);
  }
  if (item.fallback) {
    meta.push(`대체안: ${item.fallback}`);
  }

  return `
    <article class="timeline-item ${done ? "done" : ""} ${skipped ? "skipped" : ""}">
      <div class="timeline-head">
        <span class="timeline-time">${item.time}</span>
        <div class="timeline-head-meta">
          <span class="timeline-type">${typeLabel}</span>
          ${skipped ? `<span class="skip-state">패스됨</span>` : ""}
        </div>
      </div>
      <h4 class="timeline-title">${item.title}</h4>
      <p>${item.detail}</p>
      ${meta.length ? `<div class="timeline-meta">${meta.map((line) => `<span>${line}</span>`).join("")}</div>` : ""}
      ${links}
      <div class="timeline-actions">
        <button class="action-chip ${done ? "active" : ""}" type="button" data-timeline-day="${dayLabel}" data-timeline-index="${index}">
          ${done ? "완료됨" : "완료 표시"}
        </button>
        <button class="action-chip action-chip-skip ${skipped ? "active" : ""}" type="button" data-timeline-skip-day="${dayLabel}" data-timeline-skip-index="${index}">
          ${skipped ? "패스 취소" : "패스"}
        </button>
      </div>
    </article>
  `;
}

function renderItinerary(data) {
  document.getElementById("itinerary-grid").innerHTML = data.itinerary
    .map((item, dayIndex) => {
      const weatherVariant = weatherVariantFor(item);
      const expansion = data.itineraryExpansions?.[item.day];
      return `
        <article class="day-card" id="itinerary-day-${dayIndex + 1}" data-nav-label="${item.day}">
          <div class="day-top">
            <div>
              <div class="day-label">${item.day} · ${item.label}</div>
              <h3>${item.title}</h3>
            </div>
            <div class="day-time">${item.time}</div>
          </div>
          <p>${item.summary}</p>
          ${renderRiskBadges(item.riskBadges)}
          ${renderTrace(item)}
          <div class="route-list">
            ${item.route.map((step) => `<span>${step}</span>`).join("")}
          </div>
          ${item.mealFlow?.length ? renderSupportList("핵심 식사 흐름", item.mealFlow, "support-strong") : ""}
          ${renderSupportList("운영 포인트", item.notes)}
          ${item.comfortStop ? renderSupportList("회복 포인트", [item.comfortStop]) : ""}
          ${item.cutline ? renderSupportList("복귀 컷라인", [item.cutline], "support-strong") : ""}
          ${item.dinnerFallbacks?.length ? renderSupportList("저녁 대체안", item.dinnerFallbacks) : ""}
          ${item.mustRecheck?.length ? renderSupportList("당일 재확인", item.mustRecheck) : ""}
          ${
            weatherVariant
              ? `
                <div class="variant-panel">
                  <strong>${weatherModeLabel(currentWeatherMode)}</strong>
                  <p>${weatherVariant.summary}</p>
                  <div class="micro-list">
                    ${weatherVariant.items.map((line) => `<span>${line}</span>`).join("")}
                  </div>
                </div>
              `
              : ""
          }
          ${renderOptionalSpots(item.day, expansion)}
          ${renderTodoList(item.day, item.todos)}
          ${
            timelineFor(item).length
              ? `<div class="timeline-list">${timelineFor(item)
                  .map((entry, index) => renderTimelineItem(entry, item.day, index))
                  .join("")}</div>`
              : ""
          }
        </article>
      `;
    })
    .join("");
  attachTodoHandlers();
  attachTimelineHandlers();
  attachOptionalSpotHandlers();
  if (currentContentTab === "itinerary") {
    renderSectionJumpbar("itinerary");
  }
}

function renderWeatherSwitch(data) {
  const root = document.getElementById("weather-switch");
  if (!root) return;

  const modes = data.weatherModes || [
    ["clear", "맑음"],
    ["rain", "비"],
    ["fatigue", "피곤"]
  ];

  root.innerHTML = modes
    .map(
      ([key, label]) => `
        <button class="${currentWeatherMode === key ? "active" : ""}" type="button" data-weather="${key}" aria-pressed="${currentWeatherMode === key}">
          ${label}
        </button>
      `
    )
    .join("");

  root.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      currentWeatherMode = button.dataset.weather;
      localStorage.setItem("tokidoki-weather-mode", currentWeatherMode);
      renderWeatherSwitch(data);
      renderItinerary(data);
    });
  });
}

function renderOptions(data) {
  document.getElementById("option-grid").innerHTML = data.options
    .map(
      (item) => `
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
      `
    )
    .join("");
}

function renderOpsItems(items, targetId) {
  const root = document.getElementById(targetId);
  if (!root || !items?.length) {
    return;
  }

  const renderShoppingProducts = (products = []) => {
    if (!products.length) return "";
    return       `<div class="support-box support-strong">
        <strong>대표 상품 리스트</strong>
        <div class="product-grid">
          ${products
            .map(
              (product) => `
                <article class="product-card">
                  <h4>${product.name}</h4>
                  <div class="timeline-meta">
                    ${product.price ? `<span>가격 ${product.price}</span>` : ""}
                    ${product.store ? `<span>구매처 ${product.store}</span>` : ""}
                  </div>
                  ${product.note ? `<p>${product.note}</p>` : ""}
                  ${product.link ? `<div class="timeline-links"><a class="timeline-link" href="${product.link}" target="_blank" rel="noreferrer">상품·브랜드 보기</a>${copyButton(product.link)}</div>` : ""}
                </article>
              `
            )
            .join("")}
        </div>
      </div>`;
  };

  const renderShoppingDestinations = (destinations = []) => {
    if (!destinations.length) return "";
    return       `<div class="support-box">
        <strong>둘러볼 매장과 가는 방법</strong>
        <div class="destination-grid">
          ${destinations
            .map(
              (spot) => `
                <article class="destination-card">
                  <h4>${spot.name}</h4>
                  <div class="timeline-meta">
                    ${spot.area ? `<span>${spot.area}</span>` : ""}
                    ${spot.station ? `<span>하차역 ${spot.station}</span>` : ""}
                  </div>
                  ${spot.note ? `<p>${spot.note}</p>` : ""}
                  <div class="timeline-links">
                    ${spot.url ? `<a class="timeline-link" href="${spot.url}" target="_blank" rel="noreferrer">매장 정보</a>${copyButton(spot.url)}` : ""}
                    ${spot.from && spot.to ? `<a class="timeline-link" href="${mapRouteUrl(spot.from, spot.to)}" target="_blank" rel="noreferrer">Yahoo 지도 루트</a>${copyButton(mapRouteUrl(spot.from, spot.to))}` : ""}
                    ${spot.from && spot.to ? `<a class="timeline-link" href="${transitUrl(spot.from, spot.to)}" target="_blank" rel="noreferrer">Yahoo 노선정보</a>${copyButton(transitUrl(spot.from, spot.to))}` : ""}
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </div>`;
  };

  root.innerHTML = items
    .map(
      (item) => `
        <article class="ops-card">
          <span class="day-badge">${item.label}</span>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          ${renderTrace(item)}
          ${item.priority ? `<div class="timeline-meta"><span>우선순위 ${item.priority}</span></div>` : ""}
          ${item.priceNote ? `<div class="timeline-meta"><span>${item.priceNote}</span></div>` : ""}
          ${item.routeFit?.length ? renderSupportList("잘 맞는 일정 구간", item.routeFit, "support-strong") : ""}
          ${item.categoryFit?.length ? renderSupportList("이 구간에서 보기 좋은 카테고리", item.categoryFit, "support-strong") : ""}
          ${item.items ? (item._group === "reservationOps" ? renderOpsChecklist(item._group, item.label, item.items) : `<ul>${item.items.map((line) => `<li>${line}</li>`).join("")}</ul>`) : ""}
          ${item._group === "shoppingHighlights" ? renderShoppingProducts(item.products) : ""}
          ${(item._group === "shoppingHighlights" || item._group === "shoppingOps") ? renderShoppingDestinations(item.destinations) : ""}
          ${item.watchouts?.length ? renderSupportList("주의할 점", item.watchouts) : ""}
          ${item.buyIf?.length ? renderSupportList("이럴 때 담기", item.buyIf) : ""}
          ${item.skipIf?.length ? renderSupportList("이럴 때 보류", item.skipIf) : ""}
          ${item.links?.length ? `<div class="timeline-links">${item.links
            .map(
              (link) => `
                <a class="timeline-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>
                ${copyButton(link.url)}
              `
            )
            .join("")}</div>` : ""}
        </article>
      `
    )
    .join("");

  if (items.some((item) => item._group === "reservationOps")) {
    attachOpsHandlers();
  }
  attachTimelineHandlers();
}

function renderOpsCards(data, key, targetId) {
  const items = (data[key] || []).map((item) => ({ ...item, _group: key }));
  renderOpsItems(items, targetId);
}

function renderPrepAndReservationOps(data, targetId) {
  const items = [
    ...(data.travelPrepOps || []).map((item) => ({ ...item, _group: "travelPrepOps" })),
    ...(data.reservationOps || []).map((item) => ({ ...item, _group: "reservationOps" }))
  ];
  renderOpsItems(items, targetId);
}

function renderBudgetSwitch(data) {
  const root = document.getElementById("budget-switch");
  const keys = Object.keys(data.budgets);
  const defaultKey = keys.includes("balanced") ? "balanced" : keys[0];
  root.innerHTML = keys
    .map(
      (key) => `
        <button class="${defaultKey === key ? "active" : ""}" type="button" data-budget="${key}">
          ${data.budgets[key].name}
        </button>
      `
    )
    .join("");

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
        <p class="section-label">${budget.scopeLabel || "가족 체류비"}</p>
        <h3>${budget.name}</h3>
        <div class="price-display">
          <strong>${budget.total}</strong>
          <span>${budget.scope || "가족 3인 기준 총예산"}</span>
        </div>
        <p>${budget.description}</p>
        <p class="budget-line budget-line-note">
          <span>${budget.noteLabel || "운영 메모"}</span>
          <strong>${budget.note}</strong>
        </p>
        ${budget.assumptions?.length ? `
          <div class="support-box">
            <strong>산정 기준</strong>
            <div class="micro-list">
              ${budget.assumptions.map((line) => `<span>${line}</span>`).join("")}
            </div>
          </div>
        ` : ""}
        ${budget.watchouts?.length ? `
          <div class="support-box">
            <strong>주의할 비용 변수</strong>
            <div class="micro-list">
              ${budget.watchouts.map((line) => `<span>${line}</span>`).join("")}
            </div>
          </div>
        ` : ""}
      </div>
      <div class="budget-lines">
        ${budget.lines
          .map(
            ([label, price]) => `
              <div class="budget-line">
                <span>${label}</span>
                <strong>${price}</strong>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
    ${budget.detailGroups?.length ? `
      <div class="guide-grid budget-detail-grid">
        ${budget.detailGroups
          .map(
            (group) => `
              <article class="guide-card">
                <h3>${group.title}</h3>
                <p>${group.summary}</p>
                <div class="budget-lines">
                  ${group.items
                    .map(
                      (item) => `
                        <div class="budget-line budget-detail-line">
                          <div>
                            <span>${item.label}</span>
                            ${item.note ? `<p class="budget-detail-note">${item.note}</p>` : ""}
                          </div>
                          <strong>${item.price}</strong>
                        </div>
                      `
                    )
                    .join("")}
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    ` : ""}
  `;
}

function renderOptionalSpotsLegacy(dayLabel, expansion) {
  if (!expansion?.spots?.length) {
    return "";
  }

  const cards = [...expansion.spots]
    .sort((left, right) => Number(left.sortOrder || 0) - Number(right.sortOrder || 0))
    .map((spot) => {
      const skipped = localStorage.getItem(optionalSpotKey(dayLabel, spot.id)) === "1";
      const sourceLabel =
        spot.sourceType === "video-description-explicit-theme"
          ? "영상 설명 직접 반영"
          : "영상 챕터 톤 + 현재 동선 확장";
      const routeLinks =
        spot.from && spot.to
          ? `
            <a class="timeline-link" href="${mapRouteUrl(spot.from, spot.to)}" target="_blank" rel="noreferrer">Yahoo 경로</a>
            ${copyButton(mapRouteUrl(spot.from, spot.to))}
            <a class="timeline-link" href="${transitUrl(spot.from, spot.to)}" target="_blank" rel="noreferrer">Yahoo 노선</a>
            ${copyButton(transitUrl(spot.from, spot.to))}
          `
          : "";
      const externalLinks = (spot.links || [])
        .map(
          (link) => `
            <a class="timeline-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>
            ${copyButton(link.url)}
          `
        )
        .join("");

      return `
        <article class="optional-spot-card ${skipped ? "skipped" : ""}">
          <div class="optional-spot-top">
            <div>
              <div class="day-badge">${spot.area}</div>
              <h4>${spot.title}</h4>
            </div>
            <div class="timeline-head-meta">
              <span class="timeline-type">${spot.category}</span>
              ${skipped ? `<span class="skip-state">패스됨</span>` : ""}
            </div>
          </div>
          <p>${spot.summary}</p>
          <div class="timeline-meta">
            <span>근거: ${sourceLabel}</span>
            <span>왜 붙였나: ${spot.whyFit}</span>
            <span>가까운 역: ${spot.station}</span>
            <span>노선: ${spot.lineNote}</span>
            <span>체류 추천: ${spot.stay}</span>
            <span>비용 감각: ${spot.budgetNote}</span>
            <span>가족 메모: ${spot.familyNote}</span>
            <span>패스 기준: ${spot.passRule}</span>
          </div>
          <div class="timeline-links">
            ${routeLinks}
            ${externalLinks}
          </div>
          <div class="timeline-actions">
            <button
              class="action-chip action-chip-skip ${skipped ? "active" : ""}"
              type="button"
              data-spot-day="${dayLabel}"
              data-spot-id="${spot.id}"
            >
              ${skipped ? "패스 취소" : "패스"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <section class="optional-spot-section">
      <div class="support-box optional-spot-summary">
        <strong>${expansion.title || "영상 확장 스팟"}</strong>
        <p>${expansion.summary || ""}</p>
      </div>
      <div class="optional-spot-grid">
        ${cards}
      </div>
    </section>
  `;
}

function renderOptionalSpots(dayLabel, expansion) {
  if (!expansion?.spots?.length) {
    return "";
  }

  const cards = [...expansion.spots]
    .sort((left, right) => Number(left.sortOrder || 0) - Number(right.sortOrder || 0))
    .map((spot) => {
      const skipped = localStorage.getItem(optionalSpotKey(dayLabel, spot.id)) === "1";
      const sourceLabel =
        spot.sourceType === "video-description-explicit-theme"
          ? "영상 설명란 직접 반영"
          : "영상 테마 + 현재 동선 적합성 반영";
      const routeLinks =
        spot.from && spot.to
          ? `
            <a class="timeline-link" href="${mapRouteUrl(spot.from, spot.to)}" target="_blank" rel="noreferrer">Yahoo 경로</a>
            ${copyButton(mapRouteUrl(spot.from, spot.to))}
            <a class="timeline-link" href="${transitUrl(spot.from, spot.to)}" target="_blank" rel="noreferrer">Yahoo 노선</a>
            ${copyButton(transitUrl(spot.from, spot.to))}
          `
          : "";
      const externalLinks = (spot.links || [])
        .map(
          (link) => `
            <a class="timeline-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>
            ${copyButton(link.url)}
          `
        )
        .join("");
      const routeMeta = [
        spot.routeSummary ? `동선: ${spot.routeSummary}` : "",
        spot.station ? `가까운 역: ${spot.station}` : "",
        spot.lineNote ? `노선: ${spot.lineNote}` : "",
        spot.stay ? `체류 추천: ${spot.stay}` : "",
        spot.budgetNote ? `비용 감각: ${spot.budgetNote}` : "",
        spot.familyNote ? `가족 메모: ${spot.familyNote}` : "",
        spot.passRule ? `패스 기준: ${spot.passRule}` : ""
      ].filter(Boolean);

      return `
        <article class="optional-spot-card ${skipped ? "skipped" : ""}">
          <div class="optional-spot-top">
            <div>
              <div class="day-badge">${spot.area}</div>
              <h4>${spot.title}</h4>
            </div>
            <div class="timeline-head-meta">
              <span class="timeline-type">${spot.category}</span>
              ${skipped ? `<span class="skip-state">패스됨</span>` : ""}
            </div>
          </div>
          <p>${spot.summary}</p>
          <div class="timeline-meta">
            <span>근거: ${sourceLabel}</span>
            <span>잘 붙는 이유: ${spot.whyFit}</span>
          </div>
          ${routeMeta.length ? `<div class="support-box"><strong>동선 · 운영 포인트</strong><div class="micro-list">${routeMeta.map((line) => `<span>${line}</span>`).join("")}</div></div>` : ""}
          ${spot.doList?.length ? `<div class="support-box"><strong>할 것</strong><div class="micro-list">${spot.doList.map((line) => `<span>${line}</span>`).join("")}</div></div>` : ""}
          ${spot.eatList?.length ? `<div class="support-box"><strong>먹을 것</strong><div class="micro-list">${spot.eatList.map((line) => `<span>${line}</span>`).join("")}</div></div>` : ""}
          ${spot.nearbySpots?.length ? `<div class="support-box"><strong>같이 묶기 좋은 스팟</strong><div class="micro-list">${spot.nearbySpots.map((line) => `<span>${line}</span>`).join("")}</div></div>` : ""}
          <div class="timeline-links">
            ${routeLinks}
            ${externalLinks}
          </div>
          <div class="timeline-actions">
            <button
              class="action-chip action-chip-skip ${skipped ? "active" : ""}"
              type="button"
              data-spot-day="${dayLabel}"
              data-spot-id="${spot.id}"
            >
              ${skipped ? "패스 취소" : "패스"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <section class="optional-spot-section">
      <div class="support-box optional-spot-summary">
        <strong>${expansion.title || "영상 확장 스팟"}</strong>
        <p>${expansion.summary || ""}</p>
      </div>
      <div class="optional-spot-grid">
        ${cards}
      </div>
    </section>
  `;
}

function renderFoodPlanCards(data) {
  const root = document.getElementById("day-meal-grid");
  if (!root) return;

  const renderMealSlot = (slot) => {
    const meta = [];
    if (slot.genre) meta.push(`장르: ${slot.genre}`);
    if (slot.priceNote) meta.push(`가격대: ${slot.priceNote}`);
    if (slot.ratingNote) meta.push(`평점: ${slot.ratingNote}`);
    if (slot.accessNote) meta.push(`접근: ${slot.accessNote}`);
    if (slot.station) meta.push(`하차역: ${slot.station}`);

    const routeLinks =
      slot.from && slot.to
        ? `
          <a class="timeline-link" href="${mapRouteUrl(slot.from, slot.to)}" target="_blank" rel="noreferrer">Yahoo 지도 루트</a>
          ${copyButton(mapRouteUrl(slot.from, slot.to))}
          <a class="timeline-link" href="${transitUrl(slot.from, slot.to)}" target="_blank" rel="noreferrer">Yahoo 노선정보</a>
          ${copyButton(transitUrl(slot.from, slot.to))}
        `
        : "";

    const externalLinks = slot.links?.length
      ? slot.links
          .map(
            (link) => `
              <a class="timeline-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>
              ${copyButton(link.url)}
            `
          )
          .join("")
      : "";

    return `
      <div class="support-box support-strong">
        <strong>${slot.label}</strong>
        <div class="micro-list">
          <span>${slot.title}</span>
          ${meta.map((line) => `<span>${line}</span>`).join("")}
          <span>${slot.why}</span>
        </div>
        ${slot.detail ? `<p>${slot.detail}</p>` : ""}
        <div class="support-box">
          <strong>우선 후보</strong>
          <div class="micro-list">
            ${slot.choices.map((line) => `<span>${line}</span>`).join("")}
          </div>
        </div>
        <div class="support-box">
          <strong>대기 길 때 대체</strong>
          <div class="micro-list">
            ${slot.fallbacks.map((line) => `<span>${line}</span>`).join("")}
          </div>
        </div>
        ${(routeLinks || externalLinks) ? `<div class="timeline-links">${routeLinks}${externalLinks}</div>` : ""}
      </div>
    `;
  };

  root.innerHTML = data.dayMealPlans
    .map(
      (item) => `
        <article class="ops-card meal-plan-card">
          <span class="day-badge">${item.day}</span>
          <h3>${item.area}</h3>
          <p>${item.summary}</p>
          ${renderTrace(item)}
          <div class="support-box">
            <strong>1순위 식사</strong>
            <div class="micro-list">
              <span>${item.primary}</span>
            </div>
          </div>
          ${item.meals?.length ? item.meals.map(renderMealSlot).join("") : ""}
          <div class="support-box">
            <strong>대기 길 때 대체</strong>
            <div class="micro-list">
              ${item.backups.map((line) => `<span>${line}</span>`).join("")}
            </div>
          </div>
          <div class="support-box">
            <strong>아이 메뉴 안전지대</strong>
            <div class="micro-list">
              <span>${item.childSafe}</span>
            </div>
          </div>
          <div class="support-box">
            <strong>호텔 복귀용 백업</strong>
            <div class="micro-list">
              <span>${item.hotelFallback}</span>
            </div>
          </div>
          ${item.links?.length ? `<div class="timeline-links">${item.links
            .map(
              (link) => `
                <a class="timeline-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>
                ${copyButton(link.url)}
              `
            )
            .join("")}</div>` : ""}
        </article>
      `
    )
    .join("");
}

function injectVideoFoodSection() {
  if (document.getElementById("video-food-grid")) return;

  const genreGrid = document.getElementById("food-genre-grid");
  const anchorSection = genreGrid?.closest(".section");
  if (!anchorSection) return;

  const section = document.createElement("section");
  section.className = "section";
  section.dataset.navLabel = "영상 교차 맛집";
  section.innerHTML = `
    <div class="section-head">
      <p class="section-label">영상 교차 맛집</p>
      <h2>YouTube 추천 맛집 중 현재 일정과 실제로 겹치는 카드</h2>
      <p class="section-subcopy">
        영상에서 나온 식당을 그대로 나열하지 않고, Day 1~Day 5 동선 위에서 실제로 붙이기 쉬운 후보만 골라 가격, 평점, 메뉴, 이동 링크까지 한 번에 확인할 수 있게 정리했습니다.
      </p>
    </div>
    <div class="ops-grid" id="video-food-grid"></div>
  `;

  anchorSection.insertAdjacentElement("beforebegin", section);
}

function renderVideoFoodPicks(data) {
  const sourcePicks = Array.isArray(data.videoFoodPicks) ? data.videoFoodPicks : [];
  const existingSection = document.getElementById("video-food-grid")?.closest(".section");

  if (!sourcePicks.length) {
    existingSection?.remove();
    return;
  }

  injectVideoFoodSection();

  const root = document.getElementById("video-food-grid");
  if (!root) return;

  const picks = [...sourcePicks].sort((left, right) => {
    const leftDay = Number.parseInt(String(left.day || "").replace(/\D+/g, ""), 10) || Number.MAX_SAFE_INTEGER;
    const rightDay = Number.parseInt(String(right.day || "").replace(/\D+/g, ""), 10) || Number.MAX_SAFE_INTEGER;
    if (leftDay !== rightDay) {
      return leftDay - rightDay;
    }

    const leftOrder = Number(left.sortOrder ?? Number.MAX_SAFE_INTEGER);
    const rightOrder = Number(right.sortOrder ?? Number.MAX_SAFE_INTEGER);
    return leftOrder - rightOrder;
  });

  const renderLinks = (item) => {
    const routeLinks = item.from && item.to
      ? `
          <a class="timeline-link" href="${mapRouteUrl(item.from, item.to)}" target="_blank" rel="noreferrer">Yahoo 경로</a>
          ${copyButton(mapRouteUrl(item.from, item.to))}
          <a class="timeline-link" href="${transitUrl(item.from, item.to)}" target="_blank" rel="noreferrer">Yahoo 노선</a>
          ${copyButton(transitUrl(item.from, item.to))}
        `
      : "";

    const externalLinks = item.links?.length
      ? item.links
          .map(
            (link) => `
              <a class="timeline-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>
              ${copyButton(link.url)}
            `
          )
          .join("")
      : "";

    return routeLinks || externalLinks ? `<div class="timeline-links">${routeLinks}${externalLinks}</div>` : "";
  };

  root.innerHTML = picks
    .map(
      (item) => `
        <article class="ops-card">
          <div class="timeline-meta">
            <span>${item.day}</span>
            <span>${item.videoRank}</span>
            <span>${item.area}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <div class="support-box">
            <strong>동선 적합도</strong>
            <div class="micro-list">
              <span>${item.routeFit}</span>
              <span>위치: ${item.location}</span>
            </div>
          </div>
          <div class="support-box">
            <strong>접근 / 노선</strong>
            <div class="micro-list">
              <span>${item.station}</span>
              <span>${item.lineNote}</span>
            </div>
          </div>
          <div class="support-box">
            <strong>추천 메뉴</strong>
            <div class="micro-list">
              ${item.recommendedMenus.map((menu) => `<span>${menu}</span>`).join("")}
            </div>
          </div>
          <div class="support-box">
            <strong>가격 / 평점</strong>
            <div class="micro-list">
              <span>${item.priceNote}</span>
              <span>${item.ratingNote}</span>
            </div>
          </div>
          <div class="support-box">
            <strong>리뷰 스냅샷</strong>
            <div class="micro-list">
              <span>${item.reviewNote}</span>
            </div>
          </div>
          <div class="support-box">
            <strong>운영 메모</strong>
            <div class="micro-list">
              <span>${item.caution}</span>
            </div>
          </div>
          ${renderLinks(item)}
        </article>
      `
    )
    .join("");
}

function injectFestivalTab() {
  return;
  const tabBar = document.querySelector(".content-tabs");
  const foodPanel = document.getElementById("panel-food");
  if (!tabBar || !foodPanel || document.getElementById("tab-festival")) {
    return;
  }

  const festivalTab = document.createElement("button");
  festivalTab.type = "button";
  festivalTab.id = "tab-festival";
  festivalTab.setAttribute("role", "tab");
  festivalTab.setAttribute("aria-selected", "false");
  festivalTab.setAttribute("aria-controls", "panel-festival");
  festivalTab.tabIndex = -1;
  festivalTab.dataset.contentTab = "festival";
  festivalTab.textContent = "축제";

  const shoppingTab = document.getElementById("tab-shopping");
  tabBar.insertBefore(festivalTab, shoppingTab || null);

  const festivalPanel = document.createElement("section");
  festivalPanel.id = "panel-festival";
  festivalPanel.className = "tab-panel";
  festivalPanel.setAttribute("role", "tabpanel");
  festivalPanel.setAttribute("aria-labelledby", "tab-festival");
  festivalPanel.dataset.tabPanel = "festival";
  festivalPanel.hidden = true;
  festivalPanel.innerHTML = `
    <section class="section" id="festival" data-nav-label="축제">
      <div class="section-head">
        <p class="section-label">축제</p>
        <h2>5월 22일~24일 사이 공식 확인된 축제와 시즌 이벤트</h2>
        <p class="section-subcopy">
          Day 1 오사키권은 공식 축제가 확인되지 않아 제외했고, Day 2 아사쿠사 공연과 야간 쇼, Day 3 요코하마 행사만 공식 공지 기준으로 추렸습니다.
        </p>
      </div>
      <div class="ops-grid festival-grid" id="festival-grid"></div>
    </section>
  `;

  foodPanel.insertAdjacentElement("afterend", festivalPanel);
}

function renderFestival(data) {
  return renderFestivals(data);
  const root = document.getElementById("festival-grid");
  if (!root) return;

  const renderLinks = (links = []) =>
    links
      .map(
        (link) => `
          <a class="timeline-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>
          ${copyButton(link.url)}
        `
      )
      .join("");

  const renderRouteLinks = (from, to) => {
    if (!from || !to) return "";
    const routeUrl = mapRouteUrl(from, to);
    const transit = transitUrl(from, to);
    return `
      <a class="timeline-link" href="${routeUrl}" target="_blank" rel="noreferrer">Yahoo 지도 경로</a>
      ${copyButton(routeUrl)}
      <a class="timeline-link" href="${transit}" target="_blank" rel="noreferrer">Yahoo 노선정보</a>
      ${copyButton(transit)}
    `;
  };

  root.innerHTML = (data.festivalEvents || [])
    .map(
      (event) => `
        <article class="ops-card festival-card">
          <span class="day-badge">${event.day}</span>
          <h3>${event.title}</h3>
          <p>${event.summary}</p>
          <div class="support-box">
            <strong>일자 / 시간</strong>
            <div class="micro-list">
              <span>${event.dateTime}</span>
            </div>
          </div>
          <div class="support-box">
            <strong>장소</strong>
            <div class="micro-list">
              <span>${event.place}</span>
            </div>
          </div>
          <div class="support-box">
            <strong>관람 추천 포인트</strong>
            <div class="micro-list">
              ${event.viewingPoints.map((line) => `<span>${line}</span>`).join("")}
            </div>
          </div>
          <div class="support-box">
            <strong>접근 역·노선</strong>
            <div class="micro-list">
              <span>${event.access}</span>
              <span>${event.station}</span>
            </div>
          </div>
          ${event.priceNote ? `
            <div class="support-box">
              <strong>가격</strong>
              <div class="micro-list">
                <span>${event.priceNote}</span>
              </div>
            </div>
          ` : ""}
          ${event.confidence ? `
            <div class="support-box">
              <strong>확실도</strong>
              <div class="micro-list">
                <span>${event.confidence}</span>
              </div>
            </div>
          ` : ""}
          ${event.caution ? `
            <div class="support-box">
              <strong>사용 시 주의점</strong>
              <div class="micro-list">
                <span>${event.caution}</span>
              </div>
            </div>
          ` : ""}
          ${(event.from && event.to) || event.links?.length ? `<div class="timeline-links">${renderRouteLinks(event.from, event.to)}${renderLinks(event.links)}</div>` : ""}
        </article>
      `
    )
    .join("");
}

function renderFood(data) {
  document.getElementById("nostalgia-list").innerHTML = data.nostalgiaFoods.map((item) => `<li>${item}</li>`).join("");
  document.getElementById("verified-list").innerHTML = data.verifiedFoods
    .map(
      (item) => `
        <div class="verified-item">
          <strong>${item.name}</strong>
          <p>${item.detail}</p>
          <div class="timeline-meta">
            <span>${item.area}</span>
            <span>${item.use}</span>
          </div>
          <div class="timeline-links">
            <a class="timeline-link" href="${item.link}" target="_blank" rel="noreferrer">공식 정보 보기</a>
            ${copyButton(item.link)}
          </div>
        </div>
      `
    )
    .join("");
  renderVideoFoodPicks(data);
  renderFoodPlanCards(data);
  attachTimelineHandlers();
}

function renderGuide(data) {
  document.getElementById("guide-grid").innerHTML = data.guideNotes
    .map(
      (item) => `
        <article class="guide-card">
          ${item.label ? `<p class="section-label">${item.label}</p>` : ""}
          <h3>${item.title}</h3>
          <p>${item.text}</p>
          ${item.owner ? `<div class="timeline-meta"><span>담당: ${item.owner}</span></div>` : ""}
          ${item.items?.length ? `<div class="support-box"><strong>현장 운영 포인트</strong><div class="micro-list">${item.items.map((line) => `<span>${line}</span>`).join("")}</div></div>` : ""}
          ${item.links?.length ? `<div class="timeline-links">${item.links
            .map(
              (link) => `
                <a class="timeline-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>
                ${copyButton(link.url)}
              `
            )
            .join("")}</div>` : ""}
        </article>
      `
    )
    .join("");
  attachTimelineHandlers();
}

function renderFestivals(data) {
  const root = document.getElementById("festival-grid");
  if (!root) return;

  root.innerHTML = data.festivals
    .map(
      (item) => `
        <article class="guide-card festival-card">
          ${item.fitDay ? `<p class="section-label">${item.fitDay}</p>` : ""}
          <h3>${item.name}</h3>
          <p>${item.summary}</p>
          <div class="timeline-meta">
            ${item.category ? `<span>분류: ${item.category}</span>` : ""}
            ${item.date ? `<span>일정: ${item.date}</span>` : ""}
            ${item.place ? `<span>장소: ${item.place}</span>` : ""}
            ${item.confidence ? `<span>확실도: ${item.confidence}</span>` : ""}
          </div>
          ${item.bestSpots?.length ? `<div class="support-box"><strong>관람 추천 장소</strong><div class="micro-list">${item.bestSpots.map((line) => `<span>${line}</span>`).join("")}</div></div>` : ""}
          ${item.access?.length ? `<div class="support-box"><strong>접근 역 · 노선</strong><div class="micro-list">${item.access.map((line) => `<span>${line}</span>`).join("")}</div></div>` : ""}
          ${item.watchouts?.length ? `<div class="support-box"><strong>현장 주의점</strong><div class="micro-list">${item.watchouts.map((line) => `<span>${line}</span>`).join("")}</div></div>` : ""}
          ${item.links?.length ? `<div class="timeline-links">${item.links
            .map(
              (link) => `
                <a class="timeline-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>
                ${copyButton(link.url)}
              `
            )
            .join("")}</div>` : ""}
        </article>
      `
    )
    .join("");

  attachTimelineHandlers();
}

function renderMapToolbar(data) {
  const root = document.getElementById("map-toolbar");
  const days = ["all", ...new Set(data.mapPoints.map((point) => point.day))];
  root.innerHTML = days
    .map(
      (day, index) => `
        <button class="${index === 0 ? "active" : ""}" type="button" data-day="${day}">
          ${day === "all" ? "전체" : day}
        </button>
      `
    )
    .join("");

  root.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      root.querySelectorAll("button").forEach((el) => el.classList.remove("active"));
      button.classList.add("active");
      drawMapPoints(data, button.dataset.day);
    });
  });
}

function renderMaps(data) {
  document.getElementById("map-grid").innerHTML = data.mapAnchors
    .map(
      (item) => `
        <article class="map-card">
          <small>${item.day}</small>
          <h3>${item.name}</h3>
          <p><strong>출발:</strong> 오사키역</p>
          <p>${item.note}</p>
          <div class="map-links">
            <a class="map-link" href="${item.google}" target="_blank" rel="noreferrer">Google 지도</a>
            <a class="map-link" href="${item.osm}" target="_blank" rel="noreferrer">OpenStreetMap</a>
          </div>
        </article>
      `
    )
    .join("");
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

function drawMapPointsLegacy(data, selectedDay) {
  if (!tripMap) {
    return;
  }

  mapMarkers.forEach((marker) => tripMap.removeLayer(marker));
  mapMarkers = [];

  if (routeLine) {
    tripMap.removeLayer(routeLine);
  }

  const originPoint = data.mapPoints.find((point) => point.name === "오사키");
  let points = selectedDay === "all" ? data.mapPoints : data.mapPoints.filter((point) => point.day === selectedDay);

  if (selectedDay !== "all" && originPoint) {
    const hasOriginFirst = points[0]?.name === originPoint.name;
    const hasOriginLast = points[points.length - 1]?.name === originPoint.name;

    if (!hasOriginFirst) {
      points = [
        {
          ...originPoint,
          day: selectedDay,
          note: "오사키역 출발 기준"
        },
        ...points
      ];
    }

    if (!hasOriginLast) {
      points = [
        ...points,
        {
          ...originPoint,
          day: selectedDay,
          note: "오사키역 복귀 기준"
        }
      ];
    }
  }
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
      <a href="${point.google}" target="_blank" rel="noreferrer">Google 지도</a>
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

function drawMapPoints(data, selectedDay) {
  if (!tripMap) {
    return;
  }

  mapMarkers.forEach((marker) => tripMap.removeLayer(marker));
  mapMarkers = [];

  if (routeLine) {
    tripMap.removeLayer(routeLine);
  }

  const originPoint = data.mapPoints.find((point) => String(point.name || "").includes("오사키"));
  const filteredPoints = selectedDay === "all" ? data.mapPoints : data.mapPoints.filter((point) => point.day === selectedDay);
  const optionalPoints = filteredPoints.filter((point) => point.optional);
  let corePoints = filteredPoints.filter((point) => !point.optional);

  if (selectedDay !== "all" && originPoint) {
    const hasOriginFirst = corePoints[0]?.name === originPoint.name;
    const hasOriginLast = corePoints[corePoints.length - 1]?.name === originPoint.name;

    if (!hasOriginFirst) {
      corePoints = [
        {
          ...originPoint,
          day: selectedDay,
          note: "오사키역 출발 기준"
        },
        ...corePoints
      ];
    }

    if (!hasOriginLast) {
      corePoints = [
        ...corePoints,
        {
          ...originPoint,
          day: selectedDay,
          note: "오사키역 복귀 기준"
        }
      ];
    }
  }

  const fitLatlngs = [];
  const routeLatlngs = [];

  function renderMapMarker(point, isOptional = false) {
    const marker = L.circleMarker(point.coords, {
      radius: isOptional ? 6 : 8,
      weight: 2,
      color: isOptional ? "#7a5674" : "#944123",
      fillColor: isOptional ? "#f1c7df" : point.highlight ? "#d26a42" : "#6f8c61",
      fillOpacity: isOptional ? 0.78 : 0.9
    }).addTo(tripMap);

    marker.bindPopup(`
      <strong>${point.name}</strong><br/>
      ${point.day}<br/>
      ${isOptional ? "선택형 보조 포인트<br/>" : ""}
      ${point.note}<br/>
      <a href="${point.google}" target="_blank" rel="noreferrer">Google 지도</a>
    `);

    mapMarkers.push(marker);
    fitLatlngs.push(point.coords);
    if (!isOptional) {
      routeLatlngs.push(point.coords);
    }
  }

  corePoints.forEach((point) => renderMapMarker(point, false));
  optionalPoints.forEach((point) => renderMapMarker(point, true));

  if (routeLatlngs.length > 1) {
    routeLine = L.polyline(routeLatlngs, {
      color: "#3c5d53",
      weight: 4,
      opacity: 0.7,
      dashArray: "7 8"
    }).addTo(tripMap);
  }

  if (fitLatlngs.length > 1) {
    tripMap.fitBounds(L.latLngBounds(fitLatlngs), { padding: [30, 30] });
  } else if (fitLatlngs.length === 1) {
    tripMap.setView(fitLatlngs[0], 12);
  }
}

function renderSources(data) {
  document.getElementById("sources-list").innerHTML = data.sources
    .map(
      (item) => `
        <article class="source-card">
          <strong>${item.title}</strong>
          <p>${item.note}</p>
          <a href="${item.url}" target="_blank" rel="noreferrer">${item.url}</a>
        </article>
      `
    )
    .join("");
  document.getElementById("recheck-note").textContent = data.recheckNote;
}

async function copyText(value, button) {
  try {
    await navigator.clipboard.writeText(value);
    if (button) {
      const original = button.textContent;
      button.textContent = "복사됨";
      window.setTimeout(() => {
        button.textContent = original;
      }, 1200);
    }
  } catch (error) {
    console.error("Clipboard copy failed", error);
  }
}

function attachTimelineHandlers() {
  document.querySelectorAll("[data-timeline-day]").forEach((button) => {
    button.addEventListener("click", () => {
      const { timelineDay, timelineIndex } = button.dataset;
      const key = timelineKey(timelineDay, timelineIndex);
      const skipStorageKey = timelineSkipKey(timelineDay, timelineIndex);
      const next = localStorage.getItem(key) === "1" ? "0" : "1";
      localStorage.setItem(key, next);
      if (next === "1") {
        localStorage.removeItem(skipStorageKey);
      }
      renderItinerary(window.__TOKIDOKI_DATA__);
    });
  });

  document.querySelectorAll("[data-timeline-skip-day]").forEach((button) => {
    button.addEventListener("click", () => {
      const { timelineSkipDay, timelineSkipIndex } = button.dataset;
      const key = timelineSkipKey(timelineSkipDay, timelineSkipIndex);
      const doneStorageKey = timelineKey(timelineSkipDay, timelineSkipIndex);
      const next = localStorage.getItem(key) === "1" ? "0" : "1";
      localStorage.setItem(key, next);
      if (next === "1") {
        localStorage.removeItem(doneStorageKey);
      }
      renderItinerary(window.__TOKIDOKI_DATA__);
    });
  });

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => {
      copyText(button.dataset.copy, button);
    });
  });
}

function attachOptionalSpotHandlers() {
  document.querySelectorAll("[data-spot-day]").forEach((button) => {
    button.addEventListener("click", () => {
      const { spotDay, spotId } = button.dataset;
      const key = optionalSpotKey(spotDay, spotId);
      const next = localStorage.getItem(key) === "1" ? "0" : "1";
      localStorage.setItem(key, next);
      renderItinerary(window.__TOKIDOKI_DATA__);
    });
  });
}

async function main() {
  try {
    const data = await loadTrip();
    window.__TOKIDOKI_DATA__ = data;
    createSakuraLayer();
    fillHero(data);
    fillIntro(data);
    renderTeam(data);
    renderComms(data);
    renderPhotos(data);
    renderWeatherSwitch(data);
    renderItinerary(data);
    renderPrepAndReservationOps(data, "travel-prep-grid");
    renderOpsCards(data, "familyComfortOps", "comfort-grid");
    renderOpsCards(data, "memoryMissions", "memory-grid");
    renderOpsCards(data, "weatherFallbacks", "weather-grid");
    renderOpsCards(data, "fujiqOps", "fujiq-grid");
    renderOptions(data);
    renderMaps(data);
    initMap(data);
    renderFestivals(data);
    renderBudgetSwitch(data);
    renderBudgetPanel(data, data.budgets.balanced ? "balanced" : Object.keys(data.budgets)[0]);
    renderFood(data);
    renderOpsCards(data, "foodGenreOps", "food-genre-grid");
    renderOpsCards(data, "valueFoodOps", "value-food-grid");
    renderOpsCards(data, "shoppingHighlights", "shopping-highlights-grid");
    renderOpsCards(data, "shoppingOps", "shopping-grid");
    renderGuide(data);
    renderSources(data);
    initContentTabs();
  } catch (error) {
    document.body.innerHTML = `<main style="padding:40px;font-family:'IBM Plex Sans KR',sans-serif;"><h1>여행 데이터를 불러오지 못했습니다.</h1><p>${error.message}</p></main>`;
  }
}

bindContentTabEvents();
initContentTabs();
main();
