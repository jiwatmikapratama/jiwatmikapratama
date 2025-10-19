
const defaultConfig = {
    typing_text: "INITIALIZING_PORTFOLIO_SYSTEM…",
    button_text: "> EXECUTE_ME.py()",
    about_title: "About Me",
    about_subtitle: "My Journey",
    about_description: "Passionate full-stack developer with 5+ years of experience crafting digital solutions. I specialize in modern web technologies, creating seamless user experiences and robust backend systems. My journey began with curiosity about how things work under the hood, and evolved into a deep love for clean code, innovative problem-solving, and continuous learning.",
    experience_title: "Experience",
    experience_description: "My professional journey spans across innovative startups and established companies, where I've honed my skills in full-stack development, led cross-functional teams, and delivered scalable solutions that drive business growth.",
    projects_title: "Featured Projects",
    education_title: "Education",
    professional_title: "Professional Experience",
    instagram_url: "https://instagram.com/pratamajiwatmika",
    facebook_url: "https://facebook.com/pratamajiwatmika",
    twitter_url: "https://twitter.com/pratamajiwatmika",
    github_url: "https://github.com/pratamajiwatmika",
    linkedin_url: "https://linkedin.com/in/pratamajiwatmika"
};

async function render(config) {
    const elements = {
        'typing-text': (el, val) => el.textContent = val,
        'execute-btn': (el, val) => el.textContent = val,
        'about-title': (el, val) => el.innerHTML = `<span class="prompt-symbol">></span> ${val}`,
        'about-subtitle': (el, val) => el.innerHTML = `<span class="prompt-symbol">></span> ${val}`,
        'about-description': (el, val) => el.textContent = val,
        'experience-title': (el, val) => el.innerHTML = `<span class="prompt-symbol">></span> ${val}`,
        'experience-description': (el, val) => el.textContent = val,
        'projects-title': (el, val) => el.innerHTML = `<span class="prompt-symbol">></span> ${val}`,
        'education-title': (el, val) => el.textContent = val,
        'professional-title': (el, val) => el.textContent = val,
        'instagram-link': (el, val) => el.href = val,
        'facebook-link': (el, val) => el.href = val,
        'twitter-link': (el, val) => el.href = val,
        'github-link': (el, val) => el.href = val,
        'linkedin-link': (el, val) => el.href = val
    };

    const configMap = {
        'typing-text': 'typing_text',
        'execute-btn': 'button_text',
        'about-title': 'about_title',
        'about-subtitle': 'about_subtitle',
        'about-description': 'about_description',
        'experience-title': 'experience_title',
        'experience-description': 'experience_description',
        'projects-title': 'projects_title',
        'education-title': 'education_title',
        'professional-title': 'professional_title',
        'instagram-link': 'instagram_url',
        'facebook-link': 'facebook_url',
        'twitter-link': 'twitter_url',
        'github-link': 'github_url',
        'linkedin-link': 'linkedin_url'
    };

    Object.keys(elements).forEach(id => {
        const el = document.getElementById(id);
        const configKey = configMap[id];
        if (el && configKey) {
            elements[id](el, config[configKey] || defaultConfig[configKey]);
        }
    });
}

// Navbar functionality
// function initNavbar() {
//     const navbar = document.getElementById('navbar');
//     const navToggle = document.getElementById('nav-toggle');
//     const navMenu = document.getElementById('nav-menu');
//     const navLinks = document.querySelectorAll('.nav-link');

//     // Mobile menu toggle
//     navToggle.addEventListener('click', () => {
//         navToggle.classList.toggle('active');
//         navMenu.classList.toggle('active');
//     });

//     // Close mobile menu when clicking on a link
//     navLinks.forEach(link => {
//         link.addEventListener('click', () => {
//             navToggle.classList.remove('active');
//             navMenu.classList.remove('active');
//         });
//     });

//     // Smooth scrolling and active link management
//     // navLinks.forEach(link => {
//     //     link.addEventListener('click', (e) => {
//     //         e.preventDefault();
//     //         const targetId = link.getAttribute('href').substring(1);
//     //         const targetSection = document.getElementById(targetId);

//     //         if (targetSection) {
//     //             const offsetTop = targetSection.offsetTop - 80;
//     //             window.scrollTo({
//     //                 top: offsetTop,
//     //                 behavior: 'smooth'
//     //             });
//     //         }

//     //         // Update active link
//     //         navLinks.forEach(l => l.classList.remove('active'));
//     //         link.classList.add('active');
//     //     });
//     // });

//     // Scroll handling is now optimized and handled in DOMContentLoaded
// }

/**
 * Menggunakan Event Delegation untuk menangani Navbar.
 * Ini memastikan navbar tetap berfungsi bahkan setelah
 * Livewire ('wire:navigate') memuat ulang bagian DOM.
 */
document.addEventListener('click', function (event) {

    // 1. Cek apakah yang diklik adalah tombol toggle (atau salah satu <span> di dalamnya)
    const navToggle = event.target.closest('#nav-toggle');
    if (navToggle) {
        // Ambil elemen menu saat ini
        const navMenu = document.getElementById('nav-menu');

        // Toggle kelas 'active' pada tombol dan menu
        navToggle.classList.toggle('active');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }

        // Hentikan eksekusi agar tidak lanjut ke pengecekan link
        return;
    }

    // 2. Cek apakah yang diklik adalah link di dalam menu
    // Kita hanya peduli pada link di dalam menu mobile yang perlu ditutup
    const navLink = event.target.closest('#nav-menu .nav-link');
    if (navLink) {
        // Ambil tombol toggle dan menu saat ini
        const currentNavToggle = document.getElementById('nav-toggle');
        const currentNavMenu = document.getElementById('nav-menu');

        // Selalu hapus kelas 'active' (untuk menutup menu)
        if (currentNavToggle) {
            currentNavToggle.classList.remove('active');
        }
        if (currentNavMenu) {
            currentNavMenu.classList.remove('active');
        }
    }
});

