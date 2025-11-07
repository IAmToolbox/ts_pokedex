// The help command

import type { CLICommand } from "./command_declaration.js";

export function commandHelp(commands: Record<string, CLICommand>): void {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    for (let command in commands) {
        console.log(`${commands[command].name}: ${commands[command].description}`);
    };
}