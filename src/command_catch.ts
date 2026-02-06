// This command attempts to catch a Pokemon... because we're doing that now apparently

import type { State } from "./state.js";

export async function commandCatch(state: State, pokemonName: string): Promise<void> {
    const api = state.api;

    console.log(`Throwing a Pokeball at ${pokemonName}...`); // this is like the Legends series omg

    const pokemonData = await api.fetchPokemon(pokemonName);
    const catchValue = Math.floor(Math.random() * 400) + 1; // This should be a good baseline chance based on the absolute highest amounts of base experience I've seen so far'
    console.log(catchValue, pokemonData.baseExperience);
    if (pokemonData.baseExperience <= catchValue) {
        state.pokedex[pokemonName] = pokemonData;
        console.log(`${pokemonName} was caught!`);
        console.log("You may use the inspect command to ")
        return;
    } else {
        console.log(`${pokemonName} escaped!`);
    }
}
