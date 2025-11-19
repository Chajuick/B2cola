// 폼 요소 선택
const form = document.querySelector(".signup__form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

// 에러 메시지 생성 함수
function showError(input, message) {
    let errorEl = input.parentElement.querySelector(".error-message");
    if (!errorEl) {
        errorEl = document.createElement("div");
        errorEl.className = "error-message";
        input.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
    input.classList.add("input--error");
}

// 에러 제거 함수
function clearError(input) {
    input.classList.remove("input--error");
    const errorEl = input.parentElement.querySelector(".error-message");
    if (errorEl) errorEl.remove();
}

emailInput.addEventListener("input", () => clearError(emailInput));
passwordInput.addEventListener("input", () => clearError(passwordInput));

// 이메일 정규식
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 로그인 시도
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // 기존 에러 제거
    clearError(emailInput);
    clearError(passwordInput);

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // 이메일 검증
    if (!email) {
        showError(emailInput, "이메일을 입력해주세요.");
        emailInput.focus();
        isValid = false;
        return;
    } else if (!emailRegex.test(email)) {
        showError(emailInput, "올바른 이메일 형식이 아닙니다.");
        emailInput.focus();
        isValid = false;
        return;
    }

    // 비밀번호 검증
    if (!password) {
        showError(passwordInput, "비밀번호를 입력해주세요.");
        passwordInput.focus();
        isValid = false;
        return;
    }

    if (email !== user.email || password !== user.password) {
        showError(passwordInput, "입력한 정보가 올바르지 않습니다.");
        emailInput.classList.add("input--error");
        passwordInput.classList.add("input--error");
        emailInput.focus();
        return;
    }

    // 로그인 성공 시
    if (isValid) {
        console.log("✅ 로그인 성공:", user);
        const loginData = {
            username: user.username,
            email: user.email,
            password: user.password,
            companyName: user.companyName,
            ceoName: user.ceoName,
            website: user.website,
            phone: user.phone,
            fax: user.fax,
            notifications: 2,
            loggedInAt: new Date().toISOString(),
        };

        // 세션 저장 (탭 닫으면 로그아웃됨)
        sessionStorage.setItem("loggedUser", JSON.stringify(loginData));

        // 실제라면 여기에 페이지 이동 로직 추가
        window.location.href = "/page/matching/matching-meta.html";
    }
});
