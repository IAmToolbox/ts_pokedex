// This is the inspect command

import { State } from "./state.js";

export async function commandInspect(state: State, pokemon: string): Promise<void> {
    const pokedex = state.pokedex;

    if (pokemon in pokedex) {
        console.log(`Name: ${pokedex[pokemon].name}`);
        console.log(`Height: ${pokedex[pokemon].height}`);
        console.log(`Weight: ${pokedex[pokemon].weight}`);
        console.log("Stats:");
        for (let stat of pokedex[pokemon].stats) {
            console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
        }
        console.log("Types:");
        for (let type of pokedex[pokemon].types) {
            console.log(`  - ${type.type.name}`);
        }
    } else {
        console.log("You have not caught that Pokemon yet. Use the catch command to try to catch one.");
    }
}
