// Data related functions

import { Player } from "@/utils/player/PlayerTypes";
import { Team } from "@/utils/teams/TeamTypes";
import { openDexieLeague, openMetadata } from "@/utils/db";
import Dexie from "dexie";
import { Metadata } from "@/utils/league/LeagueTypes";

// Fetch JSON data from API route
export async function fetchJSON(filename: string) {
    const res = await fetch(`/api/routes/${filename}`);
    if (!res.ok) throw new Error('Failed to fetch JSON file.');

    return res.json();
}

// Create league save by generating players and creating teams
export async function createSave(players: Player[] | null, teams: Team[], meta: Metadata) {
    const dbMeta = openMetadata();
    if(!meta){
        console.log("No metadata available");
        return;
    }
    await dbMeta.metadata.add(meta);

    const db = openDexieLeague(meta.mID!)

    if(!players) {
        console.error('Cannot store a null player');
        return;
    }

    if (await Dexie.exists(`league${meta.mID}`)) {
        if(confirm("League already exists. Would you like to delete?")) {
            try {
                await db.players.clear();
                await db.teams.clear();

                // Bulk add teams and players to Dexie
                await db.players.bulkAdd(players);
                await db.teams.bulkAdd(teams);

                console.log("League created!");
            } catch (error) {
                console.error(`Failed to create league: ${error}`);
            }

            return;
        }

        return ;
    }

    try {
        await db.players.bulkAdd(players);
        await db.teams.bulkAdd(teams);

        console.log("League created!");
    } catch (error) {
        console.error(`Failed to create league: ${error}`);
    }

    return;

}

// Create metadata object and add to Dexie
export async function addMetadata(meta: Metadata) {
    const dbMeta = openMetadata();
    await dbMeta.metadata.add(meta);

    console.log(`Metadata ${meta} successfully added.`);
}

// Gaussian random bell curve function for normal distribution
export function gaussianRandom(mean: number, std: number) {
    const u1 = Math.random();
    const u2 = Math.random();

    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

    return Math.floor(z1 * std + mean);
}