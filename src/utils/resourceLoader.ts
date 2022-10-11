type tResourceCache = {
  [key: string]: HTMLImageElement | Boolean;
};
interface iImg {
  img: HTMLImageElement;
  rl: ResourceLoader;
}

class ResourceLoader {
  private loadQueue: any[] = [];
  private resourceCache: tResourceCache = {};
  private readyCallbacks: Function[] = [];

  public addToLoad(item: string[] | string): void {
    if (item instanceof Array) {
      item.forEach((url) => this.loadQueue.push(url));
    } else {
      this.loadQueue.push(item);
    }
  }

  // Load an image url or an array of image urls
  public loadResources(urlOrArr: string | string[] | null): void {
    if (!urlOrArr) {
      urlOrArr = this.loadQueue;
    }
    if (urlOrArr instanceof Array) {
      for (var k in urlOrArr) {
        this._load(urlOrArr[k]);
      }
    } else {
      this._load(urlOrArr);
    }
  }

  private _load(url: string) {
    if (this.resourceCache[url]) {
      return this.resourceCache[url];
    } else {
      const image: iImg = {
        img: new Image(),
        rl: this,
      };
      image.img.onload = () => {
        this.resourceCache[url] = image.img;
        if (image.rl.isReady()) {
          for (var k in this.readyCallbacks) {
            this.readyCallbacks[k]();
          }
        }
      };
      this.resourceCache[url] = false;
      image.img.src = url;
      return null;
    }
  }

  public get(url: string): HTMLImageElement | Boolean {
    return this.resourceCache[url];
  }

  public isReady(): Boolean {
    let ready = true;
    for (const k in this.resourceCache) {
      if (this.resourceCache.hasOwnProperty(k) && !this.resourceCache[k]) {
        ready = false;
      }
    }
    return ready;
  }

  public onReady(func: Function): void {
    this.readyCallbacks.push(func);
  }
}

const resourceLoader = new ResourceLoader();

export default resourceLoader;
