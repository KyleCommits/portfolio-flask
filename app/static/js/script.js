document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add staggered animation to experience cards
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on card position
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150); // 150ms delay between each card
                }
            });
        },
        { 
            threshold: 0.1,
            rootMargin: '50px' // Start animation slightly before cards enter viewport
        }
    );

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.15}s`; // Staggered delay
        observer.observe(card);
    });

    // Add active state to current navigation item
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // Add hover effect to cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    const searchInput = document.getElementById('skill-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadingElement = document.getElementById('loading');
    const container = document.getElementById('experience-container');

    let currentFilter = 'all';
    let currentSearch = '';

    async function fetchExperiences() {
        try {
            loadingElement.classList.remove('d-none');
            container.classList.add('d-none');

            const params = new URLSearchParams({
                type: currentFilter !== 'all' ? currentFilter : '',
                skill: currentSearch
            });

            const response = await fetch(`/api/experience?${params}`);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const experiences = await response.json();
            renderExperiences(experiences);
        } catch (error) {
            console.error('Error fetching experiences:', error);
            container.innerHTML = '<div class="col-12"><div class="alert alert-danger">Error loading experiences</div></div>';
        } finally {
            loadingElement.classList.add('d-none');
            container.classList.remove('d-none');
        }
    }

    function renderExperiences(experiences) {
        container.innerHTML = '';

        experiences.forEach(exp => {
            const card = document.createElement('div');
            card.className = 'col-12 mb-4';
            
            const cardClasses = ['card', 'h-100'];
            if (currentSearch && exp.matched) {
                cardClasses.push('card-highlighted');
            } else if (currentSearch && !exp.matched) {
                cardClasses.push('card-dimmed');
            }

            card.innerHTML = `
                <div class="${cardClasses.join(' ')}">
                    <div class="card-body">
                        <h3 class="card-title">${exp.title}</h3>
                        <h6 class="card-subtitle mb-2 text-muted">${exp.company} - ${exp.period}</h6>
                        <div class="skills-container mb-3">
                            ${exp.skills.map(skill => 
                                `<span class="badge bg-primary me-1">${skill}</span>`
                            ).join('')}
                        </div>
                        <ul class="list-unstyled">
                            ${exp.description.map(desc => 
                                `<li class="mb-2">${desc}</li>`
                            ).join('')}
                        </ul>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Event Listeners
    searchInput.addEventListener('input', debounce(function(e) {
        currentSearch = e.target.value.trim();
        fetchExperiences();
    }, 300));

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.type;
            fetchExperiences();
        });
    });

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Initial load
    fetchExperiences();
});