function executeAction() {
    const btn = document.getElementById('execute-btn');
    const original = btn.textContent;

    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = '';
        btn.textContent = '> EXECUTED_SUCCESSFULLY ✓';
        btn.style.background = '#28a745';
        setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '#000000';
        }, 1500);
    }, 150);
}

// Gallery data
// const galleryData = [{
//     id: 1,
//     title: "Modern Dashboard UI",
//     description: "Clean and intuitive dashboard interface design with data visualization components and responsive layout.",
//     tags: ["Figma", "UI Design", "Dashboard", "Data Viz"],
//     category: "ui",
//     image: "dashboard-ui",
//     images: [{
//         title: "Main Dashboard",
//         label: "DASH"
//     },
//     {
//         title: "Analytics View",
//         label: "STATS"
//     },
//     {
//         title: "Settings Panel",
//         label: "CONFIG"
//     },
//     {
//         title: "Mobile View",
//         label: "MOBILE"
//     }
//     ]
// },
// {
//     id: 2,
//     title: "Brand Identity Design",
//     description: "Complete brand identity system including logo design, color palette, typography, and brand guidelines.",
//     tags: ["Branding", "Logo Design", "Identity", "Guidelines"],
//     category: "branding",
//     image: "brand-identity",
//     images: [{
//         title: "Logo Variations",
//         label: "LOGO"
//     },
//     {
//         title: "Color System",
//         label: "COLORS"
//     },
//     {
//         title: "Typography",
//         label: "FONTS"
//     },
//     {
//         title: "Applications",
//         label: "USAGE"
//     }
//     ]
// },
// {
//     id: 3,
//     title: "Mobile App Interface",
//     description: "User-friendly mobile application interface with smooth animations and intuitive navigation patterns.",
//     tags: ["Mobile UI", "App Design", "UX", "Prototyping"],
//     category: "ui",
//     image: "mobile-app",
//     images: [{
//         title: "Onboarding",
//         label: "INTRO"
//     },
//     {
//         title: "Main Interface",
//         label: "HOME"
//     },
//     {
//         title: "Navigation",
//         label: "NAV"
//     },
//     {
//         title: "Profile Screen",
//         label: "USER"
//     }
//     ]
// },
// {
//     id: 4,
//     title: "Digital Illustrations",
//     description: "Creative digital artwork and illustrations showcasing artistic skills and visual storytelling abilities.",
//     tags: ["Digital Art", "Illustration", "Creative", "Visual"],
//     category: "illustration",
//     image: "illustrations",
//     images: [{
//         title: "Character Design",
//         label: "CHAR"
//     },
//     {
//         title: "Landscape Art",
//         label: "SCENE"
//     },
//     {
//         title: "Icon Set",
//         label: "ICONS"
//     },
//     {
//         title: "Abstract Art",
//         label: "ART"
//     }
//     ]
// },
// {
//     id: 5,
//     title: "Product Photography",
//     description: "Professional product photography with creative lighting and composition for e-commerce and marketing.",
//     tags: ["Photography", "Product", "Commercial", "Studio"],
//     category: "photography",
//     image: "product-photos",
//     images: [{
//         title: "Tech Products",
//         label: "TECH"
//     },
//     {
//         title: "Fashion Items",
//         label: "STYLE"
//     },
//     {
//         title: "Food & Beverage",
//         label: "FOOD"
//     },
//     {
//         title: "Lifestyle",
//         label: "LIFE"
//     }
//     ]
// },
// {
//     id: 6,
//     title: "E-commerce Website UI",
//     description: "Modern e-commerce website design with focus on user experience and conversion optimization.",
//     tags: ["Web Design", "E-commerce", "UX", "Conversion"],
//     category: "ui",
//     image: "ecommerce-ui",
//     images: [{
//         title: "Homepage",
//         label: "HOME"
//     },
//     {
//         title: "Product Pages",
//         label: "PRODUCT"
//     },
//     {
//         title: "Checkout Flow",
//         label: "CART"
//     },
//     {
//         title: "User Account",
//         label: "ACCOUNT"
//     }
//     ]
// },
// {
//     id: 7,
//     title: "Corporate Branding",
//     description: "Professional corporate branding package including business cards, letterheads, and marketing materials.",
//     tags: ["Corporate", "Business", "Stationery", "Marketing"],
//     category: "branding",
//     image: "corporate-brand",
//     images: [{
//         title: "Business Cards",
//         label: "CARDS"
//     },
//     {
//         title: "Letterhead",
//         label: "LETTER"
//     },
//     {
//         title: "Brochures",
//         label: "PRINT"
//     },
//     {
//         title: "Digital Assets",
//         label: "DIGITAL"
//     }
//     ]
// },
// {
//     id: 8,
//     title: "Icon Design System",
//     description: "Comprehensive icon system with consistent style and multiple variations for digital applications.",
//     tags: ["Icons", "System Design", "UI Elements", "Consistency"],
//     category: "illustration",
//     image: "icon-system",
//     images: [{
//         title: "Basic Icons",
//         label: "BASIC"
//     },
//     {
//         title: "Navigation",
//         label: "NAV"
//     },
//     {
//         title: "Actions",
//         label: "ACTION"
//     },
//     {
//         title: "Categories",
//         label: "CATS"
//     }
//     ]
// },
// {
//     id: 9,
//     title: "Portrait Photography",
//     description: "Creative portrait photography sessions with natural lighting and artistic composition techniques.",
//     tags: ["Portrait", "People", "Natural Light", "Creative"],
//     category: "photography",
//     image: "portraits",
//     images: [{
//         title: "Professional",
//         label: "PROF"
//     },
//     {
//         title: "Creative",
//         label: "ART"
//     },
//     {
//         title: "Environmental",
//         label: "ENV"
//     },
//     {
//         title: "Studio",
//         label: "STUDIO"
//     }
//     ]
// },
// {
//     id: 10,
//     title: "Landing Page Design",
//     description: "High-converting landing page designs with clear call-to-actions and persuasive visual hierarchy.",
//     tags: ["Landing Page", "Conversion", "Marketing", "CTA"],
//     category: "ui",
//     image: "landing-page",
//     images: [{
//         title: "Hero Section",
//         label: "HERO"
//     },
//     {
//         title: "Features",
//         label: "FEAT"
//     },
//     {
//         title: "Testimonials",
//         label: "TEST"
//     },
//     {
//         title: "Call to Action",
//         label: "CTA"
//     }
//     ]
// },
// {
//     id: 11,
//     title: "Package Design",
//     description: "Creative packaging design for consumer products with focus on shelf appeal and brand recognition.",
//     tags: ["Package Design", "Product", "Branding", "Retail"],
//     category: "branding",
//     image: "packaging",
//     images: [{
//         title: "Box Design",
//         label: "BOX"
//     },
//     {
//         title: "Label Design",
//         label: "LABEL"
//     },
//     {
//         title: "Mockups",
//         label: "MOCK"
//     },
//     {
//         title: "Variations",
//         label: "VARS"
//     }
//     ]
// },
// {
//     id: 12,
//     title: "Abstract Digital Art",
//     description: "Experimental digital artwork exploring color, form, and composition in abstract visual expressions.",
//     tags: ["Abstract", "Digital Art", "Experimental", "Color"],
//     category: "illustration",
//     image: "abstract-art",
//     images: [{
//         title: "Color Studies",
//         label: "COLOR"
//     },
//     {
//         title: "Form Exploration",
//         label: "FORM"
//     },
//     {
//         title: "Texture Work",
//         label: "TEX"
//     },
//     {
//         title: "Compositions",
//         label: "COMP"
//     }
//     ]
// }
// ];

