// Data related functions

import { Player } from "@/utils/player/PlayerTypes";
import { Team } from "@/utils/teams/TeamTypes";
import { db } from "@/utils/db";
import Dexie from "dexie";

// Fetch JSON data from API route
export async function fetchJSON(filename: string) {
    const res = await fetch(`/api/routes/${filename}`);
    if (!res.ok) throw new Error('Failed to fetch JSON file.');

    return res.json();
}

// Create league save by generating players and creating teams
export async function createSave(players: Player[] | null, teams: Team[]) {
    if(!players) {
        console.error('Cannot store a null player');
        return;
    }

    if (await Dexie.exists('league')) {
        if(confirm("League already exists. Would you like to delete?")) {
            try {
                const delPlayers = await db.players.clear();
                const delTeams = await db.teams.clear();

                // Bulk add teams and players to Dexie
                const idPlayers = await db.players.bulkAdd(players);
                const idTeams = await db.teams.bulkAdd(teams);

                console.log("League created!");
            } catch (error) {
                console.error(`Failed to create league: ${error}`);
            }

            return;
        }

        return ;
    }

    try {
        const id = await db.players.bulkAdd(players);
    } catch (error) {
        console.error(`Failed to store player: ${error}`);
    }

    return;

}

// Gaussian random bell curve function for normal distribution
export function gaussianRandom(mean: number, std: number) {
    const u1 = Math.random();
    const u2 = Math.random();

    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z2 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

    return Math.floor(z1 * std + mean);
}