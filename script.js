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

// =============================================
// WORK GALLERY SCROLL & MODAL LOGIC
// =============================================
const workTrack = document.querySelector('.work-track');

// 1. Duplicate items for infinite scroll (same as partners)
if (workTrack) {
    workTrack.innerHTML += workTrack.innerHTML;
}

// 2. Modal Click & Close Logic
const modal = document.getElementById('workModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalStory = document.getElementById('modalStory');
const closeBtn = document.querySelector('.work-modal-close');

if (modal) {
    // Add click listeners to each work item
    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('click', () => {
            // Pull data from the clicked item's attributes
            const imgSrc = item.getAttribute('data-img');
            const title = item.getAttribute('data-title');
            const story = item.getAttribute('data-story');
            
            // Populate and show the modal
            modalImg.src = imgSrc;
            modalTitle.innerText = title;
            modalStory.innerText = story;
            modal.classList.add('active');
            
            // Pause the scroll animation while modal is open
            workTrack.style.animationPlayState = 'paused';
        });
    });

    // Close modal when clicking the 'X'
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            workTrack.style.animationPlayState = 'running';
        });
    }

    // Close modal if user clicks outside the content box
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            workTrack.style.animationPlayState = 'running';
        }
    });
}