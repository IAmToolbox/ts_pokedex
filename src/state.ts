// Guess we doing state machines now

import { createInterface, type Interface } from "readline";
import { stdin, stdout } from "node:process";

// Import commands here
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

import { PokeAPI } from "./pokeapi.js";
import type { Pokemon } from "./pokeapi.js";

// This used to be declared in its own file, but now it's here
export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

// The State type, which is a state machine
export type State = {
    api: PokeAPI,
    pokedex: Record<string, Pokemon>,
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
        pokedex: {},
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
            explore: {
                name: "explore",
                description: "(Takes 1 argument) Explores a specified area, showing more information about it",
                callback: commandExplore,
            },
            catch: {
                name: "catch",
                description: "(Takes 1 argument) Attempts to catch a specified Pokemon. Success registers the Pokemon to your personal Pokedex",
                callback: commandCatch,
            },
            pokedex: {
                name: "pokedex",
                description: "Displays your personal Pokedex, which shows all currently registered Pokemon",
                callback: commandPokedex,
            },
            inspect: {
                name: "inspect",
                description: "(Takes 1 argument) Displays more information about a Pokemon currently registered in your Pokedex",
                callback: commandInspect,
            },
            exit: {
                name: "exit",
                description: "Exits the Pokedex",
                callback: commandExit,
            },
        }
    }
}
