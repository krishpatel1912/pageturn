import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import BookCover from './BookCover';
import { ShoppingBag, Heart, Star, Check } from 'lucide-react';

export default function BookCard({ book }) {
  const { addToCart, toggleWishlist, isInWishlist, navigateTo } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const inWishlist = isInWishlist(book.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(book, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(book);
  };

  const handleCardClick = () => {
    navigateTo('product', { id: book.id });
  };

  // Stock status text & color
  const isOutOfStock = book.stock <= 0;
  const isLowStock = book.stock > 0 && book.stock <= 5;

  return (
    <article
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="neo-box"
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        background: 'var(--bg-card)',
        padding: '1rem',
        transform: isHovered ? 'translateY(-4px) rotate(-0.5deg)' : 'none',
        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease',
        userSelect: 'none'
      }}
    >
      {/* Top Sticker Badge */}
      {book.badge && (
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            right: '12px',
            zIndex: 10
          }}
        >
          <span
            className={`badge-sticker ${
              book.badge.includes('%') || book.badge === 'HOT'
                ? 'red'
                : book.badge === 'NEW'
                ? 'cyan'
                : ''
            }`}
          >
            {book.badge}
          </span>
        </div>
      )}

      {/* Book Cover Area */}
      <div
        style={{
          position: 'relative',
          marginBottom: '1rem',
          perspective: '1000px'
        }}
      >
        <div
          style={{
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform 0.25s ease'
          }}
        >
          <BookCover book={book} width="100%" aspectRatio="2 / 2.8" />
        </div>

        {/* Quick Wishlist Icon Button */}
        <button
          onClick={handleWishlist}
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            zIndex: 5,
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-paper)',
            border: '2px solid var(--border-color)',
            boxShadow: '2px 2px 0px var(--border-color)',
            color: inWishlist ? 'var(--accent-tomato)' : 'var(--text-primary)',
            transition: 'all 0.1s ease'
          }}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={inWishlist ? 'var(--accent-tomato)' : 'none'} />
        </button>
      </div>

      {/* Book Details */}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              letterSpacing: '0.05em'
            }}
          >
            {book.genre}
          </span>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Star size={13} fill="var(--accent-mustard)" color="var(--accent-mustard)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700 }}>
              {book.rating}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem',
            lineHeight: 1.25,
            marginBottom: '0.3rem',
            color: 'var(--text-primary)'
          }}
        >
          {book.title}
        </h3>

        {/* Author */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginBottom: '0.75rem'
          }}
        >
          by {book.author}
        </p>

        {/* Stock status indicator */}
        <div style={{ marginBottom: '0.75rem' }}>
          {isOutOfStock ? (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#EF4444', fontWeight: 700 }}>
              ● Out of Stock
            </span>
          ) : isLowStock ? (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--accent-tomato)', fontWeight: 700 }}>
              ● Only {book.stock} copies left
            </span>
          ) : (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--accent-sage)', fontWeight: 600 }}>
              ● In Stock ({book.stock})
            </span>
          )}
        </div>

        {/* Price & Action Button */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.75rem',
            borderTop: '1px dashed var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem'
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}
            >
              ₹{book.price}
            </span>
            {book.originalPrice && book.originalPrice > book.price && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'line-through',
                  marginLeft: '0.45rem'
                }}
              >
                ₹{book.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`neo-btn ${justAdded ? 'neo-btn-secondary' : 'neo-btn-primary'}`}
            style={{
              padding: '0.5rem 0.85rem',
              fontSize: '0.8rem',
              opacity: isOutOfStock ? 0.5 : 1,
              cursor: isOutOfStock ? 'not-allowed' : 'pointer'
            }}
            aria-label="Add book to cart"
          >
            {justAdded ? (
              <>
                <Check size={14} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={14} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
