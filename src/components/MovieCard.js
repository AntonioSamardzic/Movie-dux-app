import React, {useState} from "react";
import MovieModal from "./MovieModal";

export default function MovieCard({ movies }) {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = (movie) => {
        setSelectedMovie(movie);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedMovie(null);
    };

    return (
        <div className="movies-grid">
            {movies.map(movie => (
                <button
                    className="card-button  margin-none"
                    onClick={() => openPopup(movie)}
                >
                    <div key={movie.id} className="movie-card">
                        <div className="movie-card__image">
                            {
                                movie.thumbnail ? <img src={movie.thumbnail} alt={movie.href}/> : <img src="/nothing_found.png" alt="nothing found"/>
                            }
                        </div>
                        <div className="movie-card-info">
                            <p className="movie-card-title">{movie.title}</p>
                            <p>{movie.year}</p>
                        </div>
                    </div>
                </button>
            ))}
            <MovieModal
                show={showPopup}
                onClose={closePopup}
                movie={selectedMovie}
            />
        </div>
    );
}
