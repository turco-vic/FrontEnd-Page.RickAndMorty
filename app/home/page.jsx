"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Home.module.css"
import CharacterCard from "../../Components/CharacterCard"
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Home() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios
            .get("https://rickandmortyapi.com/api/character/")
            .then((response) => {
                setCharacters(response.data.results);
            })
            .catch((error) => {
                console.error('Erro ao buscar personagens: ', error)
            });
    }, []);

    console.log(characters)

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Header />
                {characters.map((char) => (
                    <CharacterCard key={char.id} character={char} />
                ))}
                <Footer />
            </div>
        </div>
    );
}
