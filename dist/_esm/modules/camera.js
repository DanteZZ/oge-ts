export class Camera {
    constructor(scene, trackInstance) {
        this.name = null;
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
        this.scene = scene;
        this.trackInstance = trackInstance;
    }
    update(canvas) {
        let w = 0;
        let h = 0;
        if (this.width) {
            w = this.width;
        }
        else {
            w = window.innerWidth;
        }
        if (this.height) {
            h = this.height;
        }
        else {
            h = window.innerHeight;
        }
        canvas.setSize(w, h);
        if (this.trackInstance) {
            this.x = this.trackInstance.x - Math.ceil(w / 2);
            this.y = this.trackInstance.y - Math.ceil(h / 2);
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.x + w > this.scene.width) {
            this.x = this.scene.width - w;
        }
        if (this.y + h > this.scene.height) {
            this.y = this.scene.height - h;
        }
        if (w > this.scene.width) {
            this.x = -(w - this.scene.width) / 2;
        }
        if (h > this.scene.height) {
            this.y = -(h - this.scene.height) / 2;
        }
        canvas.setOffset(this.x, this.y);
    }
    setName(name) {
        this.name = name;
    }
    setScene(scene) {
        this.scene = scene;
    }
    setTrackInstance(trackInstance) {
        this.trackInstance = trackInstance;
    }
}
//# sourceMappingURL=camera.js.map