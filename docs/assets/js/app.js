const APP_VERSION = "video-food-1";

const VIDEO_SOURCE_URL = "https://www.youtube.com/watch?v=txYT7i-D_LU";
const VIDEO_FOOD_PICKS = [
  {
    day: "Day 1",
    videoRank: "28위",
    title: "串串香 麻辣湯 池袋店",
    area: "이케부쿠로",
    summary: "호텔 체크인 전후나 이케부쿠로 서브 루트에 붙이기 쉬운 마라탕 카드입니다.",
    location: "東京都豊島区西池袋1-33-6 1F",
    station: "JR·도쿄메트로 이케부쿠로역 북쪽 출구 도보 2분",
    lineNote: "야마노테선 / 사이쿄선 / 마루노우치선 / 유라쿠초선 / 후쿠토신선",
    routeFit: "오사키 출발 후 이케부쿠로를 먼저 들르는 Day 1 점심 또는 이른 저녁 후보",
    recommendedMenus: [
      "재료 선택형 마라탕 한 그릇",
      "매운맛을 낮춘 기본 국물 + 채소/버섯 위주 조합",
      "고수나 내장류는 별도 선택으로 조절"
    ],
    priceNote: "1인 1,000~1,999엔",
    ratingNote: "Tabelog 3.48 / 리뷰 341건 스냅샷",
    reviewNote: "최근 후기 기준으로 북쪽 출구 접근성이 좋고, 재료를 직접 고르는 방식이라 취향 조절이 쉽다는 평가가 많았습니다.",
    caution: "12석 규모라 피크 타임에는 대기 가능성이 높고, 어린이 기준으로는 맵기 레벨을 낮게 잡는 편이 안전합니다.",
    from: "Ikebukuro Station",
    to: "串串香 麻辣湯 池袋店",
    links: [
      { label: "Tabelog", url: "https://tabelog.com/tokyo/A1305/A130501/13175047/" },
      { label: "Tabelog 지도", url: "https://tabelog.com/tokyo/A1305/A130501/13175047/dtlmap/" },
      { label: "영상 원본", url: VIDEO_SOURCE_URL }
    ]
  },
  {
    day: "Day 1",
    videoRank: "4위",
    title: "麺屋 Hulu-lu",
    area: "이케부쿠로",
    summary: "이케부쿠로 축에서 가장 강한 라멘 카드로, 식사 만족도가 높고 회전도 비교적 빠른 편입니다.",
    location: "공식 홈페이지 기준 이케부쿠로 서쪽 출구권",
    station: "JR 이케부쿠로역 서쪽 출구 도보 7분",
    lineNote: "야마노테선 / 사이쿄선 / 도부 토죠선 / 세이부 이케부쿠로선",
    routeFit: "Day 1 이케부쿠로 구간의 메인 점심 후보",
    recommendedMenus: [
      "醤油SOBA",
      "塩SOBA",
      "스팸 세트"
    ],
    priceNote: "공식·Tabelog 기준 SOBA 1,000엔대, 스팸 세트 1,380엔 전후",
    ratingNote: "Tabelog 3.77 / 리뷰 2,139건 스냅샷",
    reviewNote: "최근 후기에서는 특제 간장 SOBA와 하와이안 분위기, 카페처럼 들어가기 편한 점이 반복적으로 언급됐습니다.",
    caution: "화요일 휴무이고 요일별 제공 메뉴가 달라서 방문 요일에 맞춰 메뉴를 다시 보는 편이 좋습니다.",
    from: "Ikebukuro Station",
    to: "麺屋 Hulu-lu",
    links: [
      { label: "공식 사이트", url: "https://www.hulu-lu.net/" },
      { label: "Tabelog", url: "https://tabelog.com/tokyo/A1305/A130501/13136428/" },
      { label: "영상 원본", url: VIDEO_SOURCE_URL }
    ]
  },
  {
    day: "Day 1",
    videoRank: "15위",
    title: "麗郷 渋谷店",
    area: "시부야",
    summary: "시부야 저녁 동선에서 술안주형 대만요리를 제대로 먹고 싶을 때 가장 영상 톤에 맞는 카드입니다.",
    location: "東京都渋谷区道玄坂2-25-18",
    station: "시부야역 도보권",
    lineNote: "JR 야마노테선 / 도큐 도요코선 / 도쿄메트로 긴자선·후쿠토신선",
    routeFit: "Day 1 시부야 저녁 식사 후보",
    recommendedMenus: [
      "腸詰",
      "汁ビーフン",
      "青菜炒め"
    ],
    priceNote: "Tabelog 저녁 예산 4,000~4,999엔",
    ratingNote: "Tabelog 3.54 / 리뷰 2,438건 스냅샷",
    reviewNote: "후기에서는 대기 가능성은 있지만 대표 메뉴인 소시지와 비훈 조합이 만족도가 높다는 반응이 많았습니다.",
    caution: "아이 기준으로는 향신료와 내장/대만식 소시지 취향 차이가 있을 수 있어 볶음밥 계열 백업을 같이 두는 편이 좋습니다.",
    from: "Shibuya Station",
    to: "麗郷 渋谷店",
    links: [
      { label: "Tabelog", url: "https://tabelog.com/tokyo/A1303/A130301/13001805/" },
      { label: "평점 분포", url: "https://tabelog.com/tokyo/A1303/A130301/13001805/dtlratings/?type=0" },
      { label: "영상 원본", url: VIDEO_SOURCE_URL }
    ]
  },
  {
    day: "Day 1",
    videoRank: "공동 11위",
    title: "THE RIGOLETTO",
    area: "시부야",
    summary: "시부야에서 가족 식사 안정성이 높은 서양식 백업 카드입니다.",
    location: "東京都渋谷区渋谷1-23-21 渋谷キャスト GF/1F",
    station: "시부야역 B1 출구 도보 1분",
    lineNote: "JR / 도큐 / 도쿄메트로 / 게이오 이노카시라선",
    routeFit: "Day 1 시부야에서 분위기와 안정적인 메뉴 구성을 같이 잡는 저녁 후보",
    recommendedMenus: [
      "생파스타",
      "피자",
      "타파스"
    ],
    priceNote: "Tabelog 기준 점심 1,000~1,999엔 / 저녁 4,000~4,999엔",
    ratingNote: "Tabelog 3.49 / 리뷰 1,100건대 스냅샷",
    reviewNote: "최근 후기에서는 미야시타파크 맞은편 접근성과 넓은 공간, 가족 단위로 고르기 쉬운 메뉴 폭이 장점으로 자주 언급됐습니다.",
    caution: "주말 저녁은 예약 선호도가 높고, 시부야 인파가 겹치면 대기 시간이 길어질 수 있습니다.",
    from: "Shibuya Station",
    to: "THE RIGOLETTO",
    links: [
      { label: "SHIBUYA CAST 안내", url: "https://shibuyacast.jp/floor/detail/?scd=000034" },
      { label: "Tabelog", url: "https://selection.tabelog.com/tokyo/A1303/A130301/13207146/" },
      { label: "영상 원본", url: VIDEO_SOURCE_URL }
    ]
  },
  {
    day: "Day 1",
    videoRank: "1위",
    title: "新宿 立吉",
    area: "신주쿠",
    summary: "영상 1위 식당으로, 신주쿠 밤 분위기를 제대로 느끼고 싶을 때 붙이기 좋은 체험형 저녁 카드입니다.",
    location: "東京都新宿区新宿3-5-3 高山ランド会館 9F",
    station: "신주쿠산초메역 도보권 / JR 신주쿠역 동쪽 축",
    lineNote: "JR 신주쿠역 + 도쿄메트로 마루노우치선·후쿠토신선",
    routeFit: "Day 1 밤을 신주쿠까지 확장할 경우의 대표 저녁 후보",
    recommendedMenus: [
      "셰프 추천 순서의 꼬치튀김",
      "제철 꼬치",
      "식사 마무리용 밥/디저트"
    ],
    priceNote: "Tabelog 기준 저녁 6,000~7,999엔",
    ratingNote: "Tabelog 3.57 / 리뷰 730건대 스냅샷",
    reviewNote: "후기에서는 원하는 만큼 먹다가 '스톱'을 외치는 방식과, 계속 손이 가는 꼬치 흐름이 인상적이라는 반응이 많았습니다.",
    caution: "아이와 함께 가면 긴 식사보다 12~15꼬치 안쪽에서 끊는 편이 피로도가 덜합니다.",
    from: "Shinjuku-sanchome Station",
    to: "新宿 立吉",
    links: [
      { label: "공식 사이트", url: "https://www.shinjuku-tatsukichi.com/en/" },
      { label: "Tabelog", url: "https://tabelog.com/tokyo/A1304/A130401/13011911/" },
      { label: "영상 원본", url: VIDEO_SOURCE_URL }
    ]
  },
  {
    day: "Day 2",
    videoRank: "공동 9위",
    title: "きつねや",
    area: "츠키지",
    summary: "Day 2 츠키지 축과 가장 정확히 겹치는 영상 추천 맛집입니다.",
    location: "東京都中央区築地4-9-12",
    station: "도에이 오에도선 츠키지시장역 A1 도보 5분 / 히비야선 츠키지역 도보 5분",
    lineNote: "오에도선 / 히비야선",
    routeFit: "Day 2 츠키지 아침 메인 식사 후보",
    recommendedMenus: [
      "ホルモン丼",
      "肉豆腐",
      "牛丼"
    ],
    priceNote: "공식·Tabelog 기준 1인 999엔 이하~1,000엔대 초반",
    ratingNote: "Tabelog 3.49 / 리뷰 2,510건 스냅샷",
    reviewNote: "공식 소개와 최근 Tabelog 후기 모두 호르몬덮밥과 니쿠도후를 대표 메뉴로 밀고 있고, 오전 일찍 움직일수록 만족도가 높다는 흐름이 뚜렷했습니다.",
    caution: "수·일 휴무, 오전형 영업이라 Day 2 첫 타임에 넣는 편이 안정적입니다.",
    from: "Tsukiji Station",
    to: "きつねや",
    links: [
      { label: "츠키지 공식 안내", url: "https://www.tsukiji.or.jp/shoplist/cat-d/cat-14/046/" },
      { label: "Tabelog", url: "https://tabelog.com/tokyo/A1313/A131301/13007656/" },
      { label: "영상 원본", url: VIDEO_SOURCE_URL }
    ]
  },
  {
    day: "Day 2",
    videoRank: "공동 17위",
    title: "GONPACHI Nishi-Azabu",
    area: "니시아자부 / 도쿄타워 축",
    summary: "도쿄타워 야경 전후에 붙이기 좋은 분위기형 저녁 카드입니다.",
    location: "東京都港区西麻布1-13-11 1F・2F",
    station: "롯폰기역·노기자카역·히로오역 각 도보 10분",
    lineNote: "도쿄메트로 히비야선 / 지요다선",
    routeFit: "Day 2 도쿄타워 야경 전후 저녁 후보",
    recommendedMenus: [
      "수타 소바",
      "꼬치구이",
      "텐푸라"
    ],
    priceNote: "Tabelog 기준 점심 1,000~1,999엔 / 저녁 4,000~4,999엔",
    ratingNote: "Tabelog 3.40 / 리뷰 약 1,000건 스냅샷",
    reviewNote: "공식·Tabelog 모두 내부 분위기와 관광객 접대력, 소바·꼬치·튀김의 무난한 조합을 강점으로 보여줍니다.",
    caution: "17시 이후 최소 주문 금액 조건이 있고, 현금 없는 완전 캐시리스 운영이라 결제 수단을 미리 맞춰두는 편이 안전합니다.",
    from: "Tokyo Tower",
    to: "GONPACHI Nishi-Azabu",
    links: [
      { label: "공식 사이트", url: "https://gonpachi.jp/nishi-azabu/" },
      { label: "Tabelog", url: "https://tabelog.com/en/tokyo/A1307/A130701/13005298/" },
      { label: "영상 원본", url: VIDEO_SOURCE_URL }
    ]
  },
  {
    day: "Day 5",
    videoRank: "공동 5위",
    title: "おにやんま 五反田本店",
    area: "고탄다",
    summary: "오사키 숙소 축과 가장 강하게 맞물리는 영상 추천 맛집으로, 출국일에도 부담이 적습니다.",
    location: "五反田駅高架脇エリア",
    station: "JR 고탄다역 도보권",
    lineNote: "JR 야마노테선 / 도에이 아사쿠사선 / 도큐 이케가미선",
    routeFit: "Day 5 오사키 체크아웃 후 빠른 점심 또는 귀국 전 한 끼",
    recommendedMenus: [
      "とり天ぶっかけ",
      "とり天ちくわ天ぶっかけ",
      "온우동"
    ],
    priceNote: "Tabelog 기준 1인 999엔 이하",
    ratingNote: "Tabelog 3.74 / 리뷰 4,700건대 스냅샷",
    reviewNote: "최근 후기에서는 줄은 길어도 회전이 빠르고, 닭튀김과 쫄깃한 면의 만족도가 매우 높다는 반응이 이어졌습니다.",
    caution: "입식에 가깝고 줄이 생기기 쉬워서 큰 짐을 든 출국일에는 식사 시간대를 앞당기는 편이 좋습니다.",
    from: "Osaki Station",
    to: "おにやんま 五反田本店",
    links: [
      { label: "Tabelog", url: "https://tabelog.com/tokyo/A1316/A131603/13111869/" },
      { label: "영상 원본", url: VIDEO_SOURCE_URL }
    ]
  },
  {
    day: "Day 5",
    videoRank: "공동 17위",
    title: "広州市場 五反田店",
    area: "고탄다",
    summary: "오니야마보다 앉아서 먹기 편하고, 아이 메뉴 대응력이 좋아 Day 5 백업 카드로 특히 좋습니다.",
    location: "東京都品川区東五反田1-21-10",
    station: "JR 고탄다역 동쪽 출구 도보 2분",
    lineNote: "JR 야마노테선 / 도에이 아사쿠사선 / 도큐 이케가미선",
    routeFit: "Day 5 오사키·고탄다 축의 안정적인 좌석형 식사 백업",
    recommendedMenus: [
      "雲呑麺",
      "海老塩雲呑麺",
      "汁なし雲呑坦々麺"
    ],
    priceNote: "공식·Tabelog 기준 1인 1,000~1,999엔",
    ratingNote: "Tabelog 3.51 / 리뷰 1,293건 스냅샷",
    reviewNote: "후기에서는 와탄멘의 부드러운 식감, 간장/소금 선택지, 탁상 조미료로 맛 변주가 쉬운 점이 강점으로 보였습니다.",
    caution: "현금 결제는 불가이고 PayPay 중심이라 결제 수단을 미리 확인하는 편이 좋습니다.",
    from: "Osaki Station",
    to: "広州市場 五反田店",
    links: [
      { label: "공식 사이트", url: "https://www.kosyuichiba.com/shop/gotanda.html" },
      { label: "Tabelog", url: "https://tabelog.com/tokyo/A1316/A131603/13001555/" },
      { label: "영상 원본", url: VIDEO_SOURCE_URL }
    ]
  }
];

