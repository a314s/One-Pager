document.addEventListener('DOMContentLoaded', () => {
    // Containers
    const allTitlesContainer = document.querySelector('.all-titles-container');
    const tagContainer = document.querySelector('.tag-container');
    const tilesContainer = document.querySelector('.tiles-container');
    const titlesList = document.querySelector('.titles-list');
    
    // UI elements
    const langButtons = document.querySelectorAll('.lang-btn');
    const body = document.body;
    
    // State variables
    let currentTagIndex = 0;
    let isAnimating = false;
    let lastScrollTime = Date.now();
    const scrollCooldown = 600; // Slightly longer to ensure smooth transitions
    let tags = [];
    let currentLang = 'he';
    let showingTiles = false;
    let allServicesTitleIndex = 0;
    let allServicesTitleInterval = null;
    
    // Hardcoded data from lines.json - updated with proper services structure
    const servicesData = {
        "services": [
            {
                "title_en": "Knowledge preservation and training",
                "description_en": "Assure your Company training programs, IP and Knowledge base go as far as they can with simplification and clarity brought by our experience with other large companies.",
                "title_de": "Wissensbewahrung und Schulung",
                "description_de": "Stellen Sie sicher, dass Ihre Schulungsprogramme, Ihr geistiges Eigentum (IP) und Ihr Wissensbestand so weit wie möglich ausgebaut werden können, indem wir durch unsere Erfahrung mit anderen großen Unternehmen Klarheit und Vereinfachung schaffen.",
                "title_he": "שימור ידע והכשרה",
                "description_he": "ודאו שתוכניות ההכשרה של החברה שלכם, הקניין הרוחני ובסיס הידע מגיעים למיצוי מרבי בזכות פשטות ובהירות שנובעות מהניסיון שלנו עם חברות גדולות אחרות.",
                "title_zh": "知识保存与培训",
                "description_zh": "通过我们与其他大型公司的经验所带来的简化和清晰度，确保您的公司培训计划、知识产权和知识库得到最大限度的利用。"
            },
            {
                "title_en": "Customized AI solutions",
                "description_en": "We provide customized AI assisted solutions for everyday task that can Include a completely offline LLM so you can query your internal knowledge base with ease, Simplifying your workflow with more comprehensive process guidance and constantly innovating new solutions to fit our client needs.",
                "title_de": "Maßgeschneiderte KI-Lösungen",
                "description_de": "Wir bieten maßgeschneiderte, KI-gestützte Lösungen für alltägliche Aufgaben, die auch ein vollständig offline verwendbares LLM umfassen können, damit Sie Ihre internen Wissensdatenbanken einfach abfragen können. Wir vereinfachen Ihren Arbeitsablauf durch umfassendere Prozessanleitungen und entwickeln ständig neue Lösungen, um den Anforderungen unserer Kunden gerecht zu werden.",
                "title_he": "פתרונות בינה מלאכותית מותאמים אישית",
                "description_he": "אנו מספקים פתרונות בהתאמה אישית המבוססים על בינה מלאכותית למשימות יומיומיות, שיכולים לכלול גם מודל שפה גדול (LLM) לא מקוון לחלוטין, כך שתוכלו לשאול את בסיס הידע הפנימי שלכם בקלות. אנו מפשטים את תהליך העבודה שלכם באמצעות הנחיות תהליכיות מקיפות יותר ומחדשים כל העת פתרונות חדשים לצורכי הלקוחות שלנו.",
                "title_zh": "定制化AI解决方案",
                "description_zh": "我们为日常任务提供定制化AI辅助解决方案，包括完全离线的LLM，让您能够轻松查询内部知识库；通过更全面的流程指导来简化工作流程，并不断创新以满足客户需求。"
            },
            {
                "title_en": "Process analysis and optimization",
                "description_en": "We provide on-site or remote process recording to study your workflow and provide optimizations across many fields including Prototyping, Design and Manufacturing.",
                "title_de": "Prozessanalyse und -optimierung",
                "description_de": "Wir bieten Vor-Ort- oder Remote-Aufzeichnungen von Prozessen an, um Ihren Arbeitsablauf zu untersuchen und Optimierungen in Bereichen wie Prototyping, Design und Fertigung vorzuschlagen.",
                "title_he": "ניתוח תהליכים ואופטימיזציה",
                "description_he": "אנו מספקים תיעוד תהליכי באתר או מרחוק כדי לחקור את זרימת העבודה שלכם ולהציע אופטימיזציות במגוון תחומים, כולל אבטיפוס, עיצוב וייצור.",
                "title_zh": "流程分析与优化",
                "description_zh": "我们提供现场或远程的流程记录来研究您的工作流程，并在原型设计、设计和制造等多个领域提供优化建议。"
            },
            {
                "title_en": "Technical animations",
                "description_en": "We can provide clear and concise animations of your build or repair process to aid your teams with more precise visualizations to simplify complex assemblies to reducing errors.",
                "title_de": "Technische Animationen",
                "description_de": "Wir können klare und prägnante Animationen Ihres Bau- oder Reparaturprozesses zur Verfügung stellen, um Ihren Teams präzisere Visualisierungen zu bieten, komplexe Baugruppen zu vereinfachen und Fehler zu reduzieren.",
                "title_he": "הנפשות טכניות",
                "description_he": "אנו יכולים לספק הנפשות ברורות ותמציתיות של תהליך הבנייה או התיקון שלכם, כדי לסייע לצוות שלכם בהדמיות מדויקות יותר, בפישוט הרכבות מורכבות ובהפחתת טעויות.",
                "title_zh": "技术动画",
                "description_zh": "我们可以为您的构建或维修过程提供清晰简洁的动画，帮助您的团队更准确地可视化，简化复杂装配并减少错误。"
            },
            {
                "title_en": "Technical writing and translation",
                "description_en": "We can record your process and create enhanced versions across any media type including Video, PDF, Animation. We can further provide versions of any file in a wide range of language options.",
                "title_de": "Technisches Schreiben und Übersetzung",
                "description_de": "Wir können Ihren Prozess aufzeichnen und verbesserte Versionen in jedem beliebigen Medienformat erstellen, einschließlich Video, PDF und Animation. Darüber hinaus können wir Versionen jeder Datei in einer Vielzahl von Sprachen bereitstellen.",
                "title_he": "כתיבה טכנית ותרגום",
                "description_he": "אנו יכולים לתעד את התהליך שלכם וליצור גרסאות משופרות בכל סוגי המדיה, כולל וידאו, PDF והנפשות. בנוסף, אנו יכולים לספק גרסאות של כל קובץ במגוון רחב של שפות.",
                "title_zh": "技术写作和翻译",
                "description_zh": "我们可以记录您的流程，并在任何媒体格式（包括视频、PDF、动画）上创建增强版本。此外，我们还能提供多语言版本的任何文件。"
            }
        ]
    };

    // Convert services format to the expected lines format
    const linesData = {
        "lines": servicesData.services.map((service, index) => {
            const images = ["R&D.svg", "Engineering & NPI.svg", "Marketing.svg", "Service.svg", "elipca.svg"];
            return {
                "title": {
                    "en": service.title_en,
                    "de": service.title_de,
                    "he": service.title_he,
                    "zh": service.title_zh
                },
                "description": {
                    "en": service.description_en,
                    "de": service.description_de,
                    "he": service.description_he,
                    "zh": service.description_zh
                },
                "image": images[index % images.length]
            };
        })
    };

    // Initialize the page with the data
    initializePage();

    function initializePage() {
        if (!linesData || !linesData.lines || !linesData.lines.length) {
            console.error('No valid data found');
            return;
        }

        console.log('Initializing page...');

        // Hide all views initially to prevent flashing content
        allTitlesContainer.classList.remove('active');
        tagContainer.classList.remove('active');
        tilesContainer.classList.remove('active');
        
        // Create the regular tags (now includes the All Services tag)
        createTags();
        
        // Create the tiles view
        createTiles();
        
        // Initialize event listeners
        initializeEventListeners();
        
        // Add debug message to console
        console.log('Page initialized with', linesData.lines.length, 'lines');
        
        // Show the tags view by default with a slight delay to ensure rendering
        setTimeout(() => {
            tagContainer.classList.add('active');
            initializeTagPositions();
            console.log('Tags activated:', tags.length, 'tags found');
        }, 100);
    }

    function createTags() {
        // Clear any existing content
        tagContainer.innerHTML = '';
        console.log('Creating tags...');
        
        // First create the All Services rotating tag
        const allServicesTag = document.createElement('section');
        allServicesTag.className = 'tag all-services-tag';
        allServicesTag.style.backgroundColor = '#F73F52'; // Set explicit background color
        
        const allServicesContent = document.createElement('div');
        allServicesContent.className = 'tag-content';
        
        // Create a container for the rotating titles and images
        const rotatingContainer = document.createElement('div');
        rotatingContainer.className = 'rotating-container';
        
        // Create placeholder for the current title
        const titleElement = document.createElement('h2');
        titleElement.className = 'rotating-title';
        
        // Create placeholder for the current image
        const imageElement = document.createElement('img');
        imageElement.className = 'rotating-image';
        
        // Add elements to the container
        rotatingContainer.appendChild(imageElement);
        rotatingContainer.appendChild(titleElement);
        allServicesContent.appendChild(rotatingContainer);
        allServicesTag.appendChild(allServicesContent);
        
        // Add the all services tag to the tag container as the first tag
        tagContainer.appendChild(allServicesTag);
        
        // Create a tag for each line
        const tagColors = ['#9ED763', '#FBD400', '#6730EC', '#3498db', '#e74c3c'];
        
        linesData.lines.forEach((line, index) => {
            const tag = document.createElement('section');
            tag.className = 'tag';
            tag.style.backgroundColor = tagColors[index % tagColors.length]; // Set explicit background color
            
            const tagContent = document.createElement('div');
            tagContent.className = 'tag-content';
            
            const tagImage = document.createElement('img');
            tagImage.src = line.image;
            tagImage.alt = line.title[currentLang];
            tagImage.className = 'tag-image';
            
            const tagText = document.createElement('div');
            tagText.className = 'tag-text';
            
            const title = document.createElement('h2');
            title.textContent = line.title[currentLang];
            
            // Add data attributes for all languages
            Object.keys(line.title).forEach(lang => {
                title.dataset[lang] = line.title[lang];
            });
            
            const description = document.createElement('p');
            description.textContent = line.description[currentLang];
            
            // Add data attributes for all languages
            Object.keys(line.description).forEach(lang => {
                description.dataset[lang] = line.description[lang];
            });
            
            tagText.appendChild(title);
            tagText.appendChild(description);
            
            tagContent.appendChild(tagImage);
            tagContent.appendChild(tagText);
            
            tag.appendChild(tagContent);
            tagContainer.appendChild(tag);
        });
        
        // Update the tags array
        tags = document.querySelectorAll('.tag');
        console.log('Created', tags.length, 'tags');
        
        // Start the rotation for the All Services tag
        startTitleRotation();
    }
    
    // Function to stop title rotation
    function stopTitleRotation() {
        if (allServicesTitleInterval) {
            clearInterval(allServicesTitleInterval);
            allServicesTitleInterval = null;
            console.log('Title rotation stopped');
        }
    }
    
    function startTitleRotation() {
        // Clear any existing interval first
        stopTitleRotation();
        
        console.log('Starting title rotation');
        
        // Set initial title and image
        const titleElement = document.querySelector('.rotating-title');
        const imageElement = document.querySelector('.rotating-image');
        
        if (titleElement && imageElement) {
            const currentService = linesData.lines[allServicesTitleIndex];
            titleElement.textContent = currentService.title[currentLang];
            imageElement.src = currentService.image;
            imageElement.alt = currentService.title[currentLang];
            
            // Function to update the current title and image
            const updateTitleAndImage = () => {
                if (titleElement && imageElement) {
                    // Add exit animation classes
                    titleElement.classList.add('rotate-out');
                    imageElement.classList.add('rotate-out');
                    
                    // After animation completes, change content and animate in
                    setTimeout(() => {
                        const currentService = linesData.lines[allServicesTitleIndex];
                        titleElement.textContent = currentService.title[currentLang];
                        imageElement.src = currentService.image;
                        imageElement.alt = currentService.title[currentLang];
                        
                        // Remove exit animation and add entry animation
                        titleElement.classList.remove('rotate-out');
                        imageElement.classList.remove('rotate-out');
                        titleElement.classList.add('rotate-in');
                        imageElement.classList.add('rotate-in');
                        
                        // After entry animation, remove the class
                        setTimeout(() => {
                            titleElement.classList.remove('rotate-in');
                            imageElement.classList.remove('rotate-in');
                        }, 500);
                        
                        // Move to next title
                        allServicesTitleIndex = (allServicesTitleIndex + 1) % linesData.lines.length;
                    }, 500);
                }
            };
            
            // Set up interval to rotate titles
            allServicesTitleInterval = setInterval(updateTitleAndImage, 3000);
            console.log('Title rotation started with interval ID:', allServicesTitleInterval);
        } else {
            console.error('Could not find rotating title or image elements');
        }
    }

    function showTagsView(startIndex = 0) {
        showingTiles = false;
        allTitlesContainer.classList.remove('active');
        tagContainer.classList.add('active');
        tilesContainer.classList.remove('active');
        
        console.log('Showing tags view, startIndex =', startIndex);
        
        // Reset all tags first - clear any existing styles
        tags.forEach(tag => {
            tag.classList.remove('active');
            tag.style.transform = '';
            tag.style.opacity = '1';
            tag.style.zIndex = '';
        });
        
        // Initialize tag positions
        initializeTagPositions();
        console.log('Tag positions initialized');
        
        // If startIndex is provided, flip to that tag
        currentTagIndex = 0;
        if (startIndex > 0 && startIndex < tags.length) {
            console.log('Flipping to tag', startIndex);
            for (let i = 0; i < startIndex; i++) {
                flipTagsImmediate('down');
            }
        }
        
        // Restart title rotation for the All Services tag if it's visible
        if (currentTagIndex === 0) {
            startTitleRotation();
        }
    }

    function initializeEventListeners() {
        // View control buttons
        const showTagsBtn = document.getElementById('show-tags-btn');
        const showTilesBtn = document.getElementById('show-tiles-btn');
        const showAllTitlesBtn = document.getElementById('show-all-titles-btn');
        
        if (showAllTitlesBtn) {
            // Now this button resets to the first tag (All Services)
            showAllTitlesBtn.addEventListener('click', () => {
                console.log('Showing first tag');
                currentTagIndex = 0;
                showTagsView();
            });
        }
        
        if (showTagsBtn) {
            showTagsBtn.addEventListener('click', () => {
                console.log('Showing tags view');
                showTagsView();
            });
        }
        
        if (showTilesBtn) {
            showTilesBtn.addEventListener('click', () => {
                console.log('Showing tiles view');
                stopTitleRotation();
                showTilesView();
            });
        }
        
        // Handle mouse wheel with accumulator
        let wheelAccumulator = 0;
        const wheelThreshold = 50; // Lower threshold for easier scrolling
        
        const handleWheel = (e) => {
            e.preventDefault();
            
            console.log('Wheel event detected, deltaY:', e.deltaY);
            
            // Accumulate wheel delta
            wheelAccumulator += Math.abs(e.deltaY);
            
            // Only trigger flip when threshold is reached
            if (wheelAccumulator >= wheelThreshold) {
                wheelAccumulator = 0; // Reset accumulator
                const direction = e.deltaY < 0 ? 'up' : 'down';
                console.log('Flipping tags in direction:', direction);
                
                // If currently showing the first tag (All Services) and going down, we need to stop the rotation
                if (currentTagIndex === 0 && direction === 'down') {
                    stopTitleRotation();
                }
                
                flipTags(direction);
            }
        };

        // Touch handling with improved sensitivity
        let touchStartY = 0;
        let touchEndY = 0;
        const touchThreshold = 50; // Increased threshold for better control

        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            e.preventDefault(); // Prevent only during touch move
        };

        const handleTouchEnd = (e) => {
            touchEndY = e.changedTouches[0].clientY;
            const touchDiff = touchStartY - touchEndY;

            if (Math.abs(touchDiff) > touchThreshold) {
                const direction = touchDiff > 0 ? 'down' : 'up';
                flipTags(direction);
            }
        };

        // Event listeners
        window.addEventListener('wheel', handleWheel);
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    flipTags('up');
                    break;
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    flipTags('down');
                    break;
                case ' ':
                    e.preventDefault();
                    flipTags('down');
                    break;
                case 'Escape':
                    e.preventDefault();
                    if (showingTiles) {
                        showTagsView();
                    } else if (tagContainer.classList.contains('active')) {
                        currentTagIndex = 0;
                        showTagsView();
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    currentTagIndex = 0;
                    showTagsView();
                    break;
                case 'End':
                    e.preventDefault();
                    showTilesView();
                    break;
            }
        });

        // Language switching
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                currentLang = lang;
                
                // Update active button
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update text content for all elements with data attributes
                document.querySelectorAll('[data-he], [data-en], [data-de], [data-zh]').forEach(el => {
                    if (el.dataset[lang]) {
                        el.textContent = el.dataset[lang];
                    }
                });

                // Only update HTML dir attribute for the main content, not the header
                // The header keeps LTR direction to maintain layout
                document.querySelector('main').dir = lang === 'he' ? 'rtl' : 'ltr';
                document.querySelector('footer').dir = lang === 'he' ? 'rtl' : 'ltr';
                
                // Recreate the views with the new language
                stopTitleRotation();
                createTags();
                createTiles();
                
                // Reinitialize tag positions
                tags = document.querySelectorAll('.tag');
                initializeTagPositions();
                
                // If currently on All Services tag, restart rotation
                if (currentTagIndex === 0) {
                    startTitleRotation();
                }
            });
        });
    }

    function createTiles() {
        // Clear any existing content
        tilesContainer.innerHTML = '';
        
        // Create a tile for each line
        linesData.lines.forEach((line, index) => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.style.setProperty('--tile-color', getTileColor(index));
            // Set animation delay index for each tile
            tile.style.setProperty('--index', index);
            
            const tileImage = document.createElement('img');
            tileImage.src = line.image;
            tileImage.alt = line.title[currentLang];
            tileImage.className = 'tile-image';
            
            const title = document.createElement('h3');
            title.textContent = line.title[currentLang];
            
            // Add data attributes for all languages
            Object.keys(line.title).forEach(lang => {
                title.dataset[lang] = line.title[lang];
            });
            
            const description = document.createElement('p');
            description.textContent = line.description[currentLang];
            
            // Add data attributes for all languages
            Object.keys(line.description).forEach(lang => {
                description.dataset[lang] = line.description[lang];
            });
            
            tile.appendChild(tileImage);
            tile.appendChild(title);
            tile.appendChild(description);
            
            // Add click event to show the specific tag
            tile.addEventListener('click', () => {
                showTagsView(index);
            });
            
            tilesContainer.appendChild(tile);
        });
    }

    function getTileColor(index) {
        // Define colors for tiles
        const colors = ['#F73F52', '#9ED763', '#FBD400', '#6730EC', '#3498db'];
        return colors[index % colors.length];
    }

    function showTilesView() {
        showingTiles = true;
        allTitlesContainer.classList.remove('active');
        tagContainer.classList.remove('active');
        tilesContainer.classList.add('active');
        
        // Add a fade-in animation class to the tiles container
        tilesContainer.classList.add('tiles-fade-in');
        
        console.log('Tiles view activated');
    }

    function initializeTagPositions() {
        // Make sure tags are positioned properly
        console.log('Initializing tag positions for', tags.length, 'tags');
        tags.forEach((tag, index) => {
            tag.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
            tag.style.transform = `translateX(${-10 * index}px) rotate(${5 * index}deg)`;
            tag.style.zIndex = tags.length - index;
            tag.style.opacity = '1'; // Ensure tags are visible
            tag.style.display = 'block'; // Make sure they're not hidden
        });
    }

    // Handle tag flipping with animation
    const flipTags = (direction) => {
        if (isAnimating) return;

        const now = Date.now();
        if (now - lastScrollTime < scrollCooldown) return;
        lastScrollTime = now;

        // If showing all titles view, switch to tags view
        if (allTitlesContainer.classList.contains('active')) {
            showTagsView();
            return;
        }

        // If showing tiles view, do nothing
        if (showingTiles) return;

        const nextIndex = direction === 'up'
            ? Math.max(0, currentTagIndex - 1)
            : Math.min(tags.length - 1, currentTagIndex + 1);

        if (nextIndex !== currentTagIndex) {
            isAnimating = true;

            // Set uniform transition for all tags
            tags.forEach(tag => {
                tag.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
            });

            if (direction === 'up') {
                // When going up, remove active class from current tag
                tags[currentTagIndex].classList.remove('active');
                // Update positions for all tags
                for (let i = 0; i < tags.length; i++) {
                    tags[i].style.transform = `translateX(${-10 * i}px) rotate(${5 * i}deg)`;
                    tags[i].style.zIndex = tags.length - i;
                }
            } else {
                // When going down, add active class to current tag
                tags[currentTagIndex].classList.add('active');
                // Update positions for remaining tags
                for (let i = currentTagIndex + 1; i < tags.length; i++) {
                    tags[i].style.transform = `translateX(${-10 * (i - currentTagIndex - 1)}px) rotate(${5 * (i - currentTagIndex - 1)}deg)`;
                    tags[i].style.zIndex = tags.length - (i - currentTagIndex);
                }
            }

            currentTagIndex = nextIndex;

            // Check if we've reached the end of the tags
            if (currentTagIndex === tags.length - 1 && direction === 'down') {
                console.log('Reached the end of tags, preparing to show tiles view');
                
                // Animate all tags to move out of view
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = `translateX(-150%) rotate(-90deg)`;
                        tag.style.opacity = '0';
                    }, index * 100);
                });
                
                // Show tiles view after the animation completes
                setTimeout(() => {
                    showTilesView();
                }, tags.length * 100 + 400);
            }

            // Reset animation lock after transition
            setTimeout(() => {
                isAnimating = false;
            }, 400); // Match the CSS transition duration
        }
    };

    // Flip tags immediately without animation (for direct navigation)
    const flipTagsImmediate = (direction) => {
        if (direction === 'down' && currentTagIndex < tags.length - 1) {
            // Temporarily remove transitions
            tags.forEach(tag => {
                tag.style.transition = 'none';
            });
            
            // Add active class to current tag
            tags[currentTagIndex].classList.add('active');
            
            // Update positions for remaining tags
            for (let i = currentTagIndex + 1; i < tags.length; i++) {
                tags[i].style.transform = `translateX(${-10 * (i - currentTagIndex - 1)}px) rotate(${5 * (i - currentTagIndex - 1)}deg)`;
                tags[i].style.zIndex = tags.length - (i - currentTagIndex);
            }
            
            currentTagIndex++;
            
            // Force reflow
            void tags[0].offsetWidth;
            
            // Restore transitions
            tags.forEach(tag => {
                tag.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
            });
        }
    };

    // Start with initialization
    initializePage();
});