import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState(new Set());

    useEffect(() => {
        // Load watchlist from localStorage
        const savedWatchlist = localStorage.getItem('1shopapp_watchlist');
        if (savedWatchlist) {
            setWatchlist(new Set(JSON.parse(savedWatchlist)));
        }
    }, []);

    const saveWatchlist = (newWatchlist) => {
        setWatchlist(newWatchlist);
        localStorage.setItem('1shopapp_watchlist', JSON.stringify([...newWatchlist]));
    };

    const toggleWatchlist = (id) => {
        const newWatchlist = new Set(watchlist);
        if (newWatchlist.has(id)) {
            newWatchlist.delete(id);
        } else {
            newWatchlist.add(id);
        }
        saveWatchlist(newWatchlist);
    };

    const isInWatchlist = (id) => {
        return watchlist.has(id);
    };

    return (
        <WatchlistContext.Provider value={{
            watchlist,
            toggleWatchlist,
            isInWatchlist
        }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);
    if (!context) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    return context;
};