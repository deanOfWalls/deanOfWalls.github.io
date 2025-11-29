// Blog functionality - loads and displays blog entries from JSON
// This file now primarily provides helper functions for the interactive terminal

let allPosts = [];
let expandedPostId = null;

// Make allPosts globally accessible
window.allPosts = allPosts;

// Load blog posts on page load for use in main.js
document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
});

async function loadBlogPosts() {
    try {
        const response = await fetch('blog/posts.json');
        if (!response.ok) {
            console.log('No blog posts found or error loading posts.json');
            return;
        }
        
        allPosts = await response.json();
        window.allPosts = allPosts; // Update global reference
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

// Helper function to escape HTML (used by main.js)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatBlogContent(content) {
    // First, extract HTML tags (like video) to preserve them
    const htmlTagRegex = /<[^>]+>/g;
    const htmlTags = [];
    let tagIndex = 0;
    let processed = content.replace(htmlTagRegex, (match) => {
        htmlTags.push(match);
        return `__HTML_TAG_${tagIndex++}__`;
    });
    
    // Now escape the rest
    let formatted = escapeHtml(processed);
    
    // Restore HTML tags
    htmlTags.forEach((tag, index) => {
        formatted = formatted.replace(`__HTML_TAG_${index}__`, tag);
    });
    
    // Convert markdown headers (## Header)
    formatted = formatted.replace(/^## (.+)$/gm, '<h3>$1</h3>');
    
    // Convert lines starting with "- " to list items
    formatted = formatted.replace(/^- (.+)$/gm, '<li>$1</li>');
    
    // Wrap consecutive list items in <ul>
    formatted = formatted.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
        return '<ul>' + match + '</ul>';
    });
    
    // Convert remaining line breaks to <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Wrap paragraphs (but preserve HTML tags and headers)
    formatted = formatted.split('<br><br>').map(para => {
        para = para.trim();
        if (!para) return '';
        // Don't wrap if it's already an HTML tag, header, or list
        if (para.includes('<h3>') || para.includes('<ul>') || para.includes('<video>') || para.includes('</video>')) {
            return para;
        }
        return '<p>' + para + '</p>';
    }).join('');
    
    return formatted;
}

// Image modal functions
function openImageModal(imageSrc, imageAlt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Image viewer');
    modal.setAttribute('aria-modal', 'true');
    
    modal.innerHTML = `
        <div class="image-modal-backdrop"></div>
        <div class="image-modal-content">
            <button class="image-modal-close" aria-label="Close">×</button>
            <img src="${imageSrc}" alt="${imageAlt}" class="image-modal-img">
            <p class="image-modal-caption">${imageAlt}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close on backdrop click
    const backdrop = modal.querySelector('.image-modal-backdrop');
    backdrop.addEventListener('click', closeImageModal);
    
    // Close on close button click
    const closeBtn = modal.querySelector('.image-modal-close');
    closeBtn.addEventListener('click', closeImageModal);
    
    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    };
    document.addEventListener('keydown', handleEscape);
    modal._escapeHandler = handleEscape;
    
    // Focus the close button
    setTimeout(() => {
        closeBtn.focus();
    }, 100);
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        // Remove escape key handler
        if (modal._escapeHandler) {
            document.removeEventListener('keydown', modal._escapeHandler);
        }
        document.body.style.overflow = '';
        modal.remove();
    }
}

// Make functions globally accessible
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.formatBlogContent = formatBlogContent;
window.escapeHtml = escapeHtml;
