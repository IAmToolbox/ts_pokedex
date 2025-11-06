//Imports go here

import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";

// Interfaces and other type info goes here, exported or not

const rl = createInterface({ // Function from Node's readline library
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
});

// Exported functions go here
export function cleanInput(input: string): string[] {
    // This function takes the user's input and cleans it off of whitespace and splits it into an array of words
    const removedDoubleSpaces = input.replace(/\s\s+/g, " "); // ngl I have no idea what this regex even means I just grabbed it off of StackOverflow
    const trimmed = removedDoubleSpaces.trim();
    const lower = trimmed.toLowerCase();
    const inputArray = lower.split(" ");
    return inputArray;
}

export function startREPL(): void {
    // This function starts the REPL and keeps recursively calling itself (at least somewhat) to constantly prompt the user
    rl.prompt();

    rl.on("line", (input) => { // Callback function from Node's process library, taking user input after a newline character is detected
        const cleanedInput = cleanInput(input);
        // Check if the input is empty
        if (cleanedInput.length === 0) {
            rl.prompt()
        }

        // Print the first word of the command
        console.log(`Your command was: ${cleanedInput[0]}`);
        rl.prompt();
    })
}