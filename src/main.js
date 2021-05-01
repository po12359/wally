`use strict`;
import { PopUp, Result } from "./popUp.js";
import Toggle from "./toggle.js";
import { Reason, GameBulider } from "./game.js";

//
//
//
//
//

const game = new GameBulider().wallyCount(2).wally2Count(2).duration(3).build();

const toggle = new Toggle();
const popUp = new PopUp();

game.OnClick((reason) => {
  switch (reason) {
    case Reason.win:
      popUp.showWithText(Result.win);
      break;
    case Reason.lose:
      popUp.showWithText(Result.lose);
      break;
    case Reason.timeout:
      popUp.showWithText(Result.timeout);
      break;
    case Reason.gameOut:
      popUp.showWithText(Result.gameOut);
      break;
    default:
      new Error(`get out here!`);
      break;
  }
});

popUp.refreshOnClick(() => {
  game.levelOne();
  game.start();
});
popUp.nextOnClick(() => {
  game.levelUp();
  game.start();
});
