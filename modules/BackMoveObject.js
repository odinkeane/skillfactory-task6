import { Object } from "./Object.js";


export class BackMoveObject {
    constructor(x, y, width, height, url, speed) {
        this.partOne = new Object(x, y, width, height, url);
        this.partTwo = new Object(width, y, width, height, url);
        this.speed = speed;
    }
    draw(ctx, back, delta) {
        const onePart = this.partOne.getCoord();
        onePart.x = -((delta * this.speed) % back.getCoord().width);
        this.partOne.setCoord(onePart.x, onePart.y);
        this.partTwo.setCoord(onePart.x + back.getCoord().width, onePart.y);
        this.partOne.draw(ctx);
        this.partTwo.draw(ctx);
    }
    collide(object){
        return (this.partOne.collide(object) || this.partTwo.collide(object));
    }

}