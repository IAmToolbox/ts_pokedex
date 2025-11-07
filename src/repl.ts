//Imports go here

import type { CLICommand } from "./command_declaration.js";

import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

// Interfaces and other type info goes here, exported or not

const rl = createInterface({ // Function from Node's readline library
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
});

// Exported functions go here

export function getCommands(): Record<string, CLICommand> { // Register new commands here after importing their designated callback functions from the other files
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exits the Pokedex",
            callback: commandExit,
        },
    };
}

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
    const commands = getCommands();
    rl.prompt();

    rl.on("line", (input) => { // Callback function from the interface, taking user input after a newline character is detected
        const cleanedInput = cleanInput(input);
        // Check if the input is empty
        if (cleanedInput.length === 0) {
            rl.prompt()
        }

        //Check if the command is valid
        if (cleanedInput[0] in commands) {
            const command = cleanedInput[0];
            commands[command].callback(commands); // I hate indexing with objects!! I never know if it's a dot or square brackets raaaahhhhh!!
        } else {
            console.log("Invalid command.");
        }
        
        rl.prompt();
    })
}