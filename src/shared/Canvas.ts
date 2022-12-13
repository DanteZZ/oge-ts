import { iCanvasItem, iRectInfo, iTextInfo } from "../interfaces/graphic";
import { iImageInfo } from "../interfaces/graphic";
import { AssetPattern } from "../utils/assets";

export class Canvas implements iCanvasItem {
  public name: string;
  public element: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public offsetX: number;
  public offsetY: number;
  constructor(
    rootElement: HTMLElement,
    name: string,
    width?: number,
    height?: number
  ) {
    const canvasElement = document.createElement("canvas");
    canvasElement.className = "_oge_canvas";
    const ctx = canvasElement.getContext("2d");
    if (!ctx) {
      throw new Error("Can't create 2d context");
    }
    this.ctx = ctx;
    this.name = name;
    this.element = canvasElement;

    this.offsetX = 0;
    this.offsetY = 0;
    this.setSize(width, height);
    rootElement.appendChild(this.element);
  }
  public drawAsset(info: iImageInfo) {
    const ctx = this.ctx;
    if (ctx) {
      const imageSource = info.asset.getResource();

      if (imageSource instanceof HTMLImageElement) {
        const sWidth: number = info.dWidth || imageSource.width;
        const sHeight: number = info.dHeight || imageSource.height;
        const dWidth: number = info.dWidth || imageSource.width;
        const dHeight: number = info.dHeight || imageSource.height;

        if (info.rotation) {
          ctx.save();
          ctx.translate(
            info.x - this.offsetX + dWidth / 2,
            info.y - this.offsetY + dHeight / 2
          );
          ctx.rotate((info.rotation * Math.PI) / 180);
          ctx.translate(
            -(info.x - this.offsetX + dWidth / 2),
            -(info.y - this.offsetY + dHeight / 2)
          );
        }

        if (info.filter) {
          ctx.save();
          ctx.filter = info.filter;
        }

        if (info.opacity !== 1) {
          ctx.save();
          ctx.globalAlpha = info.opacity || 1;
        }

        ctx.drawImage(
          imageSource,
          info.offsetX || 0,
          info.offsetY || 0,
          sWidth,
          sHeight,
          info.x - (this.offsetX || 0),
          info.y - (this.offsetY || 0),
          dWidth,
          dHeight
        );
        if (info.rotation) {
          ctx.restore();
        }
        if (info.opacity !== 1) {
          ctx.restore();
          ctx.globalAlpha = 1;
        }
        if (info.filter) {
          ctx.restore();
          ctx.filter = "";
        }
      }
    }
  }

