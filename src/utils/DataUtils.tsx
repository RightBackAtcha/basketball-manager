// Data related functions

import { Player } from "@/utils/player/PlayerTypes";
import { Team } from "@/utils/teams/TeamTypes";
import { db } from "@/utils/db";

// Fetch JSON data from API route
export async function fetchJSON(filename: string) {
    const res = await fetch(`/api/routes/${filename}`);
    if (!res.ok) throw new Error('Failed to fetch JSON file.');

    return res.json();
}

// Store current created player into persistent Dexie DB
export async function storePlayerInDB(player: Player | null) {
    if(!player) {
        console.error('Cannot store a null player');
        return;
    }

    try {
        const id = await db.players.add(player);
    } catch(error) {
        console.error(`Failed to store player: ${error}`);
    }
}

// Store player in Dexie DB
export async function storeTeamInDB(team: Team | null) {
    if(!team) {
        console.error("Cannot store null team.");
        return;
    }

    try {
        const id = await db.teams.add(team);
    } catch(error) {
        console.error(`Failed to store team: ${error}`);
    }
}

// Gaussian random bell curve function for normal distribution
export function gaussianRandom(mean: number, std: number) {
    const u1 = Math.random();
    const u2 = Math.random();

    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z2 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

    return Math.floor(z1 * std + mean);
}