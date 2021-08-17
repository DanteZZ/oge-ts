import { ILoadSprite, ISprite } from "./interfaces";
import fs from "fs";

export class Sprite implements ISprite {
    name = ""
    src = ""
    image = new Image()
    width = 0
    height = 0
    originalWidth = 0
    originalHeight = 0
    frames = 0
    centerX = 0
    centerY = 0
    speed = 0
    
    constructor(name:string,{src,centerX,centerY,speed}:ILoadSprite) {
        this.name = name;
        this.src = src;
        this.centerX = centerX || 0;
        this.centerY = centerY || 0;
        this.speed = speed || 0;
        this.image.src = "data:image/png;base64,"+fs.readFileSync(src, 'base64');
        //const base64 = require(src);
        //this.image.src = base64;
    }
}