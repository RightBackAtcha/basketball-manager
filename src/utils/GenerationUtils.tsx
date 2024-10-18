// All functions related to player generation

import {useEffect, useState} from "react";

import { storePlayerInDB, fetchJSON } from '@/utils/DataUtils';
import { Country, Name, Player } from "@/utils/PlayerTypes";

interface GenerationProps {
    player: Player | null;
    setPlayer: (player: Player | null) => void;
    inputValue: string;
    setInputValue: (value: string) => void;
    onGen: (players: Player[]) => void;
}

export default function GenerationUtils({ player, setPlayer, inputValue, setInputValue, onGen }: GenerationProps) {
    // Variables for player generation and storage
    // const [player, setPlayer] = useState<Player | null>(null);
    // const [inputValue, setInputValue] = useState('');
    const [countries, setCountries] = useState<Country[]>([]);
    const [firstNames, setFirstnames] = useState<Name[]>([]);
    const [lastNames, setLastnames] = useState<Name[]>([]);
    const [regions, setRegions] = useState<Name[]>([]);
    // const [generatedPlayers, setGeneratedPlayers] = useState<Player[]>([]);

    // Fetch JSON data
    useEffect(() => {
        async function loadData() {
            const countriesData = await fetchJSON('countries');
            const firstNamesData = await fetchJSON('firstNames');
            const lastNamesData = await fetchJSON('lastNames');
            const regionsData = await fetchJSON('regions');

            setCountries(countriesData);
            setFirstnames(firstNamesData);
            setLastnames(lastNamesData);
            setRegions(regionsData);
        }
        loadData();
    }, []);

    const handleGen = async() => {
        const worker = new Worker(new URL('../workers/PlayerGenerationWorker.ts', import.meta.url))

        const totalPlayers = Number(inputValue);
        const tID = 1;

        if (!isNaN(totalPlayers) && (worker && totalPlayers > 0)) {
            worker.postMessage({ countries, firstNames, lastNames, regions, totalPlayers, tID });

            worker.onmessage = function (e: MessageEvent<Player[]>) {
                const players = e.data;
                onGen(players);
                // setGeneratedPlayers(players);
                //
                console.log("Generated Players: ", players);
            }
        } else {
            console.error("Invalid input value: ", inputValue);
        }
    }

    // Handle storing of player data
    // const handleStore = async() => {
    //     for (const player of generatedPlayers) {
    //         await storePlayerInDB(player); // Store each generated player
    //     }
    // }

    return null;
}
