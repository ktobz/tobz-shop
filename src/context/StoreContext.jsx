import { createContext, useContext, useState } from 'react';
import { CartProvider, CartContext } from './CartContext';
import { WatchlistProvider, WatchlistContext } from './WatchlistContext';

// ─── Compare Context ──────────────────────────────────────────────────────────
const CompareContext = createContext();

const CompareProvider = ({ children }) => {
    const [compareList, setCompareList] = useState(() => {
        const saved = localStorage.getItem('1shopapp_compare');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    const saveCompare = (newSet) => {
        setCompareList(newSet);
        localStorage.setItem('1shopapp_compare', JSON.stringify([...newSet]));
    };

    const toggleCompare = (id) => {
        const next = new Set(compareList);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        saveCompare(next);
    };

    const isInCompare = (id) => compareList.has(id);

    return (
        <CompareContext.Provider value={{ compareList, toggleCompare, isInCompare }}>
            {children}
        </CompareContext.Provider>
    );
};

// ─── Unified Store Hook ───────────────────────────────────────────────────────
export const useStore = () => {
    const cart = useContext(CartContext);
    const watchlist = useContext(WatchlistContext);
    const compare = useContext(CompareContext);

    if (!cart || !watchlist || !compare) {
        throw new Error('useStore must be used within a StoreProvider');
    }

    return {
        // Cart
        cartItems: cart.cartItems,
        addToCart: cart.addToCart,
        removeFromCart: cart.removeFromCart,
        updateQuantity: cart.updateQuantity,
        clearCart: cart.clearCart,
        getTotalItems: cart.getTotalItems,
        getTotalPrice: cart.getTotalPrice,

        // Wishlist
        wishlist: watchlist.watchlist,
        toggleWishlist: watchlist.toggleWishlist,
        isInWishlist: watchlist.isInWatchlist,

        // Compare
        compareList: compare.compareList,
        toggleCompare: compare.toggleCompare,
        isInCompare: compare.isInCompare,
    };
};

// ─── StoreProvider ────────────────────────────────────────────────────────────
export const StoreProvider = ({ children }) => (
    <CartProvider>
        <WatchlistProvider>
            <CompareProvider>
                {children}
            </CompareProvider>
        </WatchlistProvider>
    </CartProvider>
);
