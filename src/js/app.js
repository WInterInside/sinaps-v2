console.log("app init");

class Timer24Min {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.minElem = this.container.querySelector('[data-element="min"]');
    this.secElem = this.container.querySelector('[data-element="sec"]');
    this.partsElem = this.container.querySelector('[data-element="parts"]');

    this.totalTime = 24 * 60 * 1000;
    this.startTime = null;
    this.timerId = null;
  }

  start() {
    this.startTime = performance.now();
    this.update();
  }

  update() {
    const elapsed = performance.now() - this.startTime;
    const remaining = Math.max(this.totalTime - elapsed, 0);

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    const parts = Math.floor((remaining % 1000) / 10);

    this.minElem.textContent = minutes.toString().padStart(2, '0');
    this.secElem.textContent = seconds.toString().padStart(2, '0');
    this.partsElem.textContent = parts.toString().padStart(2, '0');

    if (remaining > 0) {
      this.timerId = requestAnimationFrame(this.update.bind(this));
    } else {
      this.minElem.textContent = '00';
      this.secElem.textContent = '00';
      this.partsElem.textContent = '00';
    }
  }

  stop() {
    if (this.timerId) cancelAnimationFrame(this.timerId);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const timer = new Timer24Min('.hero__timer-content');
  timer.start();
});