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
    const [availableTeams, setAvailableTeams] = useState<Team[]>([]);
    const [teamID, setTeamID] = useState<Key | null>(null);
    let numLeagues = 0;

    // Open metadata db
    const dbMetadata = openMetadata();
    const data = useLiveQuery(() => dbMetadata.metadata.toArray());

    // Handle league creation button press
    const handleClick = () => {

    };

    // Handle team selection from ComboBox
    const handleSelection = (item: Team) => {
        setTeamID(item.tID);
        console.log(item);
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
                    numLeagues = data.length;
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