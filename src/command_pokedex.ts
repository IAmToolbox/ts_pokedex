// This is the pokedex command

import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
    const pokedex = state.pokedex;

    console.log("Your Pokedex:");
    if (Object.keys(pokedex).length === 0) {
        console.log(" - ...is empty! Use the catch command to catch some Pokemon");
        return;
    }
    for (const pokemon in pokedex) {
        console.log(` - ${pokemon}`);
    }
}
