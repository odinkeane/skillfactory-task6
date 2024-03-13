import { Object } from "./Object.js";
import { Sound } from "./Sound.js";

export class Bird extends Object {
    constructor(x, y, width, height, urls) {
        super(x - width / 2, y - height / 2, width, height, urls[0]);
        this.spriteNumber = 0;
        this.urls = urls;
        this.jump = 7.5;
        this.gravity = 0;
        this.fly = 0;
        this.soundFlyUp = new Sound("./Sound Efects/wing.wav");
        this.soundHit = new Sound("./Sound Efects/hit.wav");
        
    }
    setCoord(x, y, width = this.width, height = this.height){
        super.setCoord(x - width / 2, y - height / 2);
    }
    draw(ctx) {
        this.spriteNumber = (this.spriteNumber + 0.1 >= 3) ? 0 : (this.spriteNumber + 0.1);
        this.image.setImage(this.urls[Math.floor(this.spriteNumber)]);

        const coord = super.getCoord();
        ctx.save();
        ctx.translate(coord.x, coord.y);
        ctx.rotate(this.fly * 3 * Math.PI / 180);
        ctx.translate(-coord.x,-coord.y);
        super.draw(ctx);
        ctx.restore();
        this.fly += this.gravity;
        super.setCoord(coord.x, coord.y + this.fly);
    }
    up() {
        this.fly = -this.jump;
        this.gravity = .3;
        this.soundFlyUp.play();
    }
    stop(){
        this.gravity = 0;
        this.fly = 0;
    }
    hit(){
        this.soundHit.play();
    }
}
