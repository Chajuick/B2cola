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
  partner: "fa-handshake",
  proposal: "fa-lightbulb"
};

// 탭 필터링 상태
let collabCurrentTab = "all";

// DOM 요소
const collabGallery = document.querySelector(".collab-gallery");
const collabTabButtons = document.querySelectorAll(".tab-button.collab");

// 필터링 함수
function collabGetFilteredPosts() {
  let filtered = matchingBoard.filter(p => p.isActive);
  if (collabCurrentTab !== "all") {
    filtered = filtered.filter(p => p.category === collabCurrentTab);
  }
  return filtered;
}

// 렌더링 함수
function collabRenderPosts() {

  const posts = collabGetFilteredPosts()
    .slice(0, 4);

  collabGallery.innerHTML = posts.map(p => {
    const companyInfo = company.find(c => c.id === p.companyId) || {};
    const logo = companyInfo.image ? `/assets/image/ci/${companyInfo.image}` : "/assets/logo/default.png";
    const name = companyInfo.name || "알 수 없는 회사";

    const fromDate = new Date(p.validFrom);
    const toDate = new Date(p.validTo);
    const period = `${fromDate.getMonth() + 1}.${fromDate.getDate()}~${toDate.getMonth() + 1}.${toDate.getDate()}`;

    return `
      <div class="collab-card" data-category="${p.category}">
        <div class="collab-logo">
          <img src="${logo}" alt="${name} 로고" />
        </div>
        <div class="collab-content">
          <h2><i class="fa-solid ${collabIcons[p.category]} collab-icon ${p.category}"></i>${name}</h2>
          <h3>${p.title}</h3>
          <p>${p.content}</p>
          <div>
            <a href="#" class="collab-link">자세히 보기</a>
            <span>${period}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}


// 탭 클릭 이벤트
collabTabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    collabTabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    collabCurrentTab = btn.dataset.tab;
    collabRenderPosts();
  });
});

// 초기 렌더링
collabRenderPosts();







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
    const mapping = companySubMapping.find(m => m.company_id === c.id);
    const sub = subsCategory.find(s => s.id === mapping?.sub_id);
    const subName = sub ? sub.name : '미등록';
    const subColor = sub ? sub.color : '#95a5a6';

    const regionLocalizing = regionsCategory.find(r => r.class === c.region);
    const regionName = regionLocalizing ? regionLocalizing.name : '미등록';
    const regionColor = regionLocalizing ? regionLocalizing.color : '#95a5a6';

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
      ? `<a href="${c.website}" class="btn-website" target="_blank">
          웹사이트 방문
        </a>`
      : `<div href="${c.website}" class="btn-website disabled">
          웹사이트 없음
        </div>`;

    const item = document.createElement('div');
    item.className = 'company-item';
    item.innerHTML = `
    <div class="company-card">
      <div class="company-top">
        <div class="company-logo">${imageHTML}</div>

        <div class="company-main">
          <h3 class="company-name">${c.name}</h3>

          <!-- 팔로워 -->
          <div class="company-follow">
            <span class="followers"><b>${c.popularity.toLocaleString()}</b> 팔로워</span>

            <button class="btn-follow ${c.isFollowing ? 'unfollow' : 'follow'}" data-id="${c.id}">
              ${c.isFollowing ? '<b class="follow">✔</b> 관심기업' : '<b class="unfollow">♥</b> 관심기업 추가'}
            </button>
          </div>
        </div>
      </div>

      <div class="company-right">
        <a href="/company/${c.id}" class="btn-detail">
          상세보기
        </a>
        ${linkHTML}
      </div>

      <!-- 태그 영역 -->
      <div class="company-tags">
        <span class="tag industry" style="background-color: ${subColor}">${subName}</span>
        <span class="tag region" style="background-color: ${regionColor}">${regionName}</span>
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