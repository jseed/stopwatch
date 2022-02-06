import { Timer } from './timer.js';
const displayEl = document.getElementById('timer-display');
const lapsEl = document.getElementById('timer-laps')
const timer = new Timer();
let laps = [];

document.getElementById('btn-start').onclick = () => startClicked();
document.getElementById('btn-stop').onclick = () => stopClicked();
document.getElementById('btn-reset').onclick = () => resetClicked();
document.getElementById('btn-lap').onclick = () => lapClicked();

(function displayLoop() {
    timer.tick();
    displayEl.innerHTML = formatTime(timer.getElapsedTime());
    window.requestAnimationFrame(() => displayLoop());
})()


function startClicked() {
    timer.start();
}

function stopClicked() {
    timer.stop();
}

function resetClicked() {
    laps = [];
    lapsEl.innerHTML = '';
    timer.reset();
}

function lapClicked() {
    const lapTime = timer.getElapsedTime();
    let prevLapTime = 0;

    if (laps.length > 0) {
        prevLapTime = laps[laps.length - 1];
    }

    laps.push(lapTime);

    const lapDuration = lapTime - prevLapTime;
    renderLap(laps.length, lapTime, lapDuration);
}

function formatTime(time) {
    const pad = (val, size) => val.toString().padStart(size, '0');

    time = Math.floor(time);

    const milliseconds = time % 1000;
    time = Math.floor(time / 1000);

    const seconds = time % 60;
    time = Math.floor(time / 60);

    const minutes = time % 60;
    time = Math.floor(time / 60);

    return `${pad(time, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 3)}`;
}

function renderLap(number, time, duration) {

    if(number === 1) {
        lapsEl.insertAdjacentHTML('afterbegin', `
        <div class="timer-lap-number timer-lap-header">Lap</div>
        <div class="timer-lap-time timer-lap-header">Time</div>
        <div class="timer-lap-duration timer-lap-header">Duration</div>
        `);
    }
    const lapHTML = `
        <div class="timer-lap-number timer-lap-col">${number}</div>
        <div class="timer-lap-time timer-lap-col">${formatTime(time)}</div>
        <div class="timer-lap-duration timer-lap-col">${formatTime(duration)}</div>
    `;

    lapsEl.insertAdjacentHTML('afterbegin', lapHTML);
}
