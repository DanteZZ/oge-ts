"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
class Camera {
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
            if (this.offset !== undefined) {
                w = Math.ceil(w / canvas.scale);
                h = Math.ceil(h / canvas.scale);
                const areaX = this.x + this.offset;
                const areaY = this.y + this.offset;
                const areaMaxX = this.x + w - this.offset;
                const areaMaxY = this.y + h - this.offset;
                if (this.trackInstance.x < areaX) {
                    this.x -= areaX - this.trackInstance.x;
                }
                else if (this.trackInstance.x > areaMaxX) {
                    this.x += this.trackInstance.x - areaMaxX;
                }
                if (this.trackInstance.y < areaY) {
                    this.y -= areaY - this.trackInstance.y;
                }
                else if (this.trackInstance.y > areaMaxY) {
                    this.y += this.trackInstance.y - areaMaxY;
                }
            }
            else {
                this.x = this.trackInstance.x - Math.ceil(w / 2 / canvas.scale);
                this.y = this.trackInstance.y - Math.ceil(h / 2 / canvas.scale);
            }
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
exports.Camera = Camera;
//# sourceMappingURL=camera.js.map