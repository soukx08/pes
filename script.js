// eFootball League Hub - Main JavaScript File

// Sample data for tournaments and leaderboard
const tournamentsData = [
    {
        id: 1,
        title: "Daily Championship",
        type: "daily",
        participants: 156,
        prize: "$200",
        startTime: "2024-01-15 18:00",
        duration: "2 hours",
        status: "active",
        description: "Quick daily tournament for all skill levels"
    },
    {
        id: 2,
        title: "Weekly Elite Cup",
        type: "weekly",
        participants: 89,
        prize: "$500",
        startTime: "2024-01-20 20:00",
        duration: "3 hours",
        status: "upcoming",
        description: "Weekly tournament for experienced players"
    },
    {
        id: 3,
        title: "Monthly Grand Slam",
        type: "monthly",
        participants: 234,
        prize: "$1000",
        startTime: "2024-02-01 19:00",
        duration: "4 hours",
        status: "upcoming",
        description: "Monthly championship with the biggest prizes"
    },
    {
        id: 4,
        title: "Rookie Tournament",
        type: "daily",
        participants: 67,
        prize: "$100",
        startTime: "2024-01-15 16:00",
        duration: "1.5 hours",
        status: "active",
        description: "Perfect for new players to get started"
    }
];

const leaderboardData = [
    { rank: 1, name: "ProGamer2024", points: 2450, wins: 89, avatar: "P" },
    { rank: 2, name: "ChampionX", points: 2380, wins: 85, avatar: "C" },
    { rank: 3, name: "eFootballKing", points: 2320, wins: 82, avatar: "E" },
    { rank: 4, name: "TournamentMaster", points: 2280, wins: 78, avatar: "T" },
    { rank: 5, name: "VictorySeeker", points: 2250, wins: 76, avatar: "V" },
    { rank: 6, name: "GoalScorer", points: 2200, wins: 74, avatar: "G" },
    { rank: 7, name: "LeagueLegend", points: 2180, wins: 72, avatar: "L" },
    { rank: 8, name: "CupWinner", points: 2150, wins: 70, avatar: "C" },
    { rank: 9, name: "TournamentPro", points: 2120, wins: 68, avatar: "T" },
    { rank: 10, name: "ChampionRise", points: 2100, wins: 66, avatar: "C" }
];

// DOM Elements
const signupModal = document.getElementById('signupModal');
const loginModal = document.getElementById('loginModal');
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const joinTournamentBtn = document.getElementById('joinTournamentBtn');
const tournamentsGrid = document.getElementById('tournamentsGrid');
const leaderboardList = document.getElementById('leaderboardList');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load tournaments
    loadTournaments();
    
    // Load leaderboard
    loadLeaderboard();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup smooth scrolling for navigation
    setupSmoothScrolling();
    
    // Add loading animation
    addLoadingAnimations();
}

function setupEventListeners() {
    // Modal controls
    signupBtn.addEventListener('click', () => openModal('signupModal'));
    loginBtn.addEventListener('click', () => openModal('loginModal'));
    joinTournamentBtn.addEventListener('click', () => openModal('signupModal'));
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        mobileMenuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Keyboard navigation for modals
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    // Form submissions with enhanced validation
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Real-time form validation
    setupFormValidation();
    
    // Tournament filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            filterTournaments(filter);
            updateFilterButtons(e.target);
        });
    });
}

function toggleMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    const isActive = navMenu.classList.contains('active');
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    mobileMenuToggle.setAttribute('aria-expanded', !isActive);
}

