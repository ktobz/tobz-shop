import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Filter, X, Clock, TrendingUp, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { productAPI } from '../../services/api';
import ProductCard from '../../components/storefront/ProductCard';
import './ProductCatalog.scss';

const RECENT_KEY = '1shopapp_recent_searches';
const MAX_RECENT = 5;

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [recentSearches, setRecentSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); }
    catch { return []; }
  });
  const [showRecent, setShowRecent] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);

  const searchInputRef = useRef(null);
  const recentRef = useRef(null);
  const debounceRef = useRef(null);
  const limit = 12;

  // Debounce search input
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  const saveRecentSearch = useCallback((term) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => {
      const next = [term, ...prev.filter((s) => s !== term)].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getProducts({
        search: debouncedSearch,
        category,
        page: currentPage,
        limit,
      });
      setProducts(response.data);
      setTotal(response.total);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, currentPage]);

  useEffect(() => { loadProducts(); }, [loadProducts]);
  useEffect(() => { setCurrentPage(1); }, [debouncedSearch, category]);

  useEffect(() => {
    const loadCategories = async () => {
      try { setCategories(await productAPI.getCategories()); }
      catch { setCategories(['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports']); }
    };
    loadCategories();
  }, []);

  // Ctrl+K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close recent on outside click
  useEffect(() => {
    const handler = (e) => {
      if (recentRef.current && !recentRef.current.contains(e.target)) {
        setShowRecent(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (search.trim()) saveRecentSearch(search.trim());
    setShowRecent(false);
  };

  const clearSearch = () => {
    setSearch('');
    setDebouncedSearch('');
    searchInputRef.current?.focus();
  };

  const handleRecentClick = (term) => {
    setSearch(term);
    setDebouncedSearch(term);
    setShowRecent(false);
  };

  const isFiltered = debouncedSearch || category;

  return (
    <div className="product-catalog fade-in">
      <div className="catalog-header">
        <h1>Product Catalog</h1>
        <p className="catalog-subtitle">Browse our complete collection of premium products</p>
      </div>

      {/* ── Premium Search & Filter Bar ── */}
      <div className="filters-section" ref={recentRef}>
        <div className={`search-bar ${activeFilter ? 'search-bar--focused' : ''}`}>
          {/* Search icon with glow */}
          <Search size={18} className={`search-icon ${debouncedSearch ? 'search-icon--active' : ''}`} />

          <form className="search-form-inner" onSubmit={handleSearchSubmit}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder='Search products... '
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => { setActiveFilter(true); recentSearches.length > 0 && setShowRecent(true); }}
              onBlur={() => setActiveFilter(false)}
              aria-label="Search products"
            />
          </form>

          {/* Keyboard shortcut badge */}
          {!search && (
            <kbd className="search-shortcut">
              <span>Ctrl</span>+<span>K</span>
            </kbd>
          )}

          {/* Animated clear button */}
          <button
            className={`search-clear ${search ? 'search-clear--visible' : ''}`}
            onClick={clearSearch}
            aria-label="Clear search"
            tabIndex={-1}
          >
            <X size={16} />
          </button>

          {/* Divider */}
          <div className="search-divider" />

          {/* Category filter pill */}
          <div className="search-category-pill">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="search-category-select"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Recent Searches Dropdown ── */}
        {showRecent && recentSearches.length > 0 && !search && (
          <div className="recent-dropdown">
            <div className="recent-header">
              <Clock size={14} />
              <span>Recent searches</span>
            </div>
            {recentSearches.map((term, i) => (
              <button
                key={i}
                className="recent-item"
                onClick={() => handleRecentClick(term)}
              >
                <TrendingUp size={13} />
                <span>{term}</span>
              </button>
            ))}
          </div>
        )}
        {showRecent && recentSearches.length > 0 && !search && (
          <div className="recent-backdrop" onClick={() => setShowRecent(false)} />
        )}
      </div>

      {/* ── Active Filter Tags ── */}
      {isFiltered && !loading && (
        <div className="active-filters">
          {debouncedSearch && (
            <span className="filter-tag">
              Search: "{debouncedSearch}"
              <button onClick={() => { setSearch(''); setDebouncedSearch(''); }} aria-label="Remove search filter">
                <X size={12} />
              </button>
            </span>
          )}
          {category && (
            <span className="filter-tag">
              Category: {category}
              <button onClick={() => setCategory('')} aria-label="Remove category filter">
                <X size={12} />
              </button>
            </span>
          )}
          <span className="filter-result-count">
            {total} {total === 1 ? 'result' : 'results'} found
          </span>
        </div>
      )}

      {/* ── Content Area ── */}
      {loading && (
        <div className="loading-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-image" />
              <div className="skeleton-content">
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="catalog-error">
          <div className="catalog-error__icon">!</div>
          <p className="catalog-error__text">{error}</p>
          <button onClick={() => loadProducts()} className="btn-primary">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="catalog-empty">
          <div className="catalog-empty__icon">
            <Search size={32} color="#9ca3af" />
          </div>
          <h3>No products found</h3>
          <p>We couldn't find any products matching your criteria. Try adjusting your search or filters.</p>
          <button
            onClick={() => { setSearch(''); setDebouncedSearch(''); setCategory(''); }}
            className="btn-primary"
          >
            Clear all filters
          </button>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {total > limit && (
            <div className="pagination">
              <button
                className="btn-secondary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </button>
              <span>Page {currentPage} of {Math.ceil(total / limit)}</span>
              <button
                className="btn-secondary"
                disabled={currentPage >= Math.ceil(total / limit)}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCatalog;
