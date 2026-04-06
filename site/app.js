const tripData = {
  team: [
    {
      role: "destination-analyst",
      title: "목적지 분석가",
      summary:
        "오사키 호텔을 기준점으로 두고, 아카바네의 추억 회복 가치와 아들 기준 체험 강도가 높은 오다이바·건담베이스를 메인 축으로 선정했습니다.",
      tags: ["계절성", "지역 적합도", "혼잡도", "가족 적합성"],
    },
    {
      role: "itinerary-designer",
      title: "일정 설계사",
      summary:
        "첫날과 마지막 날의 짧은 시간을 감안해 도시형 코어 플랜과 Day 4 스왑 플랜을 나눴습니다. 아카바네는 저녁 감성 산책용으로 배치했습니다.",
      tags: ["동선 최적화", "체력 안배", "호텔 활용", "대체안 설계"],
    },
    {
      role: "budget-manager",
      title: "예산 관리자",
      summary:
        "이미 예약된 항공·숙박은 별도로 보고, 현지 체류비 중심으로 계산했습니다. 후지큐는 메인 플랜에 넣지 않고 추가비용 옵션으로 처리했습니다.",
      tags: ["현지비", "가족 3인", "옵션 비용", "지출 압박도"],
    },
    {
      role: "local-guide",
      title: "현지 가이드",
      summary:
        "오사키역 직결 숙소의 장점을 살려 야마노테선 기동성을 최대한 활용하고, 추억의 체인과 최근 운영 확인 식당 후보를 지역별로 맞물리게 배치했습니다.",
      tags: ["교통 팁", "맛집 후보", "현지 에티켓", "조정 요청"],
    },
  ],
  comms: [
    {
      route: "분석가 → 설계사",
      body:
        "5월 하순 도쿄는 야외 활동이 편하고, 첫 방문 아동에게 오다이바·건담베이스 만족도가 높음. 아카바네는 정서 가치가 커서 짧아도 핵심 방문으로 유지 권고.",
    },
    {
      route: "설계사 → 예산",
      body:
        "메인 플랜은 도시형 이동 위주, 유료 입장 비중은 중간 수준. Day 4 후지큐 전환 시 교통비와 어트랙션 비용이 크게 상승하므로 별도 옵션으로 계산 필요.",
    },
    {
      route: "설계사 → 가이드",
      body:
        "Day 1 저녁은 아카바네, Day 2는 센소지·우에노·아키하바라, Day 3은 시부야·신주쿠·도쿄타워, Day 4는 오다이바·건담베이스 기본안으로 지역별 식당 후보 요청.",
    },
    {
      route: "예산 → 가이드",
      body:
        "현지비는 균형형 기준 17만 엔 전후. 교통은 모바일 Suica 중심, 후지큐 추가 시 버스 또는 철도 패키지 검토 필요. 고가 오마카세는 제외하고 점심 효율이 좋은 가게 우선.",
    },
    {
      route: "가이드 → 설계사",
      body:
        "후지큐와 요코하마를 같은 날 깊게 넣는 것은 가족 일정으로 무리. 요코하마는 오다이바와 묶을 수 있지만 후지큐는 단독 원정일로 분리하는 편이 안정적이라고 조정 요청.",
    },
  ],
  itinerary: [
    {
      day: "Day 1",
      label: "2026.05.22 금요일",
      time: "도착 · 회복 · 추억",
      title: "나리타 입국 후 오사키 체크인, 저녁은 아카바네로",
      summary:
        "도착일은 무리하지 않고 호텔 적응과 추억 회복에 집중합니다. 오사키역 직결 숙소 장점을 살려 짐 부담을 줄인 뒤, 이케부쿠로를 가볍게 지나 아카바네를 천천히 걷는 구성이 가장 자연스럽습니다.",
      route: [
        "NRT 도착 → 호텔 이동 → 체크인/휴식",
        "오사키 주변 또는 역내에서 가벼운 점심",
        "이케부쿠로 경유 또는 바로 아카바네 이동",
        "아카바네 동네 산책 · 추억 회상 · 저녁 식사",
      ],
      notes: [
        "첫날 목표는 많이 보기보다 몸을 도쿄 리듬에 맞추는 것",
        "아카바네는 이번 여행의 감정적 앵커",
      ],
    },
    {
      day: "Day 2",
      label: "2026.05.23 토요일",
      time: "전통 · 시장 · 서브컬처",
      title: "츠키지, 센소지, 우에노, 아키하바라를 한 축으로",
      summary:
        "토요일은 도쿄의 고전적인 첫 방문 체험을 아들에게 보여주기 좋은 날입니다. 츠키지의 아침 식사, 아사쿠사의 전통, 우에노의 산책, 아키하바라의 서브컬처를 한 줄로 엮는 동선입니다.",
      route: [
        "츠키지 아침 식사 또는 이른 점심",
        "아사쿠사 · 센소지 · 나카미세",
        "점심은 텐동 또는 합리적 스시",
        "우에노 공원/아메요코 산책",
        "아키하바라에서 피규어·게임·전자상가 가볍게 체험",
      ],
      notes: [
        "주말 혼잡이 있어 오전 아사쿠사 선점이 유리",
        "아키하바라는 과몰입보다 2~3시간 체험형 방문 권장",
      ],
    },
    {
      day: "Day 3",
      label: "2026.05.24 일요일",
      time: "도시의 현재형 도쿄",
      title: "시부야, 신주쿠, 도쿄타워로 현재의 도쿄를 보여주는 날",
      summary:
        "이 날은 부모님 세대의 익숙한 번화가와 아들이 인상적으로 받아들일 야경 요소를 함께 묶었습니다. 쇼핑과 먹거리, 전망 포인트가 고르게 들어갑니다.",
      route: [
        "시부야 스크램블 · 미야시타/도겐자카 권역",
        "점심은 야스베에 또는 라멘 계열",
        "신주쿠 이동 · 백화점/거리 산책",
        "저녁 무렵 도쿄타워 방문",
      ],
      notes: [
        "시부야와 신주쿠를 같은 날 묶되 쇼핑 목표를 미리 정할수록 덜 지침",
        "도쿄타워는 야경 타이밍이 가장 만족도 높음",
      ],
    },
    {
      day: "Day 4",
      label: "2026.05.25 월요일",
      time: "메인안",
      title: "오다이바와 건담베이스, 필요하면 저녁 요코하마 스냅샷",
      summary:
        "메인 플랜은 아들의 체험 강도를 살리는 오다이바 중심입니다. 건담베이스와 다이버시티가 확실한 목적지를 만들고, 체력이 남으면 저녁에 요코하마까지 짧게 확장할 수 있습니다.",
      route: [
        "오다이바 이동 · DiverCity Tokyo Plaza",
        "THE GUNDAM BASE TOKYO 체험",
        "해변/쇼핑몰/실내 엔터테인먼트 선택형",
        "컨디션 좋으면 저녁 요코하마 미나토미라이 스냅샷",
      ],
      notes: [
        "요코하마는 이 날의 연장 옵션이지 필수 코스가 아님",
        "무리 없는 가족 일정 기준으로 오다이바 단독 완성도가 높음",
      ],
    },
    {
      day: "Day 5",
      label: "2026.05.26 화요일",
      time: "출국",
      title: "이른 공항 이동으로 여유 있게 마무리",
      summary:
        "나리타 11시 10분 출발이므로 아침 관광은 넣지 않는 편이 안전합니다. 전날 밤 짐 정리를 끝내고, 체크아웃 후 공항으로 바로 이동하는 흐름을 권장합니다.",
      route: [
        "조식 또는 간단한 역내 식사",
        "오사키 출발 · 나리타 이동",
        "에어부산 NRT 11:10 → ICN 13:55",
      ],
      notes: [
        "출국일은 일정 욕심보다 스트레스 최소화가 중요",
      ],
    },
  ],
  options: [
    {
      label: "Option A",
      pill: "메인 추천",
      title: "오다이바 집중 + 가벼운 요코하마 연장",
      summary:
        "11살 아들의 만족도와 가족 체력 밸런스를 보면 가장 안정적입니다. 건담베이스, 해변가, 쇼핑몰, 야경을 한 번에 담을 수 있고, 너무 무겁지 않습니다.",
      list: [
        "장점: 가족 전체 만족도와 이동 안정성이 높음",
        "단점: 후지산/놀이공원 원정 감성은 약함",
        "추천 상황: 이번 여행을 추억 회복형 도쿄 여행으로 두고 싶을 때",
      ],
    },
    {
      label: "Option B",
      pill: "강한 원정일",
      title: "후지큐 하이랜드 단독 원정으로 교체",
      summary:
        "후지큐를 정말 넣고 싶다면 Day 4를 통째로 바꾸는 방식이 맞습니다. 신주쿠 출발 버스 또는 철도 패키지를 활용하고, 요코하마와 오다이바는 이번엔 과감히 덜어내야 합니다.",
      list: [
        "장점: 아들 체험 임팩트가 매우 큼",
        "단점: 이동시간과 피로도가 높고 날씨 영향이 큼",
        "추천 상황: 놀이공원 체험을 이번 여행의 하이라이트로 두고 싶을 때",
      ],
    },
  ],
  budgets: {
    saver: {
      name: "절제형",
      total: "¥110,000",
      description:
        "가족 3인 현지 체류비 기준. 이미 예약한 항공·호텔을 제외하고, 체인 위주의 식사와 무료 산책 중심으로 운영하는 경우입니다.",
      lines: [
        ["교통", "¥18,000"],
        ["식비", "¥42,000"],
        ["입장/체험", "¥20,000"],
        ["간식/카페", "¥8,000"],
        ["예비비", "¥22,000"],
      ],
      note:
        "오다이바 중심 메인안에 적합합니다. 후지큐 전환 시 최소 4만 5천 엔 이상 추가를 보는 편이 안전합니다.",
    },
    balanced: {
      name: "균형형",
      total: "¥170,000",
      description:
        "가족 3인이 무리 없이 움직이면서, 추억의 체인과 2~3회의 만족도 높은 식사를 섞는 기본 시나리오입니다.",
      lines: [
        ["교통", "¥22,000"],
        ["식비", "¥68,000"],
        ["입장/체험", "¥30,000"],
        ["간식/쇼핑", "¥18,000"],
        ["예비비", "¥32,000"],
      ],
      note:
        "이번 프로젝트의 기본 추천안입니다. 도시형 일정과 아카바네 회상, 건담베이스, 도쿄타워를 가장 자연스럽게 소화합니다.",
    },
    fun: {
      name: "체험확장형",
      total: "¥255,000",
      description:
        "오다이바 실내 엔터테인먼트, 더 나은 식사 선택, 기념품 구매, 후지큐 전환 가능성까지 흡수하는 상위 여유 시나리오입니다.",
      lines: [
        ["교통", "¥35,000"],
        ["식비", "¥92,000"],
        ["입장/체험", "¥58,000"],
        ["쇼핑", "¥35,000"],
        ["예비비", "¥35,000"],
      ],
      note:
        "후지큐 버스/철도 패키지, 추가 놀이기구, 굿즈 쇼핑까지 고려할 때 맞는 구간입니다.",
    },
  },
  nostalgiaFoods: [
    "오오토야: 도착일·이동일 점심에 안정감 있는 정식 선택지",
    "야요이켄: 가족 모두 메뉴 선택이 쉬운 무난한 식사 카드",
    "후지소바: 가벼운 아침이나 이동 중 한 끼에 유효",
    "텐야: 아사쿠사·우에노 축 일정과 잘 맞는 가성비 선택",
    "교자노 오쇼: 아들이 먹기 쉬운 메뉴가 많아 안전 카드",
    "스시잔마이: 츠키지 일정에서 접근하기 쉬운 합리적 스시",
    "야스베에: 시부야 권역에서 추억 소환용 츠케멘 핵심 후보",
  ],
  verifiedFoods: [
    {
      name: "つけ麺屋 やすべえ 渋谷店",
      detail: "시부야에서 추억 회복용 1순위. 구루나비 노출 기준 운영 정보 확인.",
      link: "https://r.gnavi.co.jp/1k1sdneg0000/",
    },
    {
      name: "三田製麺所 渋谷道玄坂店",
      detail: "도겐자카 축 대체 츠케멘 카드. 늦은 시간까지 운영하는 편.",
      link: "https://r.gnavi.co.jp/j6bzg6uh0000/",
    },
    {
      name: "すしざんまい新館",
      detail: "츠키지 권역에서 부담 적고 접근성이 좋은 스시 선택지.",
      link: "https://gurunavi.com/en/a400433/rst/",
    },
    {
      name: "つきぢ神楽寿司 新館",
      detail: "츠키지에서 조금 더 정통감 있는 스시를 원할 때 검토할 만한 후보.",
      link: "https://gurunavi.com/en/a070207/rst/",
    },
    {
      name: "いいとこ鶏 赤羽店",
      detail: "아카바네 저녁 회상 코스에 잘 맞는 야키토리 이자카야 후보.",
      link: "https://gurunavi.com/en/e335704/rst/",
    },
    {
      name: "寿司茶屋 桃太郎 上野店",
      detail: "우에노 밤 시간대에 회전이 좋은 스시/이자카야 성격의 후보.",
      link: "https://gurunavi.com/en/a709006/rst/",
    },
  ],
  guideNotes: [
    {
      title: "숙소 활용",
      text:
        "뉴 오타니 인 도쿄는 오사키역 북개찰 동쪽과 직결이라 비 오는 날과 짐 있는 날의 스트레스가 낮습니다. 야마노테선, 사이쿄선, 쇼난신주쿠라인, 린카이선을 활용하기 좋은 베이스입니다.",
    },
    {
      title: "공항 이동",
      text:
        "나리타 공항 철도는 JR과 게이세이 축이 모두 가능하지만, 가족 3인과 짐을 고려하면 환승 횟수를 줄이는 방식이 안정적입니다. 출국일은 호텔 출발 시간을 넉넉하게 잡는 편이 좋습니다.",
    },
    {
      title: "도쿄타워",
      text:
        "공식 안내 기준 메인데크는 9:00-23:00, 최종 입장은 22:30입니다. 밤 시간 방문이 만족도가 높지만, 혼잡일에는 현장 상황을 보며 유연하게 움직이는 편이 좋습니다.",
    },
    {
      title: "건담베이스 / 오다이바",
      text:
        "건담베이스 도쿄는 DiverCity Tokyo Plaza 7층 공식 매장입니다. 같은 건물과 오다이바 권역만으로도 반나절 이상 충분히 보낼 수 있어, 가족 여행에서는 과도한 추가 이동보다 집중 체류가 낫습니다.",
    },
    {
      title: "후지큐 하이랜드",
      text:
        "공식 접근 안내상 신주쿠 출발 고속버스와 철도 패키지 모두 가능합니다. 다만 원정일로는 강도가 높아, 이번 일정에 넣는다면 하루를 통째로 교체하는 편이 좋습니다.",
    },
    {
      title: "결제와 예약",
      text:
        "모바일 Suica를 기본 결제수단으로 두고, 식당은 현장 대기보다 구글맵·구루나비에서 당일 운영 여부를 확인하는 흐름이 효율적입니다. 주말 츠키지·아사쿠사는 대기 시간을 감안해야 합니다.",
    },
  ],
  sources: [
    {
      title: "뉴 오타니 인 도쿄 공식 접근 안내",
      note: "오사키역 북개찰 동쪽 직결 여부 확인",
      url: "https://www.newotani-inntokyo.jp/access/",
    },
    {
      title: "도쿄타워 공식 요금·운영시간",
      note: "메인데크 운영시간과 최종 입장 확인",
      url: "https://www.tokyotower.co.jp/fee/",
    },
    {
      title: "도쿄타워 공식 접근 안내",
      note: "아카바네바시역 기준 도보 접근 확인",
      url: "https://en.tokyotower.co.jp/access/",
    },
    {
      title: "THE GUNDAM BASE TOKYO 공식 시설 안내",
      note: "DiverCity Tokyo Plaza 7층 공식 정보 확인",
      url: "https://www.gundam-base.net/about/",
    },
    {
      title: "DiverCity Tokyo Plaza 공식 안내",
      note: "오다이바 권역 운영시간 참고",
      url: "https://www.divercity-tokyo.com/en.html",
    },
    {
      title: "후지큐 하이랜드 공식 접근 안내",
      note: "신주쿠 출발 버스/철도 접근 가능성 확인",
      url: "https://www.fujiq.jp/en/access/",
    },
    {
      title: "나리타공항 철도 접근 안내",
      note: "JR·게이세이 접근 축 참고",
      url: "https://www.narita-airport.jp/en/access/train/",
    },
    {
      title: "JR East N'EX 안내",
      note: "공항철도 비용 및 직통 축 참고",
      url: "https://www.jreast.co.jp/en/multi/nex/",
    },
    {
      title: "Rakuten Gurunavi 식당 후보",
      note: "운영 정보와 위치 확인용. 평점은 방문 전 재확인 권장",
      url: "https://gurunavi.com/",
    },
  ],
};

