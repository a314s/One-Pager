document.addEventListener('DOMContentLoaded', function() {
    // Get all language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Get all elements with language-specific text
    const langElements = document.querySelectorAll('[data-he], [data-en], [data-de], [data-zh]');
    
    // Initialize Glass Shatter Animation
    initGlassShatter();
    
    // Translations data (from translations.csv)
    const translations = [
        {
            "en": "Knowledge Preservation Training – Creating clear and structured content to ensure continuity and effective knowledge sharing.",
            "he": "שימור ידע והדרכה – יצירת תוכן ברור ומובנה כדי להבטיח המשכיות ושיתוף ידע יעיל.",
            "de": "Schulungen zur Wissensbewahrung – Klare und strukturierte Inhalte erstellen, um Kontinuität und effektiven Wissensaustausch zu gewährleisten.",
            "zh": "知识保存培训 – 创建清晰和结构化的内容以确保连续性和有效的知识共享."
        },
        {
            "en": "Technical Training – Visual guides, videos, and customized solutions tailored to your needs.",
            "he": "הדרכה טכנית – מדריכים חזותיים, סרטונים ופתרונות מותאמים אישית לצרכים שלך.",
            "de": "Technische Schulungen – Visuelle Anleitungen, Videos und maßgeschneiderte Lösungen, die auf Ihre Bedürfnisse zugeschnitten sind.",
            "zh": "技术培训 – 根据您的需求量身定制的视觉指南、视频和定制解决方案."
        },
        {
            "en": "Customized AI Solutions – Utilizing artificial intelligence to enhance training processes and automate technical content.",
            "he": "פתרונות AI מותאמים אישית – שימוש בבינה מלאכותית לשיפור תהליכי הדרכה ואוטומציה של תוכן טכני.",
            "de": "Individuelle KI-Lösungen – Nutzung künstlicher Intelligenz zur Verbesserung von Schulungsprozessen und zur Automatisierung technischer Inhalte.",
            "zh": "定制化 AI 解决方案 – 利用人工智能增强培训流程并自动化技术内容."
        },
        {
            "en": "Technical Writing and Translation – Professional documentation, user-friendly guides, and precise technical content in multiple languages.",
            "he": "כתיבה טכנית ותרגום – תיעוד מקצועי, מדריכים ידידותיים למשתמש, ותוכן טכני מדויק במספר שפות.",
            "de": "Technische Dokumentation und Übersetzung – Professionelle Dokumentation, benutzerfreundliche Anleitungen und präzise technische Inhalte in mehreren Sprachen.",
            "zh": "技术写作和翻译 – 多种语言的专业文档、用户友好指南和精确技术内容."
        },
        {
            "en": "Technical animations – Creating advanced simulation videos that illustrate processes and products in a clear and visual way.",
            "he": "אנימציות טכניות – יצירת סרטוני סימולציה מתקדמים המדגימים תהליכים ומוצרים בצורה ברורה וויזואלית.",
            "de": "Technische Animationen – Erstellung fortschrittlicher Simulationsvideos, die Prozesse und Produkte klar und anschaulich darstellen.",
            "zh": "技术动画 – 创建以清晰和视觉方式说明过程和产品的高级模拟视频."
        },
        {
            "en": "Organic effectiveness processes – We use the Lean Six Sigma methodology to improve and optimize processes, reduce waste, and increase effectiveness within the organization.",
            "he": "תהליכי התייעלות אורגניים – אנו משתמשים במתודולוגיית Lean Six Sigma לשיפור וייעול תהליכים, הפחתת בזבוז והגברת האפקטיביות בארגון.",
            "de": "Organische Effektivitätsprozesse – Wir nutzen die Lean Six Sigma-Methodik, um Prozesse zu verbessern und zu optimieren, Verschwendung zu reduzieren und die Effektivität im Unternehmen zu steigern.",
            "zh": "有机效率流程 – 我们使用精益六西格玛方法来改进和优化流程，减少浪费并提高组织内的效率."
        }
    ];
    
    // Load translations
    loadTranslations();
    
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
    
    // Function to load translations
    function loadTranslations() {
        // Process each translation entry
        translations.forEach((translation, index) => {
            // Get section elements
            const section = document.querySelectorAll('.content-section')[index];
            if (!section) return;
            
            // Update section title and text with translations
            const titleElement = section.querySelector('.section-title');
            const textElement = section.querySelector('.section-text');
            
            if (titleElement && textElement) {
                // Process each language
                Object.keys(translation).forEach(lang => {
                    const fullText = translation[lang];
                    if (!fullText) return;
                    
                    // Split into title and description
                    const parts = fullText.split('–');
                    if (parts.length >= 2) {
                        const title = parts[0].trim();
                        const description = parts[1].trim();
                        
                        // Set data attributes for language switching
                        titleElement.setAttribute(`data-${lang}`, title);
                        textElement.setAttribute(`data-${lang}`, description);
                        
                        // Set initial text for Hebrew
                        if (lang === 'he') {
                            titleElement.textContent = title;
                            textElement.textContent = description;
                        }
                    }
                });
            }
        });
    }
    
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
    
    // Initialize Sliding Puzzle for the last section
    initSlidingPuzzle();
    
    // Initialize Second Image Puzzle
    initSecondImagePuzzle();
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

// Glass Shatter Animation
function initGlassShatter() {
    const shatterContainer = document.querySelector('.shatter-container');
    if (!shatterContainer) return;
    
    const img = shatterContainer.querySelector('img');
    const shardsContainer = shatterContainer.querySelector('.shards-container');
    
    if (!img || !shardsContainer) return;
    
    // Create rebuild animation element
    const rebuildAnimation = document.createElement('div');
    rebuildAnimation.className = 'rebuild-animation';
    rebuildAnimation.style.backgroundImage = `url(${img.src})`;
    shatterContainer.appendChild(rebuildAnimation);
    
    // Create shards
    const numShards = 30; // Number of shards to create
    const imgWidth = shatterContainer.offsetWidth;
    const imgHeight = shatterContainer.offsetHeight;
    
    for (let i = 0; i < numShards; i++) {
        createShard(i);
    }
    
    function createShard(index) {
        // Create a shard element
        const shard = document.createElement('div');
        shard.className = 'shard';
        
        // Random size between 30px and 80px
        const size = 30 + Math.random() * 50;
        
        // Random position within the image
        const posX = Math.random() * (imgWidth - size);
        const posY = Math.random() * (imgHeight - size);
        
        // Set shard properties
        shard.style.width = `${size}px`;
        shard.style.height = `${size}px`;
        shard.style.left = `${posX}px`;
        shard.style.top = `${posY}px`;
        shard.style.backgroundImage = `url(${img.src})`;
        shard.style.backgroundPosition = `-${posX}px -${posY}px`;
        
        // Set custom properties for the fall animation
        const fallDistance = imgHeight - posY + 50;
        const fallX = (Math.random() - 0.5) * 40; // Random X offset between -20px and 20px
        const rotation = (Math.random() - 0.5) * 60; // Random rotation between -30deg and 30deg
        
        shard.style.setProperty('--fall-y', `${fallDistance}px`);
        shard.style.setProperty('--fall-x', `${fallX}px`);
        shard.style.setProperty('--rotation', `${rotation}deg`);
        
        // Add a small delay based on position
        shard.style.animationDelay = `${Math.random() * 0.5}s`;
        
        // Add to container
        shardsContainer.appendChild(shard);
    }
}

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

// Second Image Puzzle (Section 2)
function initSecondImagePuzzle() {
    const secondImagePuzzle = document.querySelector('.second-image-puzzle');
    if (!secondImagePuzzle) return;
    
    const originalImage = secondImagePuzzle.querySelector('.original-image');
    const puzzleGrid = secondImagePuzzle.querySelector('.puzzle-grid');
    
    if (!originalImage || !puzzleGrid) return;
    
    // Create puzzle controls
    const controls = document.createElement('div');
    controls.className = 'puzzle-controls';
    
    const resetButton = document.createElement('button');
    resetButton.className = 'puzzle-button';
    resetButton.textContent = 'Reset Puzzle';
    resetButton.addEventListener('click', resetPuzzle);
    
    const solveButton = document.createElement('button');
    solveButton.className = 'puzzle-button';
    solveButton.textContent = 'Solve Puzzle';
    solveButton.addEventListener('click', solvePuzzle);
    
    controls.appendChild(resetButton);
    controls.appendChild(solveButton);
    secondImagePuzzle.appendChild(controls);
    
    // Click event to start the puzzle
    originalImage.addEventListener('click', function() {
        if (puzzleGrid.style.display === 'grid') {
            // If puzzle is already showing, reset to original image
            puzzleGrid.style.display = 'none';
            originalImage.style.opacity = '1';
        } else {
            // Start puzzle
            startPuzzle();
        }
    });
    
    function startPuzzle() {
        // Clear existing puzzle pieces
        while (puzzleGrid.firstChild) {
            puzzleGrid.removeChild(puzzleGrid.firstChild);
        }
        
        // Show puzzle grid
        puzzleGrid.style.display = 'grid';
        originalImage.style.opacity = '0.2';
        
        // Create puzzle pieces
        const size = 3; // 3x3 puzzle
        const pieces = [];
        const imageUrl = originalImage.src;
        
        // Create all pieces except bottom-right
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                // Skip bottom-right piece (empty space)
                if (row === size - 1 && col === size - 1) continue;
                
                const piece = document.createElement('div');
                piece.className = 'puzzle-piece';
                piece.dataset.row = row;
                piece.dataset.col = col;
                piece.dataset.correctRow = row;
                piece.dataset.correctCol = col;
                
                // Set background image position
                piece.style.backgroundImage = `url(${imageUrl})`;
                piece.style.backgroundPosition = `${-col * 100}% ${-row * 100}%`;
                
                // Add click handler
                piece.addEventListener('click', function() {
                    movePiece(this);
                });
                
                // Add mousedown handler for target highlighting
                piece.addEventListener('mousedown', function() {
                    highlightTarget(this);
                });
                
                // Add mouseup handler to remove highlight
                piece.addEventListener('mouseup', function() {
                    removeHighlight();
                });
                
                puzzleGrid.appendChild(piece);
                pieces.push(piece);
            }
        }
        
        // Create empty piece (bottom-right)
        const emptyPiece = document.createElement('div');
        emptyPiece.className = 'puzzle-piece empty';
        emptyPiece.dataset.row = size - 1;
        emptyPiece.dataset.col = size - 1;
        puzzleGrid.appendChild(emptyPiece);
        
        // Shuffle pieces
        shufflePieces(pieces);
    }
    
    function movePiece(piece) {
        const emptyPiece = puzzleGrid.querySelector('.empty');
        if (!emptyPiece) return;
        
        const pieceRow = parseInt(piece.dataset.row);
        const pieceCol = parseInt(piece.dataset.col);
        const emptyRow = parseInt(emptyPiece.dataset.row);
        const emptyCol = parseInt(emptyPiece.dataset.col);
        
        // Check if piece is adjacent to empty space
        const isAdjacent =
            (pieceRow === emptyRow && Math.abs(pieceCol - emptyCol) === 1) ||
            (pieceCol === emptyCol && Math.abs(pieceRow - emptyRow) === 1);
        
        if (isAdjacent) {
            // Swap positions
            piece.dataset.row = emptyRow;
            piece.dataset.col = emptyCol;
            emptyPiece.dataset.row = pieceRow;
            emptyPiece.dataset.col = pieceCol;
            
            // Update grid positions
            updatePiecePositions();
            
            // Check if puzzle is solved
            checkSolution();
        }
    }
    
    function updatePiecePositions() {
        // Update grid-area for all pieces based on their row/col
        puzzleGrid.querySelectorAll('.puzzle-piece').forEach(piece => {
            const row = parseInt(piece.dataset.row) + 1; // CSS grid is 1-based
            const col = parseInt(piece.dataset.col) + 1;
            piece.style.gridArea = `${row} / ${col} / ${row + 1} / ${col + 1}`;
            
            // Check if piece is in correct position
            const isCorrect =
                piece.dataset.row === piece.dataset.correctRow &&
                piece.dataset.col === piece.dataset.correctCol;
            
            if (isCorrect && !piece.classList.contains('empty')) {
                piece.classList.add('correct-position');
            } else {
                piece.classList.remove('correct-position');
            }
        });
    }
    
    function highlightTarget(piece) {
        // Highlight where this piece should go
        const correctRow = parseInt(piece.dataset.correctRow);
        const correctCol = parseInt(piece.dataset.correctCol);
        
        // Create highlight element
        const highlight = document.createElement('div');
        highlight.className = 'puzzle-piece target-highlight';
        highlight.style.gridArea = `${correctRow + 1} / ${correctCol + 1} / ${correctRow + 2} / ${correctCol + 2}`;
        highlight.style.backgroundImage = piece.style.backgroundImage;
        highlight.style.backgroundPosition = piece.style.backgroundPosition;
        highlight.style.opacity = '0.7';
        highlight.id = 'target-highlight';
        
        // Add to grid
        puzzleGrid.appendChild(highlight);
    }
    
    function removeHighlight() {
        const highlight = document.getElementById('target-highlight');
        if (highlight) {
            highlight.remove();
        }
    }
    
    function shufflePieces(pieces) {
        // Get empty piece
        const emptyPiece = puzzleGrid.querySelector('.empty');
        if (!emptyPiece) return;
        
        // Make random moves
        for (let i = 0; i < 100; i++) {
            const emptyRow = parseInt(emptyPiece.dataset.row);
            const emptyCol = parseInt(emptyPiece.dataset.col);
            
            // Find adjacent pieces
            const adjacentPieces = pieces.filter(piece => {
                const pieceRow = parseInt(piece.dataset.row);
                const pieceCol = parseInt(piece.dataset.col);
                
                return (
                    (pieceRow === emptyRow && Math.abs(pieceCol - emptyCol) === 1) ||
                    (pieceCol === emptyCol && Math.abs(pieceRow - emptyRow) === 1)
                );
            });
            
            if (adjacentPieces.length > 0) {
                // Pick a random adjacent piece
                const randomPiece = adjacentPieces[Math.floor(Math.random() * adjacentPieces.length)];
                
                // Swap with empty piece
                const pieceRow = parseInt(randomPiece.dataset.row);
                const pieceCol = parseInt(randomPiece.dataset.col);
                
                randomPiece.dataset.row = emptyRow;
                randomPiece.dataset.col = emptyCol;
                emptyPiece.dataset.row = pieceRow;
                emptyPiece.dataset.col = pieceCol;
            }
        }
        
        // Update positions after shuffling
        updatePiecePositions();
    }
    
    function checkSolution() {
        let solved = true;
        
        // Check if all pieces are in correct position
        puzzleGrid.querySelectorAll('.puzzle-piece:not(.empty)').forEach(piece => {
            const isCorrect =
                piece.dataset.row === piece.dataset.correctRow &&
                piece.dataset.col === piece.dataset.correctCol;
            
            if (!isCorrect) {
                solved = false;
            }
        });
        
        if (solved) {
            // Show success message
            setTimeout(() => {
                alert('Congratulations! You solved the puzzle!');
                // Reset to original image
                puzzleGrid.style.display = 'none';
                originalImage.style.opacity = '1';
            }, 500);
        }
    }
    
    function resetPuzzle() {
        if (puzzleGrid.style.display === 'grid') {
            startPuzzle(); // Restart the puzzle
        }
    }
    
    function solvePuzzle() {
        if (puzzleGrid.style.display === 'grid') {
            // Place all pieces in correct position
            puzzleGrid.querySelectorAll('.puzzle-piece:not(.empty)').forEach(piece => {
                piece.dataset.row = piece.dataset.correctRow;
                piece.dataset.col = piece.dataset.correctCol;
            });
            
            // Place empty piece in bottom-right
            const emptyPiece = puzzleGrid.querySelector('.empty');
            if (emptyPiece) {
                emptyPiece.dataset.row = 2;
                emptyPiece.dataset.col = 2;
            }
            
            // Update positions
            updatePiecePositions();
            
            // Show success message
            setTimeout(() => {
                puzzleGrid.style.display = 'none';
                originalImage.style.opacity = '1';
            }, 1000);
        }
    }
}

// Sliding Puzzle for last section
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