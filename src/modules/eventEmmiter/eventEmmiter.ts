import { OGE } from "../oge/oge";
import { IEventList } from "./interfaces";

export class eventEmitter {
    private events:IEventList
    private _bind:OGE
    constructor(bind:OGE) {
        this.events = {};
        this._bind = bind;
    }
    on(event:string, listener:Function): Function {
        if (!this.events[event]) {this.events[event] = [];};
        this.events[event].push(listener);
        return () => this.removeListener(event, listener);
    }
    removeListener(event:string, listener:Function) {
        if (this.events[event]) {
            const idx = this.events[event].indexOf(listener);
            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    }
    emit(event:string, ...args:any) {
        if (typeof this.events[event] === 'object') {
            this.events[event].forEach(listener => listener.apply(this._bind, args));
        }
    }
    once(event:string, listener:Function) {
        const remove = this.on(event, (...args:any) => {
            remove();
            listener.apply(this._bind, args);
        });
    }
};