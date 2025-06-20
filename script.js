// Theme Management System
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.body = document.body;
        this.init();
    }

    init() {
        // Set initial theme (Gamified by default)
        this.setTheme('gamified');

        // Add event listener for theme toggle
        this.themeToggle.addEventListener('change', () => {
            const theme = this.themeToggle.checked ? 'gamified' : 'default';
            this.setTheme(theme);
        });
    }

    setTheme(theme) {
        if (theme === 'default') {
            this.body.classList.add('default-theme');
            this.themeToggle.checked = false;
        } else {
            this.body.classList.remove('default-theme');
            this.themeToggle.checked = true;
        }

        // Store theme preference
        localStorage.setItem('preferred-theme', theme);

        // Trigger theme change animation
        this.animateThemeChange();
    }

    animateThemeChange() {
        this.body.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            this.body.style.transition = '';
        }, 500);
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.init();
    }

    init() {
        // Add click handlers for navigation buttons
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveNavButton(e.target);
            });
        });

        // Add click handlers for tab buttons
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveTabButton(e.target);
            });
        });
    }

    setActiveNavButton(clickedButton) {
        this.navButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');

        // Add click animation
        this.animateButtonClick(clickedButton);
    }

    setActiveTabButton(clickedButton) {
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');

        // Add click animation
        this.animateButtonClick(clickedButton);
    }

    animateButtonClick(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
}

// Search Functionality
class SearchManager {
    constructor() {
        this.searchButton = document.querySelector('.search-btn');
        this.form = document.querySelector('.flight-search');
        this.init();
    }

