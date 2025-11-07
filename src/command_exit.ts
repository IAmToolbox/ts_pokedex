// tbh do I need to write comments for every single script I don't think so that's a problem for future me to figure out
// This is the exit command btw
import type { CLICommand } from "./command_declaration.js";
import { exit } from "node:process";

export function commandExit(_commands: Record<string, CLICommand>): void {
    console.log("Closing the Pokedex... Goodbye!");
    exit(0);
}