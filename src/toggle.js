`use strict`;

export default class Toggle {
  constructor() {
    this.toggleBtn = document.querySelector(`.toggle__button`);
    this.toggleClose = document.querySelector(`.toggle__close`);
    this.toggle = document.querySelector(`.toggle_section`);
    this.toggleBtn.addEventListener(`click`, () => {
      this.toggle.classList.remove(`non-display`);
    });
    this.toggleClose.addEventListener(`click`, () => {
      this.toggle.classList.add(`non-display`);
    });
  }
}
