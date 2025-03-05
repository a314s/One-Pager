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
    
    // Initialize Book Animation
    initBookAnimation();
    
    // Initialize Sliding Puzzle
    initSlidingPuzzle();
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

// Book Animation
function initBookAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    
    // Set initial random positions for code lines
    codeLines.forEach((line, index) => {
        const randomX = Math.random() * 100 - 50; // Random value between -50 and 50
        line.style.transform = `translateX(${randomX}px)`;
        line.style.opacity = '0.7';
        
        // Add a slight delay for each line
        line.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Sliding Puzzle
function initSlidingPuzzle() {
    const puzzleContainer = document.querySelector('.puzzle-container');
    const puzzleImage = document.querySelector('.puzzle-image');
    const slidingPuzzle = document.querySelector('.sliding-puzzle');
    
    if (!puzzleContainer || !puzzleImage || !slidingPuzzle) return;
    
    // Click event to start the puzzle
    puzzleImage.addEventListener('click', function() {
        puzzleImage.style.display = 'none';
        slidingPuzzle.style.display = 'block';
        
        // Create puzzle if it doesn't exist yet
        if (slidingPuzzle.children.length === 0) {
            createPuzzle();
        }
    });
    
    function createPuzzle() {
        // Create puzzle tiles
        const size = 3; // 3x3 puzzle
        const tiles = [];
        
        // Create controls
        const controls = document.createElement('div');
        controls.className = 'puzzle-controls';
        
        const resetButton = document.createElement('button');
        resetButton.className = 'puzzle-button';
        resetButton.textContent = 'Reset Puzzle';
        resetButton.addEventListener('click', resetPuzzle);
        
        const backButton = document.createElement('button');
        backButton.className = 'puzzle-button';
        backButton.textContent = 'Back to Image';
        backButton.addEventListener('click', function() {
            slidingPuzzle.style.display = 'none';
            puzzleImage.style.display = 'block';
        });
        
        controls.appendChild(resetButton);
        controls.appendChild(backButton);
        puzzleContainer.appendChild(controls);
        
        // Create tiles
        for (let i = 0; i < size * size - 1; i++) {
            const tile = document.createElement('div');
            tile.className = 'puzzle-tile';
            tile.textContent = i + 1;
            tile.dataset.index = i;
            
            // Calculate position
            const row = Math.floor(i / size);
            const col = i % size;
            
            positionTile(tile, row, col);
            
            tile.addEventListener('click', function() {
                moveTile(this);
            });
            
            slidingPuzzle.appendChild(tile);
            tiles.push(tile);
        }
        
        // Add empty space (represented by null)
        tiles.push(null);
        
        // Shuffle the puzzle
        shufflePuzzle(tiles, size);
        
        function positionTile(tile, row, col) {
            const tileSize = 100; // 100px per tile
            tile.style.top = `${row * tileSize}px`;
            tile.style.left = `${col * tileSize}px`;
            tile.dataset.row = row;
            tile.dataset.col = col;
        }
        
        function moveTile(tile) {
            const row = parseInt(tile.dataset.row);
            const col = parseInt(tile.dataset.col);
            
            // Check adjacent cells for empty space
            const adjacentPositions = [
                { r: row - 1, c: col },     // up
                { r: row + 1, c: col },     // down
                { r: row, c: col - 1 },     // left
                { r: row, c: col + 1 }      // right
            ];
            
            for (const pos of adjacentPositions) {
                // Skip if out of bounds
                if (pos.r < 0 || pos.r >= size || pos.c < 0 || pos.c >= size) continue;
                
                // Check if this position is empty
                const adjacentTile = findTileAtPosition(pos.r, pos.c);
                
                if (!adjacentTile) {
                    // Move to empty position
                    positionTile(tile, pos.r, pos.c);
                    
                    // Check if puzzle is solved
                    if (isPuzzleSolved()) {
                        setTimeout(() => {
                            alert('Congratulations! You solved the puzzle!');
                        }, 300);
                    }
                    
                    return;
                }
            }
        }
        
        function findTileAtPosition(row, col) {
            return Array.from(slidingPuzzle.querySelectorAll('.puzzle-tile')).find(
                t => parseInt(t.dataset.row) === row && parseInt(t.dataset.col) === col
            );
        }
        
        function isPuzzleSolved() {
            const tiles = Array.from(slidingPuzzle.querySelectorAll('.puzzle-tile'));
            
            for (let i = 0; i < tiles.length; i++) {
                const tile = tiles[i];
                const expectedIndex = parseInt(tile.dataset.row) * size + parseInt(tile.dataset.col);
                
                if (parseInt(tile.dataset.index) !== expectedIndex) {
                    return false;
                }
            }
            
            return true;
        }
        
        function shufflePuzzle(tiles, size) {
            // Find the empty position (should be at the end)
            let emptyRow = size - 1;
            let emptyCol = size - 1;
            
            // Make random moves
            for (let i = 0; i < 100; i++) {
                // Get possible moves (tiles adjacent to empty space)
                const possibleMoves = [];
                
                // Check all four directions
                const directions = [
                    { r: -1, c: 0 }, // up
                    { r: 1, c: 0 },  // down
                    { r: 0, c: -1 }, // left
                    { r: 0, c: 1 }   // right
                ];
                
                for (const dir of directions) {
                    const newRow = emptyRow + dir.r;
                    const newCol = emptyCol + dir.c;
                    
                    // Skip if out of bounds
                    if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size) continue;
                    
                    // Find tile at this position
                    const tileIndex = newRow * size + newCol;
                    if (tileIndex < tiles.length - 1) {
                        possibleMoves.push(tiles[tileIndex]);
                    }
                }
                
                // Randomly select a tile to move
                if (possibleMoves.length > 0) {
                    const randomTile = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                    
                    // Swap positions
                    const tileRow = parseInt(randomTile.dataset.row);
                    const tileCol = parseInt(randomTile.dataset.col);
                    
                    positionTile(randomTile, emptyRow, emptyCol);
                    
                    // Update empty position
                    emptyRow = tileRow;
                    emptyCol = tileCol;
                }
            }
        }
        
        function resetPuzzle() {
            // Remove all tiles
            while (slidingPuzzle.firstChild) {
                slidingPuzzle.removeChild(slidingPuzzle.firstChild);
            }
            
            // Recreate puzzle
            createPuzzle();
        }
    }
}