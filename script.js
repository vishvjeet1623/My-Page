// Website data
const websites = {
    education: [
        { name: 'YouTube', url: 'https://www.youtube.com', logo: 'https://www.youtube.com/s/desktop/7c155e84/img/favicon_144x144.png' },
        { name: 'Udemy', url: 'https://www.udemy.com', logo: 'images/udemy.webp' },
        { name: 'Notion', url: 'https://www.notion.so', logo: 'images/notion.webp' },
        { name: 'ChatGPT', url: 'https://chat.openai.com', logo: 'https://chat.openai.com/favicon.ico' },
        { name: 'Google Classroom', url: 'https://classroom.google.com', logo: 'images/google classroom.webp' },
        { name: 'Claude AI', url: 'https://claude.ai', logo: 'https://claude.ai/favicon.ico' },
        { name: 'Gmail', url: 'https://mail.google.com', logo: 'images/gmail.webp' }
    ],
    entertainment: [
        { name: 'Lucifer Donghua', url: 'https://www.luciferdonghua.com', logo: 'images/lucifer donghua.webp' },
        { name: 'Netflix', url: 'https://www.netflix.com', logo: 'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico' }
    ],
    social: [
        { name: 'Twitter', url: 'https://twitter.com', logo: 'https://abs.twimg.com/favicons/twitter.ico' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com', logo: 'images/linkedin.webp' },
        { name: 'WhatsApp', url: 'https://web.whatsapp.com', logo: 'images/whatsapp.webp' },
        { name: 'Instagram', url: 'https://www.instagram.com', logo: 'images/instagram.webp' },
        { name: 'Zealy', url: 'https://zealy.io', logo: 'images/zealy.webp' }
    ],
    coding: [
        { name: 'GitHub', url: 'https://github.com', logo: 'https://github.githubassets.com/favicons/favicon.svg' },
        { name: 'LeetCode', url: 'https://leetcode.com', logo: 'https://leetcode.com/favicon.ico' },
        { name: 'Bolt.new', url: 'https://bolt.new', logo: 'images/bolt.webp' },
        { name: 'V0', url: 'https://v0.dev', logo: 'images/v0.webp' },
        { name: 'HackerRank', url: 'https://www.hackerrank.com', logo: 'images/hackerrank.webp' },
        { name: 'Programiz', url: 'https://www.programiz.com', logo: 'images/programiz.webp' },
        { name: 'Vercel', url: 'https://vercel.com', logo: 'https://vercel.com/favicon.ico' },
        { name: 'Remix AI', url: 'https://remix.ai', logo: 'images/remix ai.webp' }
    ]
};

const websitesGrid = document.querySelector('.websites-grid');
const themeSwitcher = document.querySelector('.theme-switcher');

// Theme switching functionality
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    // Save theme preference
    const isDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('darkTheme');
if (savedTheme === 'true') {
    document.body.classList.add('dark-theme');
}

themeSwitcher.addEventListener('click', toggleTheme);

// Circular motion animation
let inactivityTimer;
let isAnimating = false;
let cards = [];

function initializeCards() {
    cards = document.querySelectorAll('.website-card');
}

function calculateCenterPosition(card, index) {
    const gridRect = document.querySelector('.websites-grid').getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const centerX = gridRect.width / 2;
    const centerY = gridRect.height / 2;
    
    // Calculate angle for circular distribution
    const angle = (index / cards.length) * 2 * Math.PI;
    const radius = Math.min(gridRect.width, gridRect.height) * 0.3; // 30% of grid size
    
    // Calculate final position
    const x = centerX + radius * Math.cos(angle) - cardRect.width / 2;
    const y = centerY + radius * Math.sin(angle) - cardRect.height / 2;
    
    // Set CSS variables for animation
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
}

function startCircularMotion() {
    if (isAnimating) return;
    isAnimating = true;
    
    cards.forEach((card, index) => {
        calculateCenterPosition(card, index);
        card.classList.add('animating');
    });
}

function stopCircularMotion() {
    if (!isAnimating) return;
    isAnimating = false;
    
    cards.forEach(card => {
        card.classList.remove('animating');
    });
}

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    stopCircularMotion();
    
    inactivityTimer = setTimeout(() => {
        startCircularMotion();
    }, 4000); // 4 seconds
}

// Add event listeners for mouse movement
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('mousedown', resetInactivityTimer);
document.addEventListener('mouseup', resetInactivityTimer);

// Initialize cards and start the inactivity timer
function displayAllWebsites() {
    websitesGrid.innerHTML = '';
    
    // Combine all websites into a single array
    const allWebsites = [
        ...websites.education,
        ...websites.entertainment,
        ...websites.social,
        ...websites.coding
    ];
    
    allWebsites.forEach(website => {
        const websiteCard = document.createElement('div');
        websiteCard.className = 'website-card';
        websiteCard.innerHTML = `
            <img src="${website.logo}" alt="${website.name}" onerror="this.src='https://via.placeholder.com/64?text=${website.name}'">
            <span>${website.name}</span>
        `;
        
        websiteCard.addEventListener('click', () => {
            window.open(website.url, '_blank');
        });
        
        websitesGrid.appendChild(websiteCard);
    });

    // Initialize cards and start animation timer after adding them to the DOM
    initializeCards();
    resetInactivityTimer();
}

// Call displayAllWebsites when the page loads
displayAllWebsites(); 