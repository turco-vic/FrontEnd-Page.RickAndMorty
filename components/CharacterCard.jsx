import styles from "../styles/CharacterCard.module.css";

export default function CharacterCard({ character }) {
    console.log(character)
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <img
                    src={character.image}
                    alt={character.name}
                    className={styles.avatar}
                />
            </div>
            <h3 className={styles.title}> {character.name}</h3>
            <p className={styles.description}> <span className={styles.info}>Status: </span>{character.status}</p>
            <p className={styles.description}> <span className={styles.info}>Specie: </span>{character.species}</p>
            <p className={styles.description}> <span className={styles.info}>Type: </span>{character.type || "Unknow"}</p>
            <p className={styles.description}> <span className={styles.info}>Gender: </span>{character.gender}</p>
            <p className={styles.description}> <span className={styles.info}>Location: </span>{character.location.name}</p>
        </div>
    )
}