function renderTeam() {
  const root = document.getElementById("team-grid");
  root.innerHTML = tripData.team
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

function renderComms() {
  const root = document.getElementById("comm-feed");
  root.innerHTML = tripData.comms
    .map(
      (item) => `
        <article class="comm-item">
          <div class="comm-route">${item.route}</div>
          <div class="comm-body">${item.body}</div>
        </article>
      `
    )
    .join("");
}

function renderItinerary() {
  const root = document.getElementById("itinerary-grid");
  root.innerHTML = tripData.itinerary
    .map(
      (item) => `
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
      `
    )
    .join("");
}

function renderOptions() {
  const root = document.getElementById("option-grid");
  root.innerHTML = tripData.options
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

function renderBudgetSwitch() {
  const root = document.getElementById("budget-switch");
  const keys = Object.keys(tripData.budgets);
  root.innerHTML = keys
    .map(
      (key, index) => `
        <button class="${index === 1 ? "active" : ""}" data-budget="${key}">
          ${tripData.budgets[key].name}
        </button>
      `
    )
    .join("");

  root.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      root.querySelectorAll("button").forEach((el) => el.classList.remove("active"));
      button.classList.add("active");
      renderBudgetPanel(button.dataset.budget);
    });
  });
}

function renderBudgetPanel(key) {
  const budget = tripData.budgets[key];
  const root = document.getElementById("budget-panel");
  root.innerHTML = `
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

function renderFood() {
  document.getElementById("nostalgia-list").innerHTML = tripData.nostalgiaFoods
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.getElementById("verified-list").innerHTML = tripData.verifiedFoods
    .map(
      (item) => `
        <div class="verified-item">
          <strong>${item.name}</strong>
          <p>${item.detail}</p>
          <a href="${item.link}" target="_blank" rel="noreferrer">운영 정보 보기</a>
        </div>
      `
    )
    .join("");
}

function renderGuide() {
  document.getElementById("guide-grid").innerHTML = tripData.guideNotes
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

function renderSources() {
  document.getElementById("sources-list").innerHTML = tripData.sources
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
}

renderTeam();
renderComms();
renderItinerary();
renderOptions();
renderBudgetSwitch();
renderBudgetPanel("balanced");
renderFood();
renderGuide();
renderSources();
