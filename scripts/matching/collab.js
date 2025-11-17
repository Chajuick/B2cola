function renderCompanyList(list) {
    const container = document.querySelector('.company-board-content');
    container.innerHTML = '';

    const limitedList = list.slice(0, 10);

    if (list.length === 0) {
        container.innerHTML = '<p class="no-result">검색 결과가 없습니다.</p>';
        return;
    }

    limitedList.forEach(c => {
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
            ? `<a href="${c.website}" class="btn-website" target="_blank">웹사이트 방문</a>`
            : `<div href="${c.website}" class="btn-website disabled">웹사이트 없음</div>`;

        const item = document.createElement('div');
        item.className = 'company-item';
        item.innerHTML = `
        <div class="company-card row">
            <div class="company-top">
                <div class="company-logo">${imageHTML}</div>

                <div class="company-main">
                    <div class="company-main-header">
                        <h3 class="company-name">${c.name}</h3>
                        <!-- 팔로워 -->
                        <div class="company-follow">
                            <span class="followers"><b>${c.popularity.toLocaleString()}</b> 팔로워</span>

                            <button class="btn-follow ${c.isFollowing ? 'unfollow' : 'follow'}" data-id="${c.id}">
                            ${c.isFollowing ? '<b class="follow">✔</b> 관심기업' : '<b class="unfollow">♥</b> 관심공고 추가'}
                            </button>
                        </div>
                    </div>
                    <!-- 태그 영역 -->
                    <div class="company-tags">
                        <div class=""tag-wrapp">
                            <span class="tag industry" style="background-color: ${subColor}">${subName}</span>
                            <span class="tag region" style="background-color: ${regionColor}">${regionName}</span>
                        </div>
                        <div class="company-right">
                            <a href="/company/${c.id}" class="btn-detail">
                            상세보기
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <p class="company-desc">
                ${c.detail}
            </p>
        </div> 
    `;
        container.appendChild(item);
    });
}



renderCompanyList(company);






const collabListContainer = document.querySelector(".collab-list");
const categoryFilter = document.getElementById("categoryFilter");
const deadlineFilter = document.getElementById("deadlineFilter");
const regionFilter = document.getElementById("regionFilter");

function renderCollabBoard(list) {
  collabListContainer.innerHTML = "";

  if (list.length === 0) {
    collabListContainer.innerHTML = "<p>검색 결과가 없습니다.</p>";
    return;
  }

  list.forEach(item => {
    // 회사 정보 가져오기
    const companyInfo = company.find(c => c.id === item.companyId) || {};
    const companyName = companyInfo.name || "미등록";
    const companyLogo = companyInfo.image 
      ? `<img src="/assets/image/ci/${companyInfo.image}" 
              onerror="this.onerror=null; this.src='./assets/images/default-company.png';" 
              alt="${companyName}" class="company-logo"/>`
      : `<div class="company-logo no-image">${companyName}</div>`;

    // 마감 임박 여부 계산
    const today = new Date();
    const validTo = new Date(item.validTo);
    const isSoon = (validTo - today) / (1000*60*60*24) <= 7;

    const card = document.createElement("div");
    card.className = "collab-card";

    card.innerHTML = `
      <div class="card-header">
        <span class="card-category ${item.category}">${item.category === 'proposal' ? '제안' : '요청'}</span>
        <span class="card-deadline">${isSoon ? '마감임박' : ''}</span>
      </div>

      <div class="company-info">
        ${companyLogo}
        <span class="company-name">${companyName}</span>
      </div>

      <h4 class="card-title">${item.title}</h4>
      <p class="card-content">${item.content}</p>

      <div class="card-tags">
        ${item.tags.map(tag => `<span>${tag}</span>`).join("")}
      </div>

      <div class="card-footer">
        <span>조회수: ${item.views}</span>
        <button class="card-btn btn-detail">상세보기</button>
      </div>
    `;

    collabListContainer.appendChild(card);
  });
}


// 필터링
function applyFilters() {
  let filtered = matchingBoard;

  if (categoryFilter.value) {
    filtered = filtered.filter(item => item.category === categoryFilter.value);
  }

  if (deadlineFilter.value === "soon") {
    const today = new Date();
    filtered = filtered.filter(item => (new Date(item.validTo) - today)/(1000*60*60*24) <= 7);
  }

  renderCollabBoard(filtered);
}

// 이벤트
categoryFilter.addEventListener("change", applyFilters);
deadlineFilter.addEventListener("change", applyFilters);

// 초기 렌더링
renderCollabBoard(matchingBoard);
