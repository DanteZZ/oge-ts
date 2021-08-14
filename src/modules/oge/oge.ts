import { eventEmitter } from "../eventEmmiter/eventEmmiter";

export class OGE {
	public buffer:Object = {};
	public project:Object = {};
	public FPSLimit:Number = 0;
	public frameStart:Number = Date.now();
	public rootElement:HTMLElement | null = null;
	public evEm:eventEmitter;

	constructor() {
		this.buffer = {};
		this.project = {};
		this.FPSLimit = 0;
		this.frameStart = Date.now();
		this.evEm = new eventEmitter(this);
	}

	public setElement = (element:HTMLElement | null) => {
		this.rootElement = element;
	}
}