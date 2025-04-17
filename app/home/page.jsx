"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Home.module.css"
import CharacterCard from "../../Components/CharacterCard"
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Home() {
    const [search, setSearch] = useState("");
    const [characters, setCharacters] = useState([]);
    const [notFound, setNotFound] = useState(false);

    /*useEffect(() => {
        axios
            .get("https://rickandmortyapi.com/api/character/")
            .then((response) => {
                setCharacters(response.data.results);
            })
            .catch((error) => {
                console.error('Erro ao buscar personagens: ', error)
            });
    }, []);*/

    const fetchCharacters = async (name = "") => {
        setNotFound(false);
        try {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
            setCharacters(data.results);
        } catch {
            setNotFound(true);
            setCharacters([]);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    const handleCardClick = (name) => {
        toast.info(`Você clicou no personagem: ${name}`, {
        });
    }

    return (
        <div className={styles.container}>
            <ToastContainer position="top-right"
                autoClose={1000}
                theme="dark"
            />
            <div className={styles.content}>
                <Header />
                <div className={styles.controls}>
                    <input
                        type="text"
                        placeholder="Search for a character..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={styles.searchInput}
                    />

                    <button onClick={() => {
                        fetchCharacters(search);
                    }} className={styles.buttonSearch}
                    >
                        Search
                    </button>

                    <button
                        onClick={() => {
                            fetchCharacters();
                            setSearch("");
                        }} className={styles.buttonReset}
                    >
                        Reset
                    </button>
                    </div>

                    {notFound && ( <h1 className={styles.notFound}>Character not found</h1>)}
                    {characters.map((char) => (
                        <CharacterCard key={char.id} character={char} onClick={() => handleCardClick(char.name)} />
                    ))}
                
                <Footer />
            </div>
        </div>
    );
}
