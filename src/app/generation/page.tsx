'use client';

import styles from "./page.module.css";
import Button from '../../components/Button';
import InputNumber from '../../components/InputNumber';

import {useEffect, useState} from "react";

// Define types for Player, Country and Name
type Player = {
    country: string;
    first: string;
    last: string;
}

type Country = {
    id: number;
    name: string;
    weight: number;
}

type Name = {
    name: string;
    country_id: number;
}

// Define player generation worker using Worker class

// Weighted random function
function weightedRandom(weights: number[]) {
    let totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
    let random = Math.random() * totalWeight;

    for(let i = 0; i < weights.length; i++) {
        if (random < weights[i]) {
            return i + 1; // Country ID starts from 1, so return index + 1
        }
        random -= weights[i];
    }
}

// Database name and version
const dbName = 'players';
const dbVersion = 1;

// Open IndexedDB Database
function openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        // Handle upgrades
        request.onupgradeneeded = function(event) {
            const db = (event.target as IDBOpenDBRequest).result;
            const objectStore = db.createObjectStore(dbName, { autoIncrement: true });
            objectStore.createIndex('country', 'country', { unique: false });
            objectStore.createIndex('first', 'first', { unique: false });
            objectStore.createIndex('last', 'last', { unique: false });
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
async function fetchJSON(filename: string) {
    const res = await fetch(`/api/routes/${filename}`);
    if (!res.ok) throw new Error('Failed to fetch JSON file.');

    return res.json();
}

// Store current created player into persistent IndexedDB
async function storePlayerInDB(player: Player | null) {
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

export default function Generator() {

    // Variables for player generation and storage
    const [player, setPlayer] = useState<Player | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [countries, setCountries] = useState<Country[]>([]);
    const [firstNames, setFirstnames] = useState<Name[]>([]);
    const [lastNames, setLastnames] = useState<Name[]>([]);
    const [generatedPlayers, setGeneratedPlayers] = useState<Player[]>([]);

    // Fetch JSON data
    useEffect(() => {
        async function loadData() {
            const countriesData = await fetchJSON('countries');
            const firstNamesData = await fetchJSON('firstNames');
            const lastNamesData = await fetchJSON('lastNames');

            setCountries(countriesData);
            setFirstnames(firstNamesData);
            setLastnames(lastNamesData);
        }
        loadData();
    }, []);

    const handleGen = async() => {
        const worker = new Worker(new URL('../../workers/PlayerGenerationWorker.ts', import.meta.url))

        const totalPlayers = Number(inputValue);

        if (!isNaN(totalPlayers) && (worker && totalPlayers > 0)) {
            worker.postMessage({ countries, firstNames, lastNames, totalPlayers });

            worker.onmessage = function (e: MessageEvent<Player[]>) {
                const players = e.data;
                setGeneratedPlayers(players);

                console.log("Generated Players: ", players);
                setPlayer(players[0]);
            }
        } else {
            console.error("Invalid input value: ", inputValue);
        }
    }

    const handleStore = async() => {
        for (const player of generatedPlayers) {
            await storePlayerInDB(player); // Store each generated player
        }
    }

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    return (
        <>
            <div id={styles.genContainer}>
                <div id={styles.playerData}>
                    <h2>Country: {player?.country}</h2>
                    <h2>Name: {player?.first} {player?.last}</h2>
                </div>
                <div id={styles.inputBox}>
                    <h3>Players to generate:</h3>
                    <InputNumber
                        inputValue={inputValue}
                        onChange={handleInputChange}
                        max={500}
                    />
                </div>
                <div id={styles.boxButton}>
                    <Button onClick={handleGen} id={styles.buttonCustomGen} label='Generate Players' />
                    <Button onClick={handleStore} id={styles.buttonStore} label='Store Players'/>
                </div>
            </div>
        </>)
}