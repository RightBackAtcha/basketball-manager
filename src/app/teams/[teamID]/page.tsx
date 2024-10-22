'use client';

import styles from "./page.module.css";

import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import Image from 'next/image';

import { Team } from "@/utils/teams/TeamTypes";
import { db } from "@/utils/db";
import { Player } from "@/utils/player/PlayerTypes";
import { usePathname } from "next/navigation";
import DisplayFlag from "@/components/ui/DisplayFlag";

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
            if(!selectedTeam){
                setIsLoading(false);
                return; // Return, no valid team found (wrong link)
            }
            setName((selectedTeam.region + ' ' + selectedTeam.name));

            // Create const for player search
            const rosterIDs = selectedTeam?.roster;
            if (rosterIDs !== undefined) {
                // Search through until whole roster is found
                const newRoster = rosterIDs.map((id) => players.find((p) => p.pID === id) as Player);
                setRoster(newRoster);
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if(teams && players) {
            console.log(`Loaded team:${teamID}`);
            handleRoster()
        }
    }, [players]);

    // Display error if valid team not found
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

    if (isLoading) {
        return (<>
            Loading...
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
                        <th style={{textAlign: "left", whiteSpace: "nowrap", overflow: "hidden", padding: `0 0 0 10px`, width: "40%"}}>Name</th>
                        <th style={{textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", padding: 0, width: "10%"}}>Age</th>
                        <th style={{textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", padding: 0, width: "5%"}}>Pos</th>
                        <th style={{textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", padding: 0, width: "10%"}}>Height</th>
                        <th style={{textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", padding: 0, width: "10%"}}>Ovr</th>
                        <th style={{textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", padding: 0, width: "10%"}}>Pot</th>
                    </tr>
                    </thead>
                    <tbody>
                    {roster?.map((player: Player) => {
                        // Calculate height in feet and inches
                        const height = `${Math.floor(player.hgtInches! / 12)}'${player.hgtInches! % 12} `;
                        const country = ((player.born!.location).split(", "))[1];
                        return (
                        <tr key={player.pID} className={styles.playerNames}>
                            <td style={{padding: "0 0 0 10px"}}>{player.first} {player.last} <DisplayFlag countryName={country} width={21} height={28} /></td>
                            <td style={{textAlign: "center"}}>{2024 - player.born!.year}</td>
                            <td style={{textAlign: "center"}}>{player.pos}</td>
                            <td style={{textAlign: "center"}}>{height}</td>
                            <td style={{textAlign: "center"}}>{player.ratings!.ovr}</td>
                            <td style={{textAlign: "center"}}>{player.ratings!.pot}</td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
