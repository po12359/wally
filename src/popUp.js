`use strict`;

export const Result = Object.freeze({
  win: `win`,
  lose: `lose`,
  timeout: `timeout`,
  stop: `stop`,
  gameOut: `gameOut`,
});

export class PopUp {
  constructor() {
    this.popUp = document.querySelector(`.pop-up`);
    this.popUpRefresh = document.querySelector(`.pop-up__refresh`);
    this.popUpNext = document.createElement(`button`);
    this.popUpMessage = document.querySelector(`.pop-up__message`);

    this.popUpRefresh.addEventListener(`click`, () => {
      //level = 1;
      // gameStart();
      this.refreshOnClick && this.refreshOnClick();
      this.hide();
    });
    this.popUpNext.addEventListener(`click`, () => {
      // levelUp();
      // gameStart();
      this.nextOnClick && this.nextOnClick();
      this.hide();
    });
  }

  refreshOnClick(func) {
    this.refreshOnClick = func;
  }

  nextOnClick(func) {
    this.nextOnClick = func;
  }
  nextStage() {
    this.popUpRefresh.style.display = `none`;
    this.popUpNext.style.display = `inline`;
    this.popUpNext.innerHTML = ``;
    this.popUpNext.setAttribute(`class`, `pop-up__nextStage`);
    const icon = document.createElement(`i`);
    icon.setAttribute(`class`, "fab fa-apple");
    this.popUpNext.appendChild(icon);
    this.popUp.prepend(this.popUpNext);
  }

  refresh() {
    this.popUpNext.style.display = `none`;
    this.popUpRefresh.style.display = `inline`;
  }

  showWithText(reason) {
    this.popUp.style.visibility = `visible`;
    let message;
    switch (reason) {
      case Result.win:
        this.nextStage();
        message = ` You Win! Go to Next Stage?`;
        break;
      case Result.lose:
        this.refresh();
        message = `You Lose👎`;
        break;
      case Result.timeout:
        this.refresh();
        message = `Oh!! Time Out⏰`;
        break;
      case Result.gameOut:
        this.refresh();
        message = `Congratulations🎉`;
        break;
      default:
        new Error(`get out here!`);
        break;
    }
    this.popUpMessage.textContent = message;
  }

  hide() {
    this.popUp.style.visibility = `hidden`;
  }
}
