/* 검색창 자동완성 */
const inputEl = document.querySelector(".main__search-input");
const suggestionList = document.querySelector(".suggestions__list");
const suggestionBox = document.querySelector(".search-suggestions");
const closeBtn = document.querySelector(".suggestions__bottom p:nth-child(2)");

// suggestions 닫는 함수
function closeSuggestions() {
  suggestionBox.classList.remove("show");
  suggestionList.innerHTML = "";
}

// 닫기 버튼 클릭 시
closeBtn.addEventListener("click", () => {
  closeSuggestions();
});

// 인풋 포커스 잃으면 닫힘
inputEl.addEventListener("blur", (e) => {
  // blur 직후 클릭 이벤트와 충돌 방지 위해 지연
  setTimeout(() => {
    if (!suggestionBox.contains(document.activeElement)) {
      closeSuggestions();
    }
  }, 100);
});

// 바깥 클릭 시 닫힘
document.addEventListener("click", (e) => {
  const isClickInside = suggestionBox.contains(e.target) || inputEl.contains(e.target);
  if (!isClickInside) {
    closeSuggestions();
  }
});

function disassembleHangul(char) {
  const CHO = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  const JUNG = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
  const JONG = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

  const code = char.charCodeAt(0);

  if (code >= 0xAC00 && code <= 0xD7A3) {
    // 완성형 한글
    const diff = code - 0xAC00;
    const cho = Math.floor(diff / 588);
    const jung = Math.floor((diff % 588) / 28);
    const jong = diff % 28;

    return [CHO[cho], JUNG[jung], JONG[jong]];
  }

  return [char]; // 비한글은 그대로
}

function splitToJamo(str) {
  return str.split("").flatMap(disassembleHangul);
}

function matchKorean(word, keyword) {
  const w = splitToJamo(word);
  const k = splitToJamo(keyword);

  // 단어의 앞부분이 keyword의 자모와 정확히 동일해야 한다
  for (let i = 0; i < k.length; i++) {
    if (w[i] !== k[i]) {
      return false;  // 앞부분이 다르면 매칭 실패
    }
  }
  return true;
}

inputEl.addEventListener("input", () => {
  const keyword = inputEl.value.trim();

  // 공백이면 추천창 접기 + 내용 비움
  if (!keyword) {
    suggestionList.innerHTML = "";
    suggestionBox.classList.remove("show");
    return;
  }

  const currentMatches = currentSearchData.filter(item => matchKorean(item, keyword));
  const popularMatches = popularSearchData
    .filter(item => matchKorean(item, keyword) && !currentMatches.includes(item));

  const resultList = [...currentMatches, ...popularMatches].slice(0, 10);

  // HTML 생성
  let html = "";
  resultList.forEach(item => {
    // current 데이터라면
    if (currentMatches.includes(item)) {
      html += `
        <li class="suggestions__item">
          <span>
            <i class="fa fa-clock-o suggestions__icon"></i>${item}
          </span>
          <span>
            <i class="fa fa-times suggestions__icon close"></i>
          </span>
        </li>`;
    }
    // popular 데이터라면
    else {
      html += `
        <li class="suggestions__item">
          <span>
            <i class="fa-solid fa-magnifying-glass suggestions__icon"></i>${item}
          </span>
        </li>`;
    }
  });
  suggestionList.innerHTML = html;
  suggestionBox.classList.add("show");
});


/* 소식 게시판 */
const noticeIcons = {
  'notice': "fa-bullhorn",
  'update': "fa-code-branch",
  'event': "fa-gift"
};

const noticeCategory = {
  'notice': "공지사항",
  'update': "업데이트",
  'event': "이벤트"
};

const noticeDefaultImg = {
  'notice': "https://picsum.photos/160/100",//"/assets/image/matching/default-notice.png",
  'update': "https://picsum.photos/170/100",//"/assets/image/matching/default-update.png",
  'event': "https://picsum.photos/180/100",//"/assets/image/matching/default-event.png"
}

const noticeMaxPosts = 10;
const noticePostsPerPage = 2;
let noticeCurrentTab = "all";
let noticeCurrentPage = 1;

const noticeList = document.getElementById("notice-list");
const noticePageNumber = document.getElementById("page-number");
const noticePrevPageBtn = document.getElementById("page-prev");
const noticeNextPageBtn = document.getElementById("page-next");
const noticeTabButtons = document.querySelectorAll(".tab-button.notice");

// 공지사항 필터링 & 페이징
function noticeGetFilteredPosts() {
  let filtered = noticeBoard;
  if (noticeCurrentTab !== "all") {
    filtered = filtered.filter(p => p.category === noticeCurrentTab);
  }
  return filtered.slice(0, noticeMaxPosts);
}

function formatNoticeDate(dateString) {
  const d = new Date(dateString.replace(/-/g, '/')); // Safari 대응

  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return `${month}.${day} ${hours}:${minutes}`;
}

