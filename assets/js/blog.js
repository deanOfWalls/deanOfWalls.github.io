// Blog functionality - loads and displays blog entries from JSON

let allPosts = [];
let expandedPostId = null;

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
        displayBlogPosts(allPosts);
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

function displayBlogPosts(posts) {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;

    if (posts.length === 0) {
        blogContainer.innerHTML = '<p class="no-posts">No blog posts yet. Check back soon!</p>';
        return;
    }

    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    blogContainer.innerHTML = sortedPosts.map(post => createBlogCard(post)).join('');
    
    // Make all images in blog posts clickable
    const blogImages = blogContainer.querySelectorAll('.blog-image, .blog-post-content img');
    blogImages.forEach(img => {
        if (!img.onclick) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                openImageModal(img.src, img.alt || 'Image');
            });
        }
    });
    
    // Scroll to blog section when expanded
    if (expandedPostId) {
        setTimeout(() => {
            const element = document.querySelector(`[data-post-id="${expandedPostId}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
}

function createBlogCard(post) {
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const isExpanded = expandedPostId === post.id;
    const showFullContent = isExpanded ? formatBlogContent(post.content) : '';

    return `
        <article class="blog-card" data-post-id="${post.id}">
            ${post.image ? `<img src="${post.image}" alt="${post.title}" class="blog-image" loading="lazy" onclick="openImageModal('${post.image}', '${escapeHtml(post.title)}')">` : ''}
            <h3 class="blog-title">${escapeHtml(post.title)}</h3>
            <p class="blog-date">${date}</p>
            <p class="blog-description">${escapeHtml(post.description)}</p>
            ${!isExpanded ? `<button class="blog-read-more" onclick="toggleBlogPost('${post.id}')">Read More</button>` : ''}
            ${isExpanded ? `
                <div class="blog-post-content">
                    ${showFullContent}
                </div>
                <button class="blog-read-more" onclick="toggleBlogPost('${post.id}')" style="margin-top: 1rem;">Show Less</button>
            ` : ''}
        </article>
    `;
}

function toggleBlogPost(postId) {
    if (expandedPostId === postId) {
        expandedPostId = null;
    } else {
        expandedPostId = postId;
    }
    displayBlogPosts(allPosts);
}

function formatBlogContent(content) {
    // Convert line breaks to <br> and format bullet points
    let formatted = escapeHtml(content);
    
    // Convert lines starting with "- " to list items
    formatted = formatted.replace(/^- (.+)$/gm, '<li>$1</li>');
    
    // Wrap consecutive list items in <ul>
    formatted = formatted.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
        return '<ul>' + match + '</ul>';
    });
    
    // Convert remaining line breaks to <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Wrap paragraphs
    formatted = formatted.split('<br><br>').map(para => {
        if (para.trim() && !para.includes('<ul>')) {
            return '<p>' + para.trim() + '</p>';
        }
        return para;
    }).join('');
    
    return formatted;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Image modal functions
function openImageModal(imageSrc, imageAlt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Image viewer');
    modal.setAttribute('aria-modal', 'true');
    
    modal.innerHTML = `
        <div class="image-modal-backdrop" onclick="closeImageModal()"></div>
        <div class="image-modal-content">
            <button class="image-modal-close" onclick="closeImageModal()" aria-label="Close">×</button>
            <img src="${imageSrc}" alt="${imageAlt}" class="image-modal-img">
            <p class="image-modal-caption">${imageAlt}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    };
    modal.addEventListener('keydown', handleEscape);
    
    // Focus the close button
    setTimeout(() => {
        modal.querySelector('.image-modal-close').focus();
    }, 100);
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        document.body.style.overflow = '';
        modal.remove();
    }
}

// Make functions globally accessible
window.toggleBlogPost = toggleBlogPost;
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
