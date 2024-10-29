'use client';

import styles from "./page.module.css"
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Button, Key } from "react-aria-components";

import { openMetadata } from "@/utils/db";
import { Metadata } from "@/utils/league/LeagueTypes";
import { fetchJSON } from "@/utils/DataUtils";
import { Team } from "@/utils/teams/TeamTypes";
import TeamComboBox from '@/components/ui/TeamComboBox/TeamComboBox';

export default function NewLeaguePage() {
    // States and variables
    const [metadata, setMetadata] = useState<Metadata[]>([]);
    const [leagueData, setLeagueData] = useState<Metadata>();
    const [availableTeams, setAvailableTeams] = useState<Team[]>([]);
    const [teamID, setTeamID] = useState<Key | null>(null);
    const [leagueName, setLeagueName] = useState("");
    const [numLeagues, setNumLeagues] = useState(0);

    // Open metadata db
    const dbMetadata = openMetadata();
    const data = useLiveQuery(() => dbMetadata.metadata.toArray());

    // Handle league creation button press
    const handleClick = () => {
        if (teamID !== null || leagueName !== null) {
            const data: Metadata = {
                name: leagueName,
                mID: numLeagues,
                tID: Number(teamID),
                startingSeason: "2024",
                season: "2024"
            }

            console.log(data);
        } else {
            console.error("Error: Cannot create league. Some values were not selected")
        }
    };

    // Handle team selection from ComboBox
    const handleSelection = (item: Team | null) => {
        if (item !== null) {
            setTeamID(item.tID);
            console.log(item);
        } else {
            console.error("Error: No team found.")
        }

    };

    // Find new league metadata ID
    useEffect(  () => {
        async function loadData () {
            try {
                // Fetch available teams
                const teams: Team[] = await fetchJSON('teams');
                if (teams.length > 0) {
                    const teams30 = teams.slice(0, 30);

                    // Update AsyncList with only first 30 teams
                    setAvailableTeams(teams30);
                }
                // Check if metadata is valid
                if (data) {
                    setMetadata(data);
                    setNumLeagues(data.length);
                }
            } catch(error) {
                console.error("Error fetching teams:", error);
        } finally {

            }
        }

        loadData();
    }, [data]);

    return (
        <>
            <div id={styles.container}>
                <div id={styles.topSelectors}>
                    <h4>Select Team</h4>
                    <div style={{marginTop: "-10px"}}>
                        <TeamComboBox
                            items={availableTeams}
                            onSelectionChange={handleSelection}
                        />
                    </div>
                </div>
                <div id={styles.buttonContainer}>
                    <Button onPress={handleClick} id={styles.button}>Create League</Button>
                </div>
            </div>
        </>
    )
}