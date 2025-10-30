import React from "react";

interface SearchProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}

export default function Search({searchTerm, setSearchTerm}: SearchProps) {

    return (
        <div className="container">
            <input className="search-input"
                   type="text"
                   placeholder="Search movies..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}