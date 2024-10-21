'use client';

import styles from "./page.module.css";

import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { Team } from "@/utils/TeamTypes";
import { db } from "@/utils/db";
import { Player } from "@/utils/PlayerTypes";
import { usePathname } from "next/navigation";

export default function TeamRosters(){
    // Import players and teams from specific league
    const teams = useLiveQuery(() => db.teams.toArray());
    const players = useLiveQuery(() => db.players.toArray());

    // States for setting team, name and loading
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [roster, setRoster] = useState<Player[]>([]);

    // Team ID fetched from url
    const teamID = Number((usePathname().split("/"))[2]);

    // Extract roster IDs and find these players
    const handleRoster = () => {
        if (teams !== undefined && players !== undefined) {
            // Set states
            const selectedTeam = teams[teamID - 1]
            setName(selectedTeam.region + ' ' + selectedTeam.name);

            // Create const for player search
            const rosterIDs = selectedTeam?.roster;
            if (rosterIDs !== undefined) {
                // Search through until whole roster is found
                const newRoster = rosterIDs.map((id) => players.find((p) => p.pID === id) as Player);

                setRoster(newRoster);
            }
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if(teams && players) {
            console.log(`Loaded team:${teamID}`);
            handleRoster()
        }
    }, [players]);

    if (isLoading) {
        return (<>
            Loading...
        </>);
    }

    if (!teams || teamID > teams.length) {
        return (<>
            <div style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <h1> Error: This team does not exist </h1>
            </div>
        </>);
    }

    return (
        <>
            <div id={styles.divTeam}>
                <h2>{name}</h2>
            </div>
            <div id={styles.divRoster}>
                <table style={{
                    margin: 0,
                    paddingLeft: "5px",
                    paddingBottom: "10px",
                    borderCollapse: "collapse",
                    tableLayout: "auto",
                    width: "auto",
                }}>
                    <thead>
                    <tr>
                        <th style={{textAlign: "left", whiteSpace: "nowrap", overflow: "hidden"}}>Name</th>
                        <th style={{textAlign: "left", whiteSpace: "nowrap", overflow: "hidden"}}>Age</th>
                        <th style={{textAlign: "left", whiteSpace: "nowrap", overflow: "hidden"}}>Pos</th>
                        <th style={{textAlign: "left", whiteSpace: "nowrap", overflow: "hidden"}}>Ovr</th>
                        <th style={{textAlign: "left", whiteSpace: "nowrap", overflow: "hidden"}}>Pot</th>
                    </tr>
                    </thead>
                    <tbody>
                    {roster?.map((player: Player) => (
                        <tr key={player.pID} className={styles.playerNames}>
                            <td>{player.first} {player.last}</td>
                            <td>{2024 - player.born.year}</td>
                            <td>{player.pos}</td>
                            <td></td>
                            <td>{player.ratings.ovr}</td>
                            <td>{player.ratings.pot}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
