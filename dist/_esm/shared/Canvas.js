import { AssetPattern } from "../utils/assets.js";
export class Canvas {
    constructor(rootElement, name, width, height) {
        this.scale = 1;
        const canvasElement = document.createElement("canvas");
        canvasElement.style.position = "absolute";
        canvasElement.style.top = "0px";
        canvasElement.style.left = "0px";
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
    drawAsset(info) {
        const ctx = this.ctx;
        if (ctx) {
            const imageSource = info.asset.getResource();
            if (imageSource instanceof HTMLImageElement) {
                const sWidth = info.sWidth || imageSource.width;
                const sHeight = info.sHeight || imageSource.height;
                const dWidth = info.dWidth || imageSource.width;
                const dHeight = info.dHeight || imageSource.height;
                if (info.rotation) {
                    ctx.save();
                    ctx.translate(Math.ceil((info.x - this.offsetX + dWidth / 2) * this.scale), Math.ceil((info.y - this.offsetY + dHeight / 2) * this.scale));
                    ctx.rotate((info.rotation * Math.PI) / 180);
                    ctx.translate(-Math.ceil((info.x - this.offsetX + dWidth / 2) * this.scale), -Math.ceil((info.y - this.offsetY + dHeight / 2) * this.scale));
                }
                if (info.filter) {
                    ctx.save();
                    ctx.filter = info.filter;
                }
                if (info.opacity !== 1) {
                    ctx.save();
                    ctx.globalAlpha = info.opacity || 1;
                }
                ctx.drawImage(imageSource, info.offsetX || 0, info.offsetY || 0, sWidth, sHeight, Math.ceil((info.x - (this.offsetX || 0)) * this.scale), Math.ceil((info.y - (this.offsetY || 0)) * this.scale), Math.ceil(dWidth * this.scale), Math.ceil(dHeight * this.scale));
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
    drawRect(x, y, width, height, info = { strokeOnly: false, stroked: false, fixed: false }) {
        const ctx = this.ctx;
        if (ctx) {
            let lastStrokeStyle = "";
            let lastFillStyle = "";
            const fillStyle = info.fillStyle instanceof AssetPattern
                ? info.fillStyle.getPattern()
                : info.fillStyle;
            const strokeStyle = info.strokeStyle instanceof AssetPattern
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
                ctx.fillRect(Math.ceil((x - offsetX) * this.scale), Math.ceil((y - offsetY) * this.scale), Math.ceil(width * this.scale), Math.ceil(height * this.scale));
            }
            if (info.stroked || info.strokeOnly) {
                ctx.strokeRect(Math.ceil((x - offsetX) * this.scale), Math.ceil((y - offsetY) * this.scale), Math.ceil(width * this.scale), Math.ceil(height * this.scale));
            }
            if (info.strokeStyle) {
                ctx.strokeStyle = lastStrokeStyle;
            }
            if (info.fillStyle) {
                ctx.fillStyle = lastFillStyle;
            }
        }
    }
    drawArc(x, y, radius, startAngle = 0, endAngle = 2 * Math.PI, info = { strokeOnly: false, stroked: false, fixed: false }) {
        const ctx = this.ctx;
        if (ctx) {
            let lastStrokeStyle = "";
            let lastFillStyle = "";
            const fillStyle = info.fillStyle instanceof AssetPattern
                ? info.fillStyle.getPattern()
                : info.fillStyle;
            const strokeStyle = info.strokeStyle instanceof AssetPattern
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
            ctx.arc(Math.ceil((x - offsetX) * this.scale), Math.ceil((y - offsetY) * this.scale), Math.ceil(radius * this.scale), startAngle, endAngle);
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
    drawText(text, x, y, info = { strokeOnly: false, stroked: false, fixed: false }) {
        const ctx = this.ctx;
        if (ctx) {
            let lastStrokeStyle = "";
            let lastFillStyle = "";
            let lastFont = "";
            let lastTextAlign = "left";
            const fillStyle = info.fillStyle instanceof AssetPattern
                ? info.fillStyle.getPattern()
                : info.fillStyle;
            const strokeStyle = info.strokeStyle instanceof AssetPattern
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
                ctx.font = (info === null || info === void 0 ? void 0 : info.size)
                    ? `${this.scale * info.size}px ${info.font}`
                    : info.font;
            }
            if (info.textAlign) {
                lastTextAlign = ctx.textAlign;
                ctx.textAlign = info.textAlign;
            }
            const offsetX = info.fixed ? 0 : this.offsetX;
            const offsetY = info.fixed ? 0 : this.offsetY;
            if (!info.strokeOnly) {
                ctx.fillText(text, Math.ceil(this.scale * (x - offsetX)), Math.ceil(this.scale * (y - offsetY)));
            }
            if (info.stroked || info.strokeOnly) {
                ctx.strokeText(text, Math.ceil(this.scale * (x - offsetX)), Math.ceil(this.scale * (y - offsetY)));
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
    setOffset(x, y) {
        this.offsetX = x;
        this.offsetY = y;
    }
    setSize(width = 0, height = 0) {
        let nw, nh;
        if (!width) {
            nw = window.innerWidth;
        }
        else {
            nw = width;
        }
        if (!height) {
            nh = window.innerHeight;
        }
        else {
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
//# sourceMappingURL=Canvas.js.map