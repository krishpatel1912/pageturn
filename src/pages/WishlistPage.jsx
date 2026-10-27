import React from 'react';
import { useStore } from '../context/StoreContext';
import BookCover from '../components/BookCover';
import { Heart, ShoppingBag, Trash2, ArrowRight, BookOpen } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, navigateTo } = useStore();

  const handleMoveToCart = (book) => {
    addToCart(book, 1);
    toggleWishlist(book); // remove from wishlist after moving
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Page Header */}
        <div
          style={{
            borderBottom: 'var(--border-width) solid var(--border-color)',
            paddingBottom: '1.25rem',
            marginBottom: '2.5rem'
          }}
        >
          <span className="badge-sticker">READING QUEUE</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3rem)', marginTop: '0.4rem' }}>
            Curated Wishlist ({wishlist.length} {wishlist.length === 1 ? 'title' : 'titles'})
          </h1>
        </div>

        {wishlist.length === 0 ? (
          <div
            className="neo-box"
            style={{
              padding: '5rem 2rem',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card)',
              maxWidth: '540px',
              margin: '0 auto'
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                backgroundColor: 'var(--bg-subtle)',
                border: '2px solid var(--border-color)',
                margin: '0 auto 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Heart size={32} color="var(--text-muted)" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
              Save books while browsing to track hand-bound editions for your personal library.
            </p>
            <button
              onClick={() => navigateTo('catalogue')}
              className="neo-btn neo-btn-primary"
            >
              Explore Catalogue <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}
          >
            {wishlist.map((book) => (
              <div
                key={book.id}
                className="neo-box"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div
                  style={{ marginBottom: '1rem', cursor: 'pointer' }}
                  onClick={() => navigateTo('product', { id: book.id })}
                >
                  <BookCover book={book} width="100%" aspectRatio="2 / 2.8" />
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '0.2rem'
                  }}
                >
                  {book.genre}
                </span>

                <h3
                  onClick={() => navigateTo('product', { id: book.id })}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    marginBottom: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  {book.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  by {book.author}
                </p>

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
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.25rem',
                      fontWeight: 700
                    }}
                  >
                    ₹{book.price}
                  </span>

                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => handleMoveToCart(book)}
                      className="neo-btn neo-btn-primary"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.78rem' }}
                      title="Move to Cart"
                    >
                      <ShoppingBag size={14} /> Move to Bag
                    </button>
                    <button
                      onClick={() => toggleWishlist(book)}
                      className="neo-btn"
                      style={{ padding: '0.45rem', color: '#EF4444' }}
                      title="Remove from wishlist"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
