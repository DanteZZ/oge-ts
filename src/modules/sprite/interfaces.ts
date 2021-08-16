import { Sprite } from "./sprite";

export interface ISprite {
    name:string,
    src: string,
    image?:HTMLImageElement,
    width?:number,
    height?:number,
    originalWidth?:number,
    originalHeight?:number,
    frames?:number,
    centerX?:number,
    centerY?:number
    speed?:number
}

export interface ILoadSprite {
    src: string,
    frames?:number,
    centerX?:number,
    centerY?:number,
    speed?:number,
    width?:number,
    height?:number
}

export interface ISpriteList {
    [key: string]: Sprite
}

export interface ISpriteLoadList {
    [key: string]: ILoadSprite
}