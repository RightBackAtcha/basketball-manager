'use client';

import styles from "./page.module.css"
import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/utils/db";
import { Team } from "@/utils/TeamTypes";
import { Player } from '@/utils/PlayerTypes'
import { useState } from "react";

export default function ShowRosters() {
    const teams = useLiveQuery(() => db.teams.toArray());
    const players = useLiveQuery(() => db.players.toArray());

    const [rosterSize, setRosterSize] = useState(0);
    const [playerNames, setPlayerNames] = useState<string[]>([]);

    const handleClick = (team: Team) => {
        if (players !== undefined && team.roster.length > 0) {
            setRosterSize(team.roster.length);
            let temp: string[] = [];

            for (let i = 0; i < rosterSize; i++) {
                const rosterSpot = team.roster[i];
                const player = players.find((p) => p.pID === rosterSpot)
                if (player) {
                    temp.push(`${player.first} ${player.last} pos: ${player?.pos} height: ${player?.hgtInches} in.`);
                    console.log(`${player.first} ${player.last}`)
                } else {
                    console.log(`Player ${rosterSpot} not found. Where he go????`);
                }
            }
            setPlayerNames(temp);
        }
    };

    return (
        <>
            <div id={styles.rosterContainer}>
                <ul id={styles.teamsList}>
                    {teams?.map((team: Team) => (
                        <li key={team.tID}
                            onClick={() => handleClick(team)}
                            style={{
                                display: "flex",
                                cursor: "pointer",
                                width: "66%",
                                marginTop: "9.6px",
                                marginLeft: "47px",
                                alignItems: "center",
                                alignContent: "center",
                                flexDirection: "column",
                        }}>
                            {team.region} {team.name}
                        </li>
                    ))}
                </ul>
                <ul id={styles.rosterList}>
                    {playerNames.map((name, index) => (
                        <li key={index}
                            style={{
                                display: "flex",
                                marginRight: "20px",
                                marginLeft: "-40px",
                                marginBottom: "0",
                                padding: "10px",
                                height: "60px",
                                minWidth: "100px",
                                boxSizing: "border-box",
                                lineHeight: "1",
                                textAlign: "left",
                                alignItems: "left",
                            }}
                        >{name}</li>
                    ))}
                </ul>
            </div>
        </>);
}

