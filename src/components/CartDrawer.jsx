import React from 'react';
import { useStore } from '../context/StoreContext';
import BookCover from './BookCover';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Truck } from 'lucide-react';

export default function CartDrawer() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    freeShippingThreshold,
    navigateTo
  } = useStore();

  if (!isDrawerOpen) return null;

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsDrawerOpen(false);
    navigateTo('checkout');
  };

  const handleViewCart = () => {
    setIsDrawerOpen(false);
    navigateTo('cart');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(3px)'
      }}
      onClick={() => setIsDrawerOpen(false)}
    >
      <div
        className="neo-box"
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: 'var(--bg-paper)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-6px 0px 0px var(--border-color)',
          borderLeft: 'var(--border-width) solid var(--border-color)',
          transform: 'none',
          animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: 'var(--border-width) solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="var(--accent-tomato)" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', margin: 0 }}>
              Shopping Bag ({cart.length})
            </h3>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="neo-btn"
            style={{ padding: '0.4rem', border: '2px solid var(--border-color)' }}
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            backgroundColor: 'var(--bg-subtle)',
            borderBottom: 'var(--border-width) solid var(--border-color)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 700,
              marginBottom: '0.4rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Truck size={14} color="var(--accent-tomato)" />
              {amountNeededForFreeShipping === 0 ? (
                <span style={{ color: 'var(--accent-sage)' }}>Unlocked FREE Express Delivery!</span>
              ) : (
                <span>Add ₹{amountNeededForFreeShipping} for FREE Shipping</span>
              )}
            </div>
            <span>{Math.round(progressPercent)}%</span>
          </div>

          <div
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'var(--bg-paper)',
              border: '1.5px solid var(--border-color)',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: amountNeededForFreeShipping === 0 ? 'var(--accent-sage)' : 'var(--accent-tomato)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                margin: 'auto 0',
                padding: '2rem 1rem'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 1rem',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '2px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShoppingBag size={28} color="var(--text-muted)" />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Your bag is empty
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Discover hand-bound editions, art monographs, and radical zines.
              </p>
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigateTo('catalogue');
                }}
                className="neo-btn neo-btn-primary"
              >
                Explore Catalogue
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="neo-box"
                style={{
                  padding: '0.85rem',
                  display: 'flex',
                  gap: '0.85rem',
                  backgroundColor: 'var(--bg-card)'
                }}
              >
                {/* Mini Book Cover */}
                <div style={{ width: '56px', flexShrink: 0 }}>
                  <BookCover book={item} width="100%" aspectRatio="2 / 2.8" showSpine={false} />
                </div>

                {/* Info & Quantity */}
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.98rem',
                      lineHeight: 1.2,
                      marginBottom: '0.2rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    {item.author}
                  </p>

                  <div className="flex-between">
                    {/* Quantity controls */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1.5px solid var(--border-color)',
                        backgroundColor: 'var(--bg-paper)'
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ padding: '0.25rem 0.45rem', display: 'flex' }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          padding: '0 0.5rem'
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ padding: '0.25rem 0.45rem', display: 'flex' }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price & Delete */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)'
                        }}
                      >
                        ₹{item.price * item.quantity}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: '#EF4444', display: 'flex', padding: '0.2rem' }}
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Actions */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: 'var(--border-width) solid var(--border-color)',
              backgroundColor: 'var(--bg-card)'
            }}
          >
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.95rem' }}>
                Estimated Subtotal
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.3rem' }}>
                ₹{cartSubtotal}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                onClick={handleCheckout}
                className="neo-btn neo-btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
              <button
                onClick={handleViewCart}
                className="neo-btn"
                style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-paper)' }}
              >
                View Full Cart & Apply Coupons
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
