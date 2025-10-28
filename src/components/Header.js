import React from 'react';
import '../styles.css'

export default function Header() {
    return (
        <div className="header">
            <img className="logo" src={'logo.png'} alt="logo" />
            <h2 className="all-subtitle">Time for a movie!</h2>
        </div>
    )
}