// // Projects data and functionality
// const projectsData = [{
//     id: 1,
//     title: "E-Commerce Platform",
//     description: "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
//     tags: ["React", "Node.js", "MongoDB", "Stripe"],
//     category: "web",
//     image: "ecommerce",
//     images: [{
//         title: "Homepage",
//         label: "HOME"
//     },
//     {
//         title: "Product Catalog",
//         label: "CATALOG"
//     },
//     {
//         title: "Shopping Cart",
//         label: "CART"
//     },
//     {
//         title: "Admin Dashboard",
//         label: "ADMIN"
//     }
//     ]
// },
// {
//     id: 2,
//     title: "Task Management App",
//     description: "Cross-platform mobile app for team collaboration with real-time sync, push notifications, and offline support.",
//     tags: ["React Native", "Firebase", "Redux"],
//     category: "mobile",
//     image: "taskapp",
//     images: [{
//         title: "Task List",
//         label: "TASKS"
//     },
//     {
//         title: "Project Board",
//         label: "BOARD"
//     },
//     {
//         title: "Team Chat",
//         label: "CHAT"
//     },
//     {
//         title: "Analytics",
//         label: "STATS"
//     }
//     ]
// },
// {
//     id: 3,
//     title: "Weather API Service",
//     description: "RESTful API providing real-time weather data with caching, rate limiting, and comprehensive documentation.",
//     tags: ["Python", "FastAPI", "Redis", "PostgreSQL"],
//     category: "api",
//     image: "weatherapi",
//     images: [{
//         title: "API Documentation",
//         label: "DOCS"
//     },
//     {
//         title: "Response Format",
//         label: "JSON"
//     },
//     {
//         title: "Rate Limiting",
//         label: "LIMITS"
//     },
//     {
//         title: "Dashboard",
//         label: "DASH"
//     }
//     ]
// },
// {
//     id: 4,
//     title: "Portfolio Website",
//     description: "Responsive portfolio website with modern design, smooth animations, and optimized performance.",
//     tags: ["HTML", "CSS", "JavaScript", "GSAP"],
//     category: "design",
//     image: "portfolio",
//     images: [{
//         title: "Hero Section",
//         label: "HERO"
//     },
//     {
//         title: "Projects Gallery",
//         label: "WORK"
//     },
//     {
//         title: "About Page",
//         label: "ABOUT"
//     },
//     {
//         title: "Contact Form",
//         label: "CONTACT"
//     }
//     ]
// },
// {
//     id: 5,
//     title: "Social Media Dashboard",
//     description: "Analytics dashboard for social media management with data visualization and automated reporting.",
//     tags: ["Vue.js", "D3.js", "Express", "MySQL"],
//     category: "web",
//     image: "dashboard",
//     images: [{
//         title: "Overview",
//         label: "OVERVIEW"
//     },
//     {
//         title: "Analytics",
//         label: "CHARTS"
//     },
//     {
//         title: "Post Scheduler",
//         label: "SCHEDULE"
//     },
//     {
//         title: "Reports",
//         label: "REPORTS"
//     }
//     ]
// },
// {
//     id: 6,
//     title: "Fitness Tracker",
//     description: "Mobile fitness app with workout tracking, progress analytics, and social features for motivation.",
//     tags: ["Flutter", "Dart", "SQLite"],
//     category: "mobile",
//     image: "fitness",
//     images: [{
//         title: "Workout Log",
//         label: "WORKOUT"
//     },
//     {
//         title: "Progress Charts",
//         label: "PROGRESS"
//     },
//     {
//         title: "Social Feed",
//         label: "SOCIAL"
//     },
//     {
//         title: "Profile",
//         label: "PROFILE"
//     }
//     ]
// },
// {
//     id: 7,
//     title: "Chat Application",
//     description: "Real-time messaging app with end-to-end encryption, file sharing, and group chat functionality.",
//     tags: ["Socket.io", "React", "Node.js", "MongoDB"],
//     category: "web",
//     image: "chat",
//     images: [{
//         title: "Chat Interface",
//         label: "CHAT"
//     },
//     {
//         title: "Group Rooms",
//         label: "GROUPS"
//     },
//     {
//         title: "File Sharing",
//         label: "FILES"
//     },
//     {
//         title: "Settings",
//         label: "CONFIG"
//     }
//     ]
// },
// {
//     id: 8,
//     title: "Food Delivery App",
//     description: "Mobile app for food ordering with GPS tracking, payment integration, and restaurant management.",
//     tags: ["React Native", "Stripe", "Google Maps"],
//     category: "mobile",
//     image: "food",
//     images: [{
//         title: "Restaurant List",
//         label: "MENU"
//     },
//     {
//         title: "Order Cart",
//         label: "CART"
//     },
//     {
//         title: "Live Tracking",
//         label: "TRACK"
//     },
//     {
//         title: "Payment",
//         label: "PAY"
//     }
//     ]
// },
// {
//     id: 9,
//     title: "Analytics API",
//     description: "Comprehensive analytics API with real-time data processing, custom dashboards, and reporting tools.",
//     tags: ["Node.js", "GraphQL", "Redis", "PostgreSQL"],
//     category: "api",
//     image: "analytics",
//     images: [{
//         title: "API Endpoints",
//         label: "API"
//     },
//     {
//         title: "Data Models",
//         label: "SCHEMA"
//     },
//     {
//         title: "Query Builder",
//         label: "QUERY"
//     },
//     {
//         title: "Performance",
//         label: "PERF"
//     }
//     ]
// },
// {
//     id: 10,
//     title: "Brand Identity System",
//     description: "Complete brand identity design with logo, color palette, typography, and brand guidelines.",
//     tags: ["Figma", "Adobe Creative Suite", "Branding"],
//     category: "design",
//     image: "branding",
//     images: [{
//         title: "Logo Design",
//         label: "LOGO"
//     },
//     {
//         title: "Color Palette",
//         label: "COLORS"
//     },
//     {
//         title: "Typography",
//         label: "FONTS"
//     },
//     {
//         title: "Brand Guide",
//         label: "GUIDE"
//     }
//     ]
// },
// {
//     id: 11,
//     title: "Learning Management System",
//     description: "Educational platform with course management, progress tracking, and interactive learning modules.",
//     tags: ["React", "Express", "MongoDB", "WebRTC"],
//     category: "web",
//     image: "lms",
//     images: [{
//         title: "Course Library",
//         label: "COURSES"
//     },
//     {
//         title: "Video Player",
//         label: "VIDEO"
//     },
//     {
//         title: "Progress Track",
//         label: "PROGRESS"
//     },
//     {
//         title: "Certificates",
//         label: "CERTS"
//     }
//     ]
// },
// {
//     id: 12,
//     title: "Expense Tracker",
//     description: "Personal finance app with budget planning, expense categorization, and financial insights.",
//     tags: ["Flutter", "Firebase", "Charts"],
//     category: "mobile",
//     image: "expense",
//     images: [{
//         title: "Expense List",
//         label: "EXPENSES"
//     },
//     {
//         title: "Budget Plan",
//         label: "BUDGET"
//     },
//     {
//         title: "Analytics",
//         label: "CHARTS"
//     },
//     {
//         title: "Categories",
//         label: "TAGS"
//     }
//     ]
// }
// ];

