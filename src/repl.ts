//Imports go here

import type { State } from "./state.js";

// Exported functions go here

export function cleanInput(input: string): string[] {
    // This function takes the user's input and cleans it off of whitespace and splits it into an array of words
    const removedDoubleSpaces = input.replace(/\s\s+/g, " "); // ngl I have no idea what this regex even means I just grabbed it off of StackOverflow
    const trimmed = removedDoubleSpaces.trim();
    const lower = trimmed.toLowerCase();
    const inputArray = lower.split(" ");
    return inputArray;
}

export async function startREPL(state: State): Promise<void> {
    // This function starts the REPL and keeps recursively calling itself (at least somewhat) to constantly prompt the user
    const commands = state.commands;
    const rl = state.rl;
    rl.prompt();

    rl.on("line", async (input) => { // Callback function from the interface, taking user input after a newline character is detected
        const cleanedInput = cleanInput(input);
        // Check if the input is empty
        if (cleanedInput.length === 0) {
            rl.prompt();
            return;
        }

        //Check if the command is valid
        if (cleanedInput[0] in commands) {
            const command = cleanedInput[0];
            const args: string[] = [];
            if (cleanedInput.length > 1) {
                const inputSlice = cleanedInput.slice(1);
                args.push(...inputSlice);
            }
            try {
                await commands[command].callback(state, ...args); // I hate indexing with objects!! I never know if it's a dot or square brackets raaaahhhhh!!
            } catch (error) {
                console.error("Error running command:", error);
            }
        } else {
            console.log("Invalid command.");
        }
        
        rl.prompt();
    })
}
