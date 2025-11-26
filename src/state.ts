// Guess we doing state machines now

import { createInterface, type Interface } from "readline";
import { stdin, stdout } from "node:process";

// Import commands here
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";

import { PokeAPI } from "./pokeapi.js";

// This used to be declared in its own file, but now it's here
export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

// The State type, which is a state machine
export type State = {
    api: PokeAPI,
    mapData: MapData,
    rl: Interface,
    commands: Record<string, CLICommand>,
};

type MapData = {
    next: string | null,
    previous: string | null,
}

// This function returns a full State object. New commands will be registered here
export function initState(): State {
    return {
        api: new PokeAPI,
        mapData: {
            next: null,
            previous: null,
        },
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
            map: {
                name: "map",
                description: "Displays 20 locations from the API, then moves to the next page",
                callback: commandMap,
            },
            mapb: {
                name: "mapb",
                description: "Displays the previous 20 locations from the API, going back a page",
                callback: commandMapB,
            },
            exit: {
                name: "exit",
                description: "Exits the Pokedex",
                callback: commandExit,
            },
        }
    }
}