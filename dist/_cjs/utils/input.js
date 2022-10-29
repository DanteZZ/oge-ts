"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputBuffer = void 0;
const eventEmitter_1 = require("./eventEmitter");
class InputBuffer {
    constructor() {
        this.inputBuffer = {
            keys: {},
            mouseKeys: {},
            mouseX: 0,
            mouseY: 0,
        };
        this.initEventListeners();
        this.initDocEventListeners();
    }
    initEventListeners() {
        eventEmitter_1.default.on("afterRender", () => {
            const res = {};
            for (const k in this.inputBuffer.keys) {
                if (this.inputBuffer.keys[k] !== "released") {
                    res[k] = this.inputBuffer.keys[k];
                }
                if (this.inputBuffer.keys[k] == "pressed") {
                    res[k] = "hold";
                }
            }
            this.inputBuffer.keys = res;
            // MOUSE KEYS
            const mouseRes = {};
            for (const k in this.inputBuffer.mouseKeys) {
                if (this.inputBuffer.mouseKeys[k] !== "released") {
                    res[k] = this.inputBuffer.mouseKeys[k];
                }
                if (this.inputBuffer.mouseKeys[k] == "pressed") {
                    res[k] = "hold";
                }
            }
            this.inputBuffer.mouseKeys = mouseRes;
        });
    }
    initDocEventListeners() {
        document.addEventListener("keydown", (handler) => {
            const key = handler.keyCode;
            if (this.inputBuffer.keys[key] == undefined) {
                this.inputBuffer.keys[key] = "pressed";
            }
            else {
                this.inputBuffer.keys[key] = "hold";
            }
        });
        document.addEventListener("keyup", (handler) => {
            const key = handler.keyCode;
            this.inputBuffer.keys[key] = "released";
        });
        //Mouse
        document.onmousedown = (e) => {
            const key = e.button;
            this.inputBuffer.mouseKeys[key] = "pressed";
        };
        document.onmouseup = (e) => {
            const key = e.button;
            this.inputBuffer.mouseKeys[key] = "released";
        };
        document.onmousemove = (e) => {
            this.inputBuffer.mouseX = e.clientX;
            this.inputBuffer.mouseY = e.clientY;
        };
    }
    onKeyPress(key) {
        if (this.inputBuffer.keys[key] !== undefined) {
            if (this.inputBuffer.keys[key] == "pressed") {
                return true;
            }
        }
        return false;
    }
    onKeyHold(key) {
        if (this.inputBuffer.keys[key] !== undefined) {
            if (this.inputBuffer.keys[key] !== "released") {
                return true;
            }
        }
        return false;
    }
    onKeyRelease(key) {
        if (this.inputBuffer.keys[key] !== undefined) {
            if (this.inputBuffer.keys[key] == "released") {
                return true;
            }
        }
        return false;
    }
    // MOUSE FUNCTIONS
    onMousePress(key) {
        if (this.inputBuffer.mouseKeys[key] !== undefined) {
            if (this.inputBuffer.mouseKeys[key] == "pressed") {
                return true;
            }
        }
        return false;
    }
    onMouseHold(key) {
        if (this.inputBuffer.mouseKeys[key] !== undefined) {
            if (this.inputBuffer.mouseKeys[key] !== "released") {
                return true;
            }
        }
        return false;
    }
    onMouseRelease(key) {
        if (this.inputBuffer.mouseKeys[key] !== undefined) {
            if (this.inputBuffer.mouseKeys[key] == "released") {
                return true;
            }
        }
        return false;
    }
}
exports.InputBuffer = InputBuffer;
const Input = new InputBuffer();
exports.default = Input;
//# sourceMappingURL=input.js.map