# Portfolio Rebuild - Task List

This document tracks all tasks for rebuilding deanwalls.com portfolio with a modern, sleek, Linux-inspired design.

---

## Phase 1: Setup & Structure

- [x] **Task 1.1**: Create new HTML structure with semantic elements
  - Clean, semantic HTML5 structure
  - Remove jQuery dependencies
  - Set up basic page sections: Header, About, Tech Stack, Projects, Blog, Contact
  - Include avatar/profile picture prominently in header
  - Acceptance: Valid HTML5, no jQuery, avatar visible in header

- [x] **Task 1.2**: Set up asset directory structure
  - Organize: `assets/css/`, `assets/js/`, `images/`, `blog/`
  - Create `blog/posts.json` for blog entry metadata
  - Acceptance: Clean directory structure, JSON file exists

- [x] **Task 1.3**: Remove old dependencies and unused assets
  - Remove jQuery and related scripts
  - Remove SASS/SCSS files (keep compiled CSS if needed temporarily)
  - Clean up unused images
  - Acceptance: No jQuery references, minimal dependencies

---

## Phase 2: Design System & Styling

- [x] **Task 2.1**: Design color palette and typography (Linux/Arch-inspired)
  - Modern, sleek color scheme (dark mode preferred, with light option)
  - Arch Linux aesthetic: clean lines, monospace accents, terminal-inspired elements
  - Professional typography (system fonts or carefully chosen web fonts)
  - High contrast for accessibility (WCAG AA minimum)
  - Acceptance: Color palette defined, typography system established, accessible contrast ratios

- [x] **Task 2.2**: Create base CSS architecture
  - CSS custom properties (variables) for colors, spacing, typography
  - Reset/normalize styles
  - Mobile-first responsive approach
  - Smooth transitions and modern effects
  - Acceptance: Clean CSS structure, variables defined, responsive base

- [x] **Task 2.3**: Design header/navigation component
  - Prominent avatar/profile picture integration
  - Clean navigation menu (sticky or fixed, works on mobile)
  - Professional branding (name, tagline)
  - Social links (GitHub, LinkedIn, Email)
  - Acceptance: Header looks professional, avatar integrated, navigation works on all devices

- [x] **Task 2.4**: Design card/container components
  - Consistent card styling for projects and blog entries
  - Subtle shadows, borders, or backgrounds
  - Hover states and interactions
  - Acceptance: Reusable card component, consistent styling

---

## Phase 3: Core Content Sections

- [x] **Task 3.1**: Build About section
  - Professional introduction
  - Include link to resume
  - Clean, readable layout
  - Acceptance: About section complete, resume link works

- [x] **Task 3.2**: Build simplified Tech Stack section
  - Display only: Java, JavaScript, HTML, CSS
  - Modern icon/grid layout
  - Clean, minimal presentation
  - Remove all other tech items (Spring Boot, C#, .NET, TypeScript, Docker, SQL, Postman, Selenium)
  - Acceptance: Only 4 technologies shown, clean layout

- [x] **Task 3.3**: Build Projects section
  - Highlight hidemy.pics (formerly InPlainSight) prominently
  - Display other projects (CRUD Demo, noBS LinkedIn Filter, Bachelor Strength)
  - Each project: image, title, description, link
  - Easy to scan for non-technical viewers
  - Acceptance: Projects displayed clearly, hidemy.pics featured, all links work

- [x] **Task 3.4**: Build Contact section
  - Email with copy-to-clipboard functionality (vanilla JS)
  - LinkedIn link
  - Clean, accessible layout
  - Acceptance: Contact info clear, copy function works

---

## Phase 4: Blog System

- [x] **Task 4.1**: Create blog entry data structure
  - Design JSON schema for blog posts in `blog/posts.json`
  - Fields: id, title, date, description, content (markdown or HTML), image, tags
  - Acceptance: JSON structure defined, example entry included

- [x] **Task 4.2**: Build blog listing page/section
  - Display blog entries in reverse chronological order
  - Show: title, date, excerpt, featured image
  - Card-based layout, easy to browse
  - Acceptance: Blog entries render from JSON, chronological order, clean layout

- [x] **Task 4.3**: Build individual blog entry view
  - Full blog post display
  - Support markdown content (use lightweight markdown parser like `marked.js` if needed)
  - Image display
  - Back to blog list navigation
  - Acceptance: Full posts display correctly, markdown renders, navigation works

- [x] **Task 4.4**: Add "Paper Password Backup" blog entry
  - Create JSON entry with provided content
  - Include the QR code artwork image
  - Format content clearly
  - Acceptance: Entry displays correctly with image and formatted text

---

## Phase 5: Polish & Optimization

- [x] **Task 5.1**: Implement responsive design
  - Mobile-first approach
  - Test on: mobile (320px+), tablet (768px+), desktop (1024px+)
  - Navigation works on all screen sizes
  - Text readable, images scale appropriately
  - Acceptance: Site works perfectly on all tested viewport sizes

- [x] **Task 5.2**: Optimize images and assets
  - Compress images appropriately
  - Use modern formats (WebP with fallbacks if needed)
  - Lazy loading for blog images
  - Acceptance: Images optimized, fast load times

- [x] **Task 5.3**: Ensure accessibility
  - Semantic HTML throughout
  - Proper heading hierarchy
  - Alt text for all images
  - Keyboard navigation works
  - Focus states visible
  - Acceptance: WCAG AA compliance, keyboard navigable

- [x] **Task 5.4**: Add smooth scrolling and interactions
  - Smooth scroll for anchor links
  - Subtle animations/transitions
  - Loading states if needed
  - Acceptance: Interactions feel polished, no janky animations

- [x] **Task 5.5**: SEO and metadata
  - Proper meta tags (title, description, Open Graph)
  - Semantic HTML structure
  - Clean URLs
  - Acceptance: SEO-friendly, proper metadata

- [x] **Task 5.6**: Cross-browser testing
  - Test in Chrome, Firefox, Safari, Edge
  - Ensure graceful degradation
  - Fix any browser-specific issues
  - Acceptance: Works consistently across major browsers

- [x] **Task 5.7**: Performance optimization
  - Minimize CSS/JS
  - Optimize critical rendering path
  - Fast initial load
  - Acceptance: Lighthouse score 90+ for performance

---

## Phase 6: Content Migration & Final Touches

- [x] **Task 6.1**: Update all project descriptions
  - Ensure hidemy.pics is properly named and featured
  - Update any outdated links or descriptions
  - Acceptance: All project info accurate and current

- [x] **Task 6.2**: Final design review and polish
  - Ensure consistent spacing throughout
  - Check typography hierarchy
  - Verify color consistency
  - Ensure it doesn't look amateurish
  - Acceptance: Professional, polished appearance

- [x] **Task 6.3**: User experience review
  - Test navigation flow
  - Ensure it's intuitive for non-technical users (HR, recruiters)
  - Clear call-to-actions
  - Easy to find contact info
  - Acceptance: Site is easy to navigate for all users

---

## Notes

- All tasks must use only: HTML, CSS, JavaScript (vanilla), JSON
- No frameworks unless explicitly approved
- Design must be modern, sleek, Linux/Arch-inspired
- Must be professional and accessible to non-technical viewers
- Avatar/profile picture must be prominently featured

