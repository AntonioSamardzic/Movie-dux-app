import React from "react";
import MovieCard, { Movie } from "./MovieCard";

interface WishlistProps {
    favorites: Movie[]; // array of Movie objects
    removeFromFavorites?: (movie: Movie) => void; // optional callback if you want remove buttons
}

export default function Wishlist({
                                     favorites,
                                     removeFromFavorites,
                                 }: WishlistProps) {
    if (favorites.length === 0) {
        return <h2>Your wishlist is empty.</h2>;
    }

    return (
        <div className="wishlist">
            <h2>Your Favorites</h2>
            <MovieCard
                movies={favorites}
                hideButton={false}
                removeFromFavorites={removeFromFavorites}
            />
        </div>
    );
}