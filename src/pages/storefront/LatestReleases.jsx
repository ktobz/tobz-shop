import React, { useState, useEffect } from 'react';
import { productAPI } from '../../services/api';
import ProductCard from '../../components/storefront/ProductCard';

import './LatestReleases.scss';

const LatestReleases = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchClothing = async () => {
            try {
                setLoading(true);
                const response = await productAPI.getProducts({ category: 'Fashion', limit: itemsPerPage, page: currentPage });
                setProducts(response.data);
                setTotal(response.total);
            } catch (err) {
                setError(err.message);
                console.error('LatestReleases fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchClothing();
    }, [currentPage]);

    const totalPages = Math.ceil(total / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        // ... (loading state preserved with minor adjustments for new layout if needed, but keeping it simple for now)
        return (
            <div className="latest-releases-page catalog-container">
                <div className="section-header">
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: '900', color: '#111827', letterSpacing: '-0.02em', marginBottom: '0.5rem', lineHeight: '1.15' }}>Latest Clothing Releases</h1>
                    <p>Curating the finest fashion just for you...</p>
                </div>
                <div className="product-grid">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="product-card skeleton-shimmer" style={{ height: '400px' }}></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="latest-releases-page flex-center" style={{ minHeight: '60vh', flexDirection: 'column' }}>
                <p style={{ color: 'var(--danger)', fontSize: '1.2rem' }}>Oops! {error}</p>
                <button onClick={() => window.location.reload()} className="btn-primary" style={{ marginTop: '1rem' }}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="latest-releases-page catalog-container fade-in">
            <div className="section-header">
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: '900', color: '#111827', letterSpacing: '-0.02em', marginBottom: '0.5rem', lineHeight: '1.15' }}>Latest Clothing Releases</h1>
                <p style={{ color: '#6b7280', fontSize: '1rem' }}>Explore our newest arrivals in men&apos;s and women&apos;s fashion.</p>
            </div>

            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="btn-outline"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="btn-outline"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default LatestReleases;