let currentFilter = 'all';
let searchQuery = '';
let currentPage = 1;
const projectsPerPage = 6;

// Gallery variables
let galleryCurrentFilter = 'all';
let gallerySearchQuery = '';
let galleryCurrentPage = 1;
const galleryItemsPerPage = 6;

function createProjectCard(project) {
    return `
                <div class="project-card" data-category="${project.category}">
                    <div class="project-image"></div>
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                        </div>
                        <button class="project-button" onclick="viewProjectDetails(${project.id})">
                            VIEW_DETAILS()
                        </button>
                    </div>
                </div>
            `;
}

// function filterProjects() {
//     let filteredProjects = projectsData;

//     // Apply category filter
//     if (currentFilter !== 'all') {
//         filteredProjects = filteredProjects.filter(project => project.category === currentFilter);
//     }

//     // Apply search filter
//     if (searchQuery) {
//         filteredProjects = filteredProjects.filter(project =>
//             project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
//         );
//     }

//     return filteredProjects;
// }

// function renderProjects() {
//     const projectsGrid = document.getElementById('projects-grid');
//     const filteredProjects = filterProjects();
//     const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
//     const startIndex = (currentPage - 1) * projectsPerPage;
//     const endIndex = startIndex + projectsPerPage;
//     const projectsToShow = filteredProjects.slice(startIndex, endIndex);

//     // Check if no data found
//     if (filteredProjects.length === 0) {
//         projectsGrid.innerHTML = `
//                     <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
//                         <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;">🔍</div>
//                         <h3 style="font-size: 1.5rem; color: #000000; margin-bottom: 1rem; font-family: 'Source Code Pro', monospace;">
//                             > DATA_NOT_FOUND
//                         </h3>
//                         <p style="color: #666666; font-size: 1.1rem; margin-bottom: 2rem;">
//                             ${searchQuery ? `Tidak ada proyek yang ditemukan untuk pencarian "<strong>${searchQuery}</strong>"` : 'Tidak ada proyek yang ditemukan untuk kategori ini'}
//                         </p>
//                         <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
//                             ${searchQuery ? `
//                                 <button onclick="clearProjectSearch()" style="background: #000000; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; font-family: 'Source Code Pro', monospace; cursor: pointer; transition: all 0.3s ease;">
//                                     > CLEAR_SEARCH()
//                                 </button>
//                             ` : ''}
//                             <button onclick="resetProjectFilters()" style="background: transparent; color: #000000; border: 2px solid #000000; padding: 0.8rem 1.5rem; border-radius: 8px; font-family: 'Source Code Pro', monospace; cursor: pointer; transition: all 0.3s ease;">
//                                 > SHOW_ALL_PROJECTS()
//                             </button>
//                         </div>
//                     </div>
//                 `;
//     } else {
//         projectsGrid.innerHTML = projectsToShow.map(createProjectCard).join('');

