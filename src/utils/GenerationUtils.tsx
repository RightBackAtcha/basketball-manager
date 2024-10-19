// All functions related to player generation

import {useEffect, useState} from "react";

import { fetchJSON } from '@/utils/DataUtils';
import { Country, Region, Player, College, Names } from "@/utils/PlayerTypes";
import { Team } from "@/utils/TeamTypes";

interface GenerationProps {
    inputValue: string;
    onGenPlayers: (players: Player[]) => void;
    onGenTeams: (teams: Team[]) => void;
}

export default function GenerationUtils({ inputValue, onGenPlayers, onGenTeams }: GenerationProps) {
    // Variables for player and team generation and storage
    const [countries, setCountries] = useState<Country[]>([]);
    const [names, setNames] = useState<Names | null>(null);
    const [regions, setRegions] = useState<Region[]>([]);
    const [colleges, setColleges] = useState<College[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);

    // Fetch JSON data
    useEffect(() => {
        async function loadData() {
            const countriesData = await fetchJSON('countries');
            const namesData = await fetchJSON('names');
            const regionsData = await fetchJSON('regions');
            const collegesData = await fetchJSON('colleges');
            const teamsData = await fetchJSON('teams');

            setCountries(countriesData);
            setRegions(regionsData);
            setColleges(collegesData);
            setNames(namesData);
            setTeams(teamsData);
        }

        loadData();
    }, []);

    const handleCombinedGen = async() => {
        const totalPlayers = Number(inputValue);
        if (isNaN(totalPlayers) || totalPlayers <= 0) {
            console.error("Invalid input value:", inputValue);
            return;
        }

        // Create worker for team gen
        const teamWorker = new Worker(new URL('../workers/TeamGenerationWorker.ts', import.meta.url))
        const numTeams = 30;

        teamWorker.postMessage({ numTeams, teams });

        teamWorker.onmessage = function (e: MessageEvent<Team[]>) {
            const teams = e.data;
            onGenTeams(teams);

            // Create worker for player gen
            const playerWorker = new Worker(new URL('../workers/PlayerGenerationWorker.ts', import.meta.url))
            const firstNames = names?.firstNames;
            const lastNames = names?.lastNames;

            playerWorker.postMessage({ countries, firstNames, lastNames, regions, colleges, totalPlayers });

            playerWorker.onmessage = function (e: MessageEvent<Player[]>) {
                const players = e.data;
                onGenPlayers(players);
                console.log("Generated Players:", players);

                playerWorker.terminate();
                teamWorker.terminate();
            }
        }
    }

    return { handleGen: handleCombinedGen };
}
