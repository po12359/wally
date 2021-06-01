const WALLY__NUMBER = 80;
export class Field {
    constructor() {
        this.fieldOnClick = (func) => {
            this.listener = func;
        };
        this.field = document.querySelector(`.field`);
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener(`click`, (e) => {
            const target = e.target;
            if (target.matches(`.wally`)) {
                target.remove();
                this.listener && this.listener("wally");
            }
            else if (target.matches(`.wally1`)) {
                this.listener && this.listener(`wally1`);
            }
        });
    }
    additem(className, count, src) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - WALLY__NUMBER;
        const y2 = this.fieldRect.height - WALLY__NUMBER;
        for (let i = 0; i < count; i++) {
            const item = document.createElement(`img`);
            item.setAttribute(`class`, className);
            item.setAttribute(`src`, src);
            item.style.position = `absoulte`;
            item.style.cursor = `pointer`;
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }
    init(item) {
        this.field.innerHTML = ``;
        this.additem(`wally`, item, `./img/wally.png`);
        this.additem(`wally1`, item, `./img/wally1.png`);
    }
}
function randomNumber(max, min) {
    return Math.random() * (max - min) + min;
}
//# sourceMappingURL=field.js.map