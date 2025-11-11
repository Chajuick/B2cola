/* =========================================================
   HEADER SCROLL BEHAVIOR
   - 스크롤 위치에 따라 헤더의 스타일을 변경
   ========================================================= */
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;

    if (scrollPosition > viewportHeight) {
        header.classList.remove("header--index");
    } else {
        header.classList.add("header--index");
    }
});

/* =========================================================
   CTA IMAGE FADE-IN ANIMATION
   - .cta__image-box 요소가 화면에 들어올 때 fade-in 처리
   ========================================================= */
const ctaImages = document.querySelectorAll(".cta__image-box");

const imageObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.4 }
);

ctaImages.forEach(image => imageObserver.observe(image));

/* =========================================================
    TITLE CHARACTER ANIMATION
   - #animated-title 텍스트를 글자별로 쪼개어 순차 등장
   ========================================================= */
const animatedTitle = document.getElementById("animated-title");

if (animatedTitle) {
    const titleText = animatedTitle.textContent;
    animatedTitle.textContent = "";

    // 글자를 span으로 감싸기
    titleText.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        animatedTitle.appendChild(span);
    });

    // Intersection Observer로 애니메이션 트리거
    const titleObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                const spans = entry.target.querySelectorAll("span");
                if (entry.isIntersecting) {
                    spans.forEach((span, i) => {
                        span.style.animation = `fadeInSparkle 0.6s forwards`;
                        span.style.animationDelay = `${i * 0.05}s`;
                    });
                } else {
                    spans.forEach(span => (span.style.animation = "none"));
                }
            });
        },
        { threshold: 0.4 }
    );

    titleObserver.observe(animatedTitle);
}

/* =========================================================
   PARTNER COUNT-UP ANIMATION
   - .partners__count--number가 화면에 보이면 숫자 증가 애니메이션
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const partnerCounter = document.querySelector(".partners__count--number");

    if (!partnerCounter) return;

    const targetValue = +partnerCounter.dataset.target;
    let animationStarted = false;

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationStarted) {
                animationStarted = true;

                let currentValue = 0;
                const speed = 3; // 1 = 빠름, 5 = 느림
                const interval = setInterval(() => {
                    currentValue += Math.ceil(targetValue / 100);
                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(interval);
                        partnerCounter.classList.add("animate");
                        setTimeout(() => partnerCounter.classList.remove("animate"), 400);
                    }
                    partnerCounter.textContent = currentValue.toLocaleString();
                }, speed * 10);
            }
        });
    });

    counterObserver.observe(partnerCounter);
});

/* =========================================================
   BENEFIT SECTION ANIMATION
   - .benefit 요소가 화면에 일정 비율 이상 보일 때 active 클래스 추가
   ========================================================= */
const benefitItems = document.querySelectorAll(".benefit");

if (benefitItems.length > 0) {
    const benefitObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle("active", entry.isIntersecting);
            });
        },
        {
            root: null,
            rootMargin: "0px",
            threshold: 0.5
        }
    );

    benefitItems.forEach(item => benefitObserver.observe(item));
}

/* =========================================================
   HERO PARTICLES ANIMATION
   - .hero 섹션 파티클 이펙트 추가
   ========================================================= */
const canvas = document.querySelector('.hero__background');
const ctx = canvas.getContext('2d');

let particles = [];
const mouse = { x: null, y: null, radius: 200 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function createParticles(count = 30) {
    particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 6 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
    }));
}

function updateParticle(p) {
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        p.x -= (dx / distance) * force * -5;
        p.y -= (dy / distance) * force * -5;
    }

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
}

function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(249, 196, 0, 0.4)';
    ctx.fill();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
        updateParticle(p);
        drawParticle(p);
    });
    requestAnimationFrame(animate);
}

createParticles(30);
animate();