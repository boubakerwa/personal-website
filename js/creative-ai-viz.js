// Load markdown-it and configure it
const md = window.markdownit();

// Function to load and render markdown content
async function loadAndRenderContent() {
    try {
        const response = await fetch('/assets/blog/ai-creativity.md');
        const markdown = await response.text();
        
        // Replace the mermaid code blocks with div containers
        const content = md.render(markdown).replace(
            /```mermaid([\s\S]*?)```/g,
            (match, code) => `<div class="mermaid">${code}</div>`
        );
        
        document.getElementById('postContent').innerHTML = content;
        
        // Initialize mermaid after content is loaded
        mermaid.init(undefined, ".mermaid");
    } catch (error) {
        console.error('Error loading markdown:', error);
    }
}

// Initialize when the document is ready
document.addEventListener('DOMContentLoaded', loadAndRenderContent);