    init() {
        this.searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        // Add enter key support for form fields
        const inputs = this.form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleSearch();
                }
            });
        });
    }

    handleSearch() {
        // Animate search button
        this.animateSearchButton();

        // Collect form data
        const searchData = this.collectSearchData();

        // Simulate search (in real app, this would make API call)
        this.simulateSearch(searchData);
    }

    collectSearchData() {
        return {
            travelers: document.querySelector('.travelers-select').value,
            from: document.querySelector('.route-field').value,
            to: document.querySelectorAll('.route-field')[1].value,
            tripType: document.querySelector('input[name="tripType"]:checked').value,
            departureCity: document.querySelector('.city-field').value,
            arrivalCity: document.querySelectorAll('.city-field')[1].value,
            date: document.querySelector('.date-field').value
        };
    }

    animateSearchButton() {
        const btn = this.searchButton;
        const originalText = btn.textContent;

        btn.textContent = '🔍 Searching...';
        btn.style.transform = 'scale(0.98)';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.transform = '';
            btn.disabled = false;
        }, 2000);
    }

    simulateSearch(data) {
        console.log('Search initiated with data:', data);

        // Show search feedback
        this.showSearchFeedback();
    }

    showSearchFeedback() {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.className = 'search-feedback';
        feedback.textContent = '✅ Search completed! Results would appear here.';
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--accent-primary);
            color: var(--bg-primary);
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 8px 32px var(--shadow-color);
            z-index: 1000;
            animation: fadeInOut 3s ease-in-out forwards;
        `;

        // Add animation keyframes
        if (!document.querySelector('#feedback-styles')) {
            const style = document.createElement('style');
            style.id = 'feedback-styles';
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }
}

// Gamification Features
class GamificationManager {
    constructor() {
        this.xpCounter = document.querySelector('.xp-counter');
        this.currentXP = 2546;
        this.init();
    }

    init() {
        // Add XP animation on interactions
        this.addXPTriggers();

        // Update leaderboard periodically
        this.startLeaderboardUpdates();
    }

    addXPTriggers() {
        // Add XP for search actions
        const searchBtn = document.querySelector('.search-btn');
        searchBtn.addEventListener('click', () => {
            this.addXP(10, 'Flight Search');
        });

        // Add XP for navigation
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.addXP(2, 'Navigation');
            });
        });

        // Add XP for tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.addXP(1, 'Tab Switch');
            });
        });
    }

    addXP(amount, action) {
        this.currentXP += amount;
        this.updateXPDisplay();
        this.showXPGain(amount, action);
    }

    updateXPDisplay() {
        this.xpCounter.textContent = `${this.currentXP} XP`;

        // Add glow effect
        this.xpCounter.style.textShadow = '0 0 20px var(--accent-secondary)';
        setTimeout(() => {
            this.xpCounter.style.textShadow = '';
        }, 1000);
    }

    showXPGain(amount, action) {
        const xpGain = document.createElement('div');
        xpGain.className = 'xp-gain';
        xpGain.textContent = `+${amount} XP - ${action}`;
        xpGain.style.cssText = `
            position: fixed;
            top: 20%;
            right: 20px;
            background: var(--accent-secondary);
            color: var(--bg-primary);
            padding: 0.5rem 1rem;
            border-radius: 25px;
            font-weight: 700;
            box-shadow: 0 4px 20px var(--shadow-color);
            z-index: 1000;
            animation: xpGainAnimation 2s ease-out forwards;
        `;

        // Add XP gain animation keyframes
        if (!document.querySelector('#xp-styles')) {
            const style = document.createElement('style');
            style.id = 'xp-styles';
            style.textContent = `
                @keyframes xpGainAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translateY(20px) scale(0.8); 
                    }
                    20% { 
                        opacity: 1; 
                        transform: translateY(0) scale(1.1); 
                    }
                    30% { 
                        transform: translateY(0) scale(1); 
                    }
                    100% { 
                        opacity: 0; 
                        transform: translateY(-30px) scale(0.9); 
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(xpGain);

        setTimeout(() => {
            xpGain.remove();
        }, 2000);
    }

    startLeaderboardUpdates() {
        // Simulate dynamic leaderboard updates
        setInterval(() => {
            this.updateLeaderboard();
        }, 30000); // Update every 30 seconds
    }

    updateLeaderboard() {
        const leaderboardItems = document.querySelectorAll('.leaderboard-item');
        leaderboardItems.forEach(item => {
            const scoreElement = item.querySelector('.score');
            if (scoreElement) {
                const currentScore = parseInt(scoreElement.textContent);
                const newScore = currentScore + Math.floor(Math.random() * 10);
                scoreElement.textContent = newScore;

                // Add update animation
                scoreElement.style.color = 'var(--accent-quaternary)';
                setTimeout(() => {
                    scoreElement.style.color = 'var(--accent-secondary)';
                }, 1000);
            }
        });
    }
}

// Interactive Effects Manager
class EffectsManager {
    constructor() {
        this.init();
    }

    init() {
        this.addHoverEffects();
        this.addInputFocusEffects();
        this.addClickRippleEffect();
    }

