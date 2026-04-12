const APP_VERSION = "fujiqdayflow2";

let tripMap;
let mapMarkers = [];
let routeLine;
let currentWeatherMode = localStorage.getItem("tokidoki-weather-mode") || "clear";
let currentContentTab = localStorage.getItem("tokidoki-content-tab") || "overview";
let tabObserver;
let sectionObserver;

async function loadTrip() {
  const response = await fetch(`./assets/data/tokyo-family-trip-2026.json?v=${APP_VERSION}`);
  if (!response.ok) {
    throw new Error(`여행 데이터를 불러오지 못했습니다: ${response.status}`);
  }
  return response.json();
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

  const panels = document.querySelectorAll("[data-tab-panel]");
  if (!panels.length) {
    return;
  }

  tabObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      const tab = visible.target.dataset.tabPanel;
      if (tab && tab !== currentContentTab) {
        setContentTab(tab, false, false);
      }
    },
    {
      root: null,
      threshold: [0.2, 0.4, 0.6],
      rootMargin: "-120px 0px -55% 0px"
    }
  );

  panels.forEach((panel) => tabObserver.observe(panel));
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
    <article class="timeline-item ${done ? "done" : ""}">
      <div class="timeline-head">
        <span class="timeline-time">${item.time}</span>
        <span class="timeline-type">${typeLabel}</span>
      </div>
      <h4 class="timeline-title">${item.title}</h4>
      <p>${item.detail}</p>
      ${meta.length ? `<div class="timeline-meta">${meta.map((line) => `<span>${line}</span>`).join("")}</div>` : ""}
      ${links}
      <div class="timeline-actions">
        <button class="action-chip ${done ? "active" : ""}" type="button" data-timeline-day="${dayLabel}" data-timeline-index="${index}">
          ${done ? "완료됨" : "완료 표시"}
        </button>
      </div>
    </article>
  `;
}

function renderItinerary(data) {
  document.getElementById("itinerary-grid").innerHTML = data.itinerary
    .map((item, dayIndex) => {
      const weatherVariant = weatherVariantFor(item);
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
    return `
      <div class="support-box support-strong">
        <strong>대표 상품 리스트</strong>
        <div class="product-grid">
          ${products
            .map(
              (product) => `
                <article class="product-card">
                  <h4>${product.name}</h4>
                  <div class="timeline-meta">
                    ${product.price ? `<span>대략 ${product.price}</span>` : ""}
                    ${product.store ? `<span>구매처: ${product.store}</span>` : ""}
                  </div>
                  ${product.note ? `<p>${product.note}</p>` : ""}
                  ${product.link ? `<div class="timeline-links"><a class="timeline-link" href="${product.link}" target="_blank" rel="noreferrer">상품/브랜드 보기</a>${copyButton(product.link)}</div>` : ""}
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  };

  const renderShoppingDestinations = (destinations = []) => {
    if (!destinations.length) return "";
    return `
      <div class="support-box">
        <strong>둘러볼 매장과 가는 방법</strong>
        <div class="destination-grid">
          ${destinations
            .map(
              (spot) => `
                <article class="destination-card">
                  <h4>${spot.name}</h4>
                  <div class="timeline-meta">
                    ${spot.area ? `<span>${spot.area}</span>` : ""}
                    ${spot.station ? `<span>하차역: ${spot.station}</span>` : ""}
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
      </div>
    `;
  };

  root.innerHTML = items
    .map(
      (item) => `
        <article class="ops-card">
          <span class="day-badge">${item.label}</span>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          ${renderTrace(item)}
          ${item.priority ? `<div class="timeline-meta"><span>우선순위: ${item.priority}</span></div>` : ""}
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
        <p class="section-label">가족 체류비</p>
        <h3>${budget.name}</h3>
        <div class="price-display">
          <strong>${budget.total}</strong>
          <span>가족 3인 기준 총예산</span>
        </div>
        <p>${budget.description}</p>
        <p class="budget-line budget-line-note">
          <span>운영 메모</span>
          <strong>${budget.note}</strong>
        </p>
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
  `;
}

function renderFoodPlanCards(data) {
  const root = document.getElementById("day-meal-grid");
  if (!root) return;

  const renderMealSlot = (slot) => `
    <div class="support-box support-strong">
      <strong>${slot.label}</strong>
      <div class="micro-list">
        <span>${slot.title}</span>
        <span>장르: ${slot.genre}</span>
        <span>${slot.why}</span>
      </div>
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
      ${slot.links?.length ? `<div class="timeline-links">${slot.links
        .map(
          (link) => `
            <a class="timeline-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>
            ${copyButton(link.url)}
          `
        )
        .join("")}</div>` : ""}
    </div>
  `;

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
  renderFoodPlanCards(data);
  attachTimelineHandlers();
}

function renderGuide(data) {
  document.getElementById("guide-grid").innerHTML = data.guideNotes
    .map(
      (item) => `
        <article class="guide-card">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
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

function drawMapPoints(data, selectedDay) {
  if (!tripMap) {
    return;
  }

  mapMarkers.forEach((marker) => tripMap.removeLayer(marker));
  mapMarkers = [];

  if (routeLine) {
    tripMap.removeLayer(routeLine);
  }

  const points = selectedDay === "all" ? data.mapPoints : data.mapPoints.filter((point) => point.day === selectedDay);
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
      const next = localStorage.getItem(key) === "1" ? "0" : "1";
      localStorage.setItem(key, next);
      renderItinerary(window.__TOKIDOKI_DATA__);
    });
  });

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => {
      copyText(button.dataset.copy, button);
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
