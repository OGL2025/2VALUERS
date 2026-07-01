// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('nav-active');
    });
}

// Dropdown Toggle for Mobile & Desktop consistency
const dropdowns = document.querySelectorAll('.nav-links .dropdown');

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    
    link.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');

        dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove('active');
            }
        });
    });
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const parentDropdown = link.closest('.dropdown');
        
        if (parentDropdown && link.parentElement === parentDropdown) {
            return;
        }

        if (navLinks.classList.contains('nav-active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('nav-active');
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
});

// Scroll Reveal Animation
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});

// Stats Counter
const stats = document.querySelectorAll('.stat-item h3');
let statsStarted = false;

function startStats() {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const increment = target / 100;
        
        const updateCount = () => {
            const count = +stat.innerText;
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                stat.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });
}

window.addEventListener('scroll', () => {
    const statsSection = document.getElementById('stats');
    if (statsSection && !statsStarted) {
        const top = statsSection.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            startStats();
            statsStarted = true;
        }
    }
});

// Infinite Partner Scroll
const track = document.querySelector('.partner-track');
if (track) track.innerHTML += track.innerHTML;