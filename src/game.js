`use strict`;
import Field from "./field.js";

export const Reason = Object.freeze({
  win: `win`,
  lose: `lose`,
  cancel: `cancel`,
  timeout: `timeout`,
  gameOut: `gameOut`,
});
export class GameBulider {
  wallyCount(num) {
    this.wally = num;
    return this;
  }
  wally2Count(num) {
    this.wally2 = num;
    return this;
  }
  duration(num) {
    this.duration = num;
    return this;
  }
  build() {
    return new Game(this.wally, this.wally2, this.duration);
  }
}

class Game {
  constructor(wally, wally2, duration) {
    //
    this.score = 0;
    this.timer;
    this.started = false;
    this.level = 1;
    //
    this.wally = wally;
    this.wally2 = wally2;
    this.duration = duration;
    //
    this.game = document.querySelector(`.game__start`);
    this.gameBox = document.querySelector(`.game__didscription`);
    this.gameScore = document.querySelector(`.game__score`);
    this.gameTimer = document.querySelector(`.game__timer`);
    this.gameLevel = document.querySelector(`.game__level`);
    this.gameBtn = document.querySelector(`.game__start-button`);
    //
    this.field = new Field(this.wally, this.wally2);
    this.field.fieldOnClick((item) => {
      if (!this.started) {
        return;
      }

      if (item === `wally`) {
        ++this.score;
        this.upDateScore();
        if (this.score === this.wally) {
          if (this.level === 5) {
            this.stop(Reason.gameOut);
          } else {
            this.stop(Reason.win);
          }
        }
      } else if (item === `wally2`) {
        this.stop(Reason.lose);
      }
    });

    this.gameBtn.addEventListener(`click`, () => {
      this.start();
    });
  }

  OnClick(func) {
    this.onclick = func;
  }

  start() {
    this.started = true;
    this.initGame(this.level);
    this.showBox();
    this.hideTitle();
    this.startTimer();
    this.upDateLevel(this.level);
  }

  showBox() {
    this.gameBox.style.visibility = `visible`;
  }
  hideTitle() {
    this.game.style.display = `none`;
  }
  startTimer() {
    let reminingTime = this.duration;
    this.upDateTimer(reminingTime);
    this.timer = setInterval(() => {
      if (reminingTime <= 0) {
        clearInterval(this.timer);
        this.stop(Reason.timeout);
        return;
      }
      this.upDateTimer(--reminingTime);
    }, 1000);
  }
  upDateTimer(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (seconds < 10) {
      this.gameTimer.textContent = `${minutes}:0${seconds}`;
    } else {
      this.gameTimer.textContent = `${minutes}:${seconds}`;
    }
  }
  upDateLevel(level) {
    this.gameLevel.textContent = `Level ${level}`;
  }

  initGame(level) {
    this.score = 0;
    this.gameScore.textContent = this.wally;
    this.field.init(level);
  }

  stop(reason) {
    this.started = false;
    this.stopTimer();
    this.onclick && this.onclick(reason);
  }
  stopTimer() {
    clearInterval(this.timer);
  }
  levelUp() {
    this.level++;
  }

  levelOne() {
    this.level = 1;
  }
  upDateScore() {
    this.gameScore.textContent = this.wally - this.score;
  }
}
