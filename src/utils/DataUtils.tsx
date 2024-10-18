// Data related functions

import { Player } from "@/utils/PlayerTypes";

// Database name and version
const dbName = 'league';
const dbVersion = 1;

// Open IndexedDB Database
export function openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        // Handle upgrades
        request.onupgradeneeded = function(event) {
            const db = (event.target as IDBOpenDBRequest).result;
            const objectStorePlayers = db.createObjectStore('players', { keyPath: 'pID', autoIncrement: true });
            const objectStoreTeams = db.createObjectStore('teams', { keyPath: 'tID', autoIncrement: true });
            objectStorePlayers.createIndex("tID", "tID", { unique: false });
        };

        // Handle success
        request.onsuccess = function(event) {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        // Handle errors
        request.onerror = function(event) {
            reject(`Database error: ${(event.target as IDBOpenDBRequest).error}`);
        }
    })
}

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
        const db = await openDatabase();
        const transaction = db.transaction(['players'], 'readwrite');
        const objectStore = transaction.objectStore('players');

        const request = objectStore.add(player); // Add player to object store

        // Handle success and error for adding players
        request.onsuccess = function (event: any) {
            console.log(`Player added successfully: ${event.target.result}`);
        };

        request.onerror = function (event: any) {
            console.log(`Player failed with error: ${event.target.error}`);
        };
    } catch(error) {
        console.error('Failed to store player: ', error);
    }
}
