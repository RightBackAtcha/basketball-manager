// Data related functions

import { Player } from "@/utils/PlayerTypes";
import { Team } from "@/utils/TeamTypes";
import { db } from "@/utils/db";

// // Database name and version
// const dbName = 'league';
// const dbVersion = 1;
//
// // Open IndexedDB Database
// export function openDatabase(): Promise<IDBDatabase> {
//     return new Promise((resolve, reject) => {
//         const request = indexedDB.open(dbName, dbVersion);
//
//         // Handle upgrades
//         request.onupgradeneeded = function(event) {
//             const db = (event.target as IDBOpenDBRequest).result;
//             const objectStorePlayers = db.createObjectStore('players', { keyPath: 'pID', autoIncrement: false });
//             const objectStoreTeams = db.createObjectStore('teams', { keyPath: 'tID', autoIncrement: false });
//             objectStorePlayers.createIndex("tID", "tID", { unique: false });
//         };
//
//         // Handle success
//         request.onsuccess = function(event) {
//             const db = (event.target as IDBOpenDBRequest).result;
//
//             resolve((event.target as IDBOpenDBRequest).result);
//         };
//
//         // Handle errors
//         request.onerror = function(event) {
//             reject(`Database error: ${(event.target as IDBOpenDBRequest).error}`);
//         }
//     })
// }
//
// export function wipeDatabase(): Promise<IDBDatabase> {
//     return new Promise((resolve, reject) => {
//         const request = indexedDB.open(dbName, dbVersion);
//
//         // Handle upgrades
//         request.onupgradeneeded = function(event) {
//             const db = (event.target as IDBOpenDBRequest).result;
//
//             // Create object stores if none exist
//             if (!db.objectStoreNames.contains('players')) {
//                 const objectStorePlayers = db.createObjectStore('players', { keyPath: 'pID', autoIncrement: false });
//                 objectStorePlayers.createIndex("tID", "tID", { unique: false });
//             }
//             if (!db.objectStoreNames.contains('teams')) {
//                 const objectStoreTeams = db.createObjectStore('teams', { keyPath: 'tID', autoIncrement: false });
//             }
//         };
//
//         // Handle success
//         request.onsuccess = function(event) {
//             const db = (event.target as IDBOpenDBRequest).result;
//
//             const transaction1 = db.transaction('players', 'readwrite');
//             const transaction2 = db.transaction('teams', 'readwrite');
//
//             const playersStore = transaction1.objectStore('players');
//             playersStore.clear();
//
//             const teamsStore = transaction2.objectStore('teams');
//             teamsStore.clear();
//
//             console.log("Cleared players and teams object stores.");
//
//             resolve((event.target as IDBOpenDBRequest).result);
//         }
//
//         // Handle errors
//         request.onerror = function(event) {
//             reject(`Database error: ${(event.target as IDBOpenDBRequest).error}`);
//         }
//     })
// }

// Fetch JSON data from API route
export async function fetchJSON(filename: string) {
    const res = await fetch(`/api/routes/${filename}`);
    if (!res.ok) throw new Error('Failed to fetch JSON file.');

    return res.json();
}

// Store current created player into persistent IndexedDB
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