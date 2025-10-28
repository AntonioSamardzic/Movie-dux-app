import React from "react";

export default function Search({searchTerm, setSearchTerm}) {

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