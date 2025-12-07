// Interactive Terminal System

const contentData = {
    about: {
        lines: [
            { type: 'text', content: 'Full-stack developer building practical solutions.' },
            { type: 'text', content: '' },
            { type: 'text', content: 'I build applications that solve real problems. Currently focused on Java backend development with experience across the full stack.' },
            { type: 'text', content: '' },
            { type: 'link', content: '→ resume.deanwalls.com', href: 'http://resume.deanwalls.com' }
        ]
    },
    projects: {
        lines: [
            { type: 'project', name: 'HideMy.pics', desc: 'Steganography web app', href: 'https://hidemy.pics' },
            { type: 'project', name: 'CRUD Demo', desc: 'Full-stack CRUD app', href: 'http://crud_demo.deanwalls.com' },
            { type: 'project', name: 'noBS Filter', desc: 'Chrome extension', href: 'https://github.com/deanOfWalls/noBS_LinkedIn_Job_Filter' },
            { type: 'project', name: 'Bachelor Strength', desc: 'Fitness calculator', href: 'https://github.com/deanOfWalls/bachelor.strength' }
        ]
    },
    contact: {
        lines: [
            { type: 'link', content: '→ deanofwalls@gmail.com', href: '#', email: true },
            { type: 'link', content: '→ github.com/deanOfWalls', href: 'https://github.com/deanOfWalls' },
            { type: 'link', content: '→ linkedin.com/in/deanofwalls', href: 'https://www.linkedin.com/in/deanofwalls/' }
        ]
    }
};

let isExecuting = false;

document.addEventListener('DOMContentLoaded', function() {
    initializeTerminal();
    setupMenuHandlers();
    
    // Email copy functionality is now handled inline in displayContent
});

function initializeTerminal() {
    // Show initial welcome or keep menu visible
    const output = document.getElementById('output');
    output.innerHTML = '';
}

function setupMenuHandlers() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (isExecuting) return;
            
            const command = this.getAttribute('data-command');
            const target = this.getAttribute('data-target');
            
            executeCommand(command, target);
        });
    });
}

async function executeCommand(command, target) {
    if (isExecuting) return;
    isExecuting = true;
    
    const output = document.getElementById('output');
    const activePrompt = document.getElementById('active-prompt');
    const cursor = activePrompt.querySelector('.cursor');
    const menuSection = document.getElementById('menu-section');
    
    // Clear previous output
    output.innerHTML = '';
    
    // Hide cursor and clear any existing command
    cursor.style.display = 'none';
    let commandSpan = activePrompt.querySelector('.command');
    if (!commandSpan) {
        commandSpan = document.createElement('span');
        commandSpan.className = 'command';
        activePrompt.insertBefore(commandSpan, cursor);
    }
    commandSpan.textContent = '';
    
    // Type the number selection in the prompt (e.g., "1")
    const menuItem = document.querySelector(`[data-target="${target}"]`);
    const menuNumber = menuItem ? menuItem.querySelector('.menu-number').textContent.replace(')', '') : '1';
    await typeText(commandSpan, menuNumber, 40);
    
    // Show cursor again briefly, then hide it
    cursor.style.display = 'inline-block';
    await sleep(300);
    cursor.style.display = 'none';
    
    // Move command to output as a line showing ./portfolio.sh with the number
    const commandLine = document.createElement('div');
    commandLine.className = 'line';
    commandLine.innerHTML = `<span class="prompt">[dean@archDesktop ~]$</span> <span class="command">./portfolio.sh ${menuNumber}</span>`;
    output.appendChild(commandLine);
    
    // Clear command from prompt
    commandSpan.textContent = '';
    cursor.style.display = 'inline-block';
    
    // Small delay before output (simulating processing)
    await sleep(200);
    
    // Create response container
    const response = document.createElement('div');
    response.className = 'response';
    output.appendChild(response);
    
    // Get content and display it line by line
    let content;
    if (target === 'blog') {
        // Blog is handled separately
        content = await getBlogContent();
    } else {
        content = contentData[target];
    }
    
    if (content) {
        await displayContent(response, content, target);
    }
    
    // Keep scroll at top (don't auto-scroll)
    const outputSection = document.getElementById('output-section');
    outputSection.scrollTop = 0;
    
    isExecuting = false;
}

