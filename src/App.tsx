import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Search from "./components/Search";
import MovieCard, { Movie } from "./components/MovieCard";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import Filter from "./components/Filter";
import WishList from "./components/WishList";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
    const itemsPerPage = 16;

    // --- State Types ---
    const [allMovies, setAllMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedGenre, setSelectedGenre] = useState<string>("");
    const [favorites, setFavorites] = useState<Movie[]>([]);

    // --- Fetch movies ---
    useEffect(() => {
        axios
            .get<Movie[]>("http://localhost:3031/movies")
            .then((res) => setAllMovies(res.data))
            .catch((err) => console.error("Error fetching movies:", err));
    }, []);

    // --- Filters ---
    const filteredMovies = allMovies.filter((movie) => {
        const matchesGenre =
            !selectedGenre ||
            movie.genres.some(
                (g) => g.toLowerCase() === selectedGenre.toLowerCase()
            );

        const matchesSearch =
            !searchTerm ||
            movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.cast?.some((c) =>
                c.toLowerCase().includes(searchTerm.toLowerCase())
            );

        return matchesGenre && matchesSearch;
    });

    // --- Pagination ---
    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMovies = filteredMovies.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedGenre]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((p) => p + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((p) => p - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // --- Favorites Management ---
    const addToFavorites = (movie: Movie) => {
        setFavorites((prev) => {
            if (!prev.find((m) => m.title === movie.title)) {
                return [...prev, movie];
            }
            return prev; // avoid duplicates
        });
    };

    // const removeFromFavorites = (title: string) => {
    //     setFavorites((prev) => prev.filter((m) => m.title !== title));
    // };

    // --- Home Page Layout ---
    const homePage = () => {
        return (
            <div className="container">
                {filteredMovies.length > 0 ? (
                    <MovieCard
                        movies={paginatedMovies}
                        addToFavorites={addToFavorites}
                        hideButton={false}
                    />
                ) : (
                    <div>
                        <img
                            src="/nothing_found.png"
                            alt="nothing found"
                            style={{
                                display: "block",
                                margin: "50px auto",
                                maxWidth: "200px",
                            }}
                        />
                        <h2>Sorry, no movies match this term :(</h2>
                    </div>
                )}

                {filteredMovies.length > itemsPerPage && (
                    <Pagination
                        prevPage={prevPage}
                        currentPage={currentPage}
                        nextPage={nextPage}
                        totalPages={totalPages}
                    />
                )}

                <Footer />
            </div>
        );
    };

    // --- JSX Render ---
    return (
        <div className="App">
            <div className="container">
                <BrowserRouter>
                    <Header />
                    <nav>
                        <Link to="/" className="router_link">
                            Home
                        </Link>
                        <Link to="/favorites">Favorites</Link>
                    </nav>

                    <Filter
                        selectedGenre={selectedGenre}
                        setSelectedGenre={setSelectedGenre}
                        allMovies={allMovies}
                    />

                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                    <Routes>
                        <Route path="/" element={homePage()} />
                        <Route
                            path="/favorites"
                            element={
                                <WishList
                                    favorites={favorites}
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}