    addHoverEffects() {
        // Add particle effects on button hover
        const buttons = document.querySelectorAll('button, .nav-btn, .tab-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createParticleEffect(e.target);
            });
        });
    }

    createParticleEffect(element) {
        // Only in gamified theme
        if (document.body.classList.contains('default-theme')) return;

        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--accent-primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: particleFloat 1s ease-out forwards;
            `;

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1000);
        }

        // Add particle animation if not exists
        if (!document.querySelector('#particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes particleFloat {
                    0% { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    }
                    100% { 
                        opacity: 0; 
                        transform: translateY(-50px) scale(0); 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addInputFocusEffects() {
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                this.createFocusGlow(e.target);
            });

            input.addEventListener('blur', (e) => {
                this.removeFocusGlow(e.target);
            });
        });
    }

    createFocusGlow(element) {
        element.style.boxShadow = 'var(--hover-glow), inset 0 0 20px rgba(57, 255, 20, 0.1)';
    }

    removeFocusGlow(element) {
        element.style.boxShadow = '';
    }

    addClickRippleEffect() {
        const clickables = document.querySelectorAll('button, .nav-btn, .tab-btn');
        clickables.forEach(element => {
            element.addEventListener('click', (e) => {
                this.createRipple(e);
            });
        });
    }

    createRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            width: ${diameter}px;
            height: ${diameter}px;
            left: ${event.clientX - rect.left - radius}px;
            top: ${event.clientY - rect.top - radius}px;
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        // Add ripple animation if not exists
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    0% {
                        transform: scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Make button relative if not already
        if (getComputedStyle(button).position === 'static') {
            button.style.position = 'relative';
        }

        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Form Validation Manager
class ValidationManager {
    constructor() {
        this.form = document.querySelector('.flight-search');
        this.init();
    }

    init() {
        this.addRealTimeValidation();
    }

    addRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input[type="text"]');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.validateField(e.target);
            });
        });

        const dateInput = this.form.querySelector('input[type="date"]');
        dateInput.addEventListener('change', (e) => {
            this.validateDate(e.target);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const isValid = value.length >= 3;

        this.updateFieldValidation(field, isValid);
    }

    validateDate(field) {
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const isValid = selectedDate >= today;
        this.updateFieldValidation(field, isValid);
    }

    updateFieldValidation(field, isValid) {
        if (isValid) {
            field.style.borderColor = 'var(--accent-primary)';
            field.style.boxShadow = '0 0 10px rgba(57, 255, 20, 0.3)';
        } else {
            field.style.borderColor = 'var(--accent-tertiary)';
            field.style.boxShadow = '0 0 10px rgba(255, 0, 255, 0.3)';
        }
    }
}

// Achievement System
class AchievementManager {
    constructor() {
        this.achievements = {
            firstSearch: { unlocked: false, name: 'First Flight Search', icon: '🛫' },
            explorer: { unlocked: false, name: 'Explorer', icon: '🗺️' },
            speedster: { unlocked: false, name: 'Quick Booker', icon: '⚡' },
            socialite: { unlocked: false, name: 'Travel Socialite', icon: '👥' }
        };
        this.searchCount = 0;
        this.init();
    }

    init() {
        this.trackUserActions();
    }

    trackUserActions() {
        // Track search actions
        const searchBtn = document.querySelector('.search-btn');
        searchBtn.addEventListener('click', () => {
            this.searchCount++;
            this.checkAchievements();
        });
    }

    checkAchievements() {
        // First search achievement
        if (this.searchCount === 1 && !this.achievements.firstSearch.unlocked) {
            this.unlockAchievement('firstSearch');
        }

        // Explorer achievement (5 searches)
        if (this.searchCount === 5 && !this.achievements.explorer.unlocked) {
            this.unlockAchievement('explorer');
        }
    }

    unlockAchievement(achievementKey) {
        const achievement = this.achievements[achievementKey];
        achievement.unlocked = true;

        this.showAchievementNotification(achievement);
        this.updateAchievementsDisplay();
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div style="font-size: 2rem;">${achievement.icon}</div>
            <div>
                <strong>Achievement Unlocked!</strong><br>
                ${achievement.name}
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            color: var(--bg-primary);
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 8px 32px var(--shadow-color);
            z-index: 1000;
            text-align: center;
            animation: achievementPop 3s ease-in-out forwards;
            display: flex;
            align-items: center;
            gap: 1rem;
        `;

        // Add achievement animation
        if (!document.querySelector('#achievement-styles')) {
            const style = document.createElement('style');
            style.id = 'achievement-styles';
            style.textContent = `
                @keyframes achievementPop {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    10% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                    20% { transform: translate(-50%, -50%) scale(1); }
                    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    updateAchievementsDisplay() {
        // This would update the achievements section with newly unlocked achievements
        // For now, we'll just log it
        console.log('Achievements updated:', this.achievements);
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new SearchManager();
    new GamificationManager();
    new EffectsManager();
    new ValidationManager();
    new AchievementManager();

    console.log('🚀 Flight Booking System Initialized');
    console.log('🎮 Gamification Features Active');
    console.log('✨ Interactive Effects Loaded');
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.route-field').focus();
    }

    // Ctrl/Cmd + Enter to search
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        document.querySelector('.search-btn').click();
    }

    // T to toggle theme
    if (e.key === 't' && !e.target.matches('input, textarea, select')) {
        e.preventDefault();
        document.getElementById('themeToggle').click();
    }
});

// Enhanced interactive behaviors
document.querySelectorAll('.achievement-item:not(.locked)').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.add('achievement-unlocked');

        // Create particle effect
        const icon = item.querySelector('.achievement-icon');
        const particles = item.querySelector('.achievement-particles');

        if (particles) {
            // Clear existing particles
            particles.innerHTML = '';

            // Create new particles
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';

                const angle = (i / 12) * 2 * Math.PI;
                const distance = 30 + Math.random() * 20;
                const dx = Math.cos(angle) * distance;
                const dy = Math.sin(angle) * distance;

                particle.style.setProperty('--dx', dx + 'px');
                particle.style.setProperty('--dy', dy + 'px');
                particle.style.animationDelay = Math.random() * 0.3 + 's';

                particles.appendChild(particle);

                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 2000);
            }
        }

        setTimeout(() => {
            item.classList.remove('achievement-unlocked');
        }, 800);
    });
});

// Add hover sound effect simulation
document.querySelectorAll('.achievement-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (!item.classList.contains('locked')) {
            const icon = item.querySelector('.achievement-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });

    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.achievement-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Simulate score updates with better animation
// setInterval(() => {
//     const scores = document.querySelectorAll('.score');
//     const randomScore = scores[Math.floor(Math.random() * scores.length)];
//     if (!randomScore.querySelector('.score-change')) {
//         const change = document.createElement('span');
//         change.className = 'score-change';
//         const points = Math.floor(Math.random() * 50 + 1);
//         change.textContent = '+' + points;
//         randomScore.appendChild(change);

//         // Update the actual score
//         const currentScore = parseInt(randomScore.textContent.replace(/\D/g, ''));
//         const newScore = currentScore + points;
//         randomScore.childNodes[0].textContent = newScore;

//         setTimeout(() => {
//             if (change.parentNode) {
//                 change.parentNode.removeChild(change);
//             }
//         }, 2000);
//     }
// }, 8000);

// Add achievement unlock simulation
setInterval(() => {
    const lockedAchievements = document.querySelectorAll('.achievement-item.locked');
    if (lockedAchievements.length > 0 && Math.random() < 0.3) {
        const randomLocked = lockedAchievements[Math.floor(Math.random() * lockedAchievements.length)];

        // Show achievement notification
        const notification = document.createElement('div');
        notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
                    color: black;
                    padding: 15px 20px;
                    border-radius: 10px;
                    font-weight: bold;
                    z-index: 1000;
                    animation: slideIn 0.5s ease-out;
                    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
                `;
        notification.innerHTML = '🎉 Achievement Unlocked!<br><small>' +
            randomLocked.querySelector('.achievement-title').textContent + '</small>';

        document.body.appendChild(notification);

        // Unlock the achievement
        randomLocked.classList.remove('locked');
        randomLocked.classList.add('completed', 'achievement-unlocked');
        randomLocked.querySelector('.achievement-icon').classList.remove('locked');
        randomLocked.querySelector('.achievement-progress').style.width = '100%';

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 4000);
    }
}, 15000);

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
            @keyframes slideIn {
                0% { transform: translateX(100%); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }
        `;
document.head.appendChild(style);

// Bottom Navigation JavaScript
class BottomNavigation {
    constructor() {
        this.nav = document.getElementById('bottomNav');
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.lastScrollY = window.scrollY;
        this.scrollTimeout = null;
        this.isScrolling = false;

        this.init();
    }

    init() {
        this.setupScrollHandler();
        this.setupNavigationHandler();
        this.setupThemeHandler();
    }

    setupScrollHandler() {
        let ticking = false;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Clear existing timeout
            clearTimeout(this.scrollTimeout);

            // Show/hide based on scroll direction
            if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                // Scrolling down - hide nav
                this.hideNav();
                this.isScrolling = true;
            } else if (currentScrollY < this.lastScrollY) {
                // Scrolling up - show nav
                this.showNav();
                this.isScrolling = true;
            }

            // Set timeout to show nav when scrolling stops
            this.scrollTimeout = setTimeout(() => {
                this.showNav();
                this.isScrolling = false;
            }, 150);

            this.lastScrollY = currentScrollY;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    hideNav() {
        this.nav.classList.add('hidden');
    }

    showNav() {
        this.nav.classList.remove('hidden');
    }

    setupNavigationHandler() {
        this.navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all buttons
                this.navButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                // Get navigation target
                const navTarget = button.dataset.nav;

                // Dispatch custom event for navigation
                window.dispatchEvent(new CustomEvent('bottomNavClick', {
                    detail: { target: navTarget, button: button }
                }));

                console.log(`Navigation clicked: ${navTarget}`);
            });

            // Add ripple effect on click
            button.addEventListener('mousedown', (e) => {
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
            });
        });
    }

    setupThemeHandler() {
        // Listen for theme changes
        window.addEventListener('themeChange', (e) => {
            if (e.detail.theme === 'light') {
                this.nav.classList.add('light-theme');
            } else {
                this.nav.classList.remove('light-theme');
            }
        });
    }

    // Public methods
    setActiveNav(navTarget) {
        this.navButtons.forEach(btn => {
            if (btn.dataset.nav === navTarget) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    updateBadge(navTarget, count) {
        const button = document.querySelector(`[data-nav="${navTarget}"]`);
        if (button) {
            let badge = button.querySelector('.badge');
            if (count > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'badge';
                    button.appendChild(badge);
                }
                badge.textContent = count > 99 ? '99+' : count;
            } else if (badge) {
                badge.remove();
            }
        }
    }
}

// Initialize Bottom Navigation
const bottomNav = new BottomNavigation();

// Demo theme toggle function
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');

    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themeChange', {
        detail: { theme: isLight ? 'light' : 'dark' }
    }));
}

// Demo: Listen for navigation clicks
window.addEventListener('bottomNavClick', (e) => {
    console.log('Bottom navigation clicked:', e.detail);
    // You can handle navigation logic here
});


// Quick route fill functionality
function fillRoute(from, to) {
    const fromField = document.getElementById('fromField');
    const toField = document.getElementById('toField');
    
    // Add animation class
    fromField.classList.add('auto-filled');
    toField.classList.add('auto-filled');
    
    // Fill the fields
    fromField.value = from;
    toField.value = to;
    
    // Remove animation class after animation completes
    setTimeout(() => {
        fromField.classList.remove('auto-filled');
        toField.classList.remove('auto-filled');
    }, 800);
    
    // Optional: Focus on the date field after auto-fill
    setTimeout(() => {
        const dateField = document.querySelector('.date-field');
        if (dateField) {
            dateField.focus();
        }
    }, 900);
}

// Add ripple effect to route pills
function initializeRouteRippleEffect() {
    document.querySelectorAll('.route-pill').forEach(pill => {
        pill.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.7);
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize the functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeRouteRippleEffect();
});

// Alternative function to add new route pills dynamically
function addRoutePill(from, to, tooltip, container) {
    const routePill = document.createElement('button');
    routePill.className = 'route-pill';
    routePill.setAttribute('data-from', from);
    routePill.setAttribute('data-to', to);
    routePill.setAttribute('data-tooltip', tooltip);
    routePill.onclick = () => fillRoute(from, to);
    
    routePill.innerHTML = `${from} <span class="route-arrow">→</span> ${to}`;
    
    container.appendChild(routePill);
    
    // Add ripple effect to the new pill
    routePill.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background-color: rgba(255, 255, 255, 0.7);
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

