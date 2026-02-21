import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('1shopapp_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const saveCart = (items) => {
        setCartItems(items);
        localStorage.setItem('1shopapp_cart', JSON.stringify(items));
    };

    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            const updatedItems = cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            saveCart(updatedItems);
        } else {
            const newItem = {
                id: product.id,
                title: product.name || product.title,
                price: product.price,
                quantity: 1,
                image: product.image
            };
            saveCart([...cartItems, newItem]);
        }
    };

    const removeFromCart = (id) => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        saveCart(updatedItems);
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(id);
            return;
        }
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        saveCart(updatedItems);
    };

    const clearCart = () => {
        saveCart([]);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotalItems,
            getTotalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};
