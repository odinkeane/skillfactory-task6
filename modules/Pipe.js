import { Object } from "./Object.js";


export class Pipe extends Object {
    constructor(x, y, width, height, url, speed = 5) {
        super(x, y, width, height, url);
        this.speed = speed;
        this.move = false
    }

    draw(ctx) {
        if (this.isMoving()) {
            const coord = super.getCoord();
            super.setCoord(coord.x - this.speed, coord.y);
        }
        super.draw(ctx);
    }
    isMoving() {
        return this.move;
    }
    moving() {
        this.move = true;
    }
    stop() {
        this.move = false;
    }
    setSpeed(speed){
        this.speed = speed;
    }

}
