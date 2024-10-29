'use client';

import styles from './page.module.css'

import { useLiveQuery } from "dexie-react-hooks";
import { Button } from "react-aria-components";
import { useEffect, useState } from "react";

import DisplayLeagues from "@/components/ui/DisplayLeagues";
import { openMetadata } from "@/utils/db";
import { Metadata } from "@/utils/league/LeagueTypes";
import { addMetadata } from "@/utils/DataUtils";

export default function NewLeague() {
    // Retrieve metadata from Dexie
    const dbMeta = openMetadata();

    // Data state
    const [metadata, setMetadata] = useState<Metadata[]>([]);
    const data = useLiveQuery(() => dbMeta.metadata.toArray());
    let num = useLiveQuery(() => dbMeta.metadata.count());

    // handle new league creation
    const handleCreateLeague = () => {
        console.log("Button clicked!");
        console.log(num);
        if(num !== undefined) {
            const meta: Metadata = {name: `League ${num}`, mID: num, tID: 1, startingSeason: "2024", season: "2024"};
            addMetadata(meta);
        } else {
            console.log("Error: Operation failed.");
        }
    }

    // Update metadata if meta changes
    useEffect(() => {
        if(data) {
            setMetadata(data);
        }
    }, [data]);

    return(
        <>
            <div id={styles.container}>
                    {/*<DisplayLeagues data={metadata}/>*/}
                <div id={styles.buttonContainer}>
                    <Button id={styles.button} onPress={handleCreateLeague}>Create new League</Button>
                </div>
                <div id={styles.textContainer}>
                <h3>
                        League Saves and IndexedDB Persistent Storage
                    </h3>
                    <div style={{lineHeight: "25px", fontSize: "20px"}}>
                        Our game uses IndexedDB for saving your league data, ensuring that your players, teams, and
                        other information persist between game sessions. <br></br>
                        This allows you to pick up where you left off, even if you close the game. <br></br>
                        To ensure that your league saves work properly, please make sure that IndexedDB is enabled in
                        your browser.<br></br>
                        No special setup is required for most modern browsers, but it’s important to note
                        that: <br></br>

                        <ul>
                            <li>Clearing your browser cache or cookies will delete your saved league data. This includes
                                clearing history or using any "clear storage" tools.
                            </li>
                            <li>If you encounter any issues with saving, check your browser's storage settings to ensure
                                IndexedDB is not disabled or blocked.
                            </li>
                            <li>By following these guidelines, you'll be able to save and manage your leagues without
                                any issues.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}