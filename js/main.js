// Sample data (replace with actual data from a backend/CMS)
const blogPosts = [
    {
        title: 'The Future of AI in Creative Industries',
        excerpt: 'As artificial intelligence continues to evolve, its impact on creative workflows is becoming increasingly significant. From generative art to adaptive music composition, AI is not just automating tasks but enabling entirely new forms of creative expression.',
        image: 'assets/blog/ai-creativity.webp',
        date: '2024-01-15',
        category: 'AI & Technology',
        tags: ['AI', 'Creativity', 'Innovation'],
        url: 'assets/blog/ai-creativity.md',
        readTime: '5 min read'
    },
    {
        title: 'Building Scalable Machine Learning Systems',
        excerpt: 'Best practices and architectural patterns for developing production-ready ML systems.',
        image: 'assets/blog/ml-systems.jpg',
        date: '2024-01-10',
        category: 'Machine Learning',
        tags: ['ML', 'Architecture', 'Development'],
        readTime: '7 min read'
    }
];

const projects = [
    {
        title: 'VirtualPO',
        description: 'A modern project management platform with GitHub integration, real-time collaboration tools, and comprehensive project tracking capabilities. Built with a robust tech stack including Next.js 13, TypeScript, Node.js, and PostgreSQL.',
        image: 'assets/projects/virtualpo.png',
        technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
        status: 'active',
        isPublic: false,
        labels: ['Looking for Co-Founder', 'Beta Release'],
        links: {
            demo: '#',
            github: '#'
        }
    },
    {
        title: '365 Goals AI',
        description: 'An innovative iOS app for New Year\'s resolution planning and goal tracking, featuring AI-powered habit suggestions, gamification, and couple mode. Built with Swift, SwiftUI, CoreML, and OpenAI integration.',
        image: 'assets/projects/newyear-resolution.png',
        technologies: ['Swift', 'SwiftUI', 'CoreML', 'Firebase', 'OpenAI'],
        status: 'active',
        isPublic: false,
        labels: ['Looking for Funding', 'Alpha Release'],
        links: {
            demo: '#',
            github: '#'
        }
    },
    {
        title: 'AI Trading Platform',
        description: 'A comprehensive trading web application combining traditional strategies with AI. Features interactive dashboards, backtesting capabilities, and automated trading using reinforcement learning.',
        image: 'assets/projects/trading-webapp.png',
        technologies: ['Python', 'JavaScript', 'Docker', 'Machine Learning', 'Microservices'],
        status: 'completed',
        isPublic: false,
        labels: ['Private Beta', 'Looking for Testers'],
        links: {
            demo: '#',
            github: '#'
        }
    },
    {
        title: 'PhotoAI Clone',
        description: 'A sophisticated web application that creates professional AI-generated headshots by learning from multiple user photos. Features real-time progress tracking, camera integration, and drag-and-drop file handling. Uses Replicate\'s API to fine-tune Stability AI SDXL model for personalized headshot generation.',
        image: 'assets/projects/photoai-clone.png',
        technologies: ['React', 'TypeScript', 'Express.js', 'TailwindCSS', 'Replicate API', 'Stability AI'],
        status: 'active',
        isPublic: false,
        labels: ['Private Beta', 'Looking for Testers'],
        links: {
            demo: '#',
            github: '#'
        }
    },
    {
        title: 'Personal Website',
        description: 'A modern, responsive personal website built with modular CSS architecture and vanilla JavaScript. Features include dark mode, interactive gallery, and dynamic content loading.',
        image: 'assets/projects/personal-website.jpg',
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        status: 'active',
        isPublic: true,
        links: {
            demo: 'https://boubakerwa.github.io/personal-website',
            github: 'https://github.com/boubakerwa/personal-website'
        }
    }
];

const newsItems = [
    {
        title: 'Speaking at Tech Conference 2024',
        content: 'Excited to announce that I will be speaking about AI and creativity at Tech Conference 2024.',
        date: '2024-02-01',
        category: 'Events'
    },
    {
        title: 'New Machine Learning Course Launch',
        content: 'Launching a comprehensive course on building production ML systems.',
        date: '2024-01-20',
        category: 'Education'
    }
];

// Populate blog posts
function populateBlogPosts() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    blogGrid.innerHTML = blogPosts.map(post => `
        <article class="blog-card">
            <img src="${post.image}" alt="${post.title}" class="blog-card-image">
            <div class="blog-card-content">
                <div class="blog-tags">
                    ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <div class="blog-card-meta">
                    <div class="blog-card-info">
                        <span class="blog-card-date">${new Date(post.date).toLocaleDateString()}</span>
                        <span class="blog-card-category">${post.category}</span>
                        <span class="blog-card-read-time">${post.readTime}</span>
                    </div>
                    ${post.url ? `
                        <a href="blog-template.html?post=${encodeURIComponent(post.url)}" class="blog-card-link">Read More →</a>
                    ` : ''}
                </div>
            </div>
        </article>
    `).join('');
}

