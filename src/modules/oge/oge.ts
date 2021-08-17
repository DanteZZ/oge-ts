import { eventEmitter } from "../eventEmmiter/eventEmmiter";
import { ISpriteList } from "../sprite/interfaces";
import { Sprite } from "../sprite/sprite";
import { IProject } from "./interfaces";
import { projectDir } from "../../configs/fs.conf";
export class OGE {
	public buffer:Object = {};
	public project:IProject;
	public FPSLimit:Number;
	public frameStart:BigInt | Number | any;
	public rootElement:HTMLElement | null = null;
	public evEm:eventEmitter;
	public realFPS:Number;
	public deltaTime: Number = 0;
	public sprites: ISpriteList = {};

	constructor(element:HTMLElement | null, project:IProject) {
		this.buffer = {};
		this.project = project;
		this.FPSLimit = 0;
		this.realFPS = 0;
		this.frameStart = Date.now();
		this.rootElement = element;
		this.evEm = new eventEmitter(this);
		this.load();
		console.log(this);

	}

	start():void {
		this.evEm.emit("before_start");
		this.evEm.emit("start");
		this.evEm.emit("after_start");
		this.frameUpdate();
	}

	load():void {
		for (let sname in this.project.sprites) {
			const sprite = this.project.sprites[sname];
			this.sprites[sname] = new Sprite(sname,{...sprite,src:projectDir+sprite.src});
		}
	}

	frameUpdate() {
		this.evEm.emit("before_update");
		this.evEm.emit("update");
		this.evEm.emit("after_update");
		this.realFPS = Math.round(1000/(Date.now()-this.frameStart))+1;
		this.deltaTime = (Date.now()-this.frameStart)/1000;
		this.frameStart = Date.now();
	}

	frameDraw() {
		this.evEm.emit("before_draw");
		this.evEm.emit("draw");
		this.evEm.emit("after_draw");
	}

}