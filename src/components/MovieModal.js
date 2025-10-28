import React from "react";

export default function MovieModal({ show, onClose, movie }) {
    if (!show || !movie) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="popup-content-header">{movie.title}</h2>
                <div className="popup-content-genre">
                    <p>Genre: {Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres}</p>
                </div>
                <div className="popup-content-genre">
                    <p>Cast: {Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast}</p>
                </div>
                <p className="popup-content-year">Year: {movie.year}</p>
                {movie.extract && <p>{movie.extract}</p>}
                <div className="button-wrapper">
                    <button className="close-btn margin-none" onClick={onClose}>Close</button>
                    <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " trailer")}`}
                       target="_blank"
                       rel="noreferrer"
                       className="youtube-btn">
                        🎬 Watch Trailer
                    </a>
                </div>
            </div>
        </div>
    );
}