// 렌더링
function noticeRenderPosts() {
  const posts = noticeGetFilteredPosts();
  const totalPages = Math.ceil(posts.length / noticePostsPerPage);
  noticeCurrentPage = Math.min(noticeCurrentPage, totalPages) || 1;

  const startIdx = (noticeCurrentPage - 1) * noticePostsPerPage;
  const pagePosts = posts.slice(startIdx, startIdx + noticePostsPerPage);
  noticeList.innerHTML = pagePosts.map(p => `
    <article class="notice-card" data-category="${p.category}">
      <img class="notice-thumb" src="${p.imageUrl || noticeDefaultImg[p.category] || noticeDefaultImg['notice']}" alt="${noticeCategory[p.category]} 이미지" />
      <div class="notice-content">
        <div class="notice-header">
          <i class="fa-solid ${noticeIcons[p.category] || 'fa-file'} notice-icon"></i>
          <h3>${p.title}</h3>
        </div>
        <p class="notice-detail">${p.content}</p>
        <p class="notice-time">${formatNoticeDate(p.createdAt)}</p>
      </div>
    </article>
  `).join("");



  noticePageNumber.textContent = `${noticeCurrentPage} / ${totalPages || 1}`;
  noticePrevPageBtn.disabled = noticeCurrentPage === 1;
  noticeNextPageBtn.disabled = noticeCurrentPage === totalPages || totalPages === 0;
}

// 탭 클릭
noticeTabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    noticeTabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    noticeCurrentTab = btn.dataset.tab;
    noticeCurrentPage = 1;
    noticeRenderPosts();
  });
});

// 페이저 클릭
noticePrevPageBtn.addEventListener("click", () => {
  if (noticeCurrentPage > 1) {
    noticeCurrentPage--;
    noticeRenderPosts();
  }
});

noticeNextPageBtn.addEventListener("click", () => {
  const posts = noticeGetFilteredPosts();
  const totalPages = Math.ceil(posts.length / noticePostsPerPage);
  if (noticeCurrentPage < totalPages) {
    noticeCurrentPage++;
    noticeRenderPosts();
  }
});

// 초기 렌더링
noticeRenderPosts();








/* 협업 게시판 */

// 아이콘 매핑 (카테고리별)
const collabIcons = {
  request: "fa-handshake",
  proposal: "fa-lightbulb"
};

// DOM 요소
const proposalGallery = document.querySelector(".collab-gallery.proposal .gallery__board");
const requestGallery = document.querySelector(".collab-gallery.request .gallery__board");

// 필터링 함수
function collabGetFilteredPosts(category) {
  let filtered = matchingBoard.filter(p => p.isActive);

  filtered = filtered.filter(p => p.category === category);

  return filtered;
}

// 렌더링 함수
function collabRenderPosts(type, gallery) {
  if (!gallery) {
    return;
  }

  const posts = collabGetFilteredPosts(type)
    .slice(0, 10);

  gallery.innerHTML = posts.map(p => {
    const companyInfo = company.find(c => c.id === p.companyId) || {};
    const name = companyInfo.name || "알 수 없는 회사";

    const fromDate = new Date(p.validFrom);
    const toDate = new Date(p.validTo);
    const period = `${fromDate.getMonth() + 1}.${fromDate.getDate()}~${toDate.getMonth() + 1}.${toDate.getDate()}`;

    return `
      <div class="collab-card" data-category="${p.category}">
        <div class="collab-content">
          <h2 class="collab-content__title">${p.title}<b>(${period})</b></h2>
          <p class="collab-content__desc">${p.content}</p>
        </div>
      </div>
    `;
  }).join("");
}

// 초기 렌더링
collabRenderPosts("proposal", proposalGallery);
collabRenderPosts("request", requestGallery);







/* 추천 기업 */
function renderPopular() {
  const sorted = [...company]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 20);
  renderCompanyList(sorted);
}

function renderNewest() {
  const sorted = [...company]
    .sort((a, b) => b.id - a.id)
    .slice(0, 20);
  renderCompanyList(sorted);
}

const subToCompanyMap = (() => {
  const map = new Map();
  companySubMapping.forEach(({ company_id, sub_id }) => {
    if (!map.has(sub_id)) map.set(sub_id, new Set());
    map.get(sub_id).add(company_id);
  });
  return map;
})();

function getCompaniesBySubId(subId) {
  const ids = subToCompanyMap.get(subId);
  if (!ids || ids.size === 0) return [];
  return company.filter(c => ids.has(c.id));
}

