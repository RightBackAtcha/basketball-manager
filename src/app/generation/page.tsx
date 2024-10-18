'use client';

import { useState } from "react";

import styles from "./page.module.css";
import Button from '@/components/ui/Button';
import InputNumber from '@/components/ui/InputNumber';
import GenerationUtils from '@/utils/GenerationUtils';

import { Player } from "@/utils/PlayerTypes";
import {storePlayerInDB} from "@/utils/DataUtils";

export default function Generator() {

    // Lift states in parent app
    const [player, setPlayer] = useState<Player | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [generatedPlayers, setGeneratedPlayers] = useState<Player[]>([]);

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleGen = async (generatedPlayers: Player[]) => {
        setGeneratedPlayers(generatedPlayers);
        setPlayer(generatedPlayers[0]);
    }

    // Handle storing of player data
    const handleStore = async() => {
        for (const player of generatedPlayers) {
            await storePlayerInDB(player); // Store each generated player
        }
    }

    return (
        <>
            <GenerationUtils
                player={player}
                setPlayer={setPlayer}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onGen={handleGen}
            />
            <div id={styles.genContainer}>
                <div id={styles.playerData}>
                    <h2>Birth Place: {player?.born.location}</h2>
                    <h2>Name: {player?.first} {player?.last}</h2>
                    <h2>Age: {player?.born.year}</h2>
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
                    <Button onClick={() => handleGen(generatedPlayers)} id={styles.buttonCustomGen} label='Generate Players' />
                    <Button onClick={handleStore} id={styles.buttonStore} label='Store Players'/>
                </div>
            </div>
        </>)
}