async function getBlogContent() {
    try {
        const response = await fetch('blog/posts.json');
        if (!response.ok) return null;
        const posts = await response.json();
        return { type: 'blog', posts: posts };
    } catch (error) {
        console.error('Error loading blog:', error);
        return null;
    }
}

async function displayContent(container, content, target) {
    if (content.type === 'blog') {
        // Handle blog posts - use same format as projects
        const sortedPosts = content.posts.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        
        const blogList = createProjectsList(container);
        for (let i = 0; i < sortedPosts.length; i++) {
            await sleep(150);
            const postElement = createBlogPostElement(sortedPosts[i], i);
            blogList.appendChild(postElement);
            // Check if name is wrapping and adjust
            setTimeout(() => checkAndFixWrapping(postElement), 100);
        }
        return;
    }
    
    // Handle projects - check for wrapping
    if (target === 'projects') {
        let projectIndex = 0;
        for (let i = 0; i < content.lines.length; i++) {
            const line = content.lines[i];
            if (line.type === 'project') {
                const projectList = container.querySelector('.projects-list') || createProjectsList(container);
                await sleep(100);
                const projectElement = createProjectElement(line, projectIndex);
                projectList.appendChild(projectElement);
                // Check if name is wrapping and adjust
                setTimeout(() => checkAndFixWrapping(projectElement), 100);
                projectIndex++;
            }
        }
        return;
    }
    
    // Add avatar image for about section
    if (target === 'about') {
        await sleep(100);
        const avatarContainer = document.createElement('div');
        avatarContainer.className = 'avatar-container';
        const avatarImg = document.createElement('img');
        avatarImg.src = 'images/avatar.png';
        avatarImg.alt = 'Dean Walls';
        avatarImg.className = 'avatar-image';
        avatarContainer.appendChild(avatarImg);
        container.appendChild(avatarContainer);
        await sleep(100);
    }
    
    // Handle regular content
    let projectIndex = 0;
    for (let i = 0; i < content.lines.length; i++) {
        const line = content.lines[i];
        await sleep(80 + Math.random() * 40); // Variable delay for realism
        
        if (line.type === 'text') {
            const p = document.createElement('p');
            if (i === 0 && target === 'about') {
                p.className = 'intro';
            }
            p.textContent = line.content;
            container.appendChild(p);
        } else if (line.type === 'link') {
            const p = document.createElement('p');
            const a = document.createElement('a');
            
            // Handle email links differently
            if (line.email) {
                a.href = '#';
                a.style.cursor = 'pointer';
                
                // Add tooltip element
                const tooltip = document.createElement('span');
                tooltip.className = 'email-tooltip';
                tooltip.textContent = 'Copied to clipboard!';
                a.appendChild(tooltip);
                
                // Extract email from content (remove the arrow)
                const email = line.content.replace('→ ', '').trim();
                
                // Copy to clipboard on click
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    copyToClipboard(email);
                    
                    // Show tooltip
                    tooltip.classList.add('show');
                    
                    // Hide tooltip after 2 seconds
                    setTimeout(() => {
                        tooltip.classList.remove('show');
                    }, 2000);
                });
            } else {
                a.href = line.href;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }
            
            a.textContent = line.content;
            p.appendChild(a);
            container.appendChild(p);
        } else if (line.type === 'project') {
            // Projects are already handled above, skip here
            continue;
        }
    }
}

function createProjectsList(container) {
    const list = document.createElement('div');
    list.className = 'projects-list';
    container.appendChild(list);
    return list;
}