//         // Animate cards
//         const cards = projectsGrid.querySelectorAll('.project-card');
//         cards.forEach((card, index) => {
//             card.style.animationDelay = `${index * 0.1}s`;
//         });
//     }

//     // Render pagination
//     renderPagination(totalPages, filteredProjects.length);
// }

// function renderPagination(totalPages, totalProjects) {
//     const paginationControls = document.getElementById('pagination-controls');

//     if (totalPages <= 1) {
//         paginationControls.innerHTML = '';
//         return;
//     }

//     let paginationHTML = '';

//     // Previous button
//     paginationHTML += `
//                 <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
//                         onclick="changePage(${currentPage - 1})" 
//                         ${currentPage === 1 ? 'disabled' : ''}>
//                     ‹
//                 </button>
//             `;

//     // Page numbers
//     const maxVisiblePages = 5;
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     // Adjust start page if we're near the end
//     if (endPage - startPage < maxVisiblePages - 1) {
//         startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     // First page and ellipsis
//     if (startPage > 1) {
//         paginationHTML += `
//                     <button class="pagination-btn" onclick="changePage(1)">1</button>
//                 `;
//         if (startPage > 2) {
//             paginationHTML += `<span class="pagination-ellipsis">…</span>`;
//         }
//     }

//     // Page numbers
//     for (let i = startPage; i <= endPage; i++) {
//         paginationHTML += `
//                     <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
//                             onclick="changePage(${i})">
//                         ${i}
//                     </button>
//                 `;
//     }

//     // Last page and ellipsis
//     if (endPage < totalPages) {
//         if (endPage < totalPages - 1) {
//             paginationHTML += `<span class="pagination-ellipsis">…</span>`;
//         }
//         paginationHTML += `
//                     <button class="pagination-btn" onclick="changePage(${totalPages})">${totalPages}</button>
//                 `;
//     }

//     // Next button
//     paginationHTML += `
//                 <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
//                         onclick="changePage(${currentPage + 1})" 
//                         ${currentPage === totalPages ? 'disabled' : ''}>
//                     ›
//                 </button>
//             `;

//     paginationControls.innerHTML = paginationHTML;

//     // Add pagination info
//     const existingInfo = document.querySelector('.pagination-info');
//     if (existingInfo) {
//         existingInfo.remove();
//     }

//     const paginationInfo = document.createElement('div');
//     paginationInfo.className = 'pagination-info';
//     paginationInfo.textContent =
//         `Showing ${(currentPage - 1) * projectsPerPage + 1}-${Math.min(currentPage * projectsPerPage, totalProjects)} of ${totalProjects} projects`;
//     document.querySelector('.projects-pagination').appendChild(paginationInfo);
// }

// function changePage(page) {
//     const filteredProjects = filterProjects();
//     const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

//     if (page < 1 || page > totalPages) return;

//     currentPage = page;
//     renderProjects();

//     // Scroll to projects section
//     document.getElementById('projects-featured').scrollIntoView({
//         behavior: 'smooth',
//         block: 'start'
//     });
// }

