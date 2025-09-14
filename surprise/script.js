// Set the date we're counting down to
const countDownDate = new Date("Oct 9, 2025 00:00:00").getTime();

// Get all the digit reels
const dayReels = document.querySelectorAll('[data-unit="days"] .digit-reel');
const hourReels = document.querySelectorAll('[data-unit="hours"] .digit-reel');
const minuteReels = document.querySelectorAll('[data-unit="minutes"] .digit-reel');
const secondReels = document.querySelectorAll('[data-unit="seconds"] .digit-reel');

const tick = (reels, value) => {
    // Format value to be two digits
    const formattedValue = String(value).padStart(2, '0');
    
    // Get the height of one digit
    const digitHeight = reels[0].clientHeight / 10;

    // Set the transform for the first digit (tens)
    reels[0].style.transform = `translateY(-${formattedValue[0] * digitHeight}px)`;
    
    // Set the transform for the second digit (ones)
    reels[1].style.transform = `translateY(-${formattedValue[1] * digitHeight}px)`;
};

const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // If the countdown is over
    if (distance <= 0) {
        clearInterval(interval);
        document.querySelector(".countdown-container").innerHTML = 
            "<div style='font-size: 2.5em; padding: 20px; width: 100%; color: #FFD700;'>HAPPY BIRTHDAY, MY STAR! ✨</div>";
        document.querySelector('h1').innerHTML = "The Day is Here!";
        document.querySelector('p:not(.signature)').innerHTML = "The wait is over! Your special day has arrived. Let the celebration begin!";
        return;
    }

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update each reel set
    tick(dayReels, days);
    tick(hourReels, hours);
    tick(minuteReels, minutes);
    tick(secondReels, seconds);

}, 1000);