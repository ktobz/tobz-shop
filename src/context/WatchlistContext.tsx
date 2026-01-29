import React, { useState } from 'react';
import { WatchlistContext } from './watchlistContext';

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
    const [watchlist, setWatchlist] = useState(() => {
        // Load watchlist from localStorage
        const savedWatchlist = localStorage.getItem('1shopapp_watchlist');
        return savedWatchlist ? new Set(JSON.parse(savedWatchlist)) : new Set();
    });

    const saveWatchlist = (newWatchlist) => {
        setWatchlist(newWatchlist);
        localStorage.setItem('1shopapp_watchlist', JSON.stringify([...newWatchlist]));
    };

    const toggleWatchlist = (productId: string | number) => {
        const newWatchlist = new Set(watchlist);
        if (newWatchlist.has(productId)) {
            newWatchlist.delete(productId);
        } else {
            newWatchlist.add(productId);
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