function filterGallery() {
    let filteredGallery = galleryData;

    // Apply category filter
    if (galleryCurrentFilter !== 'all') {
        filteredGallery = filteredGallery.filter(item => item.category === galleryCurrentFilter);
    }

    // Apply search filter
    if (gallerySearchQuery) {
        filteredGallery = filteredGallery.filter(item =>
            item.title.toLowerCase().includes(gallerySearchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(gallerySearchQuery.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(gallerySearchQuery.toLowerCase()))
        );
    }

    return filteredGallery;
}

function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    const filteredGallery = filterGallery();
    const totalPages = Math.ceil(filteredGallery.length / galleryItemsPerPage);
    const startIndex = (galleryCurrentPage - 1) * galleryItemsPerPage;
    const endIndex = startIndex + galleryItemsPerPage;
    const galleryToShow = filteredGallery.slice(startIndex, endIndex);

    // Check if no data found
    if (filteredGallery.length === 0) {
        galleryGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;">🎨</div>
                        <h3 style="font-size: 1.5rem; color: #000000; margin-bottom: 1rem; font-family: 'Source Code Pro', monospace;">
                            > GALLERY_EMPTY
                        </h3>
                        <p style="color: #666666; font-size: 1.1rem; margin-bottom: 2rem;">
                            ${gallerySearchQuery ? `Tidak ada item gallery yang ditemukan untuk pencarian "<strong>${gallerySearchQuery}</strong>"` : 'Tidak ada item gallery yang ditemukan untuk kategori ini'}
                        </p>
                        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                            ${gallerySearchQuery ? `
                                <button onclick="clearGallerySearch()" style="background: #000000; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; font-family: 'Source Code Pro', monospace; cursor: pointer; transition: all 0.3s ease;">
                                    > CLEAR_SEARCH()
                                </button>
                            ` : ''}
                            <button onclick="resetGalleryFilters()" style="background: transparent; color: #000000; border: 2px solid #000000; padding: 0.8rem 1.5rem; border-radius: 8px; font-family: 'Source Code Pro', monospace; cursor: pointer; transition: all 0.3s ease;">
                                > SHOW_ALL_GALLERY()
                            </button>
                        </div>
                    </div>
                `;
    } else {
        galleryGrid.innerHTML = galleryToShow.map(createGalleryCard).join('');

        // Animate cards
        const cards = galleryGrid.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Render pagination
    renderGalleryPagination(totalPages, filteredGallery.length);
}

function createGalleryCard(item) {
    return `
                <div class="project-card" data-category="${item.category}">
                    <div class="project-image"></div>
                    <div class="project-content">
                        <h3 class="project-title">${item.title}</h3>
                        <p class="project-description">${item.description}</p>
                        <div class="project-tags">
                            ${item.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                        </div>
                        <button class="project-button" onclick="viewGalleryDetails(${item.id})">
                            VIEW_DETAILS()
                        </button>
                    </div>
                </div>
            `;
}

function renderGalleryPagination(totalPages, totalItems) {
    const paginationControls = document.getElementById('gallery-pagination-controls');

    if (totalPages <= 1) {
        paginationControls.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
                <button class="pagination-btn ${galleryCurrentPage === 1 ? 'disabled' : ''}" 
                        onclick="changeGalleryPage(${galleryCurrentPage - 1})" 
                        ${galleryCurrentPage === 1 ? 'disabled' : ''}>
                    ‹
                </button>
            `;

    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, galleryCurrentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page and ellipsis
    if (startPage > 1) {
        paginationHTML += `
                    <button class="pagination-btn" onclick="changeGalleryPage(1)">1</button>
                `;
        if (startPage > 2) {
            paginationHTML += `<span class="pagination-ellipsis">…</span>`;
        }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
                    <button class="pagination-btn ${i === galleryCurrentPage ? 'active' : ''}" 
                            onclick="changeGalleryPage(${i})">
                        ${i}
                    </button>
                `;
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="pagination-ellipsis">…</span>`;
        }
        paginationHTML += `
                    <button class="pagination-btn" onclick="changeGalleryPage(${totalPages})">${totalPages}</button>
                `;
    }

    // Next button
    paginationHTML += `
                <button class="pagination-btn ${galleryCurrentPage === totalPages ? 'disabled' : ''}" 
                        onclick="changeGalleryPage(${galleryCurrentPage + 1})" 
                        ${galleryCurrentPage === totalPages ? 'disabled' : ''}>
                    ›
                </button>
            `;

    paginationControls.innerHTML = paginationHTML;

    // Add pagination info
    const existingInfo = document.querySelector('#gallery .pagination-info');
    if (existingInfo) {
        existingInfo.remove();
    }

    const paginationInfo = document.createElement('div');
    paginationInfo.className = 'pagination-info';
    paginationInfo.textContent =
        `Showing ${(galleryCurrentPage - 1) * galleryItemsPerPage + 1}-${Math.min(galleryCurrentPage * galleryItemsPerPage, totalItems)} of ${totalItems} items`;
    document.querySelector('#gallery .projects-pagination').appendChild(paginationInfo);
}

function changeGalleryPage(page) {
    const filteredGallery = filterGallery();
    const totalPages = Math.ceil(filteredGallery.length / galleryItemsPerPage);

    if (page < 1 || page > totalPages) return;

    galleryCurrentPage = page;
    renderGallery();

    // Scroll to gallery section
    document.getElementById('gallery').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function viewGalleryDetails(itemId) {
    const item = galleryData.find(i => i.id === itemId);
    if (!item) return;

    // Update content
    updateProjectDetailContent(item);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Show with animation
    setTimeout(() => {
        document.getElementById('project-detail-overlay').classList.add('active');
        document.getElementById('project-detail-page').classList.add('active');

        // Add keyboard listener for carousel navigation
        document.addEventListener('keydown', handleCarouselKeyboard);

        // Initialize mobile swipe gestures
        initMobileSwipeGestures();

        // Show mobile indicators after a delay
        setTimeout(() => {
            showMobileIndicators();
        }, 1000);
    }, 10);
}

function initGallery() {
    // Filter buttons for gallery
    const gallerySection = document.getElementById('gallery');
    const galleryFilterBtns = gallerySection.querySelectorAll('.filter-btn');
    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            galleryCurrentFilter = btn.dataset.filter;
            galleryCurrentPage = 1; // Reset to first page
            renderGallery();
        });
    });

    // Initial render
    renderGallery();
}

function initProjects() {
    // Filter buttons
    const projectsSection = document.getElementById('projects-featured');
    const filterBtns = projectsSection.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            currentPage = 1; // Reset to first page
            renderProjects();
        });
    });

    // Initial render
    // renderProjects();
}

// Project detail page functionality
// function viewProjectDetails(projectId) {
//     const project = projectsData.find(p => p.id === projectId);
//     if (!project) return;

//     // Update content
//     updateProjectDetailContent(project);

//     // Prevent body scroll
//     document.body.style.overflow = 'hidden';

//     // Show with animation
//     setTimeout(() => {
//         document.getElementById('project-detail-overlay').classList.add('active');
//         document.getElementById('project-detail-page').classList.add('active');

//         // Add keyboard listener for carousel navigation
//         document.addEventListener('keydown', handleCarouselKeyboard);

//         // Initialize mobile swipe gestures
//         initMobileSwipeGestures();

//         // Show mobile indicators after a delay
//         setTimeout(() => {
//             showMobileIndicators();
//         }, 1000);
//     }, 10);
// }

