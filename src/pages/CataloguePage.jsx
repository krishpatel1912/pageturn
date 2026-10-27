import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import BookCard from '../components/BookCard';
import {
  Filter,
  SlidersHorizontal,
  X,
  Search,
  Star,
  Check,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { GENRES, SORT_OPTIONS } from '../data/initialBooks';

export default function CataloguePage() {
  const { products, searchQuery, setSearchQuery } = useStore();

  // Filter States
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1200);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(12);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Clear all filters
  const handleResetFilters = () => {
    setSelectedGenre('All');
    setMaxPrice(1200);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchQuery('');
    setVisibleCount(12);
  };

  // Filter & Sort Logic
  const filteredBooks = useMemo(() => {
    return products
      .filter((book) => {
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = book.title.toLowerCase().includes(q);
          const matchAuthor = book.author.toLowerCase().includes(q);
          const matchGenre = book.genre.toLowerCase().includes(q);
          if (!matchTitle && !matchAuthor && !matchGenre) return false;
        }

        // Genre filter
        if (selectedGenre !== 'All' && book.genre !== selectedGenre) {
          return false;
        }

        // Price filter
        if (book.price > maxPrice) {
          return false;
        }

        // Rating filter
        if (minRating > 0 && book.rating < minRating) {
          return false;
        }

        // In Stock filter
        if (inStockOnly && book.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.year || 2025) - (a.year || 2025);
        // Default: featured first
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, searchQuery, selectedGenre, maxPrice, minRating, inStockOnly, sortBy]);

  const displayedBooks = filteredBooks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBooks.length;

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* Page Header */}
        <div
          style={{
            borderBottom: 'var(--border-width) solid var(--border-color)',
            paddingBottom: '1.5rem',
            marginBottom: '2.5rem'
          }}
        >
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="badge-sticker">THE ARCHIVE</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  CURRENT CYCLE: 26 TITLES
                </span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}>
                Catalogue of Independent Works
              </h1>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="neo-btn"
              style={{ display: 'none' }}
              id="mobile-filter-btn"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
        </div>

        {/* Main Grid: Sidebar Filters + Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '270px 1fr',
            gap: '2.5rem',
            alignItems: 'start'
          }}
          className="catalogue-layout"
        >
          {/* LEFT COLUMN: FILTERS PANEL */}
          <aside
            className={`catalogue-filters-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}
            style={{
              backgroundColor: 'var(--bg-paper)',
              border: 'var(--border-width) solid var(--border-color)',
              boxShadow: 'var(--shadow-offset)',
              padding: '1.5rem',
              position: 'sticky',
              top: '90px'
            }}
          >
            <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Filter size={18} color="var(--accent-tomato)" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', margin: 0 }}>
                  Filters
                </h3>
              </div>
              <button
                onClick={handleResetFilters}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent-tomato)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  fontWeight: 700
                }}
                title="Reset all filters"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {/* 1. Search refinement in sidebar */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '0.5rem'
                }}
              >
                Keyword Query
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Filter by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="neo-input"
                  style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Genre Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '0.5rem'
                }}
              >
                Discipline / Genre
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    style={{
                      textAlign: 'left',
                      padding: '0.45rem 0.65rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.86rem',
                      fontWeight: selectedGenre === genre ? 700 : 500,
                      backgroundColor: selectedGenre === genre ? 'var(--accent-tomato)' : 'transparent',
                      color: selectedGenre === genre ? '#FFFDF9' : 'var(--text-primary)',
                      border: selectedGenre === genre ? '1.5px solid var(--border-color)' : '1px solid transparent',
                      transition: 'all 0.1s ease'
                    }}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Price Range Slider */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="flex-between" style={{ marginBottom: '0.4rem' }}>
                <label
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    fontWeight: 700
                  }}
                >
                  Max Price
                </label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700 }}>
                  ₹{maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="300"
                max="1200"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-tomato)', cursor: 'pointer' }}
              />
              <div className="flex-between" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <span>₹300</span>
                <span>₹1200</span>
              </div>
            </div>

            {/* 4. Minimum Rating Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '0.5rem'
                }}
              >
                Minimum Rating
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {[
                  { label: 'All Ratings', value: 0 },
                  { label: '4.5 ★ & above', value: 4.5 },
                  { label: '4.8 ★ & above', value: 4.8 }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setMinRating(item.value)}
                    style={{
                      textAlign: 'left',
                      padding: '0.45rem 0.65rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      fontWeight: minRating === item.value ? 700 : 500,
                      backgroundColor: minRating === item.value ? 'var(--accent-mustard)' : 'transparent',
                      color: minRating === item.value ? '#141414' : 'var(--text-primary)',
                      border: minRating === item.value ? '1.5px solid var(--border-color)' : '1px solid transparent'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. In-Stock Only Toggle */}
            <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  userSelect: 'none'
                }}
              >
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--accent-tomato)', cursor: 'pointer' }}
                />
                In Stock Copies Only
              </label>
            </div>
          </aside>

          {/* RIGHT COLUMN: BOOK RESULTS & CONTROLS */}
          <main>
            {/* Top Toolbar: Results count & Sort select */}
            <div
              className="neo-box"
              style={{
                padding: '0.85rem 1.25rem',
                backgroundColor: 'var(--bg-paper)',
                marginBottom: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600 }}>
                Showing <strong>{displayedBooks.length}</strong> of <strong>{filteredBooks.length}</strong> titles
                {selectedGenre !== 'All' && <span> in <em style={{ color: 'var(--accent-tomato)' }}>{selectedGenre}</em></span>}
                {searchQuery.trim() && <span> matching "<strong>{searchQuery}</strong>"</span>}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="neo-select"
                  style={{ padding: '0.4rem 0.75rem', width: 'auto', fontSize: '0.85rem' }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredBooks.length === 0 ? (
              <div
                className="neo-box"
                style={{
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  backgroundColor: 'var(--bg-card)'
                }}
              >
                <BookOpen size={48} color="var(--text-muted)" style={{ margin: '0 auto 1.25rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                  No Titles Matched Your Filters
                </h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
                  Try relaxing your price boundary, switching genres, or removing the search keyword.
                </p>
                <button onClick={handleResetFilters} className="neo-btn neo-btn-primary">
                  Clear All Filters & Show Full Catalogue
                </button>
              </div>
            ) : (
              <>
                {/* Book Cards Grid */}
                <div className="books-grid">
                  {displayedBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 8)}
                      className="neo-btn neo-btn-secondary"
                      style={{ padding: '0.85rem 2.2rem', fontSize: '0.95rem' }}
                    >
                      Load More Titles ({filteredBooks.length - displayedBooks.length} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .catalogue-layout { grid-template-columns: 1fr !important; }
          #mobile-filter-btn { display: inline-flex !important; }
          .catalogue-filters-sidebar { display: none; }
          .catalogue-filters-sidebar.mobile-open {
            display: block !important;
            margin-bottom: 2rem;
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
