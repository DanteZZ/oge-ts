interface iKeys {
    [key: number | string]: string | undefined;
}
interface iInputBuffer {
    keys: iKeys;
    mouseKeys: iKeys;
    mouseX: number;
    mouseY: number;
}
declare type tKey = number | string;
export declare class InputBuffer {
    inputBuffer: iInputBuffer;
    constructor();
    private initEventListeners;
    private initDocEventListeners;
    onKeyPress(key: tKey): Boolean;
    onKeyHold(key: tKey): Boolean;
    onKeyRelease(key: tKey): Boolean;
    onMousePress(key: tKey): Boolean;
    onMouseHold(key: tKey): Boolean;
    onMouseRelease(key: tKey): Boolean;
}
declare const Input: InputBuffer;
export default Input;
