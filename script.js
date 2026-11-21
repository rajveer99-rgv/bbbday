/* ==========================================
   Happy Birthday My Love - JavaScript
   Interactive animations, counter, music toggle,
   canvas floating hearts, lightbox & confetti
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Floating Hearts & Particles Canvas Background
       ========================================== */
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 35;
    const symbols = ['❤️', '💜', '🤍', '💖', '✨', '🌷'];

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 200;
            this.size = Math.random() * 18 + 12;
            this.speedY = Math.random() * 1 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 2;
            this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
            this.opacity = Math.random() * 0.6 + 0.3;
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;
            this.rotation += this.rotationSpeed;

            if (this.y < -50) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;
            ctx.font = `${this.size}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.symbol, 0, 0);
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        const p = new Particle();
        p.y = Math.random() * height; // initial spread
        particles.push(p);
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();


    /* ==========================================
       2. Love Counter (Days, Hours, Mins, Secs from Feb 14)
       ========================================== */
    function updateLoveCounter() {
        // First Meeting: February 14 of current/recent year
        const now = new Date();
        let year = now.getFullYear();
        // If current date is before Feb 14, count from Feb 14 last year, or assume Feb 14 this year
        let firstMeeting = new Date(year, 1, 14, 0, 0, 0); // Month 1 is Feb
        if (now < firstMeeting) {
            firstMeeting = new Date(year - 1, 1, 14, 0, 0, 0);
        }

        const diff = now - firstMeeting;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById('daysCount').textContent = days;
        document.getElementById('hoursCount').textContent = hours;
        document.getElementById('minsCount').textContent = minutes;
        document.getElementById('secsCount').textContent = seconds;
    }

    setInterval(updateLoveCounter, 1000);
    updateLoveCounter();


    /* ==========================================
       3. Navigation & Mobile Menu Toggle
       ========================================== */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu on link click (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });


    /* ==========================================
       4. Background Music Control
       ========================================== */
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.querySelector('.music-text').textContent = 'Play Music';
            isPlaying = false;
            showToast('Music paused 🎵');
        } else {
            bgMusic.play().then(() => {
                musicBtn.classList.add('playing');
                musicBtn.querySelector('.music-text').textContent = 'Pause Music';
                isPlaying = true;
                showToast('Playing our special song 🎶❤️');
            }).catch(e => {
                console.log("Audio playback error:", e);
                showToast('Audio file loading or blocked. Enjoy the website! 💖');
            });
        }
    });


    /* ==========================================
       5. Gallery Lightbox Modal
       ========================================== */
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');

            lightboxImg.src = img.src;
            lightboxTitle.textContent = title;
            lightboxDesc.textContent = desc;
            lightboxModal.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.remove('active');
    });

    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.classList.remove('active');
        }
    });


    /* ==========================================
       6. Surprise Reveal & Confetti
       ========================================== */
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseContent = document.getElementById('surpriseContent');
    const retriggerConfetti = document.getElementById('retriggerConfetti');

    function fireConfettiBurst() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#ff4d8d', '#a855f7', '#ffd700', '#ffffff', '#ff75a0']
            });
        }
    }

    surpriseBtn.addEventListener('click', () => {
        surpriseContent.classList.remove('hidden');
        surpriseBtn.style.display = 'none';
        fireConfettiBurst();
        showToast('Surprise unlocked! I love you! 💖');

        // Scroll smoothly to surprise content
        surpriseContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    if (retriggerConfetti) {
        retriggerConfetti.addEventListener('click', () => {
            fireConfettiBurst();
            showToast('More magic and hugs for you! 🥰');
        });
    }


    /* ==========================================
       7. Quick Kiss / Love Toast Button
       ========================================== */
    const quickLoveBtn = document.getElementById('quickLoveBtn');
    if (quickLoveBtn) {
        quickLoveBtn.addEventListener('click', () => {
            fireConfettiBurst();
            showToast('💋 Sent 1,000 virtual kisses to my queen! ❤️');
        });
    }

    // Toast Notification Helper
    function showToast(message) {
        let toast = document.getElementById('loveToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'loveToast';
            toast.className = 'love-toast';
            toast.innerHTML = `<i class="fas fa-heart"></i> <span id="toastMsg">${message}</span>`;
            document.body.appendChild(toast);
        } else {
            document.getElementById('toastMsg').textContent = message;
        }

        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

});
