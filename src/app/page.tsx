import styles from "./page.module.css";

export default function Home() {
    return (
        <>
            <div id={styles.container}>
                <div id={styles.infoContainer}>
                    <h1>Basketball Manager</h1>
                    <p>Craft your dynasty, one play at a time!</p>
                </div>
                <div id={styles.centerImage}>
                    <img src="/img/player-white.png" alt="Basketball Black Outline"/>
                </div>
            </div>
        </>)
}

