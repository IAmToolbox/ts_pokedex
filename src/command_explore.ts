// The explore command

import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    const api = state.api;

    console.log(`Exploring ${args[0]}...`);
    const locationData = await api.fetchLocation(args[0]);
    console.log("Found Pokemon:");
    for (let pokemon of locationData.pokemonEncounters) {
        console.log(`- ${pokemon.pokemon.name}`);
    }
}
