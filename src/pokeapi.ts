// This file exports and declares types and functions related to the usage of the PokeAPI, all handled within a single class

import { Cache } from "./pokecache.js"

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    cache = new Cache(60000); // This should be an interval of about a minute or so

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (this.cache.get(pageURL)) {
            const cachedObject = this.cache.get(pageURL)
            if (cachedObject !== undefined) {
                return {
                    next: cachedObject.val.next,
                    previous: cachedObject.val.previous,
                    results: cachedObject.val.results
                };
            }
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
        const url = PokeAPI.baseURL + "/location-area/" + locationName;
        if (this.cache.get(url)) {
            const cachedObject = this.cache.get(url);
            if (cachedObject !== undefined) {
                return {
                    pokemonEncounters: cachedObject.val.pokemon_encounters
                };
            }
        }

        try {
            const response = await fetch(url);
            const responseObject = await response.json();
            this.cache.add(url, responseObject);
            return {
                pokemonEncounters: responseObject.pokemon_encounters
            };
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            }
            throw new Error("Network request failed");
        }
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = PokeAPI.baseURL + "/pokemon/" + pokemonName;
        if (this.cache.get(url)) {
            const cachedObject = this.cache.get(url);
            if (cachedObject !== undefined) {
                return {
                    name: cachedObject.val.name,
                    baseExperience: cachedObject.val.base_experience,
                    height: cachedObject.val.height,
                    weight: cachedObject.val.weight,
                    stats: cachedObject.val.stats,
                    types: cachedObject.val.types,
                };
            }
        }

        try {
            const response = await fetch(url);
            const responseObject = await response.json();
            this.cache.add(url, responseObject);
            return {
                name: responseObject.name,
                baseExperience: responseObject.base_experience,
                height: responseObject.height,
                weight: responseObject.weight,
                stats: responseObject.stats,
                types: responseObject.types,
            };
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            }
            throw new Error("Network request failed");
        }
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
};

export type Location = {
    pokemonEncounters: PokemonEncounter[],
};

type PokemonEncounter = {
    pokemon: Result,
    versionDetails: any, // I have no idea if I'm even gonna use this information tbh
};

export type Pokemon = {
    name: string,
    baseExperience: number,
    height: number,
    weight: number,
    stats: PokemonStat[],
    types: PokemonType[],
};

type PokemonStat = {
    baseStat: number,
    effortValue: number,
    stat: Result,
};

type PokemonType = {
    slot: number,
    type: Result,
}
