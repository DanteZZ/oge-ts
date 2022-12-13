import { SpriteInstance } from "../shared/SpriteInstance";
import { Canvas } from "./Canvas";
import { InstanceBuffer } from "../modules/instance";
import { Collider, iColliderOptions } from "./Collider";

interface iGameObjectParams {
  [key: string]: any;
  name?: string | null;
  x?: number;
  y?: number;
  depth?: number;
  collider?: Collider;
}

export abstract class GameObject implements iGameObjectParams {
  [key: string]: any;
  public name: string | null = null;
  public x: number = 0;
  public y: number = 0;
  public depth: number = 0;
  public sprite: SpriteInstance | null = null;
  private buffer?: InstanceBuffer;
  public collider?: Collider;

  constructor(another: iGameObjectParams = {}) {
    Object.entries(another).forEach(([key, val]) => {
      this[key] = val;
    });
  }

  public create(): void {}
  public update(): void {}

  public draw(canvas?: Canvas): void {
    this.defaultDraw(canvas);
  }
  public defaultDraw(canvas?: Canvas) {
    if (canvas && this.sprite instanceof SpriteInstance) {
      this.sprite.draw(canvas, this.x, this.y);
    }
  }

  public destroy(): void {
    this?.collider?.destroy();
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

  public createCollider(opts: Partial<iColliderOptions>) {
    this.collider = this.buffer?.app?.colliderBuffer.add(this, opts);
  }

  public isCollide(obj: GameObject | string, returnObjects?: false): boolean;
  public isCollide(obj: GameObject | string, returnObjects?: true): Collider[];
  public isCollide(
    obj: GameObject | string,
    returnObjects: boolean = false
  ): Collider[] | boolean {
    let collisions: Collider[] = [];
    if (this.collider) {
      collisions = this.collider.collides.filter((c) =>
        obj instanceof GameObject
          ? c === obj.collider
          : c.instance?.name === obj
      );
    }
    return returnObjects ? collisions : !!collisions.length;
  }

  public _setName(name: string): void {
    this.name = name;
  }

  public _setBuffer(buffer: InstanceBuffer): void {
    this.buffer = buffer;
  }
}
