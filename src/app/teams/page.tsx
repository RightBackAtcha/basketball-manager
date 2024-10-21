'use client';

import styles from "./page.module.css"
import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/navigation";

import { db } from "@/utils/db";
import { Team } from "@/utils/teams/TeamTypes";

export default function ShowRosters() {
    // Import teams from Dexie
    const teams = useLiveQuery(() => db.teams.toArray());

    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`/teams/${id}`);
    };

    return (
        <>
            <div id={styles.teamContainer}>
                <ul id={styles.teamsList}>
                    {teams?.map((team: Team) => (
                        <li key={team.tID}
                            onClick={() => handleClick(team.tID)}
                            style={{
                                cursor: "pointer",
                        }}>
                            {team.region} {team.name}
                        </li>
                    ))}
                </ul>
            </div>
        </>);
}