function checkAndFixWrapping(lineElement) {
    const link = lineElement.querySelector('.ls-link');
    if (!link) return;
    
    const nameElement = link.querySelector('.ls-name');
    if (!nameElement) return;
    
    // Reset any previous wrapping styles
    nameElement.style.flexBasis = '';
    nameElement.style.width = '';
    nameElement.style.marginTop = '';
    nameElement.style.order = '';
    
    // Check if the name text is wrapping by comparing its natural width with available space
    const nameText = nameElement.textContent;
    const tempSpan = document.createElement('span');
    tempSpan.textContent = nameText;
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.font = window.getComputedStyle(nameElement).font;
    tempSpan.style.padding = '0';
    tempSpan.style.margin = '0';
    document.body.appendChild(tempSpan);
    const nameTextWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);
    
    // Calculate available width for name (link width minus perms/size/date/gaps)
    const linkRect = link.getBoundingClientRect();
    const perms = link.querySelector('.ls-perms');
    const size = link.querySelector('.ls-size');
    const date = link.querySelector('.ls-date');
    const permsWidth = perms ? perms.getBoundingClientRect().width : 0;
    const sizeWidth = size ? size.getBoundingClientRect().width : 0;
    const dateWidth = date ? date.getBoundingClientRect().width : 0;
    const gap = parseFloat(window.getComputedStyle(link).gap) || 16;
    const availableWidth = linkRect.width - permsWidth - sizeWidth - dateWidth - (gap * 3);
    
    // If name text is wider than available space, it will wrap - force it to new line
    if (nameTextWidth > availableWidth && availableWidth > 0) {
        nameElement.style.flexBasis = '100%';
        nameElement.style.width = '100%';
        nameElement.style.marginTop = '0.5rem';
        nameElement.style.order = '10';
    }
}

// Re-check wrapping on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        document.querySelectorAll('.ls-line').forEach(line => {
            checkAndFixWrapping(line);
        });
    }, 100);
});

function createProjectElement(project, index = 0) {
    // Generate fake file size and date for ls -lh format
    const sizes = ['2.1K', '4.3K', '1.8K', '3.2K'];
    const dates = ['Jan 15', 'Mar 22', 'Nov 8', 'Sep 3'];
    const times = ['14:32', '09:15', '16:48', '11:27'];
    const perms = 'drwxr-xr-x';
    
    const size = sizes[index % sizes.length];
    const date = dates[index % dates.length];
    const time = times[index % times.length];
    
    const line = document.createElement('div');
    line.className = 'ls-line';
    
    const link = document.createElement('a');
    link.href = project.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'ls-link';
    
    link.innerHTML = `
        <span class="ls-perms">${perms}</span>
        <span class="ls-size">${size}</span>
        <span class="ls-date">${date} ${time}</span>
        <span class="ls-name">${escapeHtml(project.name)}</span>
        <span class="ls-desc">${escapeHtml(project.desc)}</span>
    `;
    
    line.appendChild(link);
    return line;
}

function createBlogPostElement(post, index = 0) {
    // Format date like ls -lh (e.g., "Nov 28 20:48")
    const postDate = new Date(post.date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[postDate.getMonth()];
    const day = postDate.getDate();
    const hours = String(postDate.getHours()).padStart(2, '0');
    const minutes = String(postDate.getMinutes()).padStart(2, '0');
    const dateStr = `${month} ${day} ${hours}:${minutes}`;
    
    // Generate fake file size for ls format
    const sizes = ['1.2K', '2.4K', '1.8K', '3.1K'];
    const size = sizes[index % sizes.length];
    const perms = '-rw-r--r--';
    
    const line = document.createElement('div');
    line.className = 'ls-line';
    line.setAttribute('data-post-id', post.id);
    
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'ls-link';
    link.style.cursor = 'pointer';
    
    link.innerHTML = `
        <span class="ls-perms">${perms}</span>
        <span class="ls-size">${size}</span>
        <span class="ls-date">${dateStr}</span>
        <span class="ls-name">${escapeHtml(post.title)}</span>
    `;
    
    // Store post data for expansion
    line._postData = post;
    line._isExpanded = false;
    
    // Make clickable to toggle
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleBlogPost(post.id);
    });
    
    line.appendChild(link);
    return line;
}

