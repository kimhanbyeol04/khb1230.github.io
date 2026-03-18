const projects = [
  {
    id: "all",
    label: "전체",
  },
  {
    id: "planning",
    label: "기획",
  },
  {
    id: "frontend",
    label: "프론트엔드",
  },
  {
    id: "backend",
    label: "백엔드",
  },
  {
    id: "team",
    label: "협업",
  },
];

const projectData = [
  {
    title: "캡스톤디자인 메인 프로젝트",
    year: "2026",
    category: "team",
    summary:
      "캡스톤디자인의 핵심 결과물로, 팀원들과 역할을 나눠 문제를 정의하고 기능을 설계한 뒤 최종 결과물까지 완성한 프로젝트입니다.",
    tags: ["기획", "협업", "발표"],
    details: [
      ["역할", "프로젝트 구조 정리, 화면 구성, 발표 자료 정리"],
      ["기술", "HTML, CSS, JavaScript, Git"],
      ["성과", "발표용 데모와 결과 정리 문서까지 연결"],
    ],
  },
  {
    title: "UI 개선 실습 프로젝트",
    year: "2025",
    category: "frontend",
    summary:
      "기존 화면을 더 읽기 쉽게 다듬고, 반응형 레이아웃과 카드형 정보 구조로 사용성을 개선한 프로젝트입니다.",
    tags: ["UI/UX", "반응형", "CSS"],
    details: [
      ["역할", "레이아웃 개편, 스타일 정리"],
      ["기술", "CSS Grid, Flexbox, 변수 사용"],
      ["성과", "모바일 가독성과 정보 밀도 개선"],
    ],
  },
  {
    title: "데이터 정리 대시보드",
    year: "2025",
    category: "backend",
    summary:
      "여러 데이터를 모아 보기 좋게 정리하는 방식으로 정보를 빠르게 확인할 수 있도록 만든 대시보드형 프로젝트입니다.",
    tags: ["API", "데이터", "정리"],
    details: [
      ["역할", "데이터 구조 이해, 화면에 출력되는 정보 구성"],
      ["기술", "JavaScript, JSON, fetch"],
      ["성과", "중복 정보를 줄이고 핵심만 보여주는 구조 확보"],
    ],
  },
  {
    title: "팀 협업 기록 프로젝트",
    year: "2024",
    category: "planning",
    summary:
      "회의 내용, 작업 분담, 일정 관리를 하나의 흐름으로 정리해서 팀 작업이 끊기지 않도록 만든 협업 중심 프로젝트입니다.",
    tags: ["일정관리", "문서화", "협업"],
    details: [
      ["역할", "회의록 정리, 진행 상황 기록"],
      ["기술", "Notion, GitHub, 문서 템플릿"],
      ["성과", "작업 누락을 줄이고 커뮤니케이션을 단순화"],
    ],
  },
];

const grid = document.getElementById("project-grid");
const filters = document.getElementById("filters");
const projectCount = document.querySelector('[data-count="projects"]');

let activeFilter = "all";

function renderFilters() {
  filters.innerHTML = projects
    .map(
      (filter) => `
        <button
          type="button"
          class="${filter.id === activeFilter ? "active" : ""}"
          data-filter="${filter.id}"
        >
          ${filter.label}
        </button>
      `,
    )
    .join("");
}

function renderProjects() {
  const visibleProjects =
    activeFilter === "all"
      ? projectData
      : projectData.filter((project) => project.category === activeFilter);

  projectCount.textContent = String(projectData.length).padStart(2, "0");

  grid.innerHTML = visibleProjects
    .map(
      (project) => `
        <article class="project-card">
          <div class="project-head">
            <div>
              <span class="project-year">${project.year}</span>
              <h3>${project.title}</h3>
            </div>
          </div>
          <p>${project.summary}</p>
          <div class="tags">
            ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <div class="project-meta">
            ${project.details
              .map(
                ([label, value]) => `
                  <div class="meta-row">
                    <strong>${label}</strong>
                    <span>${value}</span>
                  </div>
                `,
              )
              .join("")}
          </div>
        </article>
      `,
    )
    .join("");

  if (!visibleProjects.length) {
    grid.innerHTML = `<div class="project-card"><p>선택한 필터에 해당하는 프로젝트가 없습니다.</p></div>`;
  }
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) {
    return;
  }

  activeFilter = button.dataset.filter;
  renderFilters();
  renderProjects();
});

renderFilters();
renderProjects();
