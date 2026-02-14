import React from 'react';
import { useTheme } from '../hooks/useTheme';
import './ThemeToggle.scss';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-pressed={theme === 'dark'}
        >
            <div className="toggle-track">
                <div className="toggle-slider">
                    <span className="icon sun">☀️</span>
                    <span className="icon moon">🌙</span>
                </div>
            </div>
        </button>
    );
};

export default ThemeToggle;
