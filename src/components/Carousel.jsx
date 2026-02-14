import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useWatchlist } from '../hooks/useWatchlist';
import './Carousel.scss';

const Carousel = ({ items, itemsPerView = 3, autoPlay = false, autoPlayDelay = 3000 }) => {
    const { addToCart } = useCart();
    const { toggleWatchlist, isInWatchlist } = useWatchlist();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const carouselRef = useRef(null);
    const intervalRef = useRef(null);

    const maxIndex = Math.max(0, items.length - itemsPerView);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
        }
    };

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(nextSlide, autoPlayDelay);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPlaying, autoPlayDelay, nextSlide]);

    const handleMouseEnter = () => {
        if (autoPlay) setIsPlaying(false);
    };

    const handleMouseLeave = () => {
        if (autoPlay) setIsPlaying(true);
    };

    return (
        <div
            className="carousel"
            role="region"
            aria-label="Product carousel"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className="product-carousel-btn product-carousel-btn--prev"
                onClick={prevSlide}
                disabled={currentIndex === 0 && !autoPlay} // Allow looping if autoPlay
                aria-label="Previous items"
            >
                <ChevronLeft size={24} />
            </button>
            <div className="carousel-container" ref={carouselRef}>
                <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.id || index}
                            className="carousel-item"
                            style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                        >
                            <div className="product-card glass-panel hvr-lift">
                                <div className="product-image-container">
                                    <img src={item.image} alt={item.name} className="product-image" />
                                    <button
                                        className={`wishlist-btn overlay ${isInWatchlist(item.id) ? 'active' : ''}`}
                                        onClick={() => toggleWatchlist(item.id)}
                                        title={isInWatchlist(item.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                                    >
                                        <Heart size={18} fill={isInWatchlist(item.id) ? "currentColor" : "none"} />
                                    </button>
                                </div>
                                <div className="product-info">
                                    <h3 className="product-name" title={item.name}>{item.name}</h3>
                                    <p className="product-price">${item.price}</p>
                                    <button
                                        className="btn-primary add-to-cart-btn"
                                        onClick={() => addToCart(item)}
                                    >
                                        <span>Add to Cart</span>
                                        <ShoppingCart size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="product-carousel-btn product-carousel-btn--next"
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex && !autoPlay}
                aria-label="Next items"
            >
                <ChevronRight size={24} />
            </button>
            <div className="carousel-indicators" aria-live="polite">
                {Array.from({ length: Math.ceil(items.length / itemsPerView) }, (_, i) => (
                    <button
                        key={i}
                        className={`indicator ${i === Math.floor(currentIndex / itemsPerView) ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(i * itemsPerView)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
