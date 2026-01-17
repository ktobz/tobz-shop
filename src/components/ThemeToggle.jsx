import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`theme-toggle ${theme}`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            <div className="toggle-track">
                <div className="toggle-thumb">
                    <span className="icon">{theme === 'light' ? '☀️' : '🌙'}</span>
                </div>
            </div>
        </button>
    );
};

export default ThemeToggle;