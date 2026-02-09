// Tab navigation
const tabBtns = document.querySelectorAll('.tab-btn');
const pages = document.querySelectorAll('.page');
const sideGalleries = document.querySelectorAll('.side-gallery');
const surpriseBtn = document.getElementById('surpriseBtn');

function showPage(tabId) {
    pages.forEach(p => p.classList.remove('active'));
    tabBtns.forEach(b => b.classList.remove('active'));
    const page = document.getElementById(tabId);
    const btn = document.querySelector('.tab-btn[data-tab="' + tabId + '"]');
    if (page) page.classList.add('active');
    if (btn) btn.classList.add('active');
    // Show side galleries only on thoughts page
    const showGallery = tabId === 'thoughts';
    sideGalleries.forEach(g => { g.style.display = showGallery ? '' : 'none'; });
    surpriseBtn.style.display = (tabId === 'thoughts' && window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) ? 'block' : 'none';
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.getAttribute('data-tab')));
});

// Floating hearts
const heartsContainer = document.getElementById('hearts-container');

function createHeart() {
    for (let i = 0; i < 2; i++) { // spawn 2 hearts at once
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = '💖';
        heart.style.left = Math.random() * (window.innerWidth * 0.9) + 'px';
        heart.style.top = (window.scrollY + Math.random() * window.innerHeight) + 'px';
        heart.style.fontSize = 12 + Math.random() * 24 + 'px';
        heart.style.animationDuration = 5 + Math.random() * 5 + 's';
        heartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), 15000); // lives longer
    }
}

// Hearts continuously spawn
setInterval(createHeart, 200);

// Valentine "Yes" buttons — hearts explosion
document.querySelectorAll('#valentineYes, #valentineYes2').forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
        const colors = ['#ff4d88', '#ff99c8', '#ffd1dc', '#ff66aa', '#fff0f5'];
        for (let i = 0; i < 120; i++) {
            const el = document.createElement('div');
            el.innerText = ['💕', '💗', '💖', '🌸', '✨'][Math.floor(Math.random() * 5)];
            el.style.position = 'fixed';
            el.style.left = '50%';
            el.style.top = '50%';
            el.style.fontSize = (18 + Math.random() * 30) + 'px';
            el.style.pointerEvents = 'none';
            el.style.zIndex = '9999';
            document.body.appendChild(el);
            const angle = Math.random() * 2 * Math.PI;
            const dist = 150 + Math.random() * 250;
            el.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(0)`, opacity: 0 }
            ], { duration: 2000 + Math.random() * 800, easing: 'ease-out' });
            setTimeout(() => el.remove(), 2800);
        }
    });
});

// Surprise popup logic
const btn = document.getElementById('surpriseBtn');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closePopup');
const yesBtn = document.getElementById('yesBtn');

btn.addEventListener('click', () => {
    popup.classList.remove('hidden');
    popup.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    popup.classList.remove('show');
    popup.classList.add('hidden');
});

// Explosive fireworks animation
yesBtn.addEventListener('click', () => {
    const colors = ['#ff4d88','#ff99c8','#ffd1dc','#ff66aa','#fff0f5'];
    for(let i=0; i<150; i++){
        const firework = document.createElement('div');
        firework.style.position = 'fixed';
        firework.style.left = window.innerWidth/2 + 'px';
        firework.style.top = window.innerHeight/2 + 'px';
        firework.style.width = 8 + Math.random()*12 + 'px';
        firework.style.height = 8 + Math.random()*12 + 'px';
        firework.style.background = colors[Math.floor(Math.random()*colors.length)];
        firework.style.borderRadius = '50%';
        firework.style.pointerEvents = 'none';
        firework.style.opacity = 1;
        document.body.appendChild(firework);

        const angle = Math.random()*2*Math.PI;
        const distance = 300 + Math.random()*400;

        firework.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px) scale(2)`, opacity: 0 }
        ], {
            duration: 2500 + Math.random()*1000,
            easing: 'ease-out'
        });

        setTimeout(()=>firework.remove(), 3000+Math.random()*500);
    }

    // Add sparkling stars
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.innerText = '✨';
        star.style.position = 'fixed';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = Math.random() * window.innerHeight + 'px';
        star.style.fontSize = 15 + Math.random() * 70 + 'px';
        star.style.opacity = 1;
        star.style.pointerEvents = 'none';
        star.style.transition = 'all 1s ease-out';
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 3000 + Math.random() * 1000);
    }
});

// Show surprise button after scrolling to bottom (only on thoughts page)
window.addEventListener('scroll', () => {
    const onThoughts = document.getElementById('thoughts').classList.contains('active');
    if (onThoughts && window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
        btn.style.display = 'block';
    } else if (onThoughts) {
        btn.style.display = 'none';
    }
});
