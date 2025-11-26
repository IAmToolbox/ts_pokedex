// This command displays the names of 20 locations in the Pokemon world

import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    const api = state.api;

    if (state.mapData.next === null) {
        const locationData = await api.fetchLocations();
        state.mapData.next = locationData.next;
        state.mapData.previous = locationData.previous;

        for (let location of locationData.results) {
            console.log(`${location.name}`);
        }
    } else {
        const locationData = await api.fetchLocations(state.mapData.next);
        state.mapData.next = locationData.next;
        state.mapData.previous = locationData.previous;

        for (let location of locationData.results) {
            console.log(`${location.name}`);
        }
    }
}