import React, { useState } from "react";
import MovieModal from "./MovieModal";

export type Movie = {
    id?: number;
    title: string;
    year: number;
    thumbnail?: string;
    href?: string;
    genres: string[];
    cast?: string[];
};

interface MovieCardProps {
    movies: Movie[];
    addToFavorites?: (movie: Movie) => void;
    removeFromFavorites?: (movie: Movie) => void;
    hideButton?: boolean;
}

export default function MovieCard({movies, addToFavorites}: MovieCardProps) {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = (movie: Movie) => {
        setSelectedMovie(movie);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedMovie(null);
    };

    return (
        <div className="movies-grid">
            {movies.map((movie) => (
                <div key={movie.id || movie.title}>
                    <button
                        className="card-button margin-none"
                        onClick={() => openPopup(movie)}
                    >
                        <div className="movie-card">
                            <div className="movie-card__image">
                                {movie.thumbnail ? (
                                    <img src={movie.thumbnail} alt={movie.href || movie.title} />
                                ) : (
                                    <img src="/nothing_found.png" alt="nothing found" />
                                )}
                            </div>
                            <div className="movie-card-info">
                                <p className="movie-card-title">{movie.title}</p>
                                <p>{movie.year}</p>
                            </div>
                        </div>
                    </button>

                    <button
                        className="favorite-btn"
                        onClick={() => addToFavorites && addToFavorites(movie)}
                    >
                        Add to Favorites
                    </button>
                </div>
            ))}

            <MovieModal show={showPopup} onClose={closePopup} movie={selectedMovie} />
        </div>
    );
}
