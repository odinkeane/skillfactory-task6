export class ImageObject {
    constructor(url) {
        this.object = new Image();
        this.setImage(url);
    }
    getImage() {
        return this.object;
    }
    setImage(url) {
        this.object.src = url;
    }
}