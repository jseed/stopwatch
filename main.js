
const displayEl = document.getElementById('timer-display');
const timer = new Timer();

document.getElementById('timer-start').onclick = () => timer.start();
document.getElementById('timer-stop').onclick = () => timer.stop();
document.getElementById('timer-reset').onclick = () => timer.reset();

(function displayLoop() {
    timer.tick();
    displayEl.innerHTML = formatTime(timer.getElapsedTime());
    window.requestAnimationFrame(() => displayLoop());
})()


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

