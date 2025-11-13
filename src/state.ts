// Guess we doing state machines now

import { createInterface, type Interface } from "readline";
import { stdin, stdout } from "node:process";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

// This used to be declared in its own file, but now it's here
export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

// The State type, which is a state machine
export type State = {
    rl: Interface,
    commands: Record<string, CLICommand>,
};

// This function returns a full State object. New commands will be registered here
export function initState(): State {
    return {
        rl: createInterface({
            input: stdin,
            output: stdout,
            prompt: "Pokedex > ",
        }),
        commands: {
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
        }
    }
}