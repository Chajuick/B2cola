const visionSection = document.querySelector('.vision');
const bg = document.querySelector('.vision__bg');
const rocket = document.querySelector('.rocket__wrapper');
const orbit = document.querySelector('.vision__orbit');
const canvas = document.querySelector('.vision__particle');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            bg.classList.add('animate');
            rocket.classList.add('animate');
            canvas.classList.add('animate');
        }
    });
}, { threshold: 0.5 });

observer.observe(visionSection);

rocket.addEventListener('transitionend', () => {
    rocket.classList.add('idle');
    orbit.classList.add('animate');
});

orbit.addEventListener('transitionend', () => {

    const items = document.querySelectorAll('.vision__item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('show');
        }, index * 300);
    });
});

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

function createParticles(count = 50) {
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
        p.x -= (dx / distance) * force;
        p.y -= (dy / distance) * force;
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

createParticles();
animate();

const items = document.querySelectorAll('.zigzag__item');

function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    items.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;

        if (itemTop < triggerBottom) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);