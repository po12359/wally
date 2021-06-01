const WALLY__NUMBER: number = 80;
type FieldOnClick = (className: string) => void;

export class Field {
  private listener?: FieldOnClick;
  private fieldRect: ClientRect;
  private field: HTMLElement;
  constructor() {
    this.field = document.querySelector(`.field`)! as HTMLElement;
    this.fieldRect = this.field.getBoundingClientRect(); //! as ClientRect;
    this.field.addEventListener(`click`, (e: Event) => {
      const target = e.target! as HTMLElement;
      if (target.matches(`.wally`)) {
        target.remove();
        this.listener && this.listener("wally");
      } else if (target.matches(`.wally1`)) {
        this.listener && this.listener(`wally1`);
      }
    });
  }
  fieldOnClick = (func: FieldOnClick) => {
    this.listener = func;
  };
  private additem(className: string, count: number, src: string) {
    const x1: number = 0;
    const y1: number = 0;
    const x2: number = this.fieldRect.width - WALLY__NUMBER;
    const y2: number = this.fieldRect.height - WALLY__NUMBER;
    for (let i: number = 0; i < count; i++) {
      const item: HTMLImageElement = document.createElement(`img`);
      item.setAttribute(`class`, className);
      item.setAttribute(`src`, src);
      item.style.position = `absoulte`;
      item.style.cursor = `pointer`;
      const x: number = randomNumber(x1, x2);
      const y: number = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  protected init(item: number): void {
    this.field.innerHTML = ``;
    this.additem(`wally`, item, `./img/wally.png`);
    this.additem(`wally1`, item, `./img/wally1.png`);
  }
}
function randomNumber(max: number, min: number): number {
  return Math.random() * (max - min) + min;
}
