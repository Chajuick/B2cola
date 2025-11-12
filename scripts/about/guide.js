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

function initToggle() {
    const activeBtn = toggle.querySelector('.toggle-button.active');
    const index = activeBtn ? parseInt(activeBtn.dataset.index) : 0;

    if (index === 0) {
        items.forEach(item => {
            item.classList.add('pc');
            item.classList.remove('mobile');
        });
    } else if (index === 1) {
        items.forEach(item => {
            item.classList.add('mobile');
            item.classList.remove('pc');
        });
    }

    slide.style.left = `${index * 50}%`;
}

window.addEventListener('load', () => {
    checkScroll();
    initToggle();
});

window.addEventListener('scroll', checkScroll);

const toggle = document.getElementById('toggle');
const slide = document.getElementById('slide');
const buttons = toggle.querySelectorAll('.toggle-button');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('클릭');
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const index = parseInt(btn.dataset.index);
        slide.style.left = `${index * 50}%`;

        if (index === 0) {
            items.forEach(item => {
                item.classList.add('pc');
                item.classList.remove('mobile');
            });
        } else if (index === 1) {
            items.forEach(item => {
                item.classList.add('mobile');
                item.classList.remove('pc');
            });
        }
    });
});
