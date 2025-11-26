// This file exports and declares types and functions related to the usage of the PokeAPI, all handled within a single class

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        try {
            const response = await fetch(`${pageURL ? pageURL : PokeAPI.baseURL + "/location-area/"}`);
            const responseObject = await response.json();
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