import React from "react";
import {Movie} from "./MovieCard";

interface FilterProps {
    selectedGenre: string;
    setSelectedGenre: (selectedGenre: string) => void;
    allMovies: Movie[];
}

export default function Filter({ selectedGenre, setSelectedGenre, allMovies }: FilterProps) {
    const uniqueGenres = Array.from(
        new Set(allMovies.flatMap(movie => movie.genres))
    );

    return (
        <div className="container">
            <div className="filter-bar">
                <select
                    className="filter-dropdown"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="">All Genres</option>
                    {uniqueGenres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
