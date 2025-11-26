// The help command

import type { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
    const commands = state.commands;
    
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    for (let command in commands) {
        console.log(`${commands[command].name}: ${commands[command].description}`);
    };
}