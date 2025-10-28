import React from "react";

export default function Pagination({prevPage, currentPage, totalPages, nextPage}) {
    return (
        <div className="pagination">
            <button className="open-btn" onClick={prevPage} disabled={currentPage === 1}>
                Prev
            </button>
            <span className="pagination__page">Page {currentPage} of {totalPages}</span>
            <button className="open-btn" onClick={nextPage} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    )
}