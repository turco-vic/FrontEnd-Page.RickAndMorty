import styles from "../styles/Header.module.css";

export default function Header() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Rick and Morty</h1>
            <p className={styles.description}>This is the home page of my project.</p>
        </div>
    )
}