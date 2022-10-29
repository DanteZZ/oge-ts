"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    constructor() {
        this.events = {};
        this.events = {};
    }
    on(event, listener) {
        if (typeof this.events[event] !== "object") {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return () => this.removeListener(event, listener);
    }
    removeListener(event, listener) {
        if (typeof this.events[event] === "object") {
            const idx = this.events[event].indexOf(listener);
            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    }
    emit(event, args = null) {
        if (typeof this.events[event] === "object") {
            this.events[event].forEach((listener) => {
                listener.call(args);
            });
        }
    }
    once(event, listener) {
        const remove = this.on(event, (...args) => {
            remove();
            listener.call(args);
        });
    }
}
exports.EventEmitter = EventEmitter;
const eventEmitter = new EventEmitter();
exports.default = eventEmitter;
//# sourceMappingURL=eventEmitter.js.map