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







const categoryList = document.getElementById("categoryList");

// 메인 + 서브 카테고리 렌더링
function renderCategories() {
  categoryList.innerHTML = "";

  mainCategory.forEach(main => {
    const li = document.createElement("li");
    li.classList.add("main-item");

    li.innerHTML = `
      <div class="main-header">
        <label class="main-check">
          <input type="checkbox" class="filter__checkbox main main-checkbox" data-id="${main.id}" id="mainCate${main.id}">
          <label class="fillter__label" for="mainCate${main.id}"></label>
          <span class="fillter__label-text">${main.name}</span>
        </label>
        <button class="toggle-btn" data-id="${main.id}">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <ul class="sub-list" data-main="${main.id}" style="display:none;"></ul>
    `;

    categoryList.appendChild(li);

    // 서브 카테고리 넣기
    const subUl = li.querySelector(".sub-list");
    const subItems = subsCategory.filter(sub => sub.main_id === main.id);

    subItems.forEach(sub => {
      const subLi = document.createElement("li");
      subLi.classList.add("sub-item");
      subLi.innerHTML = `
        <input type="checkbox" class="filter__checkbox sub sub-checkbox" data-id="${sub.id}" id="subsCate${sub.id}">
        <label class="fillter__label sub" for="subsCate${sub.id}"></label>
        <span class="fillter__label-text sub">${sub.name}</span>
      `;
      subUl.appendChild(subLi);
    });
  });
}

// 실행
renderCategories();

document.addEventListener("click", (e) => {
  const toggleBtn = e.target.closest(".toggle-btn");
  if (!toggleBtn) return;

  const mainId = toggleBtn.dataset.id;
  const subList = document.querySelector(`.sub-list[data-main="${mainId}"]`);
  const icon = toggleBtn.querySelector("i");

  const isOpen = subList.style.display === "block";

  if (isOpen) {
    subList.style.display = "none";
    icon.classList.remove("fa-chevron-down");
    icon.classList.add("fa-chevron-right");  // 닫힘
  } else {
    subList.style.display = "block";
    icon.classList.remove("fa-chevron-right");
    icon.classList.add("fa-chevron-down");   // 열림
  }
});

document.addEventListener("change", (e) => {
  if (e.target.classList.contains("main-checkbox")) {
    const mainId = e.target.dataset.id;
    const checked = e.target.checked;

    const subCheckboxes = document.querySelectorAll(`.sub-list[data-main="${mainId}"] .sub-checkbox`);

    subCheckboxes.forEach(sub => sub.checked = checked);
  }
});








document.addEventListener("DOMContentLoaded", () => {
  const filterList = document.querySelector(".result__fillter-list");
  const checkboxes = document.querySelectorAll(".filter__checkbox");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const labelText = checkbox.parentElement.querySelector(".fillter__label-text").innerText;
      if (checkbox.checked) {
        if (checkbox.classList.contains("main-checkbox")) {
          const mainId = checkbox.dataset.id;
          const subCheckboxes = document.querySelectorAll(`.sub-list[data-main="${mainId}"] .sub-checkbox`);

          subCheckboxes.forEach(sub => {
            const subLabelText = sub.parentElement.querySelector(".fillter__label-text").innerText;
            addFilterTag(subLabelText, sub.id)
          });
        } else {
          addFilterTag(labelText, checkbox.id);
        }
      } else {
        if (checkbox.classList.contains("main-checkbox")) {
          const mainId = checkbox.dataset.id;
          const subCheckboxes = document.querySelectorAll(`.sub-list[data-main="${mainId}"] .sub-checkbox`);

          subCheckboxes.forEach(sub => {
            removeFilterTag(sub.id)
          });
        } else {
          removeFilterTag(checkbox.id);
        }
      }
    });
  });

  // 태그 추가
  function addFilterTag(text, id) {
    // 이미 있으면 추가 안함
    if (document.querySelector(`.result__fillter-item[data-id="${id}"]`)) return;

    const li = document.createElement("li");
    li.classList.add("result__fillter-item");
    li.dataset.id = id;

    li.innerHTML = `
      ${text}
      <i class="fa fa-times"></i>
    `;

    // X 클릭하면 제거 + 체크박스도 해제
    li.querySelector("i").addEventListener("click", () => {
      removeFilterTag(id);
      document.getElementById(id).checked = false;
    });

    filterList.appendChild(li);
  }

  // 태그 삭제
  function removeFilterTag(id) {
    const tag = document.querySelector(`.result__fillter-item[data-id="${id}"]`);
    if (tag) tag.remove();
  }
});





document.addEventListener("DOMContentLoaded", () => {
  const sortBox = document.querySelector(".result__sort");
  const sortList = document.querySelector(".result__sort-list");
  const sortIcon = sortBox.querySelector("i");

  // 정렬 박스 클릭 → 토글
  sortBox.addEventListener("click", (e) => {
    e.stopPropagation(); // 다른 요소 클릭 이벤트 막기
    sortList.classList.toggle("open");
    sortIcon.classList.toggle("rotate");
  });

  // 바깥 클릭 시 닫기
  document.addEventListener("click", () => {
    sortList.classList.remove("open");
    sortIcon.classList.remove("rotate");
  });
});














function renderMatchingBoard(boardData, companyList) {
  const container = document.getElementById("collabList");

  let html = `
    <table class="collab-table">
      <thead>
        <tr>
          <th>구분</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회</th>
        </tr>
      </thead>
      <tbody>
  `;

  boardData.forEach(item => {
    // 구분 변환
    const categoryText = item.category === "proposal" ? "제안" : "요청";

    // 회사명 찾기
    const company = companyList.find(c => c.id === item.companyId);
    const companyName = company ? company.name : "-";

    html += `
      <tr>
        <td class="collab-category ${item.category}"><span>${categoryText}</span></td>
        <td class="collab-title">${item.title}</td>
        <td >${companyName}</td>
        <td>${item.createdAt}</td>
        <td>${item.views}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  container.innerHTML = html;
}


renderMatchingBoard(matchingBoard, company);