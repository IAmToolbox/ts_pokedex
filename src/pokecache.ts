// Caching logic

export type CacheEntry<T> = {
    createdAt: number,
    val: T
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
    }

    add<T>(key: string, val: T) {
        this.#cache.set(key, val);
    }

    get<T>(key: string) {
        return this.#cache.get(key);
    }

    #reap() {
        for (const [key, val] of this.#cache) {
            if (val.createdAt > Date.now() - this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(this.#reap, this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
