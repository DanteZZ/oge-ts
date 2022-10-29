export declare class EventEmitter {
    private events;
    constructor();
    on(event: string, listener: Function): Function;
    removeListener(event: string, listener: Function): void;
    emit(event: string, args?: any[] | null): void;
    once(event: string, listener: Function): void;
}
declare const eventEmitter: EventEmitter;
export default eventEmitter;
