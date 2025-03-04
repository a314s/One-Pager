document.addEventListener('DOMContentLoaded', function() {
    // Get all language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Get all elements with language-specific text
    const langElements = document.querySelectorAll('[data-he], [data-en], [data-de], [data-zh]');
    
    // Check if there's a saved language preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'he';
    
    // Set initial language
    setLanguage(savedLang);
    
    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            
            // Save language preference
            localStorage.setItem('preferredLanguage', lang);
        });
    });
    
    // Function to set the language
    function setLanguage(lang) {
        // Update active button
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Set HTML lang attribute
        document.documentElement.lang = lang;
        
        // Set direction based on language
        if (lang === 'he') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
        
        // Update text content for all elements
        langElements.forEach(element => {
            if (element.hasAttribute(`data-${lang}`)) {
                const translatedText = element.getAttribute(`data-${lang}`);
                element.textContent = translatedText;
                
                // For debugging
                console.log(`Setting ${element.tagName} to language ${lang}: ${translatedText}`);
            }
        });
    }
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
        
        // Add animation class for CSS transitions
        section.classList.add('fade-in');
    });
});

// Add some animation classes
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .content-section:nth-child(even) {
            transition-delay: 0.2s;
        }
    `;
    document.head.appendChild(style);
});