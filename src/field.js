`use strict`;
const WALLY_SIZE = 80;

export default class Field {
  constructor(wally, wally2) {
    this.wally2 = wally2;
    this.wally = wally;
    this.field = document.querySelector(`.field`);
    this.fieldRect = this.field.getBoundingClientRect();

    this.field.addEventListener(`click`, (e) => {
      const target = e.target;
      if (target.matches(`.wally`)) {
        target.remove();
        this.fieldOnClick && this.fieldOnClick(`wally`);
      } else if (target.matches(`.wally2`) || target.matches(`.wally-gf`)) {
        this.fieldOnClick && this.fieldOnClick(`wally2`);
      }
    });
  }

  fieldOnClick(func) {
    this.fieldOnClick = func;
  }

  addItem(className, count, src) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - WALLY_SIZE;
    const y2 = this.fieldRect.height - WALLY_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement(`img`);
      item.setAttribute(`class`, className);
      item.setAttribute(`src`, src);
      item.style.position = `absolute`;
      item.style.cursor = `pointer`;
      const x = randomNum(x1, x2);
      const y = randomNum(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  init(level) {
    this.field.innerHTML = ``;
    if (level === 1) {
      this.wally2 = 3;
    }
    if (level === 2) {
      this.wally2 = 4;
    }
    if (level === 3) {
      this.wally2 = 5;
    }
    if (level === 4) {
      this.wally2 = 6;
    }
    if (level === 5) {
      this.wally2 = 7;
    }
    this.addItem(`wally`, this.wally, `img/wally.png`);
    this.addItem(`wally2`, this.wally2, `img/wally1.png`);
    this.addItem(`wally-gf`, this.wally2, `img/wally-gf.png`);
  }
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}
