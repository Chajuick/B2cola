const mainContainer = document.querySelector('.main__category-main');
const subContainer = document.querySelector('.main__category-sub');
const companyListContainer = document.querySelector('.main__company-list');
const searchInput = document.querySelector('.main__search-input');

let selectedMainId = null;
let selectedSubId = null;

// ✅ 1. 대분류 렌더링
function renderMainCategories() {
    console.log(mainCategory)
    mainCategory.forEach(main => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = main.name;
        btn.dataset.id = main.id;
        mainContainer.appendChild(btn);
    });
}
renderMainCategories();

// ✅ 2. 소분류 렌더링
function renderSubCategories(mainId) {
    subContainer.innerHTML = '';
    const filteredSubs = subsCategory.filter(sub => sub.main_id === mainId);

    filteredSubs.forEach(sub => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = sub.name;
        btn.dataset.id = sub.id;
        btn.style.setProperty('--sub-color', sub.color);
        subContainer.appendChild(btn);
    });
}

// ✅ 회사 리스트 렌더링
function renderCompanies(filteredCompanies) {
    companyListContainer.innerHTML = '';

    if (filteredCompanies.length === 0) {
        companyListContainer.innerHTML = '<p class="company-card__none">검색 결과가 없습니다.</p>';
        return;
    }

    filteredCompanies.forEach(c => {
        // 이미지 처리
        const hasImage = !!c.image;
        const imageSrc = hasImage
            ? `/assets/logo/logo-${c.image}`
            : null;

        // 링크 처리
        const linkHTML = c.website
            ? `<a href="${c.website}" class="company-card__link" target="_blank">
            <i class="fa-solid fa-link"></i> 웹사이트
          </a>`
            : `<button class="company-card__link company-card__link--disabled" disabled>
            <i class="fa-solid fa-link-slash"></i> 웹사이트 없음
          </button>`;

        // 해당 회사의 소속 소분류명 찾기
        const mapping = companySubMapping.find(m => m.company_id === c.id);
        const sub = subsCategory.find(s => s.id === mapping?.sub_id);
        const subName = sub ? sub.name : '카테고리 미등록';
        const subColor = sub ? sub.color : '#95a5a6';

        // 이미지 or 텍스트 렌더링
        const imageHTML = hasImage
            ? `<img src="${imageSrc}"
                 onerror="this.onerror=null; this.src='./assets/images/default-company.png';"
                 alt="${c.name}"
                 class="company-card__image" />`
            : `<div class="company-card__no-image">${c.name}</div>`;

        function lightenColor(color, percent) {
            const num = parseInt(color.replace("#", ""), 16),
                amt = Math.round(2.55 * percent),
                R = (num >> 16) + amt,
                G = (num >> 8 & 0x00FF) + amt,
                B = (num & 0x0000FF) + amt;
            return "#" + (
                0x1000000 +
                (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
                (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
                (B < 255 ? B < 1 ? 0 : B : 255)
            ).toString(16).slice(1);
        }

        const gradient = `linear-gradient(135deg, ${subColor} 0%, ${lightenColor(subColor, 15)} 100%)`;

        // 카드 구성
        const card = document.createElement('div');
        card.className = 'company-card';
        card.innerHTML = `
            <div class="company-card__image-wrapper" style="background: ${gradient}">   
                <div class="company-card__ci-box">
                    ${imageHTML}
                </div>
                <button class="company-card__like">
                <i class="fa-regular fa-heart"></i>
                </button>
            </div>

            <div class="company-card__info">
                <h3 class="company-card__name">${c.name}</h3>
                <p class="company-card__subs">${c.detail}</p>
                <p class="company-card__category" style="background-color: ${subColor}">${subName}</p>                     
                <div class="company-card__buttons">
                    <a href="/page/board/detail.html" class="company-card__detail">
                        <i class="fa-solid fa-circle-info"></i> 상세보기
                    </a>           
                    ${linkHTML}
                </div>
            </div>
        `;
        companyListContainer.appendChild(card);
    });
}

// ✅ 초기 전체 렌더링
renderCompanies(company);

// ✅ 4. 대분류 클릭 이벤트
mainContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('category-btn')) return;
    selectedMainId = Number(e.target.dataset.id);
    selectedSubId = null;

    mainContainer.querySelectorAll('.category-btn').forEach(btn =>
        btn.classList.remove('category-btn--active')
    );
    e.target.classList.add('category-btn--active');

    renderSubCategories(selectedMainId);
    renderCompanies(company);
});

// ✅ 5. 소분류 클릭 이벤트 (다중 선택 가능)
subContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('category-btn')) return;

    const btn = e.target;
    const subId = Number(btn.dataset.id);

    // 클릭한 버튼의 활성 상태 토글
    btn.classList.toggle('category-btn--active');

    // ✅ 현재 활성화된 모든 소분류 id 수집
    const activeSubIds = Array.from(
        subContainer.querySelectorAll('.category-btn--active')
    ).map(activeBtn => Number(activeBtn.dataset.id));

    // ✅ 선택된 소분류가 하나도 없으면 전체 표시
    if (activeSubIds.length === 0) {
        renderCompanies(company);
        return;
    }

    // ✅ 여러 소분류에 해당하는 회사들을 전부 포함시켜 렌더링
    const filteredCompanies = companySubMapping
        .filter(m => activeSubIds.includes(m.sub_id))
        .map(m => company.find(c => c.id === m.company_id))
        .filter(Boolean); // null 방지

    renderCompanies(filteredCompanies);
});

// ✅ 6. 검색 기능
searchInput.addEventListener('input', e => {
    const keyword = e.target.value.toLowerCase();

    let baseList = company;
    if (selectedSubId) {
        baseList = companySubMapping
            .filter(m => m.sub_id === selectedSubId)
            .map(m => company.find(c => c.id === m.company_id));
    }

    const filtered = baseList.filter(c =>
        c.name.toLowerCase().includes(keyword)
    );
    renderCompanies(filtered);
});


// ✅ 7. 좋아요(관심기업) 기능
const likedCompanies = JSON.parse(localStorage.getItem('likedCompanies')) || [];

// 렌더링 후 좋아요 상태 반영
function applyLikeStates() {
    document.querySelectorAll('.company-card__like').forEach(btn => {
        const companyName = btn.closest('.company-card').querySelector('.company-card__name').textContent;
        if (likedCompanies.includes(companyName)) {
            btn.classList.add('liked');
            btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
        } else {
            btn.classList.remove('liked');
            btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }
    });
}

// 렌더링 끝날 때마다 실행되도록 renderCompanies 수정
const originalRenderCompanies = renderCompanies;
renderCompanies = function (filteredCompanies) {
    originalRenderCompanies(filteredCompanies);
    applyLikeStates(); // ❤️ 좋아요 상태 반영
};

// ✅ 좋아요 버튼 클릭 이벤트 위임
companyListContainer.addEventListener('click', e => {
    if (!e.target.closest('.company-card__like')) return;

    const btn = e.target.closest('.company-card__like');
    const companyName = btn.closest('.company-card').querySelector('.company-card__name').textContent;

    if (likedCompanies.includes(companyName)) {
        // 이미 좋아요 되어 있으면 해제
        const index = likedCompanies.indexOf(companyName);
        likedCompanies.splice(index, 1);
        btn.classList.remove('liked');
        btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    } else {
        // 새로 좋아요 추가
        likedCompanies.push(companyName);
        btn.classList.add('liked');
        btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    }

    // 저장
    localStorage.setItem('likedCompanies', JSON.stringify(likedCompanies));
});