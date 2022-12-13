import { ColliderBuffer } from "../modules/collider";
import { Canvas } from "./Canvas";
import { GameObject } from "./GameObject";

export enum eColliderType {
  rectangle,
  circle,
}

export interface iColliderOptions {
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  radius: number;
  type: eColliderType;
  [key: string]: any;
}

interface iColliderPosition {
  x: number;
  y: number;
}

export class Collider implements iColliderOptions {
  [key: string]: any;
  public instance: GameObject;
  public type: eColliderType = eColliderType.rectangle;
  public collides: Collider[] = [];
  offsetX = 0;
  offsetY = 0;
  width = 0;
  height = 0;
  radius = 0;
  buffer: ColliderBuffer;

  constructor(
    buffer: ColliderBuffer,
    instance: GameObject,
    opts?: Partial<iColliderOptions>
  ) {
    this.instance = instance;
    this.buffer = buffer;
    opts &&
      Object.entries(opts).forEach(([key, val]) => {
        this[key] = val;
      });
  }

  position(): iColliderPosition {
    return {
      x: this.instance.x + this.offsetX,
      y: this.instance.y + this.offsetY,
    };
  }

  draw(canvas?: Canvas, style?: string) {
    if (canvas) {
      if (this.type === eColliderType.rectangle) {
        canvas.drawRect(
          this.position().x,
          this.position().y,
          this.width,
          this.height,
          {
            fillStyle: style || "rgba(3, 119, 252, .5)",
          }
        );
      } else {
        canvas.drawArc(
          this.position().x,
          this.position().y,
          this.radius,
          undefined,
          undefined,
          {
            fillStyle: style || "rgba(3, 119, 252, .5)",
          }
        );
      }
    }
  }

  destroy() {
    this.buffer.destroy(this);
  }

  isIntersect(another: Collider, self: Collider = this) {
    const [c1, c2] = [self, another];
    if (
      c1.type === eColliderType.rectangle &&
      c2.type === eColliderType.rectangle
    ) {
      return this.rectIntersect(
        c1.position().x,
        c1.position().y,
        c1.width,
        c1.height,
        c2.position().x,
        c2.position().y,
        c2.width,
        c2.height
      );
    } else if (
      c1.type === eColliderType.circle &&
      c2.type === eColliderType.circle
    ) {
      return this.circleIntersect(
        c1.position().x,
        c1.position().y,
        c1.radius,
        c2.position().x,
        c2.position().y,
        c2.radius
      );
    } else {
      const c = c1.type === eColliderType.circle ? c1 : c2;
      const r = c1.type === eColliderType.rectangle ? c1 : c2;

      return this.circleRectIntersect(
        c.position().x,
        c.position().y,
        c.radius,
        r.position().x,
        r.position().y,
        r.width,
        r.height
      );
    }
  }

  private rectIntersect(
    x1: number,
    y1: number,
    w1: number,
    h1: number,
    x2: number,
    y2: number,
    w2: number,
    h2: number
  ) {
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
      return false;
    }
    return true;
  }

  private circleIntersect(
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
  ) {
    // Calculate the distance between the two circles
    let squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

    // When the distance is smaller or equal to the sum
    // of the two radius, the circles touch or overlap
    return squareDistance <= (r1 + r2) * (r1 + r2);
  }

  private circleRectIntersect(
    cX: number,
    cY: number,
    cR: number,
    rX: number,
    rY: number,
    rW: number,
    rH: number
  ) {
    const distX = Math.abs(cX - rX - rW / 2);
    const distY = Math.abs(cY - rY - rH / 2);

    if (distX > rW / 2 + cR) {
      return false;
    }
    if (distY > rH / 2 + cR) {
      return false;
    }

    if (distX <= rW / 2) {
      return true;
    }
    if (distY <= rW / 2) {
      return true;
    }

    const dx = distX - rW / 2;
    const dy = distY - rH / 2;
    return dx * dx + dy * dy <= cR * cR;
  }
}
