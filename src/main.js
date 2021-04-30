`use strict`;
let score = 0;
let timer;
let started = false;
let level = 1;
//
const Reason = Object.freeze({
  win: `win`,
  lose: `lose`,
  cancel: `cancel`,
  timeout: `timeout`,
  gameOut: `gameOut`,
});
//
const WALLY_COUNT = 2;
let WAALY2_COUNT = 2;
const TIMER_MIN = 180;
const WALLY_SIZE = 80;
//
const field = document.querySelector(`.field`);
const fieldRect = field.getBoundingClientRect();
//
const game = document.querySelector(`.game__start`);
const gameBox = document.querySelector(`.game__didscription`);
const gameScore = document.querySelector(`.game__score`);
const gameTimer = document.querySelector(`.game__timer`);
const gameLevel = document.querySelector(`.game__level`);
const gameBtn = document.querySelector(`.game__start-button`);
//
const popUp = document.querySelector(`.pop-up`);
const popUpRefresh = document.querySelector(`.pop-up__refresh`);
const popUpNext = document.createElement(`button`);
const popUpMessage = document.querySelector(`.pop-up__message`);
//
const toggleBtn = document.querySelector(`.toggle__button`);
const toggleClose = document.querySelector(`.toggle__close`);
const toggle = document.querySelector(`.toggle_section`);
toggleBtn.addEventListener(`click`, () => {
  toggle.classList.remove(`non-display`);
});
toggleClose.addEventListener(`click`, () => {
  toggle.classList.add(`non-display`);
});
gameBtn.addEventListener(`click`, () => {
  if (!started) {
    gameStart();
  } else if (started) {
    stopGame(Reason.cancel);
  }
});

function gameStart() {
  started = true;
  initGame(level);
  showGameBox();
  hideGameTitle();
  startTimer();
  upDateLevel(level);
}

function showStopBtn() {
  const icon = document.querySelector(`.fab`);
  icon.classList.remove(`fas, fa-reply-all`);
  icon.classList.add(`fas, fa-stop`);
}
function showGameBox() {
  gameBox.style.visibility = `visible`;
}
function hideGameTitle() {
  game.style.display = `none`;
}
function startTimer() {
  let reminingTime = TIMER_MIN;
  upDateTimer(reminingTime);
  timer = setInterval(() => {
    if (reminingTime <= 0) {
      clearInterval(timer);
      finishiGame(Reason.timeout);
      return;
    }
    upDateTimer(--reminingTime);
  }, 1000);
}
function upDateTimer(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (seconds < 10) {
    gameTimer.textContent = `${minutes}:0${seconds}`;
  } else {
    gameTimer.textContent = `${minutes}:${seconds}`;
  }
}
function upDateLevel(level) {
  gameLevel.textContent = `Level ${level}`;
}
function addItem(className, count, src) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - WALLY_SIZE;
  const y2 = fieldRect.height - WALLY_SIZE;
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
    field.appendChild(item);
  }
}
function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function initGame(level) {
  field.innerHTML = ``;
  if (level === 1) {
    WALLY2_COUNT = 3;
  }
  if (level === 2) {
    WALLY2_COUNT = 4;
  }
  if (level === 3) {
    WALLY2_COUNT = 5;
  }
  if (level === 4) {
    WALLY2_COUNT = 6;
  }
  if (level === 5) {
    WALLY2_COUNT = 7;
  }
  addItem();
  score = 0;
  gameScore.textContent = WALLY_COUNT;
  gameTimer.textContent = TIMER_MIN;
  addItem(`wally`, WALLY_COUNT, `img/wally.png`);
  addItem(`wally2`, WALLY2_COUNT, `img/wally1.png`);
  addItem(`wally-gf`, WALLY2_COUNT, `img/wally-gf.png`);
}

function stopGame(reason) {
  started = false;
  stopTimer();
  showPopUPWithText(reason);
}
function finishiGame(reason) {
  started = false;
  stopTimer();
  showPopUPWithText(reason);
}

function stopTimer() {
  clearInterval(timer);
}
function nextStage() {
  popUpRefresh.style.display = `none`;
  popUpNext.style.display = `inline`;
  popUpNext.innerHTML = ``;
  popUpNext.setAttribute(`class`, `pop-up__nextStage`);
  const icon = document.createElement(`i`);
  icon.setAttribute(`class`, "fab fa-apple");
  popUpNext.appendChild(icon);
  popUp.prepend(popUpNext);
}
function refresh() {
  popUpNext.style.display = `none`;
  popUpRefresh.style.display = `inline`;
}
function showPopUPWithText(reason) {
  popUp.style.visibility = `visible`;
  let message;
  switch (reason) {
    case Reason.win:
      nextStage();
      message = ` You Win! Go to Next Stage?`;
      break;
    case Reason.lose:
      refresh();
      message = `You Lose👎`;
      break;
    case Reason.timeout:
      refresh();
      message = `Oh!! Time Out⏰`;
      break;
    case Reason.stop:
      refresh();
      message = `Replay❓`;
      break;
    case Reason.gameOut:
      refresh();
      message = `Congratulations🎉`;
      break;
    default:
      new Error(`get out here!`);
      break;
  }
  popUpMessage.textContent = message;
}

popUpRefresh.addEventListener(`click`, () => {
  level = 1;
  gameStart();
  popUPhide();
});
popUpNext.addEventListener(`click`, () => {
  levelUp();
  gameStart();
  popUPhide();
});
function levelUp() {
  level++;
}

function popUPhide() {
  popUp.style.visibility = `hidden`;
}
field.addEventListener(`click`, (e) => {
  if (!started) {
    return;
  }
  const target = e.target;
  if (target.matches(`.wally`)) {
    target.remove();
    ++score;
    upDateScore();
    if (score === WALLY_COUNT) {
      if (level === 5) {
        finishiGame(Reason.gameOut);
      } else {
        finishiGame(Reason.win);
      }
    }
  } else if (target.matches(`.wally2`) || target.matches(`.wally-gf`)) {
    finishiGame(Reason.lose);
  }
});

function upDateScore() {
  gameScore.textContent = WALLY_COUNT - score;
}
