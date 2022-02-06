export class Timer {

    constructor() {
        this.running = false;
        this.elapsedTime = 0;
        this.lastTime = 0;
    }

    toggle() {
        if (this.running) {
            this.stop();
        } else {
            this.start();
        }
    }

    start() {
        this.running = true;
        this.lastTime = 0;
        this.tick();
    }

    stop() {
        this.tick();
        this.running = false;
    }

    reset() {
        this.running = false;
        this.lastTime = 0;
        this.elapsedTime = 0;
    }

    tick() {
        if (!this.running) return false;
        const now = performance.now();
        if (!this.lastTime) this.lastTime = now;
        this.elapsedTime += now - this.lastTime;
        this.lastTime = now;
    }

    getElapsedTime() {
        this.tick();
        return this.elapsedTime;
    }

}