function viewProjectDetails(projectId) {
    // 1. Temukan elemen kartu di HTML menggunakan data-id
    const card = document.querySelector(`.project-card[data-id="${projectId}"]`);

    // 2. Jika kartu tidak ditemukan, hentikan fungsi
    if (!card) {
        console.error("Project card not found for ID:", projectId);
        return;
    }

    // 3. Ekstrak semua data dari elemen HTML kartu yang ditemukan
    const project = {
        id: projectId,
        category: card.dataset.category, // Ambil dari data-category
        title: card.querySelector('.project-title').textContent, // Ambil dari teks h3
        description: card.querySelector('.project-description').textContent.trim(), // Ambil dari teks <p>

        // Ambil semua tag dan masukkan ke array
        tags: Array.from(card.querySelectorAll('.project-tag')).map(tagEl => tagEl.textContent),

        // 4. Ambil string JSON dari data-images dan ubah menjadi array/objek
        // Jika data-images tidak ada, buat array default agar tidak error
        images: JSON.parse(card.dataset.images || '[]')
    };

    // 5. Panggil fungsi updateProjectDetailContent dengan objek project baru
    // Fungsi updateProjectDetailContent tidak perlu diubah sama sekali!
    updateProjectDetailContent(project);

    // --- Sisa logika Anda untuk menampilkan modal (sudah benar) ---
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.getElementById('project-detail-overlay').classList.add('active');
        document.getElementById('project-detail-page').classList.add('active');
        document.addEventListener('keydown', handleCarouselKeyboard);
        initMobileSwipeGestures();
        setTimeout(() => {
            showMobileIndicators();
        }, 1000);
    }, 10);
}

function closeProjectDetail() {
    // Restore body scroll
    document.body.style.overflow = '';

    // Hide with animation
    document.getElementById('project-detail-overlay').classList.remove('active');
    document.getElementById('project-detail-page').classList.remove('active');

    // Remove keyboard listener
    document.removeEventListener('keydown', handleCarouselKeyboard);

    // Remove mobile swipe listeners
    removeMobileSwipeGestures();

    // Hide mobile indicators
    hideMobileIndicators();
}

// Mobile swipe gesture functionality
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let swipeThreshold = 100;
let swipeVelocityThreshold = 0.3;

function initMobileSwipeGestures() {
    const detailPage = document.getElementById('project-detail-page');

    if (detailPage) {
        detailPage.addEventListener('touchstart', handleTouchStart, {
            passive: true
        });
        detailPage.addEventListener('touchmove', handleTouchMove, {
            passive: true
        });
        detailPage.addEventListener('touchend', handleTouchEnd, {
            passive: true
        });
    }
}

function removeMobileSwipeGestures() {
    const detailPage = document.getElementById('project-detail-page');

    if (detailPage) {
        detailPage.removeEventListener('touchstart', handleTouchStart);
        detailPage.removeEventListener('touchmove', handleTouchMove);
        detailPage.removeEventListener('touchend', handleTouchEnd);
    }
}

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
}

function handleTouchEnd(e) {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check if it's a horizontal swipe and not a vertical scroll
    if (absDeltaX > absDeltaY && absDeltaX > swipeThreshold) {
        // Swipe right to close (like going back)
        if (deltaX > 0) {
            closeProjectDetail();
        }
    }
}

function showMobileIndicators() {
    const swipeIndicator = document.getElementById('mobile-swipe-indicator');

    if (window.innerWidth <= 768) {
        if (swipeIndicator) {
            swipeIndicator.style.display = 'flex';
            // Add visible class after a small delay for smooth animation
            setTimeout(() => {
                swipeIndicator.classList.add('visible');
            }, 100);

            // Hide swipe indicator after 3 seconds
            setTimeout(() => {
                if (swipeIndicator) {
                    swipeIndicator.classList.remove('visible');
                    setTimeout(() => {
                        if (swipeIndicator) {
                            swipeIndicator.style.display = 'none';
                        }
                    }, 300);
                }
            }, 3000);
        }
    }
}

function hideMobileIndicators() {
    const swipeIndicator = document.getElementById('mobile-swipe-indicator');

    if (swipeIndicator) {
        swipeIndicator.classList.remove('visible');
        setTimeout(() => {
            swipeIndicator.style.display = 'none';
        }, 300);
    }
}

function handleCarouselKeyboard(e) {
    if (!document.getElementById('project-detail-page').classList.contains('active')) return;

    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            prevSlide();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextSlide();
            break;
        case 'Escape':
            e.preventDefault();
            closeProjectDetail();
            break;
    }
}

// Carousel functionality
let currentSlide = 0;
let totalSlides = 0;

function createCarousel(project) {
    const images = project.images || [{
        title: project.title,
        label: project.category.toUpperCase()
    }];
    totalSlides = images.length;
    currentSlide = 0;

    return `
                <div class="project-carousel">
                    <div class="carousel-container">
                        <div class="carousel-track" id="carousel-track">
                            ${images.map((img, index) => `
                                <div class="carousel-slide">
                                    { ${img.label} }
                                </div>
                            `).join('')}
                        </div>
                        
                        ${totalSlides > 1 ? `
                            <button class="carousel-nav prev" onclick="prevSlide()">‹</button>
                            <button class="carousel-nav next" onclick="nextSlide()">›</button>
                            
                            <div class="carousel-indicators">
                                ${images.map((_, index) => `
                                    <button class="carousel-indicator ${index === 0 ? 'active' : ''}" 
                                            onclick="goToSlide(${index})"></button>
                                `).join('')}
                            </div>
                            
                            <div class="carousel-counter">
                                <span id="carousel-current">1</span> / ${totalSlides}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
}

