import React, { useState } from 'react';
import { CartContext } from './cartContext';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Check if window is defined (client-side)
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('1shopapp_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    const saveCart = (items: any[]) => {
        setCartItems(items);
        if (typeof window !== 'undefined') {
            localStorage.setItem('1shopapp_cart', JSON.stringify(items));
        }
    };

    const addToCart = (product: any) => {
        const newItem = {
            id: product.id,
            title: product.name || product.title,
            price: product.price,
            quantity: 1,
            image: product.image
        };

        setCartItems((prevItems: any[]) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            let updatedItems;
            if (existingItem) {
                updatedItems = prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedItems = [...prevItems, newItem];
            }
            // Side effect: save to local storage
            if (typeof window !== 'undefined') {
                localStorage.setItem('1shopapp_cart', JSON.stringify(updatedItems));
            }
            return updatedItems;
        });
    };

    const removeFromCart = (productId: any) => {
        setCartItems((prevItems: any[]) => {
            const updatedItems = prevItems.filter((item) => item.id !== productId);
            if (typeof window !== 'undefined') {
                localStorage.setItem('1shopapp_cart', JSON.stringify(updatedItems));
            }
            return updatedItems;
        });
    };

    const updateQuantity = (productId: any, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prevItems: any[]) => {
            const updatedItems = prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item));
            if (typeof window !== 'undefined') {
                localStorage.setItem('1shopapp_cart', JSON.stringify(updatedItems));
            }
            return updatedItems;
        });
    };

    const clearCart = () => {
        saveCart([]);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total: number, item: any) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
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