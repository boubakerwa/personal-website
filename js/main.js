// Sample data (replace with actual data from a backend/CMS)
const blogPosts = [
    {
        title: 'The Future of AI in Creative Industries',
        excerpt: 'Exploring how artificial intelligence is transforming creative workflows and enabling new forms of expression.',
        image: 'assets/blog/ai-creativity.jpg',
        date: '2024-01-15',
        category: 'AI & Technology',
        tags: ['AI', 'Creativity', 'Innovation']
    },
    {
        title: 'Building Scalable Machine Learning Systems',
        excerpt: 'Best practices and architectural patterns for developing production-ready ML systems.',
        image: 'assets/blog/ml-systems.jpg',
        date: '2024-01-10',
        category: 'Machine Learning',
        tags: ['ML', 'Architecture', 'Development']
    }
];

const projects = [
    {
        title: 'AI-Powered Content Generator',
        description: 'A machine learning system that generates creative content while maintaining brand consistency.',
        image: 'assets/projects/ai-content.jpg',
        technologies: ['Python', 'TensorFlow', 'React'],
        status: 'active',
        links: {
            demo: 'https://demo.example.com',
            github: 'https://github.com/example'
        }
    },
    {
        title: 'Project Management Dashboard',
        description: 'Interactive dashboard for tracking project metrics and team performance.',
        image: 'assets/projects/dashboard.jpg',
        technologies: ['Vue.js', 'Node.js', 'D3.js'],
        status: 'completed',
        links: {
            demo: 'https://demo.example.com',
            github: 'https://github.com/example'
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
                    <span class="blog-card-date">${new Date(post.date).toLocaleDateString()}</span>
                    <span class="blog-card-category">${post.category}</span>
                </div>
            </div>
        </article>
    `).join('');
}

// Populate projects
function populateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = projects.map(project => `
        <article class="project-card ${project === projects[0] ? 'featured' : ''}">
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
                    <a href="${project.links.github}" class="project-link" target="_blank">GitHub</a>
                </div>
                <span class="project-status status-${project.status}">${project.status}</span>
            </div>
        </article>
    `).join('');
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

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    populateBlogPosts();
    populateProjects();
    populateNews();
    setupNewsletterForm();
});
