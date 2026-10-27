import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import BookCover from '../components/BookCover';
import BookCard from '../components/BookCard';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';

export default function ProductDetailPage({ bookId }) {
  const {
    products,
    reviews,
    addReview,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    showToast
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  // Find target book
  const book = products.find(p => p.id === Number(bookId)) || products[0];
  const inWishlist = isInWishlist(book.id);

  // Reviews for this book
  const bookReviews = reviews[book.id] || [];

  // Related books from same genre (excluding current book)
  const relatedBooks = products
    .filter(p => p.genre === book.genre && p.id !== book.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(book, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      showToast('Please provide your name and review remarks', 'error');
      return;
    }
    addReview(book.id, {
      userName: reviewerName.trim(),
      rating: reviewRating,
      title: reviewTitle.trim() || 'Reader Review',
      comment: reviewComment.trim()
    });
    setReviewerName('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  const isOutOfStock = book.stock <= 0;

  return (
    <div style={{ padding: '2rem 0 5rem' }}>
      <div className="container">
        {/* Breadcrumb & Back navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            marginBottom: '2rem',
            color: 'var(--text-muted)'
          }}
        >
          <button
            onClick={() => navigateTo('catalogue')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: 'var(--text-primary)',
              fontWeight: 700
            }}
          >
            <ArrowLeft size={14} /> Back to Catalogue
          </button>
          <span>/</span>
          <span>{book.genre}</span>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{book.title}</span>
        </div>

        {/* Main Product Showcase Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3rem',
            alignItems: 'start',
            marginBottom: '4.5rem'
          }}
          className="product-detail-grid"
        >
          {/* Left Column: Oversized Book Cover Presentation */}
          <div style={{ gridColumn: 'span 5' }} className="product-cover-col">
            <div
              className="neo-box"
              style={{
                padding: '2rem',
                backgroundColor: 'var(--bg-paper)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div style={{ width: '100%', maxWidth: '340px' }}>
                <BookCover book={book} width="100%" aspectRatio="2 / 2.9" />
              </div>
            </div>

            {/* Micro-press archival stamp info */}
            <div
              className="neo-box"
              style={{
                marginTop: '1.25rem',
                padding: '1rem 1.25rem',
                backgroundColor: 'var(--bg-subtle)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem'
              }}
            >
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>ISBN-13</span>
                <strong>{book.isbn || '978-0-141-98762-1'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>PAGINATION</span>
                <strong>{book.pages || 320} Pages</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>BINDING</span>
                <strong>Thread-Sewn Kraft</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>PRESS YEAR</span>
                <strong>{book.year || 2026}</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Book Details & Actions */}
          <div style={{ gridColumn: 'span 7' }} className="product-info-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
              <span className="badge-sticker red">{book.genre}</span>
              {book.badge && <span className="badge-sticker">{book.badge}</span>}
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
                lineHeight: 1.1,
                marginBottom: '0.5rem',
                color: 'var(--text-primary)'
              }}
            >
              {book.title}
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.15rem',
                color: 'var(--accent-tomato)',
                fontWeight: 700,
                marginBottom: '1.25rem'
              }}
            >
              Authored by {book.author}
            </p>

            {/* Rating & Reviews pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid var(--border-color)',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    fill={s <= Math.round(book.rating) ? 'var(--accent-mustard)' : 'none'}
                    color="var(--accent-mustard)"
                  />
                ))}
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, marginLeft: '4px' }}>
                  {book.rating}
                </span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {bookReviews.length + (book.reviewsCount || 0)} Reader Assessments
              </span>
            </div>

            {/* Price section */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '2.4rem',
                  fontWeight: 900,
                  color: 'var(--text-primary)'
                }}
              >
                ₹{book.price}
              </span>
              {book.originalPrice && book.originalPrice > book.price && (
                <>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.2rem',
                      color: 'var(--text-muted)',
                      textDecoration: 'line-through'
                    }}
                  >
                    ₹{book.originalPrice}
                  </span>
                  <span className="badge-sticker" style={{ background: 'var(--accent-sage)', color: '#FFF' }}>
                    SAVE ₹{book.originalPrice - book.price}
                  </span>
                </>
              )}
            </div>

            {/* Stock indicator badge */}
            <div style={{ marginBottom: '1.75rem' }}>
              {isOutOfStock ? (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#EF4444',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '0.88rem'
                  }}
                >
                  ● Currently Out of Print / Replenishing Inventory
                </div>
              ) : book.stock <= 5 ? (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--accent-tomato)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '0.88rem'
                  }}
                >
                  ● Low Inventory: Only {book.stock} hand-inspected copies remaining in Mumbai dispatch
                </div>
              ) : (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--accent-sage)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    fontSize: '0.88rem'
                  }}
                >
                  ● Ready for immediate dispatch ({book.stock} in stock)
                </div>
              )}
            </div>

            {/* Excerpt / Quote */}
            {book.quotes && (
              <blockquote
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1.15rem',
                  lineHeight: 1.5,
                  backgroundColor: 'var(--bg-paper)',
                  borderLeft: '4px solid var(--accent-mustard)',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.75rem',
                  color: 'var(--text-primary)'
                }}
              >
                "{book.quotes}"
              </blockquote>
            )}

            {/* Synopsis Description */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '2rem'
              }}
            >
              {book.description}
            </p>

            {/* Quantity Selector + Add to Cart Actions */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '2rem',
                paddingTop: '1.5rem',
                borderTop: 'var(--border-width) solid var(--border-color)'
              }}
            >
              {/* Quantity Selector */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: 'var(--border-width) solid var(--border-color)',
                  backgroundColor: 'var(--bg-paper)',
                  boxShadow: 'var(--shadow-offset-sm)'
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  style={{ padding: '0.65rem 0.85rem', display: 'flex' }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    minWidth: '40px',
                    textAlign: 'center'
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                  disabled={quantity >= book.stock || isOutOfStock}
                  style={{ padding: '0.65rem 0.85rem', display: 'flex' }}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`neo-btn ${justAdded ? 'neo-btn-secondary' : 'neo-btn-primary'}`}
                style={{
                  padding: '0.85rem 2rem',
                  fontSize: '0.95rem',
                  opacity: isOutOfStock ? 0.5 : 1
                }}
              >
                {justAdded ? (
                  <>
                    <Check size={18} /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Reading Bag
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(book)}
                className="neo-btn"
                style={{
                  padding: '0.85rem 1.15rem',
                  color: inWishlist ? 'var(--accent-tomato)' : 'var(--text-primary)'
                }}
                aria-label="Wishlist toggle"
              >
                <Heart size={18} fill={inWishlist ? 'var(--accent-tomato)' : 'none'} />
              </button>
            </div>

            {/* Service perks */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={16} color="var(--accent-tomato)" />
                <span>Free dispatch over ₹499</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} color="var(--accent-tomato)" />
                <span>Simulated secure gateway</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <RotateCcw size={16} color="var(--accent-tomato)" />
                <span>7-Day condition guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS & READER ASSESSMENTS SECTION */}
        <section
          style={{
            borderTop: 'var(--border-width) solid var(--border-color)',
            paddingTop: '3.5rem',
            marginBottom: '4.5rem'
          }}
        >
          <div className="flex-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge-sticker">CRITICAL RECEPTION</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginTop: '0.4rem' }}>
                Reader Assessments & Notes
              </h2>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="neo-btn neo-btn-secondary"
            >
              <MessageSquare size={16} /> {showReviewForm ? 'Cancel Review' : 'Write Reader Note'}
            </button>
          </div>

          {/* Collapsible Write Review Form */}
          {showReviewForm && (
            <form
              onSubmit={handleReviewSubmit}
              className="neo-box"
              style={{
                padding: '2rem',
                backgroundColor: 'var(--bg-paper)',
                marginBottom: '2.5rem',
                maxWidth: '680px'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>
                Submit Your Editorial Note
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Your Name / Pseudonym
                  </label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Maya S."
                    className="neo-input"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Star Rating
                  </label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="neo-select"
                  >
                    <option value={5}>★★★★★ (5 - Masterpiece)</option>
                    <option value={4}>★★★★☆ (4 - Highly Recommended)</option>
                    <option value={3}>★★★☆☆ (3 - Worthwhile)</option>
                    <option value={2}>★★☆☆☆ (2 - Flawed)</option>
                    <option value={1}>★☆☆☆☆ (1 - Disappointing)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Headline Summary
                </label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Lucidity in an age of distractions"
                  className="neo-input"
                  required
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Your Critical Assessment
                </label>
                <textarea
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Comment on paper quality, prose cadence, or ideological depth..."
                  className="neo-input"
                  required
                />
              </div>

              <button type="submit" className="neo-btn neo-btn-primary">
                Publish Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          {bookReviews.length === 0 ? (
            <div
              className="neo-box"
              style={{ padding: '2.5rem', textAlign: 'center', backgroundColor: 'var(--bg-card)' }}
            >
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                No reader notes have been published yet for this title. Be the first to add one!
              </p>
              <button onClick={() => setShowReviewForm(true)} className="neo-btn">
                Add First Review
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {bookReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="neo-box"
                  style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)' }}
                >
                  <div className="flex-between" style={{ marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem' }}>
                        {rev.userName}
                      </span>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="var(--accent-mustard)" color="var(--accent-mustard)" />
                        ))}
                      </div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {rev.date}
                    </span>
                  </div>

                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    {rev.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* RELATED BOOKS FROM SAME GENRE */}
        {relatedBooks.length > 0 && (
          <section style={{ borderTop: 'var(--border-width) solid var(--border-color)', paddingTop: '3.5rem' }}>
            <span className="badge-sticker">COMPANION TITLES</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', margin: '0.5rem 0 2rem' }}>
              More from {book.genre}
            </h2>
            <div className="books-grid">
              {relatedBooks.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .product-detail-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .product-cover-col { grid-column: span 12 !important; }
          .product-info-col { grid-column: span 12 !important; }
        }
      `}</style>
    </div>
  );
}
