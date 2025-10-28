import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import Filter from "./components/Filter";

function App() {
    const itemsPerPage = 16;
    const [allMovies, setAllMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3031/movies")
            .then(res => setAllMovies(res.data))
            .catch(err => console.error("Error fetching movies:", err));
    }, []);

    const filteredMovies = allMovies.filter(movie => {
        const matchesGenre =
            !selectedGenre ||
            movie.genres.some(g => g.toLowerCase() === selectedGenre.toLowerCase());

        const matchesSearch =
            !searchTerm ||
            movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.cast.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesGenre && matchesSearch;
    });

    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMovies = filteredMovies.slice(startIndex, startIndex + itemsPerPage);

    // Reset page when filters/search change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedGenre]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(p => p + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(p => p - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="App">
            <div className="container">
                <Header />
                <Filter
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                    allMovies={allMovies}
                />
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                {filteredMovies.length > 0 ? (
                    <MovieCard movies={paginatedMovies} />
                ) : (
                    <div>
                        <img
                            src="/nothing_found.png"
                            alt="nothing found"
                            style={{ display: "block", margin: "50px auto", maxWidth: "200px" }}
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
        </div>
    );
}

export default App;
