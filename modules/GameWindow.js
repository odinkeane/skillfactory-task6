import { Object } from "./Object.js";


export class GameWindow extends Object {
    constructor(x, y, width, height, url) {
        super(x, y, width, height, url);
    }
    getCenterX() {
        return this.width / 2;
    }
    getCenterY() {
        return this.height / 2;
    }
}
