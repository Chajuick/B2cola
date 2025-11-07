const loggedUser = sessionStorage.getItem("loggedUser");
const currentPath = window.location.pathname;

// 로그인 예외 페이지 리스트
const publicPages = [
  "/index.html",
  "/page/sign/login.html",
  "/page/sign/signup.html",
  "/"
];

// ✅ 로그인 상태에서 로그인/회원가입 페이지 접근 시 리다이렉트
if (
  loggedUser &&
  (currentPath === "/page/sign/login.html" || currentPath === "/page/sign/signup.html")
) {
  window.location.href = "/page/main/explore.html";
}


// 로그인 체크 (예외 페이지는 제외)
if (!loggedUser && !publicPages.includes(currentPath)) {
  alert("로그인이 필요합니다.");
  window.location.href = "/page/sign/login.html";
}

// DOM 로드 이후 실행
document.addEventListener("DOMContentLoaded", () => {
  const headerActions = document.querySelector(".header__actions");

  if (loggedUser) {
    const user = JSON.parse(loggedUser);

    headerActions.innerHTML = `
      <div class="header__actions-user">
        <div class="header__user-info" id="userMenuToggle">
          <i class="fa-solid fa-user"></i>
          ${user.notifications > 0 ? `<span class="notification-badge">${user.notifications}</span>` : ""}
        </div>
        <div class="header__user-dropdown" id="userDropdown">
          <a href="/page/user/profile.html">프로필</a>
          <a href="/page/user/favorites.html">관심목록</a>
          <a href="/page/user/requests.html">
            제안 확인
            ${user.notifications > 0 ? `<span class="notif-count">${user.notifications}</span>` : ""}
          </a>
          <a href="#" id="logoutBtn">로그아웃</a>
        </div>   
      </div>
      <div class="header__actions-lang">
          <a href="/?lang=ko" class="header__lang-option header__lang-option--active">KOR</a>
          <a href="/?lang=en" class="header__lang-option">ENG</a>
      </div>      
    `;


    // 로그아웃
    document.querySelector("#logoutBtn").addEventListener("click", () => {
      sessionStorage.removeItem("loggedUser");
      window.location.reload();
    });
  }
});