// Populate projects
function populateProjects() {
    const featuredProject = document.querySelector('.featured-project');
    const projectsGrid = document.querySelector('.projects-grid');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    if (!projectsGrid || !featuredProject) return;

    // Render featured project (VirtualPO)
    featuredProject.innerHTML = `
        <article class="project-card">
            <img src="${projects[0].image}" alt="${projects[0].title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${projects[0].title}</h3>
                <p class="project-description">${projects[0].description}</p>
                <div class="project-tech">
                    ${projects[0].technologies.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join('')}
                </div>
                <div class="project-links">
                    <a href="${projects[0].links.demo}" class="project-link" target="_blank">Live Demo</a>
                    <a href="${projects[0].links.github}" class="project-link" target="_blank">
                        GitHub ${projects[0].isPublic ? '🔓' : '🔒'}
                    </a>
                </div>
                <div class="project-footer">
                    <span class="project-status status-${projects[0].status}">${projects[0].status}</span>
                    <div class="project-labels">
                        ${projects[0].labels ? projects[0].labels.map(label => `
                            <span class="project-label">${label}</span>
                        `).join('') : ''}
                    </div>
                </div>
            </div>
        </article>
    `;

    // Render remaining projects in carousel (excluding VirtualPO)
    projectsGrid.innerHTML = projects.filter(project => project.title !== 'VirtualPO').map(project => `
        <article class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.links.demo}" class="project-link" target="_blank">Live Demo</a>
                    <a href="${project.links.github}" class="project-link" target="_blank">
                        GitHub ${project.isPublic ? '🔓' : '🔒'}
                    </a>
                </div>
                <div class="project-footer">
                    <span class="project-status status-${project.status}">${project.status}</span>
                    <div class="project-labels">
                        ${project.labels ? project.labels.map(label => `
                            <span class="project-label">${label}</span>
                        `).join('') : ''}
                    </div>
                </div>
            </div>
        </article>
    `).join('');

    // Handle carousel navigation
    prevButton.addEventListener('click', () => {
        projectsGrid.scrollBy({
            left: -420,
            behavior: 'smooth'
        });
    });

    nextButton.addEventListener('click', () => {
        projectsGrid.scrollBy({
            left: 420,
            behavior: 'smooth'
        });
    });

    // Show/hide navigation buttons based on scroll position
    projectsGrid.addEventListener('scroll', () => {
        const isAtStart = projectsGrid.scrollLeft === 0;
        const isAtEnd = projectsGrid.scrollLeft + projectsGrid.clientWidth >= projectsGrid.scrollWidth - 1;
        
        prevButton.style.opacity = isAtStart ? '0.3' : '1';
        prevButton.style.pointerEvents = isAtStart ? 'none' : 'auto';
        
        nextButton.style.opacity = isAtEnd ? '0.3' : '1';
        nextButton.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    });

    // Trigger initial scroll check
    projectsGrid.dispatchEvent(new Event('scroll'));
}

// Populate news items
function populateNews() {
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;

    newsGrid.innerHTML = newsItems.map((item, index) => `
        <article class="news-item ${index === 0 ? 'featured' : ''}">
            <span class="news-date">${new Date(item.date).toLocaleDateString()}</span>
            <span class="news-category">${item.category}</span>
            <h3 class="news-title">${item.title}</h3>
            <p class="news-content">${item.content}</p>
        </article>
    `).join('');
}

// Newsletter form handling
function setupNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        
        try {
            // Replace with actual API call
            console.log('Newsletter signup:', email);
            form.querySelector('input').value = '';
            alert('Thanks for subscribing!');
        } catch (error) {
            console.error('Newsletter signup failed:', error);
            alert('Signup failed. Please try again.');
        }
    });
}

// Email modal functionality
function setupEmailModal() {
    const modal = document.getElementById('emailModal');
    const modalOverlay = modal;
    const closeBtn = modal.querySelector('.modal-close');
    const downloadForm = document.getElementById('downloadForm');
    const downloadButtons = document.querySelectorAll('.download-button');
    let currentDownloadUrl = '';

    function openModal(downloadUrl) {
        modalOverlay.classList.add('active');
        currentDownloadUrl = downloadUrl;
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        currentDownloadUrl = '';
        downloadForm.reset();
    }

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal with close button
    closeBtn.addEventListener('click', closeModal);

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle download form submission
    downloadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = downloadForm.querySelector('input[type="email"]').value;
        
        try {
            // Here you would typically send the email to your backend
            console.log('Email submitted:', email);
            
            // Create a temporary link to download the file
            const link = document.createElement('a');
            link.href = currentDownloadUrl;
            link.download = currentDownloadUrl.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            closeModal();
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
        }
    });

    // Intercept download button clicks
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(button.getAttribute('href'));
        });
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    populateBlogPosts();
    populateProjects();
    populateNews();
    setupNewsletterForm();
    setupEmailModal();
});
