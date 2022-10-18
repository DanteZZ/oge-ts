import { SpriteInstance } from "../shared/SpriteInstance";
import { Canvas } from "./Canvas";
import { InstanceBuffer } from "../modules/instance";

interface iGameObjectParams {
  [key: string]: any;
  name?: string | null;
  x?: number;
  y?: number;
  depth?: number;
}

export abstract class GameObject implements iGameObjectParams {
  [key: string]: any;
  public name: string | null = null;
  public x: number = 0;
  public y: number = 0;
  public depth: number = 0;
  public sprite: SpriteInstance | null = null;
  private buffer?: InstanceBuffer;

  constructor(another: iGameObjectParams = {}) {
    Object.entries(another).forEach(([key, val]) => {
      this[key] = val;
    });
  }

  public update(): void {}

  public draw(canvas?: Canvas): void {
    if (canvas && this.sprite instanceof SpriteInstance) {
      this.sprite.draw(canvas, this.x, this.y);
    }
  }

  public destroy(): void {
    this?.buffer?.destroy(this);
  }

  public onDestroy(): void {}

  public getBuffer(): InstanceBuffer {
    if (this.buffer) {
      return this.buffer;
    } else {
      throw new Error("Empty buffer");
    }
  }

  public _setName(name: string): void {
    this.name = name;
  }

  public _setBuffer(buffer: InstanceBuffer): void {
    this.buffer = buffer;
  }
}
