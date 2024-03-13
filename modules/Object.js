import { ImageObject } from "./ImageObject.js";


export class Object {
    constructor(x, y, width, height, url) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        if (url) this.image = new ImageObject(url);

    }
    draw(ctx) {
        ctx.drawImage(
            this.image.getImage(),
            this.x,
            this.y,
            this.width,
            this.height,
        );
    }
    getCoord() {
        return { x: this.x, y: this.y, width: this.width, height: this.height }
    }
    setCoord(x, y, width = this.width, height = this.height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    collide(object) {
        const objectCoord = object.getCoord();
        const thisCoord = this.getCoord();
        return (objectCoord.x + objectCoord.width > thisCoord.x
            && objectCoord.x + objectCoord.width < thisCoord.x + thisCoord.width
            && objectCoord.y + objectCoord.height > thisCoord.y
            && objectCoord.y + objectCoord.height < thisCoord.y + thisCoord.height
        );
    }
}