function updateCarousel() {
    const track = document.getElementById('carousel-track');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const counter = document.getElementById('carousel-current');

    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });

    if (counter) {
        counter.textContent = currentSlide + 1;
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateProjectDetailContent(project) {
    document.getElementById('project-detail-title').textContent = project.title;

    const content = document.getElementById('project-detail-content');
    content.innerHTML = `
                ${createCarousel(project)}
                
                <div class="project-detail-meta">
                    <div class="project-meta-item">
                        <div class="project-meta-label">CATEGORY</div>
                        <div class="project-meta-value">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</div>
                    </div>
                    <div class="project-meta-item">
                        <div class="project-meta-label">STATUS</div>
                        <div class="project-meta-value">Completed</div>
                    </div>
                    <div class="project-meta-item">
                        <div class="project-meta-label">YEAR</div>
                        <div class="project-meta-value">2024</div>
                    </div>
                </div>

                <div class="project-detail-description">
                    ${project.description} This project showcases modern development practices, 
                    clean architecture, and user-centered design principles. Built with scalability 
                    and performance in mind, it demonstrates expertise in full-stack development 
                    and attention to detail in both functionality and user experience.
                </div>

                <div class="project-section-title">> TECHNOLOGIES_USED</div>
                <div class="project-tech-grid">
                    ${project.tags.map(tag => `<span class="project-tech-tag">${tag}</span>`).join('')}
                </div>

                <div class="project-section-title">> KEY_FEATURES</div>
                <div style="margin-bottom: 3rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #f1f3f4;">
                        <div style="width: 20px; height: 20px; background: #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; font-weight: bold;">✓</div>
                        <div>Responsive design that works on all devices</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #f1f3f4;">
                        <div style="width: 20px; height: 20px; background: #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; font-weight: bold;">✓</div>
                        <div>Modern and intuitive user interface</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #f1f3f4;">
                        <div style="width: 20px; height: 20px; background: #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; font-weight: bold;">✓</div>
                        <div>Optimized performance and fast loading</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem 0;">
                        <div style="width: 20px; height: 20px; background: #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; font-weight: bold;">✓</div>
                        <div>Secure and scalable architecture</div>
                    </div>
                </div>

                <div class="project-actions">
                    <button class="project-action-btn primary" onclick="showDemo('${project.title}')">
                        > VIEW_DEMO()
                    </button>
                    <button class="project-action-btn secondary" onclick="showCode('${project.title}')">
                        > VIEW_CODE()
                    </button>
                </div>
            `;
}

function showDemo(projectTitle) {
    showToast(`> LOADING_DEMO("${projectTitle}")`);
}

function showCode(projectTitle) {
    showToast(`> OPENING_REPOSITORY("${projectTitle}")`);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background: #28a745;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                font-family: 'Source Code Pro', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Menlo', 'Consolas', monospace;
                font-weight: bold;
                box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
                z-index: 10002;
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.3s ease;
            `;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Performance optimizations
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

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('.project-image, .carousel-slide');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Back to Top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // Show/hide button based on scroll position
        const toggleBackToTop = () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        };

        // Add to scroll handler
        window.addEventListener('scroll', toggleBackToTop, {
            passive: true
        });

        // Initial check
        toggleBackToTop();
    }
}

// Optimize scroll performance
const optimizedScrollHandler = throttle(() => {
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    // Update active link based on scroll position
    const sections = ['home', 'projects', 'projects-featured', 'experience', 'gallery'];
    let current = '';

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        }
    });

    if (current) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }
}, 16); // ~60fps

// Optimize search performance
function createOptimizedSearch(inputId, renderFunction) {
    const searchInput = document.getElementById(inputId);
    if (searchInput) {
        const debouncedSearch = debounce((query) => {
            if (inputId === 'project-search') {
                searchQuery = query;
                currentPage = 1;
            } else if (inputId === 'gallery-search') {
                gallerySearchQuery = query;
                galleryCurrentPage = 1;
            }
            renderFunction();
        }, 300);

        searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });
    }
}

// Clear and reset functions
function clearProjectSearch() {
    const searchInput = document.getElementById('project-search');
    if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        currentPage = 1;
        renderProjects();
    }
}

function resetProjectFilters() {
    const searchInput = document.getElementById('project-search');
    const filterBtns = document.querySelectorAll('#projects-featured .filter-btn');

    if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
    }

    filterBtns.forEach(btn => btn.classList.remove('active'));
    filterBtns[0]?.classList.add('active'); // Set "All" as active

    currentFilter = 'all';
    currentPage = 1;
    renderProjects();
}

function clearGallerySearch() {
    const searchInput = document.getElementById('gallery-search');
    if (searchInput) {
        searchInput.value = '';
        gallerySearchQuery = '';
        galleryCurrentPage = 1;
        renderGallery();
    }
}

function resetGalleryFilters() {
    const searchInput = document.getElementById('gallery-search');
    const filterBtns = document.querySelectorAll('#gallery .filter-btn');

    if (searchInput) {
        searchInput.value = '';
        gallerySearchQuery = '';
    }

    filterBtns.forEach(btn => btn.classList.remove('active'));
    filterBtns[0]?.classList.add('active'); // Set "All" as active

    galleryCurrentFilter = 'all';
    galleryCurrentPage = 1;
    renderGallery();
}

// Initialize navbar when page loads
document.addEventListener('DOMContentLoaded', () => {
    // initNavbar();
    // initProjects();
    initGallery();
    initBackToTop();
    lazyLoadImages();

    // Replace scroll event listener with optimized version
    window.removeEventListener('scroll', () => { }); // Remove any existing
    window.addEventListener('scroll', optimizedScrollHandler, {
        passive: true
    });

    // Initialize optimized search
    createOptimizedSearch('project-search', renderProjects);
    createOptimizedSearch('gallery-search', renderGallery);
});

if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        render,
        mapToCapabilities: () => ({
            recolorables: [],
            borderables: [],
            fontEditable: undefined,
            fontSizeable: undefined
        }),
        mapToEditPanelValues: (config) => new Map(Object.keys(defaultConfig).map(key => [key, config[
            key] || defaultConfig[key]]))
    });
}