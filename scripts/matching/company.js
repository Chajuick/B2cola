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
                            ${c.isFollowing ? '<b class="follow">✔</b> 팔로잉' : '<b class="unfollow">♥</b> 팔로우'}
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
                            <button class="btn-detail">상세보기 </button>
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

const panel = document.getElementById("sidePanel");
const panelClose = document.getElementById("panelClose");

// 닫기 버튼
panelClose.addEventListener("click", () => {
  panel.classList.remove("open");
});

// 상세보기 버튼 클릭
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-detail")) {
    panel.classList.add("open");
  }
});
