'use client';

import styles from "./page.module.css"
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Button, Key, ListBoxItem } from "react-aria-components";
import { useAsyncList } from "@react-stately/data";

import { openMetadata } from "@/utils/db";
import { Metadata } from "@/utils/league/LeagueTypes";
import { fetchJSON } from "@/utils/DataUtils";
import { Team } from "@/utils/teams/TeamTypes";
import TeamComboBox from '@/components/ui/TeamComboBox';

export default function NewLeaguePage() {
    // States and variables
    const [metadata, setMetadata] = useState<Metadata[]>([]);
    const [availableTeams, setAvailableTeams] = useState<Team[]>([]);
    const [teamID, setTeamID] = useState<Key | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    let numLeagues = 0;

    // Open metadata db
    const dbMetadata = openMetadata();
    const data = useLiveQuery(() => dbMetadata.metadata.toArray());

    // Handle league creation button press
    const handleClick = (() => {

    })

    // Find new league metadata ID
    useEffect(() => {
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
                setIsLoading(false);
            }
        }

        loadData();
    }, [data]);

    // Print id when change detected
    useEffect(() => {
        if (teamID) {
            const temp = teamID.toString();
            console.log(temp.split("-")[2]);
        }
    }, [teamID]);

    return (
        <>
            <div id={styles.container}>
                <div id={styles.topSelectors}>
                    <TeamComboBox
                        label="Select Team"
                        defaultItems={availableTeams}
                        defaultSelectedKey={availableTeams[0]?.tID}
                        onSelectionChange={(id) => setTeamID(id)}
                    >
                        {item => <ListBoxItem key={item.tID}>{item.region} {item.name}</ListBoxItem>}
                    </TeamComboBox>
                </div>
                <div id={styles.buttonContainer}>
                    <Button onPress={handleClick} id={styles.button}>Create League</Button>
                </div>
            </div>
        </>
    )
}