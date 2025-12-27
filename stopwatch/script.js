/**
 * --- Tab & Theme System ---
 * Handles section switching and Light/Dark mode transitions.
 */
function showTab(tabId) {
    // Hide all sections and remove 'active' styling from all buttons
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    // Show the specific section and highlight the button
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    // Swap the data-theme attribute between 'dark' and 'light'
    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

/**
 * --- Digital Clock ---
 * Uses the built-in Date object to update the time every second.
 */
function updateClock() {
    const now = new Date();
    // Format: 24-hour time (HH:MM:SS)
    const timeString = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('main-clock').innerText = timeString;
    
    // Format: Full date (e.g., Monday, July 28, 2025)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('main-date').innerText = now.toLocaleDateString(undefined, options);
}
// Run the clock function every 1000ms (1 second)
setInterval(updateClock, 1000);
updateClock(); // Run immediately on load

/**
 * --- Stopwatch Logic ---
 * Tracks time using Date.now() for high precision.
 */
let swInterval, swStartTime, swElapsedTime = 0;
let lapCounter = 1;

function startStopwatch() {
    // swStartTime calculates the "real" start by subtracting time already elapsed
    swStartTime = Date.now() - swElapsedTime;
    swInterval = setInterval(() => {
        swElapsedTime = Date.now() - swStartTime;
        document.getElementById('stopwatch-display').innerText = formatTime(swElapsedTime);
    }, 10); // Updates every 10ms for centisecond precision
    toggleBtns('sw', true);
}

function pauseStopwatch() {
    clearInterval(swInterval); // Stops the loop but keeps swElapsedTime saved
    toggleBtns('sw', false);
}

function stopStopwatch() {
    clearInterval(swInterval);
    toggleBtns('sw', false);
}

function resetStopwatch() {
    stopStopwatch();
    swElapsedTime = 0; // Reset variables to zero
    lapCounter = 1;
    document.getElementById('stopwatch-display').innerText = "00:00:00.00";
    document.getElementById('sw-laps-list').innerHTML = ''; // Clear lap list
}

function addLap() {
    if (swElapsedTime > 0) {
        const li = document.createElement('li');
        // Create a list item with current stopwatch time
        li.innerHTML = `<span>Lap ${lapCounter++}</span> <span>${formatTime(swElapsedTime)}</span>`;
        document.getElementById('sw-laps-list').prepend(li); // Adds new lap to the top
    }
}

/**
 * --- Timer Logic ---
 * Countdown logic that converts inputs to milliseconds.
 */
let tInterval, tRemaining = 0;

function startTimer() {
    // If timer is at zero, read the hours/minutes/seconds from inputs
    if (tRemaining <= 0) {
        const h = parseInt(document.getElementById('t-hr').value) || 0;
        const m = parseInt(document.getElementById('t-min').value) || 0;
        const s = parseInt(document.getElementById('t-sec').value) || 0;
        tRemaining = (h * 3600 + m * 60 + s) * 1000; // Total ms
    }

    if (tRemaining <= 0) return; // Don't start if time is 0

    tInterval = setInterval(() => {
        tRemaining -= 10; // Subtract 10ms every cycle
        if (tRemaining <= 0) {
            clearInterval(tInterval);
            tRemaining = 0;
            alert("Timer Finished!");
            toggleBtns('t', false);
        }
        document.getElementById('timer-display').innerText = formatTime(tRemaining);
    }, 10);
    toggleBtns('t', true);
}

function pauseTimer() {
    clearInterval(tInterval);
    toggleBtns('t', false);
}

function resetTimer() {
    clearInterval(tInterval);
    tRemaining = 0;
    // Clear display and reset all input boxes
    document.getElementById('timer-display').innerText = "00:00:00.00";
    document.getElementById('t-hr').value = '';
    document.getElementById('t-min').value = '';
    document.getElementById('t-sec').value = '';
    toggleBtns('t', false);
}

/**
 * --- Utility Functions ---
 * Format ms into a string and toggle button visibility.
 */
function formatTime(ms) {
    if (ms < 0) ms = 0;
    // Math to separate hours, mins, secs, and centiseconds
    const h = Math.floor(ms / 3600000).toString().padStart(2, '0');
    const m = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
    const s = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const cs = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${h}:${m}:${s}.${cs}`;
}

function toggleBtns(prefix, isRunning) {
    // Shows Pause and hides Start while running, and vice versa
    document.getElementById(`${prefix}-start`).style.display = isRunning ? 'none' : 'inline-block';
    document.getElementById(`${prefix}-pause`).style.display = isRunning ? 'inline-block' : 'none';
}