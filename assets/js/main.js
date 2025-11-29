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
            { type: 'project', name: 'HideMy.pics', desc: 'Steganography web app', href: 'http://inplainsight.deanwalls.com' },
            { type: 'project', name: 'CRUD Demo', desc: 'Full-stack CRUD app', href: 'http://crud_demo.deanwalls.com' },
            { type: 'project', name: 'noBS Filter', desc: 'Chrome extension', href: 'https://github.com/deanOfWalls/noBS_LinkedIn_Job_Filter' },
            { type: 'project', name: 'Bachelor Strength', desc: 'Fitness calculator', href: 'https://github.com/deanOfWalls/bachelor.strength' }
        ]
    },
    contact: {
        lines: [
            { type: 'text', content: 'deanofwalls@gmail.com', email: true },
            { type: 'link', content: '→ github.com/deanOfWalls', href: 'https://github.com/deanOfWalls' },
            { type: 'link', content: '→ linkedin.com/in/deanofwalls', href: 'https://www.linkedin.com/in/deanofwalls/' }
        ]
    }
};

let isExecuting = false;

document.addEventListener('DOMContentLoaded', function() {
    initializeTerminal();
    setupMenuHandlers();
    
    // Copy email functionality
    document.addEventListener('click', function(e) {
        if (e.target.id === 'copy-email-btn') {
            const email = 'deanofwalls@gmail.com';
            copyToClipboard(email);
            
            const originalText = e.target.textContent;
            e.target.textContent = 'Copied!';
            
            setTimeout(() => {
                e.target.textContent = originalText;
            }, 2000);
        }
    });
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
        // Handle blog posts
        const sortedPosts = content.posts.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        
        for (const post of sortedPosts) {
            await sleep(150);
            const postElement = createBlogPostElement(post);
            container.appendChild(postElement);
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
            a.href = line.href;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = line.content;
            p.appendChild(a);
            container.appendChild(p);
        } else if (line.type === 'project') {
            const projectList = container.querySelector('.projects-list') || createProjectsList(container);
            await sleep(100);
            const projectItem = createProjectElement(line, projectIndex);
            projectList.appendChild(projectItem);
            projectIndex++;
        } else if (line.email) {
            const p = document.createElement('p');
            const emailLink = document.createElement('a');
            emailLink.href = `mailto:${line.content}`;
            emailLink.textContent = line.content;
            p.appendChild(emailLink);
            
            const copyBtn = document.createElement('button');
            copyBtn.id = 'copy-email-btn';
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = '[copy]';
            p.appendChild(copyBtn);
            
            container.appendChild(p);
        }
    }
}

function createProjectsList(container) {
    const list = document.createElement('div');
    list.className = 'projects-list';
    container.appendChild(list);
    return list;
}

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

function createBlogPostElement(post) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    article.setAttribute('data-post-id', post.id);
    
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Initially show only title and date (collapsed state)
    const header = document.createElement('div');
    header.className = 'blog-header';
    header.style.cursor = 'pointer';
    
    const title = document.createElement('h3');
    title.className = 'blog-title';
    title.textContent = post.title;
    
    const dateElement = document.createElement('p');
    dateElement.className = 'blog-date';
    dateElement.textContent = date;
    
    header.appendChild(title);
    header.appendChild(dateElement);
    
    // Store post data for expansion
    article._postData = post;
    article._isExpanded = false;
    
    // Make header clickable to toggle
    header.addEventListener('click', () => {
        window.toggleBlogPost(post.id);
    });
    
    article.appendChild(header);
    
    return article;
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
    const article = document.querySelector(`[data-post-id="${postId}"]`);
    if (!article) {
        console.error('Article not found for postId:', postId);
        return;
    }
    
    // Get post data from article or fetch it
    let post = article._postData;
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
        article._postData = post;
    }
    
    const contentDiv = article.querySelector('.blog-content');
    
    if (contentDiv) {
        // Already expanded, collapse it
        contentDiv.remove();
        article._isExpanded = false;
        article.classList.remove('blog-expanded');
    } else {
        // Expand it - show full content
        expandBlogPost(post, article);
        article.classList.add('blog-expanded');
    }
};

function expandBlogPost(post, article) {
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
    
    // Insert after header
    const header = article.querySelector('.blog-header');
    header.after(content);
    
    article._isExpanded = true;
    
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
