type tEventList = {
  [key: string]: Function[];
};

export class EventEmitter {
  private events: tEventList = {};
  private context: Window | null = null;

  constructor(context: Window = window) {
    this.events = {};
    this.context = context;
  }
  on(event: string, listener: Function): Function {
    if (typeof this.events[event] !== "object") {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.removeListener(event, listener);
  }
  removeListener(event: string, listener: Function): void {
    if (typeof this.events[event] === "object") {
      const idx = this.events[event].indexOf(listener);
      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
    }
  }
  emit(event: string, ...args: any[]): void {
    if (typeof this.events[event] === "object") {
      this.events[event].forEach((listener: Function) =>
        listener.apply(this.context, args)
      );
    }
  }
  once(event: string, listener: Function): void {
    const remove = this.on(event, (...args: any) => {
      remove();
      listener.apply(this.context, args);
    });
  }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