function handleKeyboardNavigation(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="block"]');
        if (openModal) {
            closeModal();
        }
    }
    
    // Tab navigation for mobile menu
    if (e.key === 'Tab') {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu.classList.contains('active')) {
            const focusableElements = navMenu.querySelectorAll('a[href], button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const firstInput = modal.querySelector('input, button');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
    
    // Add animation
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = 'auto';
}

function setupFormValidation() {
    // Real-time validation for signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        const inputs = signupForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }
    
    // Real-time validation for login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const inputs = loginForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    clearFieldError(field);
    
    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    switch (fieldName) {
        case 'username':
            if (value.length < 3) {
                showFieldError(field, 'Username must be at least 3 characters');
                return false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'password':
            if (value.length < 6) {
                showFieldError(field, 'Password must be at least 6 characters');
                return false;
            }
            break;
        case 'teamName':
            if (value.length < 2) {
                showFieldError(field, 'Team name must be at least 2 characters');
                return false;
            }
            break;
    }
    
    showFieldSuccess(field);
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function showFieldSuccess(field) {
    field.classList.add('success');
    field.classList.remove('error');
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function handleSignup(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData);
    
    // Validate all fields
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showFormStatus(form, 'Please fix the errors above', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Creating Account...';
    submitBtn.disabled = true;
    
    // Simulate signup process
    setTimeout(() => {
        try {
            // Simulate potential errors
            if (Math.random() < 0.1) { // 10% chance of error
                throw new Error('Username already exists');
            }
            
            showFormStatus(form, 'Account created successfully! Welcome to eFootball League Hub!', 'success');
            showNotification('Account created successfully! Welcome to eFootball League Hub!', 'success');
            
            setTimeout(() => {
                closeModal();
                updateUserInterface(userData.username);
            }, 1500);
            
        } catch (error) {
            showFormStatus(form, error.message, 'error');
            showNotification(error.message, 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }, 2000);
}

function showFormStatus(form, message, type) {
    const statusElement = form.querySelector('.form-status');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = `form-status ${type}`;
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData);
    
    // Validate all fields
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showFormStatus(form, 'Please fix the errors above', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Logging in...';
    submitBtn.disabled = true;
    
    // Simulate login process
    setTimeout(() => {
        try {
            // Simulate potential errors
            if (Math.random() < 0.15) { // 15% chance of error
                throw new Error('Invalid username or password');
            }
            
            showFormStatus(form, 'Welcome back! Ready to compete?', 'success');
            showNotification('Welcome back! Ready to compete?', 'success');
            
            setTimeout(() => {
                closeModal();
                updateUserInterface(userData.username);
            }, 1500);
            
        } catch (error) {
            showFormStatus(form, error.message, 'error');
            showNotification(error.message, 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }, 1500);
}

function updateUserInterface(username) {
    // Update navigation to show user is logged in
    const navActions = document.querySelector('.nav-actions');
    navActions.innerHTML = `
        <span class="user-welcome">Welcome, ${username}!</span>
        <button class="btn btn-outline" id="profileBtn">Profile</button>
        <button class="btn btn-primary" id="logoutBtn">Logout</button>
    `;
    
    // Add event listeners for new buttons
    document.getElementById('profileBtn').addEventListener('click', showProfile);
    document.getElementById('logoutBtn').addEventListener('click', logout);
}

function showProfile() {
    showNotification('Profile feature coming soon!', 'info');
}

function logout() {
    // Reset navigation
    const navActions = document.querySelector('.nav-actions');
    navActions.innerHTML = `
        <button class="btn btn-outline" id="loginBtn">Login</button>
        <button class="btn btn-primary" id="signupBtn">Sign Up</button>
    `;
    
    // Re-add event listeners
    document.getElementById('loginBtn').addEventListener('click', () => openModal('loginModal'));
    document.getElementById('signupBtn').addEventListener('click', () => openModal('signupModal'));
    
    showNotification('Logged out successfully!', 'info');
}

function loadTournaments() {
    tournamentsGrid.innerHTML = '';
    
    tournamentsData.forEach(tournament => {
        const tournamentCard = createTournamentCard(tournament);
        tournamentsGrid.appendChild(tournamentCard);
    });
}

function createTournamentCard(tournament) {
    const card = document.createElement('div');
    card.className = 'tournament-card animate-slideInUp';
    card.dataset.type = tournament.type;
    card.dataset.tournamentId = tournament.id;
    card.setAttribute('role', 'article');
    card.setAttribute('aria-labelledby', `tournament-${tournament.id}-title`);
    
    const statusClass = tournament.status === 'active' ? 'active' : 'upcoming';
    const statusText = tournament.status === 'active' ? 'Live Now' : 'Upcoming';
    const countdownDisplay = tournament.status === 'active' ? 
        `<p><i class="fas fa-stopwatch" aria-hidden="true"></i> <span class="countdown">Starting soon...</span></p>` : 
        `<p><i class="fas fa-clock" aria-hidden="true"></i> Starts: ${formatDateTime(tournament.startTime)}</p>`;
    
    card.innerHTML = `
        <div class="tournament-header">
            <h3 class="tournament-title" id="tournament-${tournament.id}-title">${tournament.title}</h3>
            <span class="tournament-type ${tournament.type}" aria-label="Tournament type: ${tournament.type}">${tournament.type}</span>
        </div>
        <div class="tournament-info">
            <p><i class="fas fa-users" aria-hidden="true"></i> <span class="sr-only">Number of participants: </span>${tournament.participants} participants</p>
            ${countdownDisplay}
            <p><i class="fas fa-hourglass-half" aria-hidden="true"></i> <span class="sr-only">Tournament duration: </span>Duration: ${tournament.duration}</p>
            <p><i class="fas fa-info-circle" aria-hidden="true"></i> ${tournament.description}</p>
        </div>
        <div class="tournament-prize" aria-label="Prize amount: ${tournament.prize}">Prize: ${tournament.prize}</div>
        <div class="tournament-actions">
            <button class="btn btn-primary" onclick="joinTournament(${tournament.id})" aria-label="Join ${tournament.title} tournament">
                <i class="fas fa-play" aria-hidden="true"></i> Join Tournament
            </button>
            <button class="btn btn-outline" onclick="viewTournamentDetails(${tournament.id})" aria-label="View details for ${tournament.title}">
                <i class="fas fa-info" aria-hidden="true"></i> Details
            </button>
        </div>
    `;
    
    return card;
}

function loadLeaderboard() {
    leaderboardList.innerHTML = '';
    
    leaderboardData.forEach(player => {
        const leaderboardItem = createLeaderboardItem(player);
        leaderboardList.appendChild(leaderboardItem);
    });
}

function createLeaderboardItem(player) {
    const item = document.createElement('div');
    item.className = 'leaderboard-item';
    
    item.innerHTML = `
        <div class="rank">#${player.rank}</div>
        <div class="player-info">
            <div class="player-avatar">${player.avatar}</div>
            <div class="player-name">${player.name}</div>
        </div>
        <div class="points">${player.points.toLocaleString()}</div>
        <div class="wins">${player.wins}</div>
    `;
    
    return item;
}

function filterTournaments(filter) {
    const cards = document.querySelectorAll('.tournament-card');
    
    cards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function updateFilterButtons(activeBtn) {
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

function joinTournament(tournamentId) {
    const tournament = tournamentsData.find(t => t.id === tournamentId);
    if (tournament) {
        // Add loading state
        const joinBtn = document.querySelector(`[onclick="joinTournament(${tournamentId})"]`);
        if (joinBtn) {
            joinBtn.classList.add('loading');
            joinBtn.disabled = true;
        }
        
        showNotification(`Joining ${tournament.title}... Good luck!`, 'success');
        
        // Simulate joining tournament
        setTimeout(() => {
            if (joinBtn) {
                joinBtn.classList.remove('loading');
                joinBtn.disabled = false;
            }
            showNotification(`Successfully joined ${tournament.title}! Tournament starts at ${formatDateTime(tournament.startTime)}`, 'success');
        }, 2000);
    }
}

function viewTournamentDetails(tournamentId) {
    const tournament = tournamentsData.find(t => t.id === tournamentId);
    if (tournament) {
        showNotification(`Tournament Details:\n${tournament.title}\nPrize: ${tournament.prize}\nParticipants: ${tournament.participants}\nDuration: ${tournament.duration}`, 'info');
    }
}

function setupSmoothScrolling() {
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
}

function addLoadingAnimations() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation to cards
                const cards = entry.target.querySelectorAll('.tournament-card, .reward-card, .community-card, .leaderboard-item');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
        
        // Initialize cards with hidden state
        const cards = section.querySelectorAll('.tournament-card, .reward-card, .community-card, .leaderboard-item');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });
    });
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(45deg, #00d4ff, #0099cc)',
        error: 'linear-gradient(45deg, #ff4444, #cc0000)',
        warning: 'linear-gradient(45deg, #ffa500, #ff8c00)',
        info: 'linear-gradient(45deg, #00d4ff, #0099cc)'
    };
    return colors[type] || colors.info;
}

// Add CSS for notifications
const notificationStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Add tournament card animations
const tournamentAnimations = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = tournamentAnimations;
document.head.appendChild(animationStyleSheet);

// Initialize tournament data on page load
window.addEventListener('load', function() {
    // Add some dynamic effects
    addFloatingParticles();
    startTournamentCountdown();
    
    // Update countdown every second
    setInterval(() => {
        startTournamentCountdown();
    }, 1000);
});

function addFloatingParticles() {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00d4ff;
            border-radius: 50%;
            opacity: 0.6;
            animation: floatParticle ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        hero.appendChild(particle);
    }
}

function startTournamentCountdown() {
    // Add countdown timers to active tournaments
    const activeTournaments = tournamentsData.filter(t => t.status === 'active');
    activeTournaments.forEach(tournament => {
        updateTournamentCountdown(tournament);
    });
}

function updateTournamentCountdown(tournament) {
    const startTime = new Date(tournament.startTime);
    const now = new Date();
    const timeDiff = startTime - now;
    
    if (timeDiff > 0) {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        // Update countdown display if element exists
        const countdownElement = document.querySelector(`[data-tournament-id="${tournament.id}"] .countdown`);
        if (countdownElement) {
            countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
        }
    }
}

// Add floating particle animation
const particleAnimation = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
        }
    }
`;

const particleStyleSheet = document.createElement('style');
particleStyleSheet.textContent = particleAnimation;
document.head.appendChild(particleStyleSheet);