  public drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    info: iRectInfo = { strokeOnly: false, stroked: false, fixed: false }
  ) {
    const ctx = this.ctx;
    if (ctx) {
      let lastStrokeStyle: string | CanvasGradient | CanvasPattern = "";
      let lastFillStyle: string | CanvasGradient | CanvasPattern = "";

      const fillStyle =
        info.fillStyle instanceof AssetPattern
          ? info.fillStyle.getPattern()
          : info.fillStyle;

      const strokeStyle =
        info.strokeStyle instanceof AssetPattern
          ? info.strokeStyle.getPattern()
          : info.strokeStyle;

      if (strokeStyle) {
        lastStrokeStyle = ctx.strokeStyle;
        ctx.strokeStyle = strokeStyle;
      }
      if (fillStyle) {
        lastFillStyle = ctx.fillStyle;
        ctx.fillStyle = fillStyle;
      }

      const offsetX = info.fixed ? 0 : this.offsetX;
      const offsetY = info.fixed ? 0 : this.offsetY;

      if (!info.strokeOnly) {
        ctx.fillRect(x - offsetX, y - offsetY, width, height);
      }
      if (info.stroked || info.strokeOnly) {
        ctx.strokeRect(x - offsetX, y - offsetY, width, height);
      }

      if (info.strokeStyle) {
        ctx.strokeStyle = lastStrokeStyle;
      }
      if (info.fillStyle) {
        ctx.fillStyle = lastFillStyle;
      }
    }
  }

  public drawArc(
    x: number,
    y: number,
    radius: number,
    startAngle: number = 0,
    endAngle: number = 2 * Math.PI,
    info: iRectInfo = { strokeOnly: false, stroked: false, fixed: false }
  ) {
    const ctx = this.ctx;
    if (ctx) {
      let lastStrokeStyle: string | CanvasGradient | CanvasPattern = "";
      let lastFillStyle: string | CanvasGradient | CanvasPattern = "";

      const fillStyle =
        info.fillStyle instanceof AssetPattern
          ? info.fillStyle.getPattern()
          : info.fillStyle;

      const strokeStyle =
        info.strokeStyle instanceof AssetPattern
          ? info.strokeStyle.getPattern()
          : info.strokeStyle;

      if (strokeStyle) {
        lastStrokeStyle = ctx.strokeStyle;
        ctx.strokeStyle = strokeStyle;
      }
      if (fillStyle) {
        lastFillStyle = ctx.fillStyle;
        ctx.fillStyle = fillStyle;
      }

      const offsetX = info.fixed ? 0 : this.offsetX;
      const offsetY = info.fixed ? 0 : this.offsetY;
      ctx.beginPath();
      ctx.arc(x - offsetX, y - offsetY, radius, startAngle, endAngle);
      if (!info.strokeOnly) {
        ctx.fill();
      }
      if (info.stroked || info.strokeOnly) {
        ctx.stroke();
      }

      if (info.strokeStyle) {
        ctx.strokeStyle = lastStrokeStyle;
      }
      if (info.fillStyle) {
        ctx.fillStyle = lastFillStyle;
      }
    }
  }

  public drawText(
    text: string,
    x: number,
    y: number,
    info: iTextInfo = { strokeOnly: false, stroked: false, fixed: false }
  ) {
    const ctx = this.ctx;
    if (ctx) {
      let lastStrokeStyle: string | CanvasGradient | CanvasPattern = "";
      let lastFillStyle: string | CanvasGradient | CanvasPattern = "";
      let lastFont: string = "";
      let lastTextAlign: CanvasTextAlign = "left";

      const fillStyle =
        info.fillStyle instanceof AssetPattern
          ? info.fillStyle.getPattern()
          : info.fillStyle;

      const strokeStyle =
        info.strokeStyle instanceof AssetPattern
          ? info.strokeStyle.getPattern()
          : info.strokeStyle;

      if (strokeStyle) {
        lastStrokeStyle = ctx.strokeStyle;
        ctx.strokeStyle = strokeStyle;
      }
      if (fillStyle) {
        lastFillStyle = ctx.fillStyle;
        ctx.fillStyle = fillStyle;
      }

      if (info.font) {
        lastFont = ctx.font;
        ctx.font = info.font;
      }

      if (info.textAlign) {
        lastTextAlign = ctx.textAlign;
        ctx.textAlign = info.textAlign;
      }

      const offsetX = info.fixed ? 0 : this.offsetX;
      const offsetY = info.fixed ? 0 : this.offsetY;

      if (!info.strokeOnly) {
        ctx.fillText(text, x - offsetX, y - offsetY);
      }
      if (info.stroked || info.strokeOnly) {
        ctx.strokeText(text, x - offsetX, y - offsetY);
      }

      if (info.strokeStyle) {
        ctx.strokeStyle = lastStrokeStyle;
      }
      if (info.fillStyle) {
        ctx.fillStyle = lastFillStyle;
      }

      if (info.font) {
        ctx.font = lastFont;
      }

      if (info.textAlign) {
        ctx.textAlign = lastTextAlign;
      }
    }
  }

  public setOffset(x: number, y: number) {
    this.offsetX = x;
    this.offsetY = y;
  }

  public setSize(width: number = 0, height: number = 0) {
    let nw: number, nh: number;
    if (!width) {
      nw = window.innerWidth;
    } else {
      nw = width;
    }
    if (!height) {
      nh = window.innerHeight;
    } else {
      nh = height;
    }
    if (this.element.width !== nw) {
      this.element.width = nw;
    }
    if (this.element.height !== nh) {
      this.element.height = nh;
    }
  }
}
