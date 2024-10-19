import styles from "./page.module.css";

export default function Home() {
    return (
        <>
            <div id={styles.titleContainer}>
                <img src="/img/player.png" alt="Basketball Black Outline" id={styles.centerImage}/>
                <h1 id={styles.titleHeader}>
                    basketball manager
                </h1>
            </div>
        </>)
}

