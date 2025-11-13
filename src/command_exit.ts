// tbh do I need to write comments for every single script I don't think so that's a problem for future me to figure out
// This is the exit command btw
import type { State } from "./state.js";
import { exit } from "node:process";

export function commandExit(state: State): void {
    console.log("Closing the Pokedex... Goodbye!");
    state.rl.close();
    exit(0);
}