async function typeText(element, text, speed = 50) {
    for (let i = 0; i < text.length; i++) {
        element.textContent = text.substring(0, i + 1);
        await sleep(speed + Math.random() * 20); // Variable typing speed
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function scrollToBottom() {
    const outputSection = document.getElementById('output-section');
    setTimeout(() => {
        outputSection.scrollTop = outputSection.scrollHeight;
    }, 10);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Copy to clipboard helper
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textarea);
}

// Make blog functions globally accessible
window.toggleBlogPost = async function(postId) {
    const line = document.querySelector(`[data-post-id="${postId}"]`);
    if (!line) {
        console.error('Blog post line not found for postId:', postId);
        return;
    }
    
    // Check if already expanded by looking at next sibling
    const nextSibling = line.nextElementSibling;
    const contentDiv = nextSibling && nextSibling.classList.contains('blog-content') ? nextSibling : null;
    
    if (contentDiv) {
        // Already expanded, collapse it
        contentDiv.remove();
        line._isExpanded = false;
    } else {
        // Get post data from line or fetch it
        let post = line._postData;
        if (!post) {
            // Try fetching if not stored
            let posts = [];
            if (window.allPosts && window.allPosts.length > 0) {
                posts = window.allPosts;
            } else {
                try {
                    const response = await fetch('blog/posts.json');
                    if (!response.ok) {
                        console.error('Failed to fetch blog posts');
                        return;
                    }
                    posts = await response.json();
                    window.allPosts = posts;
                } catch (err) {
                    console.error('Failed to load blog posts:', err);
                    return;
                }
            }
            post = posts.find(p => p.id === postId);
            if (!post) {
                console.error('Post not found:', postId);
                return;
            }
            line._postData = post;
        }
        
        // Expand it - show full content
        expandBlogPost(post, line);
    }
};

function expandBlogPost(post, line) {
    const content = document.createElement('div');
    content.className = 'blog-content';
    
    let html = '';
    
    // Add image if available
    if (post.image) {
        html += `<img src="${post.image}" alt="${escapeHtml(post.title)}" class="blog-image" loading="lazy">`;
    }
    
    // Add description if available
    if (post.description) {
        html += `<p class="blog-description">${escapeHtml(post.description)}</p>`;
    }
    
    // Add full content
    if (post.content) {
        html += `<div class="blog-post-content">${formatBlogContent(post.content)}</div>`;
    }
    
    content.innerHTML = html;
    
    // Insert after the line
    line.after(content);
    
    line._isExpanded = true;
    
    // Make images clickable
    const images = content.querySelectorAll('.blog-image');
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent toggling when clicking image
            if (window.openImageModal) {
                window.openImageModal(img.src, img.alt || 'Image');
            }
        });
    });
}

// allPosts will be loaded by blog.js
// We'll access it from window or wait for it to be available

// Use formatBlogContent from blog.js if available, otherwise define it
function formatBlogContent(content) {
    if (window.formatBlogContent) {
        return window.formatBlogContent(content);
    }
    let formatted = escapeHtml(content);
    // Convert lines starting with "- " to hyphen-prefixed lines (terminal style)
    formatted = formatted.replace(/^- (.+)$/gm, '- $1');
    formatted = formatted.replace(/\n/g, '<br>');
    formatted = formatted.split('<br><br>').map(para => {
        if (para.trim()) {
            return '<p>' + para.trim() + '</p>';
        }
        return para;
    }).join('');
    return formatted;
}
