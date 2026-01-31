// This file exports and declares types and functions related to the usage of the PokeAPI, all handled within a single class

import { Cache } from "./pokecache.js"

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    cache = new Cache(60000); // This should be an interval of about a minute or so

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (this.cache.get(pageURL)) {
            const cachedObject = this.cache.get(pageURL)
            return {
                next: cachedObject.next,
                previous: cachedObject.previous,
                results: cachedObject.results
            };
        }
        try {
            const response = await fetch(`${pageURL ? pageURL : PokeAPI.baseURL + "/location-area/"}`);
            const responseObject = await response.json();
            this.cache.add(pageURL, responseObject);
            return {
                next: responseObject.next,
                previous: responseObject.previous,
                results: responseObject.results // Is this how you do this again??????????????
            };
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            }
            throw new Error("Network request failed");
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        throw new Error("This isn't implemented yet!");
    }
}

export type ShallowLocations = {
    next: string,
    previous: string | null,
    results: Result[],
};

type Result = {
    name: string,
    url: string,
}

export type Location = {
    // TODO: Properly implement this
};
