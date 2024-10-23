'use client';

import styles from './page.module.css'
import { Button } from "react-aria-components";
import DisplayLeagues from "@/components/ui/DisplayLeagues";

export default function NewLeague() {
    return(
        <>
            <div id={styles.container}>
                <div id={styles.leagueContainer}>
                    <DisplayLeagues />
                </div>
                <div id={styles.buttonContainer}>
                    <Button id={styles.button}>Create new League</Button>
                </div>
                <div id={styles.textContainer}>
                    <h2>
                        League Saves and IndexedDB Persistent Storage
                    </h2>
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