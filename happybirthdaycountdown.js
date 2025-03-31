document.addEventListener('DOMContentLoaded', function() {
    const birthdayInput = document.getElementById('birthdayInput');
    const startButton = document.getElementById('startCountdown');
    const countdownDisplay = document.querySelector('.countdown-display');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const confettiContainer = document.querySelector('.confetti-container');
    let countdownInterval;

    // Set minimum date to today
    const today = new Date();
    const minDate = today.toISOString().slice(0, 16);
    birthdayInput.min = minDate;

    startButton.addEventListener('click', function() {
        const selectedDate = new Date(birthdayInput.value);
        if (selectedDate <= today) {
            alert('Please select a future date and time!');
            return;
        }

        // Hide input section and show countdown
        document.querySelector('.input-section').style.display = 'none';
        countdownDisplay.style.display = 'flex';

        // Start countdown
        updateCountdown(selectedDate);
        countdownInterval = setInterval(() => updateCountdown(selectedDate), 1000);
    });

    function updateCountdown(targetDate) {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(countdownInterval);
            showBirthdayMessage();
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    function showBirthdayMessage() {
        birthdayMessage.style.display = 'flex';
        createConfetti();
    }

    function createConfetti() {
        const colors = ['#ff6b6b', '#ffd93d', '#6c5ce7', '#a8e6cf', '#ff8b94'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.opacity = Math.random();
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confettiContainer.appendChild(confetti);
        }
    }
}); 