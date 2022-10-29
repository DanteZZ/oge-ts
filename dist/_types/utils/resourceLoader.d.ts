declare class ResourceLoader {
    private loadQueue;
    private resourceCache;
    private readyCallbacks;
    addToLoad(item: string[] | string): void;
    loadResources(urlOrArr?: string | string[] | null): void;
    private _load;
    get(url: string): HTMLImageElement | Boolean;
    isReady(): Boolean;
    onReady(func: Function): void;
}
declare const resourceLoader: ResourceLoader;
export default resourceLoader;