let tripMap;
let mapMarkers = [];
let routeLine;
let currentWeatherMode = localStorage.getItem("tokidoki-weather-mode") || "clear";
let currentContentTab = localStorage.getItem("tokidoki-content-tab") || "overview";
let tabObserver;
let sectionObserver;
let navSyncFrame = null;

function isIOSLikeDevice() {
  const platform = navigator.platform || "";
  const userAgent = navigator.userAgent || "";
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  return /iPad|iPhone|iPod/.test(userAgent) || (platform === "MacIntel" && maxTouchPoints > 1);
}

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
  if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches || isIOSLikeDevice()) {
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
  injectVideoFoodSection();

  const root = document.getElementById("video-food-grid");
  if (!root) return;

  const sourcePicks = data.videoFoodPicks?.length ? data.videoFoodPicks : VIDEO_FOOD_PICKS;
  const picks = [...sourcePicks].sort((left, right) => {
    const leftDay = Number.parseInt(String(left.day || "").replace(/\D+/g, ""), 10) || Number.MAX_SAFE_INTEGER;
    const rightDay = Number.parseInt(String(right.day || "").replace(/\D+/g, ""), 10) || Number.MAX_SAFE_INTEGER;
    return leftDay - rightDay;
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

function drawMapPoints(data, selectedDay) {
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
