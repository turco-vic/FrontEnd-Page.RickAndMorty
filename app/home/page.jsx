"use client"
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Home.module.css"
import CharacterCard from "../../components/CharacterCard"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

export default function Home() {
    const [search, setSearch] = useState("");
    const [characters, setCharacters] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const cacheRef = useRef(new Map());

    const fetchCharacters = async (name = "", pageNumber = 1) => {
        setLoading(true);
        setNotFound(false);
        const cache = cacheRef.current;
        const cacheKey = `${name}_${pageNumber}`;
        const nextPageNumber = pageNumber + 1;
        const nextCacheKey = `${name}_${nextPageNumber}`;

        const cleanCacheIfNeeded = () => {
            while (cache.size >= 5) {
                const firstKey = cache.keys().next().value;
                cache.delete(firstKey);
                console.log(`♻️ Removed from cache: ${firstKey}`);
            }
        };

        console.log("\n============== SEARCH STARTED ==============");
        console.log(`📊 Previous cache: ${cache.size} pages`);

        let total = totalPages;

        if (cache.has(cacheKey)) {
            const cached = cache.get(cacheKey);
            setCharacters(cached.results);
            setTotalPages(cached.totalPages);
            total = cached.totalPages;
            setNotFound(false);
            setLoading(false);
            console.log(`✅ Using cache: ${cacheKey}`);
        } else {
            try {
                const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${name}`);

                cleanCacheIfNeeded();
                cache.set(cacheKey, {
                    results: data.results,
                    totalPages: data.info.pages,
                });

                setCharacters(data.results);
                setTotalPages(data.info.pages);
                total = data.info.pages;
                setNotFound(false);
                console.log(`💾 Salvo no cache: ${cacheKey}`);
            } catch {
                setCharacters([]);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        }

        if (nextPageNumber <= total && !cache.has(nextCacheKey)) {
            try {
                const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${nextPageNumber}&name=${name}`);
                cleanCacheIfNeeded();
                cache.set(nextCacheKey, {
                    results: res.data.results,
                    totalPages: res.data.info.pages,
                });
                console.log(`📋 Prefetch saved: ${nextCacheKey}`);
            } catch (err) {
                console.log(`❌ Prefetch failed: ${nextCacheKey}`, err);
            }
        } else {
            console.log("ℹ️ Prefetch ignored: already in cache or out of bounds!");
        }

        console.log(`📦 Final Cache: ${cache.size} pages`);
        for (const [key, val] of cache.entries()) {
            console.log(`📦 ${key}: ${val.results.length} characters`);
        }
        console.log("============== END OF SEARCH ==============\n");
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    useEffect(() => {
        fetchCharacters(search.trim(), page);
    }, [page]);

    useEffect(() => {
        fetchCharacters(search, page);
    }, [search]);

    const handleCardClick = (name) => {
        toast.info(`you clicked on the character: ${name}`, {
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
                            fetchCharacters("", 1);
                            setSearch("");
                            setPage(1);
                            toast.success("Filter reseted!", { position: "top-left" });
                        }} className={styles.buttonReset}
                    >
                        Reset
                    </button>
                </div>
                <div className={styles.notFound}>
                    {notFound && (<h1 className={styles.notFoundTxt}>Character not found</h1>)}
                </div>
                {loading ? (
                <div className={`${styles.loaderWrapper} ${loading ? "" : styles.hidden}`}>
                    <Loader />
                </div>
            ) : (
                <div className={styles.grid}>
                    {characters.map((char) => (
                        <CharacterCard key={char.id} character={char} onClick={() => handleCardClick(char.name)} />
                    ))}
                </div>
            )}


                <div className={styles.navControls}>
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className={styles.buttonNav}
                    >
                        ⬅ Previous
                    </button>

                    <span className={styles.pageIndicator}>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className={styles.buttonNav}
                    >
                        Next ⮕
                    </button>
                </div>
                <Footer />
            </div>
        </div>
    );
}
