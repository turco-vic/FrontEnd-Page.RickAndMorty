import styles from "../styles/Footer.module.css";

export default function Footer() {
    return (
        <div className={styles.container}>
            <p className={styles.copy}>2025 Rick and Morty. Todos os direitos reservados.</p>
            <p className={styles.author}>Enzo Turcovic</p>
        </div>
    )
}