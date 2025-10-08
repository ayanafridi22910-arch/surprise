document.addEventListener('DOMContentLoaded', () => {

    // --- Slider Logic ---
    const slider = document.querySelector('.message-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    function showSlide(index) {
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    nextBtn.addEventListener('click', () => { currentSlide++; showSlide(currentSlide); });
    prevBtn.addEventListener('click', () => { currentSlide--; showSlide(currentSlide); });

    // --- General Modal Logic ---
    document.getElementById('love-you-button').addEventListener('click', () => {
        document.getElementById('love-you-modal').style.display = 'flex';
    });
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    // --- 1. Endless Kisses Animation Logic ---
    const kissOverlay = document.getElementById('kiss-overlay');
    const kissButton = document.getElementById('kiss-button');
    const stopKissButton = document.getElementById('stop-kiss-button');
    let kissInterval;

    kissButton.addEventListener('click', () => {
        kissOverlay.style.display = 'block';
        kissInterval = setInterval(createKiss, 200);
    });

    stopKissButton.addEventListener('click', () => {
        kissOverlay.style.display = 'none';
        clearInterval(kissInterval);
        // Remove existing kisses to clean up
        document.querySelectorAll('.kiss-emoji').forEach(kiss => kiss.remove());
    });

    function createKiss() {
        const kiss = document.createElement('div');
        kiss.classList.add('kiss-emoji');
        kiss.textContent = '😘';
        kiss.style.left = Math.random() * 100 + 'vw';
        kiss.style.animationDuration = Math.random() * 2 + 3 + 's'; // random duration
        kissOverlay.appendChild(kiss);
        setTimeout(() => { kiss.remove(); }, 5000); // remove after 5s
    }

    // --- 2. Catch My Heart Game Logic ---
    const heartGameOverlay = document.getElementById('heart-game-overlay');
    const heartGameButton = document.getElementById('heart-game-button');
    const closeHeartGameButton = document.getElementById('close-heart-game-button');
    const heartResult = document.getElementById('heart-game-result');
    const heartInstructions = document.getElementById('heart-game-instructions');
    let heartInterval;

    heartGameButton.addEventListener('click', startHeartGame);

    function startHeartGame() {
        heartGameOverlay.style.display = 'block';
        heartResult.style.display = 'none';
        heartInstructions.style.display = 'block';
        closeHeartGameButton.style.display = 'none';

        // Create normal hearts
        heartInterval = setInterval(createHeart, 300);

        // Create the special heart after a delay
        setTimeout(createSpecialHeart, 4000);
    }
    
    closeHeartGameButton.addEventListener('click', () => {
        heartGameOverlay.style.display = 'none';
        clearInterval(heartInterval);
        document.querySelectorAll('.heart-emoji, .special-heart').forEach(h => h.remove());
    });

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-emoji');
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's';
        heartGameOverlay.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 7000);
    }

    function createSpecialHeart() {
        const special = document.createElement('div');
        special.classList.add('special-heart');
        special.textContent = '💖';
        special.style.left = Math.random() * 90 + 'vw';
        special.addEventListener('click', () => {
            clearInterval(heartInterval);
            heartResult.textContent = "You've Caught My Heart!";
            heartResult.style.display = 'block';
            heartInstructions.style.display = 'none';
            closeHeartGameButton.style.display = 'block';
        }, { once: true });
        heartGameOverlay.appendChild(special);
        setTimeout(() => { special.remove(); }, 6000);
    }
    
    // --- 4. Love Puzzle Game Logic ---
    const puzzleOverlay = document.getElementById('puzzle-game-overlay');
    const puzzleButton = document.getElementById('puzzle-game-button');
    const closePuzzleButton = document.getElementById('close-puzzle-game-button');
    const puzzleSlotsContainer = document.getElementById('puzzle-slots');
    const puzzleLettersContainer = document.getElementById('puzzle-letters');
    const puzzleResult = document.getElementById('puzzle-result');
    
    const puzzlePhrase = "MYBUGGU";
    let draggedLetter = null;

    puzzleButton.addEventListener('click', () => {
        setupPuzzle();
        puzzleOverlay.style.display = 'flex';
    });
    
    closePuzzleButton.addEventListener('click', () => {
        puzzleOverlay.style.display = 'none';
    });

    function setupPuzzle() {
        puzzleSlotsContainer.innerHTML = '';
        puzzleLettersContainer.innerHTML = '';
        puzzleResult.textContent = '';
        
        let shuffledLetters = puzzlePhrase.split('').sort(() => Math.random() - 0.5);

        for (let i = 0; i < puzzlePhrase.length; i++) {
            const slot = document.createElement('div');
            slot.classList.add('puzzle-slot');
            slot.dataset.index = i;
            puzzleSlotsContainer.appendChild(slot);
        }

        shuffledLetters.forEach(letter => {
            const letterEl = document.createElement('div');
            letterEl.classList.add('puzzle-letter');
            letterEl.textContent = letter;
            letterEl.draggable = true;
            puzzleLettersContainer.appendChild(letterEl);
        });
        
        addDragAndDropListeners();
    }

    function addDragAndDropListeners() {
        const letters = document.querySelectorAll('.puzzle-letter');
        const slots = document.querySelectorAll('.puzzle-slot');

        letters.forEach(letter => {
            letter.addEventListener('dragstart', (e) => {
                draggedLetter = e.target;
            });
        });
        
        slots.forEach(slot => {
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                if (e.target.classList.contains('puzzle-slot') && e.target.childElementCount === 0) {
                    e.target.appendChild(draggedLetter);
                    checkPuzzle();
                }
            });
        });
        
        // Allow dropping back to the letters container
        puzzleLettersContainer.addEventListener('dragover', e => e.preventDefault());
        puzzleLettersContainer.addEventListener('drop', e => {
            e.preventDefault();
            puzzleLettersContainer.appendChild(draggedLetter);
        });
    }
    
    function checkPuzzle() {
        const slots = document.querySelectorAll('.puzzle-slot');
        let currentGuess = '';
        slots.forEach(slot => {
            if(slot.firstChild) {
                currentGuess += slot.firstChild.textContent;
            }
        });
        
        if (currentGuess.length === puzzlePhrase.length) {
            if (currentGuess === puzzlePhrase) {
                puzzleResult.textContent = 'You Solved It! You are my world!';
                puzzleResult.style.color = '#2ed573';
            } else {
                puzzleResult.textContent = 'Not quite... Try again!';
                puzzleResult.style.color = '#ff4757';
            }
        }
    }
});