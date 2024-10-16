'use client';

import styles from "./page.module.css";
import Button from '../../components/Button';
import InputNumber from '../../components/InputNumber';

import { useState } from "react";

// Player class
class Player {
    country: string | undefined;
    first: string | undefined;
    last: string | undefined;

    constructor(country?: string, first?: string, last?: string) {
        this.country = country;
        this.first = first;
        this.last = last;
    }
}

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

// Creates a single player by using JSON database
async function createPlayer():Promise<Player | null> {
    try {
        // Fetch JSON data
        const countries = await fetchJSON('countries');
        const firstNames = await fetchJSON('firstNames');
        const lastNames = await fetchJSON('lastNames');

        // All country weights
        let countryWeights: number[] = [];

        // Add country weights to array
        for (let i = 0; i < countries.length; i++) {
            countryWeights.push(countries[i].weight);
        }

        let randCountryID: any = weightedRandom(countryWeights);
        let player = new Player();

        let temp: any = countries[randCountryID - 1];
        player.country = temp.name;

        // Filter array for element based on 'country_id'
        const filteredFirstNames = firstNames.filter((item: { country_id: any; }) => item.country_id === temp.id);
        const filteredLastNames = lastNames.filter((item: { country_id: any; }) => item.country_id === temp.id);

        // Return random first name element
        player.first = filteredFirstNames[Math.floor(Math.random() * filteredFirstNames.length)].name;

        // Return random last name element
        player.last = filteredLastNames[Math.floor(Math.random() * filteredLastNames.length)].name;

        return player;
    } catch (error) {
        console.error("Error creating player", error);
        return null;
    }
}

// Store current created player into persistent IndexedDB
async function storePlayerInDB(player: Player | null) {
    const db = await openDatabase();
    const transaction = db.transaction(['players'], 'readwrite');
    const objectStore = transaction.objectStore('players');

    const request = objectStore.add(player);

    request.onsuccess = function (event: any) {
        console.log(`Player added successfully: ${event.target.result}`);
    };

    request.onerror = function (event: any) {
        console.log(`Player failed with error: ${event.target.error}`);
    };
}

async function customGenStore(total: number) {
    console.log(`Generating ${total} player(s).`);

    const promises = Array.from({ length: total }, async () => {
        const player = await createPlayer();

        if (player) {
            await storePlayerInDB(player); // Store player if creation was successful
        } else {
            console.error("Failed to create a player.");
        }
    });

    await Promise.all(promises);
}

export default function Generator() {

    // Variables for player generation and storage
    const [player, setPlayer] = useState<Player | null>(null);

    const handleGen = async() => {
        const newPlayer = await createPlayer();
        setPlayer(newPlayer);
    }

    const handleStore = async() => {
        await storePlayerInDB(player);
    }

    // Variables for input field and custom gen and storage
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleCustomGen = async() => {
        const parsedValue = Number(inputValue);

        if (!isNaN(parsedValue) && parsedValue > 0) {
            await customGenStore(parsedValue);
        } else {
            console.error("Invalid input value: ", inputValue);
        }
    }

    return (
        <>
            <div id={styles.genContainer}>
                <div id={styles.playerData}>
                    <h2>Country: {player?.country}</h2>
                    <h2>Name: {player?.first} {player?.last}</h2>
                </div>
                <div id={styles.inputBox}>
                    <h3>Amount of players to generate:</h3>
                    <InputNumber
                        inputValue={inputValue}
                        onChange={handleInputChange}
                        max={500}
                    />
                    <Button onClick={handleCustomGen} id={styles.buttonCustomGen} label='Submit' />
                </div>
                <div id={styles.boxButton}>
                    <Button onClick={handleGen} id={styles.buttonGen} label='Generate'/>
                    <Button onClick={handleStore} id={styles.buttonStore} label='Store in DB'/>
                </div>
            </div>
        </>)
}