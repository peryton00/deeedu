// Confetti Animation on Page Load
window.addEventListener('load', () => {
    createConfetti();
});

function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#c77dff', '#ff91af'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 50);
    }
}

// Cake Cutting Animation
const cake = document.getElementById('cake');
const cutButton = document.getElementById('cutButton');
const sliceContainer = document.getElementById('sliceContainer');
let isLit = false;
let isCut = false;

// Light candles when clicking on cake
cake.addEventListener('click', () => {
    if (!isLit && !isCut) {
        cake.classList.add('lit');
        isLit = true;
        cutButton.disabled = false;
        cutButton.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        
        // Play candle lighting sound (visual feedback)
        createMiniConfetti();
    }
});

// Cut the cake
cutButton.addEventListener('click', () => {
    if (isLit && !isCut) {
        isCut = true;
        cake.style.opacity = '0';
        cake.style.transform = 'scale(0)';
        cake.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            cake.style.display = 'none';
            cutButton.style.display = 'none';
            createCakeSlices();
            createConfetti();
        }, 500);
    }
});

function createCakeSlices() {
    const numberOfSlices = 6;
    
    for (let i = 0; i < numberOfSlices; i++) {
        setTimeout(() => {
            const slice = document.createElement('div');
            slice.className = 'cake-slice';
            slice.style.setProperty('--rotation', (Math.random() - 0.5) * 30 + 'deg');
            sliceContainer.appendChild(slice);
        }, i * 200);
    }
}

function createMiniConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ffeb3b', '#ff9800', '#f44336'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = '50%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = '2s';
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 2000);
    }
}

// Balloon Popping
const balloonsContainer = document.getElementById('balloonsContainer');
const balloonMessage = document.getElementById('balloonMessage');
let poppedCount = 0;

balloonsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('balloon') && !e.target.classList.contains('popped')) {
        const message = e.target.getAttribute('data-message');
        e.target.classList.add('popped');
        
        balloonMessage.textContent = message;
        balloonMessage.style.animation = 'none';
        setTimeout(() => {
            balloonMessage.style.animation = 'messageAppear 0.5s ease-out';
        }, 10);
        
        poppedCount++;
        
        // Remove balloon after animation
        setTimeout(() => {
            e.target.remove();
        }, 300);
        
        // Show special message when all balloons are popped
        if (poppedCount === 6) {
            setTimeout(() => {
                balloonMessage.textContent = '🎉 All balloons popped! You\'re amazing! 🎉';
                createConfetti();
            }, 500);
        }
    }
});

// Photo Gallery Modal
const photoCards = document.querySelectorAll('.photo-card');
const modal = document.getElementById('photoModal');
const modalPhoto = document.getElementById('modalPhoto');
const modalClose = document.querySelector('.modal-close');

photoCards.forEach(card => {
    card.addEventListener('click', () => {
        const photoNumber = card.getAttribute('data-photo');
        const photoIcon = card.querySelector('.photo-icon').textContent;
        const photoText = card.querySelector('p').textContent;
        
        modalPhoto.innerHTML = `
            <div style="font-size: 8rem; margin-bottom: 20px;">${photoIcon}</div>
            <h2 style="font-family: 'Pacifico', cursive; color: #f5576c; margin-bottom: 20px; font-size: 2.5rem;">${photoText}</h2>
            <p style="font-size: 1.2rem; color: #666;">Photo ${photoNumber} - Click the X to close</p>
            <p style="margin-top: 20px; color: #888; font-style: italic;">Replace these placeholders with your own photos by updating the HTML!</p>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Countdown Timer
const startTime = new Date().getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const elapsed = now - startTime;
    
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add floating animation to page elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

console.log('🎉 Happy Birthday! Enjoy your special day! 🎂');