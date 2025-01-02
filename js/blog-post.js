document.addEventListener('DOMContentLoaded', () => {
    // Load blog content
    loadBlogContent();
    setupLikeButton();
    setupFeedbackBar();
    setupComments();
    setupTextSelection();
});

async function loadBlogContent() {
    const postContent = document.getElementById('postContent');
    try {
        // Get post URL from query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const postUrl = urlParams.get('post');
        
        if (!postUrl) {
            throw new Error('No post URL provided');
        }

        // Update page title and metadata
        const response = await fetch(postUrl);
        const markdown = await response.text();
        
        // Extract title from markdown
        const titleMatch = markdown.match(/^# (.*$)/m);
        if (titleMatch) {
            document.title = `${titleMatch[1]} | Wassim Boubaker`;
        }

        // Simple markdown to HTML conversion
        const html = markdownToHtml(markdown);
        postContent.innerHTML = html;

        // Update metadata in the page
        updatePageMetadata(markdown);
    } catch (error) {
        console.error('Failed to load blog content:', error);
        postContent.innerHTML = '<p>Failed to load content. Please try again later.</p>';
        window.location.href = 'index.html#blog';
    }
}

function updatePageMetadata(markdown) {
    // Extract metadata from markdown
    const dateMatch = markdown.match(/\*Published: (.*?)\*/);
    const tagsMatch = markdown.match(/\*Tags: (.*?)\*/);
    
    if (dateMatch) {
        const dateElement = document.querySelector('.post-meta time');
        if (dateElement) {
            dateElement.textContent = dateMatch[1];
            dateElement.setAttribute('datetime', new Date(dateMatch[1]).toISOString());
        }
    }

    if (tagsMatch) {
        const tags = tagsMatch[1].split(',').map(tag => tag.trim());
        const tagsContainer = document.querySelector('.post-tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = tags.map(tag => `
                <span class="post-tag">${tag}</span>
            `).join('');
        }
    }
}

// Enhance markdown to HTML conversion
function markdownToHtml(markdown) {
    // First, handle headers with proper hierarchy
    let html = markdown
        .replace(/^# (.*$)/gm, '<h1 class="post-title">$1</h1>')
        .replace(/^## (.*$)/gm, '<h2 class="post-heading">$1</h2>')
        .replace(/^### (.*$)/gm, '<h3 class="post-subheading">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Handle lists properly
    const listItems = html.match(/^\- (.*$)/gm);
    if (listItems) {
        html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>\n)+/g, (match) => `<ul>${match}</ul>`);
    }

    // Handle numbered lists
    const numberedItems = html.match(/^\d\. (.*$)/gm);
    if (numberedItems) {
        html = html.replace(/^\d\. (.*$)/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>\n)+/g, (match) => `<ol>${match}</ol>`);
    }

    // Handle paragraphs
    html = html
        .replace(/^\n\n/gm, '</p><p>')
        .replace(/^(?!<[h|p|u|o|l])/gm, '<p>$&')
        .replace(/<p>\s*<\/p>/g, '');

    return html;
}

function setupLikeButton() {
    const likeButton = document.getElementById('likeButton');
    const likeCount = likeButton.querySelector('.like-count');
    let likes = parseInt(localStorage.getItem('blogLikes') || '0');
    let isLiked = localStorage.getItem('blogLiked') === 'true';

    updateLikeButton();

    likeButton.addEventListener('click', () => {
        isLiked = !isLiked;
        likes = isLiked ? likes + 1 : likes - 1;
        localStorage.setItem('blogLiked', isLiked);
        localStorage.setItem('blogLikes', likes);
        updateLikeButton();
    });

    function updateLikeButton() {
        likeCount.textContent = likes;
        likeButton.classList.toggle('active', isLiked);
    }
}

function setupFeedbackBar() {
    const feedbackBar = document.getElementById('feedbackBar');
    const toggleButton = document.getElementById('feedbackToggle');
    const form = document.getElementById('feedbackForm');
    let selectedText = '';

    toggleButton.addEventListener('click', () => {
        form.classList.toggle('active');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const feedback = {
            text: form.querySelector('textarea').value,
            selection: selectedText
        };
        console.log('Feedback submitted:', feedback);
        alert('Thank you for your feedback!');
        form.classList.remove('active');
        form.reset();
    });

    // Close feedback form when clicking outside
    document.addEventListener('click', (e) => {
        if (!feedbackBar.contains(e.target)) {
            form.classList.remove('active');
        }
    });
}

function setupTextSelection() {
    const postContent = document.getElementById('postContent');
    const feedbackBar = document.getElementById('feedbackBar');
    const feedbackForm = document.getElementById('feedbackForm');
    let selectedText = '';
    
    document.addEventListener('mouseup', () => {
        const selection = window.getSelection();
        selectedText = selection.toString().trim();
        
        if (selectedText && selection.anchorNode?.parentElement?.closest('.post-body')) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            const postContent = document.querySelector('.post-content');
            const postRect = postContent.getBoundingClientRect();
            const relativeLeft = rect.left - postRect.left + rect.width;
            const relativeTop = rect.top - postRect.top + rect.height;
            
            feedbackBar.style.left = `${relativeLeft - 16}px`;
            feedbackBar.style.top = `${relativeTop - 16}px`;
            feedbackBar.style.transform = 'none';
            feedbackBar.classList.add('active');
            feedbackForm.querySelector('textarea').value = `Regarding "${selectedText}":\n`;
        } else {
            feedbackBar.classList.remove('active');
            if (!feedbackForm.classList.contains('active')) {
                feedbackForm.querySelector('textarea').value = '';
            }
        }
    });


    // Don't hide feedback bar when interacting with the form
    feedbackForm.addEventListener('mouseup', (e) => {
        e.stopPropagation();
    });
}

function setupComments() {
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');
    let comments = JSON.parse(localStorage.getItem('blogComments') || '[]');

    // Load existing comments
    renderComments();

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const textarea = commentForm.querySelector('textarea');
        const newComment = {
            id: Date.now(),
            text: textarea.value,
            author: 'Anonymous User',
            date: new Date().toISOString(),
            likes: 0
        };
        
        comments.unshift(newComment);
        localStorage.setItem('blogComments', JSON.stringify(comments));
        renderComments();
        textarea.value = '';
    });

    function renderComments() {
        commentsList.innerHTML = comments.map(comment => `
            <div class="comment">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${formatDate(comment.date)}</span>
                </div>
                <p class="comment-text">${comment.text}</p>
            </div>
        `).join('');
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}
