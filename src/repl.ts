//Imports go here

import type { State } from "./state.ts";

// Exported functions go here

export function cleanInput(input: string): string[] {
    // This function takes the user's input and cleans it off of whitespace and splits it into an array of words
    const removedDoubleSpaces = input.replace(/\s\s+/g, " "); // ngl I have no idea what this regex even means I just grabbed it off of StackOverflow
    const trimmed = removedDoubleSpaces.trim();
    const lower = trimmed.toLowerCase();
    const inputArray = lower.split(" ");
    return inputArray;
}

export function startREPL(state: State): void {
    // This function starts the REPL and keeps recursively calling itself (at least somewhat) to constantly prompt the user
    const commands = state.commands;
    const rl = state.rl;
    rl.prompt();

    state.rl.on("line", (input) => { // Callback function from the interface, taking user input after a newline character is detected
        const cleanedInput = cleanInput(input);
        // Check if the input is empty
        if (cleanedInput.length === 0) {
            rl.prompt()
        }

        //Check if the command is valid
        if (cleanedInput[0] in commands) {
            const command = cleanedInput[0];
            commands[command].callback(state); // I hate indexing with objects!! I never know if it's a dot or square brackets raaaahhhhh!!
        } else {
            console.log("Invalid command.");
        }
        
        rl.prompt();
    })
}