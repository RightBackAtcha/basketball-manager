'use client';

import styles from "./page.module.css";

import { Button } from "react-aria-components"
import { redirect, useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/league')
    }

    return (
        <>
            <div id={styles.container}>
                <div id={styles.infoContainer}>
                    <h1>Basketball Manager</h1>
                    <p>Take charge as the GM of your own basketball franchise—draft, trade, and manage your team to build a dynasty</p>
                    <Button onPress={handleRedirect} id={styles.button}>Play Now!</Button>
                </div>
                <div id={styles.centerImage}>
                    <img src="/img/player.png" alt="Basketball Black Outline"/>
                </div>
            </div>
        </>)
}