function renderCompanyList(list) {
  const container = document.getElementById('companyList');
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = '<p class="no-result">검색 결과가 없습니다.</p>';
    return;
  }

  list.forEach(c => {
    const hasImage = !!c.image;

    const imageSrc = hasImage
      ? `/assets/image/ci/${c.image}`
      : null;

    const imageHTML = hasImage
      ? `<img src="${imageSrc}"
              onerror="this.onerror=null; this.src='./assets/images/default-company.png';"
              alt="${c.name}"
              class="company-card__image" />`
      : `<div class="company-card__no-image">${c.name}</div>`;

    const linkHTML = c.website
      ? `<a href="${c.website}" class="actions-website" target="_blank">
       <i class="fa-solid fa-globe"></i> 웹사이트 방문
     </a>`
      : `<div class="actions-website disabled">
       <i class="fa-solid fa-ban"></i> 웹사이트 없음
     </div>`;

    const item = document.createElement('div');
    item.className = 'company-item';
    item.innerHTML = `
    <div class="company-card meta">
      <div class="company-card-top">
        <div class="company-card__left">
          <div class="company-card__thumb">
            ${imageHTML}
          </div>
        </div>

        <div class="company-card__right">
          <div class="company-card__text">
            <h3 class="company-card__name">${c.name}</h3>
            <!-- 팔로워 -->
            <p class="company-card__followers"><b>${c.popularity.toLocaleString()}</b> 팔로워</p>
          </div>      
          <div class="company-card__actions">
            ${linkHTML}
          </div>
        </div>      
      </div>
    </div> 
    `;
    container.appendChild(item);
  });
}

const defaultMainTab = document.querySelector('.tab-button[data-tab="popular"]');
const partnerTabButtons = document.querySelectorAll('.tab-button.partner');
const partnerAdditionalMenu = document.querySelector('.tab-menu.additional');
const partnerAdditionalSubMenu = document.querySelector('.tab-menu.additional-sub');

partnerTabButtons.forEach(tab => {
  tab.addEventListener('click', () => {
    // 1) notice 탭 active
    partnerTabButtons.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // 2) additional / additional-sub 초기화
    partnerAdditionalMenu.innerHTML = '';
    partnerAdditionalSubMenu.innerHTML = '';

    const tabName = tab.dataset.tab;

    if (tabName === 'region') {
      // regionsCategory 기반 버튼 생성
      regionsCategory.forEach((region, idx) => {
        const btn = document.createElement('button');
        btn.className = `tab-button region sub ${region.class}`;
        btn.dataset.region = region.class;
        btn.textContent = region.name;

        if (idx === 0) btn.classList.add('active'); // 첫 번째 active

        // 내 주변 선택 시 거리 필터 표시
        btn.addEventListener('click', () => {
          partnerAdditionalMenu.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filtered = company.filter(c => c.region === region.class);
          renderCompanyList(filtered);
        });

        partnerAdditionalMenu.appendChild(btn);
      });

      // 기본으로 첫 번째 버튼 클릭
      partnerAdditionalMenu.querySelector('button').click();

    } else if (tabName === 'industry') {
      // mainCategory 버튼 생성
      mainCategory.forEach((mainCat, idx) => {
        const btn = document.createElement('button');
        btn.className = 'tab-button industry main';
        btn.dataset.mainId = mainCat.id;
        btn.style.setProperty('--sub-color', mainCat.color);
        btn.textContent = mainCat.name;
        if (idx === 0) btn.classList.add('active'); // 첫 번째 active

        btn.addEventListener('click', () => {
          partnerAdditionalMenu
            .querySelectorAll('.tab-button.industry.main')
            .forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // 하위 버튼 생성
          partnerAdditionalSubMenu.innerHTML = '';
          const subCats = subsCategory.filter(s => s.main_id === mainCat.id);
          subCats.forEach((sub, sIdx) => {
            const subBtn = document.createElement('button');
            subBtn.className = 'tab-button industry sub';
            subBtn.textContent = sub.name;
            subBtn.style.setProperty('--sub-color', sub.color);

            subBtn.addEventListener('click', () => {
              partnerAdditionalSubMenu.querySelectorAll('button').forEach(b => b.classList.remove('active'));
              subBtn.classList.add('active');
              // 여기서 회사 목록 필터링 등 처리 가능
              const filtered = getCompaniesBySubId(sub.id);
              renderCompanyList(filtered);
            });

            if (sIdx === 0) {
              subBtn.classList.add('active');
              subBtn.click();
            }

            partnerAdditionalSubMenu.appendChild(subBtn);
          });
        });

        if (idx === 0) {
          btn.click();
        }

        partnerAdditionalMenu.appendChild(btn);
      });

    } else if (tabName === 'popular') {
      renderPopular();
      return;
    } else if (tabName === 'newest') {
      renderNewest();
      return;
    }
  });
});

if (defaultMainTab) defaultMainTab.click();



// 사이드 패널
const panel = document.getElementById("sidePanel");
const panelClose = document.getElementById("panelClose");

// 닫기 버튼
panelClose.addEventListener("click", () => {
  panel.classList.remove("open");
});

// 상세보기 버튼 클릭
document.addEventListener("click", (e) => {

  const metaCard = e.target.closest(".company-card.meta");

  if (metaCard) {
    panel.classList.add("open");
  }
});