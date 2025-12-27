#  Advanced Clock App

A sleek, responsive, and functional web-based time management tool. This application features a live digital clock, a high-precision stopwatch with lap recording, and a customizable countdown timer. It also includes a modern UI with a dedicated Light and Dark mode toggle.

---

## Features

### 1. Digital Clock
- **Real-time Updates:** Displays current local time (HH:MM:SS).
- **Date Display:** Shows the full date including the day of the week.

### 2. Stopwatch
- **Millisecond Precision:** Tracks time down to 1/100th of a second.
- **Lap System:** Record specific time markers without stopping the clock.
- **Controls:** Start, Pause, Stop, and Reset functionality.

### 3. Countdown Timer
- **Customizable Input:** Set hours, minutes, and seconds.
- **Persistent State:** Features Pause and Resume capabilities.
- **Alert System:** Notifies the user with a browser alert when time is up.

### 4. UI/UX Features
- **Theme Toggle:** Switch instantly between Dark and Light modes.
- **Responsive Design:** Optimized for both desktop and mobile viewing.
- **Interactive UI:** Buttons change state (Start/Pause) dynamically.

---

## Built With

- **HTML5:** Semantic structure.
- **CSS3:** Custom styling with CSS Variables for theme switching.
- **JavaScript (ES6):** Logic for time calculations and DOM manipulation.
- **FontAwesome:** Scalable vector icons for the control buttons.

---

## Project Structure

```text
├── index.html   # Main structure and layout
├── style.css    # Styling, layout, and theme variables
├── script.js    # Logic for Clock, Stopwatch, and Timer
└── favicon.png  # Browser tab icon

---

How to Use
Clone or Download: Save the project files to your local machine.

Open in Browser: Double-click index.html or use a "Live Server" extension (like in VS Code) to view the app.

Switch Modes: Use the navigation bar at the top to toggle between Clock, Stopwatch, and Timer.

Theme Toggle: Click the Mode button to swap between Dark and Light themes.

Code Logic Overview
Stopwatch: Uses Date.now() to calculate the difference between the start time and the current time, ensuring accuracy even if the browser logic lags slightly.

Timer: Converts user input into total milliseconds and subtracts 10ms every cycle.

Formatting: A utility function formatTime() handles the conversion of raw milliseconds into a readable 00:00:00.00 format.
