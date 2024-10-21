'use client';

import {useEffect, useState} from "react";

import styles from "./page.module.css";
import Button from '@/components/ui/Button';
import InputNumber from '@/components/ui/InputNumber';
import GenerationUtils from '@/utils/GenerationUtils';

import { Player } from "@/utils/player/PlayerTypes";
import { createSave } from "@/utils/DataUtils";
import {Team} from "@/utils/teams/TeamTypes";

export default function Generator() {

    // Lift states in parent app
    const [player, setPlayer] = useState<Player | null>(null);
    const [team, setTeam ] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [generatedPlayers, setGeneratedPlayers] = useState<Player[]>([]);
    const [generatedTeams, setGeneratedTeams] = useState<Team[]>([]);
    const [height, setHeight] = useState('');

    const [isPlayersGenerated, setIsPlayersGenerated] = useState(false);
    const [isTeamsGenerated, setIsTeamsGenerated] = useState(false);

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handlePlayers = async (players: Player[]) => {
        setGeneratedPlayers(players);
        setPlayer(players[0]);
        setIsPlayersGenerated(true);
    }

    const handleTeams = async (teams: Team[]) => {
        setGeneratedTeams(teams);
        setIsTeamsGenerated(true);
    }

    // Handle storing of player data
    const handleStore = async() => {
        await createSave(generatedPlayers, generatedTeams); // Store generating teams and players in league
    }

    const populateTeams = async () => {
        // Error check to make sure there are valid teams and players
        if (generatedPlayers.length === 0 || generatedTeams.length === 0) {
            console.error("Error: No teams or players available to assign.");
            return;
        }

        // Create array of players
        const playerArray = [...generatedPlayers];

        // Assign players to teams
        for (let team of generatedTeams) {
            // Randomly determine players assigned to team (12 - 15)
            const rosterSize = Math.round(Math.random() * 3) + 12;

            // Ensure players assigned never exceeds players available
            const playersToAssign = Math.min(rosterSize, playerArray.length);

            // Randomly select players for the team
            const assignedPlayers = [];
            for (let i = 0; i < playersToAssign; i++) {
                const randIx: number = Math.floor(Math.random() * playerArray.length);
                const player: Player = playerArray[randIx];

                // Assign playerID to team roster and teamID to player
                if (player.pID !== null) {
                    player.tID = team.tID;
                    team.roster
                        .push(player.pID!);

                    // Store assigned player and remove from playerArray
                    assignedPlayers.push(player);
                    playerArray.splice(randIx, 1);

                } else {
                    console.error("Error: Player did not have valid ID."); // Error should never occur
                }
            }
        }

        console.log("Players assigned to teams:", generatedTeams);
        setIsPlayersGenerated(false);
        setIsTeamsGenerated(false);
    }

    const { handleGen } = GenerationUtils({
        inputValue,
        onGenPlayers: handlePlayers,
        onGenTeams: handleTeams
    });

    const handleGenAll = async () => {
        await handleGen();
    };

    // Populate teams when players are finished generating
    useEffect(() => {
        if (isPlayersGenerated && isTeamsGenerated) {
            populateTeams();
        }

        const teamInfo = generatedTeams[Number(player?.tID) - 1];
        if (teamInfo) {
            setTeam(`${teamInfo.region} ${teamInfo.name}`);
        }
    }, [isPlayersGenerated, isTeamsGenerated, player, generatedTeams]);

    // Check for change in player state
    useEffect(() => {
        if (player?.hgtInches !== undefined) {
            const feet = Math.floor(player.hgtInches / 12);
            const inches = player.hgtInches % 12;
            setHeight(`${feet}'${inches}"`);
        }
    }, [player])

    return (
        <>
            <div id={styles.genContainer}>
                <div id={styles.playerData}>
                    <h2>Birth Place: {player?.born?.location}</h2>
                    <h2>College: {player?.college}</h2>
                    <h2>Name: {player?.first} {player?.last}</h2>
                    <h2>Age: {player?.born?.year}</h2>
                    <h2>Team: {team}</h2>
                    <h2>Height: {height}</h2>
                    <h2>Ovr: {player?.ratings?.ovr}</h2>
                    <h2>Pot: {player?.ratings?.pot}</h2>
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
                    <Button onClick={handleGenAll} id={styles.buttonCustomGen} label='Generate' />
                    <Button onClick={handleStore} id={styles.buttonStore} label='Store'/>
                </div>
            </div>
        </>)
}