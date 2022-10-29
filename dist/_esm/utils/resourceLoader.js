class ResourceLoader {
    constructor() {
        this.loadQueue = [];
        this.resourceCache = {};
        this.readyCallbacks = [];
    }
    addToLoad(item) {
        if (item instanceof Array) {
            item.forEach((url) => this.loadQueue.push(url));
        }
        else {
            this.loadQueue.push(item);
        }
    }
    // Load an image url or an array of image urls
    loadResources(urlOrArr = null) {
        if (!urlOrArr) {
            urlOrArr = this.loadQueue;
        }
        if (urlOrArr instanceof Array) {
            for (var k in urlOrArr) {
                this._load(urlOrArr[k]);
            }
        }
        else {
            this._load(urlOrArr);
        }
    }
    _load(url) {
        if (this.resourceCache[url]) {
            return this.resourceCache[url];
        }
        else {
            const image = {
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
    get(url) {
        return this.resourceCache[url];
    }
    isReady() {
        let ready = true;
        for (const k in this.resourceCache) {
            if (this.resourceCache.hasOwnProperty(k) && !this.resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }
    onReady(func) {
        this.readyCallbacks.push(func);
    }
}
const resourceLoader = new ResourceLoader();
export default resourceLoader;
//# sourceMappingURL=resourceLoader.js.map