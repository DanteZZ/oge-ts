export class OGE {
	buffer:Object = {};
	project:Object = {};
	FPSLimit:Number = 0;
	frameStart:Number = Date.now();
	rootElement:HTMLElement | null = null;

	constructor() {
		this.buffer = {};
		this.project = {};
		this.FPSLimit = 0;
		this.frameStart = Date.now();
	}

	public setElement = (element:HTMLElement | null) => {
		this.rootElement = element;
	}
}