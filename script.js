// Set the date we're counting down to (e.g., 15 seconds from now for testing the 10-second countdown)
const countDownDate = new Date("2025-10-09T00:00:00").getTime(); // Set to 15 seconds from now

// Get timer elements
const dayReels = document.querySelectorAll('[data-unit="days"] .digit-reel');
const hourReels = document.querySelectorAll('[data-unit="hours"] .digit-reel');
const minuteReels = document.querySelectorAll('[data-unit="minutes"] .digit-reel');
const secondReels = document.querySelectorAll('[data-unit="seconds"] .digit-reel');

// Get other elements
const container = document.querySelector(".container");
const finalCountdownOverlay = document.getElementById('final-countdown-overlay');
const finalCountdownNumber = document.getElementById('final-countdown-number');
const messageCard = document.getElementById('message-card');

let clickCount = 0;
let isClickable = true; // Debounce flag

const tick = (reels, value) => {
    if (!reels || reels.length === 0) return;
    const formattedValue = String(value).padStart(2, '0');
    const digitHeight = reels[0].clientHeight / 10;
    if (isNaN(digitHeight) || digitHeight === 0) return;
    reels[0].style.transform = `translateY(-${formattedValue[0] * digitHeight}px)`;
    reels[1].style.transform = `translateY(-${formattedValue[1] * digitHeight}px)`;
};

// Function to show a message
const showMessage = (text) => {
    messageCard.innerHTML = text;
    messageCard.style.display = 'block';
    messageCard.classList.add('card-anim');
    setTimeout(() => {
        messageCard.style.display = 'none';
        messageCard.classList.remove('card-anim');
    }, 5000); // Hide after 5 seconds
};

const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance <= 0) {
        clearInterval(interval);
        
        // Hide the final countdown overlay
        if (finalCountdownOverlay) {
            finalCountdownOverlay.style.display = 'none';
            finalCountdownOverlay.classList.remove('visible');
        }

        // Hide the main content container
        if (container) container.style.display = 'none';

        // Create and append the "Press" button
        const surpriseButton = document.createElement('button');
        surpriseButton.id = 'surprise-button';
        surpriseButton.innerText = 'Press';
        surpriseButton.style.position = 'absolute'; // For centering
        surpriseButton.style.top = '50%';
        surpriseButton.style.left = '50%';
        surpriseButton.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(surpriseButton);

        surpriseButton.addEventListener('click', (event) => {
            if (!isClickable) return;
            isClickable = false;

            clickCount++;

            if (clickCount === 1) {
                // On 1st click, move to top-right and remove centering transform
                surpriseButton.style.transform = 'none'; // IMPORTANT FIX
                surpriseButton.style.top = '20px';
                surpriseButton.style.left = 'auto';
                surpriseButton.style.right = '20px';
                surpriseButton.style.bottom = 'auto';
                showMessage("Are ye to game ho gaya 😂<br>acha ab try karo ab click ho jayega");
                setTimeout(() => { isClickable = true; }, 500);
            } else if (clickCount === 2) {
                // On 2nd click, move to bottom-left
                surpriseButton.style.transform = 'none'; // IMPORTANT FIX
                surpriseButton.style.top = 'auto';
                surpriseButton.style.left = '20px';
                surpriseButton.style.right = 'auto';
                surpriseButton.style.bottom = '20px';
                showMessage("Uff kya pareshani hai buggu 🤦‍♂️ ye click kyu nahi ho raha hai");
                setTimeout(() => { isClickable = true; }, 500);
            } else {
                window.location.href = 'birthday.html';
            }
        });

        return;
    }

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const totalSecondsLeft = Math.floor(distance / 1000);

    if (totalSecondsLeft < 10 && distance > 0) {
        // Hide main content and show overlay
        if (container) container.style.display = 'none';
        if (finalCountdownOverlay) {
            finalCountdownOverlay.style.display = 'flex';
            finalCountdownOverlay.classList.add('visible'); // Trigger fade-in
        }

        const currentNumber = parseInt(finalCountdownNumber.innerText);
        const newNumber = totalSecondsLeft + 1;

        if (currentNumber !== newNumber) {
            finalCountdownNumber.innerText = newNumber;
            finalCountdownNumber.classList.remove('number-pop-in');
            void finalCountdownNumber.offsetWidth;
            finalCountdownNumber.classList.add('number-pop-in');
        }
    } else {
        // Ensure main content is visible if not in final countdown phase
        if (container) container.style.display = 'flex'; // Assuming container is flex
        if (finalCountdownOverlay) {
            finalCountdownOverlay.style.display = 'none';
            finalCountdownOverlay.classList.remove('visible');
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        tick(dayReels, days);
        tick(hourReels, hours);
        tick(minuteReels, minutes);
        tick(secondReels, seconds);
    }

}, 1000);
