import { Scene, Canvas } from "../../../../src";
declare class _DefaultScene extends Scene {
    width: number;
    height: number;
    private mainCamera?;
    private background?;
    init(): void;
    draw(canvas: Canvas): void;
}
declare const DefaultScene: _DefaultScene;
export default DefaultScene;
