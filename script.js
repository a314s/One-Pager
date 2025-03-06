document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elements = document.querySelectorAll('[data-he]');
    const tags = document.querySelectorAll('.tag');
    const body = document.body;
    
    let currentTagIndex = 0;
    let isAnimating = false;
    let lastScrollTime = Date.now();
    const scrollCooldown = 600; // Slightly longer to ensure smooth transitions

    // Language switching
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update text content
            elements.forEach(el => {
                if (el.dataset[lang]) {
                    el.textContent = el.dataset[lang];
                }
            });

            // Update HTML dir attribute based on language
            document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
        });
    });

    // Handle tag flipping
    const flipTags = (direction) => {
        if (isAnimating) return;

        const now = Date.now();
        if (now - lastScrollTime < scrollCooldown) return;
        lastScrollTime = now;

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
                // When going up, remove active class from current tag only
                tags[currentTagIndex].classList.remove('active');
                // Reset all subsequent tags
                for (let i = currentTagIndex + 1; i < tags.length; i++) {
                    tags[i].classList.remove('active');
                }
            } else {
                // When going down, add active class to current tag only
                tags[currentTagIndex].classList.add('active');
            }

            currentTagIndex = nextIndex;

            // Reset animation lock after transition
            setTimeout(() => {
                isAnimating = false;
            }, 400); // Match the CSS transition duration
        }
    };

    // Handle mouse wheel with accumulator
    let wheelAccumulator = 0;
    const wheelThreshold = 150; // Higher threshold for more deliberate scrolling
    
    const handleWheel = (e) => {
        e.preventDefault();
        
        // Accumulate wheel delta
        wheelAccumulator += Math.abs(e.deltaY);
        
        // Only trigger flip when threshold is reached
        if (wheelAccumulator >= wheelThreshold) {
            wheelAccumulator = 0; // Reset accumulator
            const direction = e.deltaY < 0 ? 'up' : 'down';
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
        }
    });

    // Initialize transitions and positions
    tags.forEach((tag, index) => {
        tag.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
        tag.style.setProperty('--index', index);
    });
});