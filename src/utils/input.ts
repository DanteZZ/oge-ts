import eventEmitter from "./eventEmitter";

interface iKeys {
  [key: number | string]: string | undefined;
}

interface iInputBuffer {
  keys: iKeys;
  mouseKeys: iKeys;
  mouseX: number;
  mouseY: number;
}

type tKey = number | string;

export class InputBuffer {
  inputBuffer: iInputBuffer = {
    keys: {},
    mouseKeys: {},
    mouseX: 0,
    mouseY: 0,
  };

  constructor() {
    this.initEventListeners();
    this.initDocEventListeners();
  }

  private initEventListeners() {
    eventEmitter.on("afterRender", () => {
      const res: iKeys = {};
      for (const k in this.inputBuffer.keys) {
        if (this.inputBuffer.keys[k] !== "released") {
          res[k] = this.inputBuffer.keys[k];
        }
        if (this.inputBuffer.keys[k] == "pressed") {
          res[k] = "hold";
        }
      }
      this.inputBuffer.keys = res;

      // MOUSE KEYS
      const mouseRes: iKeys = {};
      for (const k in this.inputBuffer.mouseKeys) {
        if (this.inputBuffer.mouseKeys[k] !== "released") {
          res[k] = this.inputBuffer.mouseKeys[k];
        }
        if (this.inputBuffer.mouseKeys[k] == "pressed") {
          res[k] = "hold";
        }
      }
      this.inputBuffer.mouseKeys = mouseRes;
    });
  }

  private initDocEventListeners() {
    document.addEventListener("keydown", (handler) => {
      const key = handler.keyCode;
      if (this.inputBuffer.keys[key] == undefined) {
        this.inputBuffer.keys[key] = "pressed";
      } else {
        this.inputBuffer.keys[key] = "hold";
      }
    });

    document.addEventListener("keyup", (handler) => {
      const key = handler.keyCode;
      this.inputBuffer.keys[key] = "released";
    });

    //Mouse
    document.onmousedown = (e) => {
      const key = e.button;
      this.inputBuffer.mouseKeys[key] = "pressed";
    };

    document.onmouseup = (e) => {
      const key = e.button;
      this.inputBuffer.mouseKeys[key] = "released";
    };
    document.onmousemove = (e) => {
      this.inputBuffer.mouseX = e.clientX;
      this.inputBuffer.mouseY = e.clientY;
    };
  }

  public onKeyPress(key: tKey): Boolean {
    if (this.inputBuffer.keys[key] !== undefined) {
      if (this.inputBuffer.keys[key] == "pressed") {
        return true;
      }
    }
    return false;
  }

  public onKeyHold(key: tKey): Boolean {
    if (this.inputBuffer.keys[key] !== undefined) {
      if (this.inputBuffer.keys[key] !== "released") {
        return true;
      }
    }
    return false;
  }

  public onKeyRelease(key: tKey): Boolean {
    if (this.inputBuffer.keys[key] !== undefined) {
      if (this.inputBuffer.keys[key] == "released") {
        return true;
      }
    }
    return false;
  }

  // MOUSE FUNCTIONS
  public onMousePress(key: tKey): Boolean {
    if (this.inputBuffer.mouseKeys[key] !== undefined) {
      if (this.inputBuffer.mouseKeys[key] == "pressed") {
        return true;
      }
    }
    return false;
  }

  public onMouseHold(key: tKey): Boolean {
    if (this.inputBuffer.mouseKeys[key] !== undefined) {
      if (this.inputBuffer.mouseKeys[key] !== "released") {
        return true;
      }
    }
    return false;
  }

  public onMouseRelease(key: tKey): Boolean {
    if (this.inputBuffer.mouseKeys[key] !== undefined) {
      if (this.inputBuffer.mouseKeys[key] == "released") {
        return true;
      }
    }
    return false;
  }
}

const Input = new InputBuffer();

export default Input;
