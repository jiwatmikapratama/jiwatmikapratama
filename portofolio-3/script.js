document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const paginationDots = document.getElementById('paginationDots');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    const backToTopBtn = document.getElementById('backToTopBtn');
    let currentModalData;
    let currentIndex = 0;

    // Modal data for projects and gallery
    const modalData = {
        'project-modal-1': {
            title: 'Ecommerce Platform',
            description: 'A fully functional e-commerce site with a modern design and intuitive user interface. This project involved creating a complete online store from scratch, focusing on user experience, performance, and security. Features include product catalog, shopping cart, checkout process, and user account management.',
            tags: ['Vue.js', 'Node.js', 'Express', 'MongoDB'],
            images: ['image-679a9cfd-d922-4ef8-a532-a5f1e8e2c076.png',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDGvpXfNpuOVOfhzQOHY7ws6n-ItamsoRACvyWDqmDrJ7wrO9nuHmXEj52uUy5MWgwtDzWZcqV5fMZsFX2rmCvKZnIrqcILSxM0XqZdLHKVCUm2AN32Gaii6EB1liRe1WPwD3c9DmIpqLcibr7H-zZzvpctwwj3YgV49qzWJMZjzUOCyjKoBzZl3LmFnq8-e-8vNqqjApQApNYwPz0gnz8lSKVwZgpGBmOhsilLcH0CFciX3_otZ9WaRchXLf14_4yCFk3-AACAUw',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDiHqsD4Sy0UbxGdQco9ORuTcUkrxoyqZphB4L5t89ZJR9VslpX9QP5h6NkVwlAokevyMm46ioo5lUPgy2Qr2iRu1QZzhWjYGuJ1tTp9fgnLfJiBzCmOnHsNks7HGF_jIh7SOL--Ig1uNoVNKLnQJKOUbMDIF8QkGVXZ5j2geLpn1eOKkFpaZgK-q-e7BffKtPM4aa6Cs7FQP9TvKT_M91_WrX6OOuCYovxIbGlfl6NjwaXRYWJj4KVe-Lcpn-PwWYG4vH8f1Tutg'
            ],
        },
        'project-modal-2': {
            title: 'Project Management Tool',
            description: 'A tool to help teams manage tasks, deadlines, and project milestones effectively. Designed with collaboration in mind, this application provides features like task assignment, progress tracking, file sharing, and team communication channels. It aims to streamline workflows and improve productivity.',
            tags: ['React', 'Firebase', 'Tailwind CSS', 'Figma'],
            images: ['image-91899120-d3a7-47b2-bd74-7e88c0356501.png',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDuq7zQvfJvODNLENLc-qecb2TyBMImZnDId2cAAtoAtHy6vmWwIFwBjVUPm66y43plQexh6N7Itzflc_MVS3lAaKpXdFoKVjJDv0mX5DTf7eHNjJ54QRfgj0_RKewg0BHcybH8aQ5qEYiDFwZ1G24oulv_vbkHqDY6D2CaNsKmaT7GD0u8qBQkt0Y7YnxIhSCmjgEYRgmt_jZ7SqWkVEKatB6Bf0cKWY92Qlrm0g09oUzD34waPKS6HghITl0CcLE2Im1adSb-XQ'
            ],
        },
        'project-modal-3': {
            title: 'Personal Blog API',
            description: 'A custom-built, headless RESTful API for a personal blog with CRUD functionality. This backend system allows for easy management of blog posts, categories, and comments. It is designed to be consumed by any front-end framework, offering flexibility and scalability.',
            tags: ['Python', 'Flask', 'PostgreSQL', 'Docker'],
            images: ['image-95855f46-5acb-42ef-a28a-6b47bf504368.png'],
        },
        'gallery-modal-1': {
            title: 'Mountain Sunset',
            description: 'A breathtaking sky during an early morning hike in the alps. The colors were constantly changing, creating a magical atmosphere. This shot was taken at the peak, just as the sun began to rise over the horizon.',
            tags: [],
            images: [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBYzv9XTTd7Uc1h9ox2B_Es-taJrrLIrp2t4ulZq9BpV6HPdSvtnJoHwU3LZpMLPZjs8BeMyTAx1HWq-jTEXA-xoOXcWtrmU06IfqaTe1ri34gcSHEkkI_gyHOxTuGUCbpao9Dt7E_sWodlPdjxec_0Rzp5pk3oZ57rtyWEV5CdZfw4vmLPzU9fednt9a49Jkf5EjaSc19duEwk0T_HfsYx8ptOl3Bu0OC65MOoajloc2a9coqonXBOTU7bKJ6ljn4L82aZH8m7qg',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCNffRUJURPw4_Zx0E1chbFj1E6vcei0X17LXydIB0as9ouzZGZWxX5ygjwZhLSBC0ZoROqotrlpQ1SFbq1eTwB68TlT30LlWxDW6p0TiAj58asoTvSOZ4LGm8FsRae2mnrUXdBg-E7xNGaGKBcH8qbFQ_dLLLcuwC9XckrA2Eyg6i-bXbg2DqBd58c9066ggO3LpGWd3bTt9TERyYNEJZHdrwhwwmliKiV3sCDF2z7JtQnedouBnWe4OC81eRCIL1bS2tfvIu7cQ',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCLVI987BzrPv-iGhG8586UK8tdj3zlNzKKUpNrm3E9ngixX9hYlVlHKfyhcH5Rn9l413taU7tcSuT2ER-Ndk7oRkSr8TzoV69NiGTf1s2_vQDkHwzIG5utTrH0EcVpVYBqmt42iNmltmmB43yuNbpjBL2EZbUvWtjLSRwLVw2B-x1dG-CLaQxLcAMuyWwRrVxELUXdephf4x2esg5AZBjcuLY5KSZ3Dx8KrmawQLSmQbVQ6WhFj4xfUWseTEdc_2QzRz3v1POUsA'
            ],
        },
        'gallery-modal-2': {
            title: 'Urban Geometry',
            description: 'Architectural lines from a recent trip to the city. I was struck by the patterns and reflections on the glass facade of this modern building. It represents the organised chaos of urban life.',
            tags: [],
            images: [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCNffRUJURPw4_Zx0E1chbFj1E6vcei0X17LXydIB0as9ouzZGZWxX5ygjwZhLSBC0ZoROqotrlpQ1SFbq1eTwB68TlT30LlWxDW6p0TiAj58asoTvSOZ4LGm8FsRae2mnrUXdBg-E7xNGaGKBcH8qbFQ_dLLLcuwC9XckrA2Eyg6i-bXbg2DqBd58c9066ggO3LpGWd3bTt9TERyYNEJZHdrwhwwmliKiV3sCDF2z7JtQnedouBnWe4OC81eRCIL1bS2tfvIu7cQ'
            ],
        },
        'gallery-modal-3': {
            title: 'Coastal Adventures',
            description: 'Capturing serene waters during a weekend escape. The rhythmic sound of the waves and the salty air provided a much-needed break from the city. This photo encapsulates the tranquility of the coast.',
            tags: [],
            images: [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCLVI987BzrPv-iGhG8586UK8tdj3zlNzKKUpNrm3E9ngixX9hYlVlHKfyhcH5Rn9l413taU7tcSuT2ER-Ndk7oRkSr8TzoV69NiGTf1s2_vQDkHwzIG5utTrH0EcVpVYBqmt42iNmltmmB43yuNbpjBL2EZbUvWtjLSRwLVw2B-x1dG-CLaQxLcAMuyWwRrVxELUXdephf4x2esg5AZBjcuLY5KSZ3Dx8KrmawQLSmQbVQ6WhFj4xfUWseTEdc_2QzRz3v1POUsA'
            ],
        },
    };

    // Back to top functionality
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
    }

    // Modal functionality
    function updatePaginationDots() {
        if (paginationDots) {
            paginationDots.innerHTML = '';
            if (currentModalData.images.length > 1) {
                currentModalData.images.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.className =
                        `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-text-dark dark:bg-text-light' : 'bg-gray-400 hover:bg-gray-500'}`;
                    dot.addEventListener('click', () => showImage(index));
                    paginationDots.appendChild(dot);
                });
            }
        }
    }

    function showImage(index) {
        if (carousel) {
            carousel.innerHTML = '';
            const img = document.createElement('img');
            img.src = currentModalData.images[index];
            img.alt = 'Carousel image ' + (index + 1);
            img.className = 'w-full h-full object-contain';
            carousel.appendChild(img);
            currentIndex = index;
            updatePaginationDots();
        }
    }

    function showNext() {
        const nextIndex = (currentIndex + 1) % currentModalData.images.length;
        showImage(nextIndex);
    }

    function showPrev() {
        const prevIndex = (currentIndex - 1 + currentModalData.images.length) % currentModalData.images.length;
        showImage(prevIndex);
    }

    // Modal event listeners
    document.querySelectorAll('[data-modal-target]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-modal-target');
            currentModalData = modalData[targetId];
            if (currentModalData && modal) {
                modalTitle.textContent = currentModalData.title;
                modalDescription.textContent = currentModalData.description;
                modalTags.innerHTML = '';
                if (currentModalData.tags && currentModalData.tags.length > 0) {
                    currentModalData.tags.forEach(tag => {
                        const tagElement = document.createElement('span');
                        tagElement.className =
                            'border border-green-400 text-green-400 px-2 py-1 text-xs hover:bg-green-400 hover:text-background-dark transition-colors duration-300';
                        tagElement.textContent = tag;
                        modalTags.appendChild(tagElement);
                    });
                }
                showImage(0);
                modal.classList.remove('hidden');
                const hasMultipleImages = currentModalData.images.length > 1;
                if (prevBtn) prevBtn.style.display = hasMultipleImages ? 'block' : 'none';
                if (nextBtn) nextBtn.style.display = hasMultipleImages ? 'block' : 'none';
                if (paginationDots) paginationDots.style.display = hasMultipleImages ? 'flex' : 'none';
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);

    // Enhanced search and pagination functionality with category filtering
    function initializeSearchAndPagination(containerId, itemsPerPage = 6) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const searchBox = container.querySelector('.search-box');
        const categoryToggle = container.querySelector('.category-toggle');
        const itemsContainer = container.querySelector('.items-grid');
        const paginationContainer = container.querySelector('.pagination');
        
        if (!searchBox || !categoryToggle || !itemsContainer || !paginationContainer) return;

        const allItems = Array.from(itemsContainer.children);
        let filteredItems = [...allItems];
        let currentPage = 1;
        let activeCategory = 'All';

        // Add category data to items
        allItems.forEach((item, index) => {
            const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
            
            // Assign categories based on content for projects
            if (containerId === 'projects-container') {
                if (title.includes('ecommerce') || title.includes('blog') || title.includes('weather')) {
                    item.dataset.category = 'Web';
                } else if (title.includes('management') || title.includes('task')) {
                    item.dataset.category = 'Mobile';
                } else if (title.includes('social')) {
                    item.dataset.category = 'Design';
                } else {
                    item.dataset.category = 'Other';
                }
            } else {
                // For gallery items
                if (title.includes('mountain') || title.includes('coastal') || title.includes('nature')) {
                    item.dataset.category = 'Web';
                } else if (title.includes('urban') || title.includes('street') || title.includes('night')) {
                    item.dataset.category = 'Mobile';
                } else if (title.includes('human') || title.includes('portrait')) {
                    item.dataset.category = 'Design';
                } else {
                    item.dataset.category = 'Other';
                }
            }
        });

        // Category filtering
        function filterByCategory(category) {
            activeCategory = category;
            
            // Update active button
            categoryToggle.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            categoryToggle.querySelector(`[data-category="${category}"]`).classList.add('active');

            // Filter items
            if (category === 'All') {
                filteredItems = [...allItems];
            } else {
                filteredItems = allItems.filter(item => item.dataset.category === category);
            }

            // Apply search filter if there's a search term
            const searchTerm = searchBox.value.trim();
            if (searchTerm) {
                filterItems(searchTerm, false);
            } else {
                currentPage = 1;
                displayItems();
            }
        }

        // Search filtering
        function filterItems(searchTerm, resetCategory = true) {
            let itemsToFilter = resetCategory && activeCategory !== 'All' 
                ? allItems.filter(item => item.dataset.category === activeCategory)
                : (activeCategory === 'All' ? allItems : allItems.filter(item => item.dataset.category === activeCategory));

            filteredItems = itemsToFilter.filter(item => {
                const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = item.querySelector('p')?.textContent.toLowerCase() || '';
                const tags = Array.from(item.querySelectorAll('.border')).map(tag => tag.textContent.toLowerCase()).join(' ');
                
                return title.includes(searchTerm.toLowerCase()) || 
                       description.includes(searchTerm.toLowerCase()) || 
                       tags.includes(searchTerm.toLowerCase());
            });
            currentPage = 1;
            displayItems();
        }

        // Display items with pagination
        function displayItems() {
            // Hide all items first
            allItems.forEach(item => item.classList.add('hidden-item'));

            // Calculate pagination
            const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const itemsToShow = filteredItems.slice(startIndex, endIndex);

            // Show current page items
            itemsToShow.forEach(item => item.classList.remove('hidden-item'));

            // Update pagination
            updatePagination(totalPages);
        }

        // Update pagination controls
        function updatePagination(totalPages) {
            paginationContainer.innerHTML = '';

            if (totalPages <= 1) return;

            // Previous button
            const prevBtn = document.createElement('button');
            prevBtn.textContent = 'PREV()';
            prevBtn.disabled = currentPage === 1;
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayItems();
                }
            });
            paginationContainer.appendChild(prevBtn);

            // Page numbers (show max 5 pages)
            const maxVisiblePages = 5;
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.textContent = i;
                pageBtn.classList.toggle('active', i === currentPage);
                pageBtn.addEventListener('click', () => {
                    currentPage = i;
                    displayItems();
                });
                paginationContainer.appendChild(pageBtn);
            }

            // Next button
            const nextBtn = document.createElement('button');
            nextBtn.textContent = 'NEXT()';
            nextBtn.disabled = currentPage === totalPages;
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayItems();
                }
            });
            paginationContainer.appendChild(nextBtn);
        }

        // Category event listeners
        categoryToggle.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                filterByCategory(category);
            });
        });

        // Search event listener
        searchBox.addEventListener('input', (e) => {
            filterItems(e.target.value);
        });

        // Initial display
        displayItems();
    }

    // Initialize search and pagination for projects and gallery pages
    initializeSearchAndPagination('projects-container');
    initializeSearchAndPagination('gallery-container');
});