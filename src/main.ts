//TypeScript Pokedex! A guided project from boot.dev
//Boy I sure hope it's not a bad time

//Imports go here
import { initState } from "./state.js";
import { startREPL } from "./repl.js";

function main() {
    const state = initState();
    startREPL(state);
}

main();