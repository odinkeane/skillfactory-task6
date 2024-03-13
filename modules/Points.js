import { Sound } from "./Sound.js";
const NUMBERS_WAY = "assets/Numbers/"
export class Points {
    constructor(div) {
        this.score = 0;
        this.element = document.querySelector(div);
        this.soundPoint = new Sound("./Sound Efects/point.wav");
        this.add = true;
        this.draw();
    }
    plus() {
        if (this.add) {
            this.soundPoint.play();
            this.score++;
            this.add = false;
            this.draw();
        }
    }
    draw() {
        this.element.innerHTML = "";
        for (let symb of this.score.toString().padStart(3).split('')) {
            this.element.innerHTML += `<img src="${NUMBERS_WAY}${Number(symb)}.png">`;
        }
    }
    canAdd() {
        this.add = true;
    }
    toZero() {
        this.score = 0;
        this.draw();
    }
    getScore(){
        return this.score;
    }
}

