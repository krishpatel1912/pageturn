import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import BookCover from '../components/BookCover';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Tag,
  ShieldCheck,
  Truck,
  Check,
  ShoppingBag
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    couponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartGrandTotal,
    freeShippingThreshold,
    navigateTo
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState(couponCode || 'READ10');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyCoupon(inputCoupon);
  };

  const amountNeeded = Math.max(0, freeShippingThreshold - (cartSubtotal - cartDiscount));

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Page Title */}
        <div
          style={{
            borderBottom: 'var(--border-width) solid var(--border-color)',
            paddingBottom: '1.25rem',
            marginBottom: '2.5rem'
          }}
        >
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge-sticker">ORDER REQUISITION</span>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3rem)', marginTop: '0.4rem' }}>
                Your Reading Bag ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </h1>
            </div>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: '#EF4444',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Trash2 size={14} /> Empty Entire Bag
              </button>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div
            className="neo-box"
            style={{
              padding: '5rem 2rem',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'var(--bg-subtle)',
                border: '2px solid var(--border-color)',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShoppingBag size={36} color="var(--text-muted)" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.75rem' }}>
              Your Reading Bag is Empty
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem', maxWidth: '420px', margin: '0 auto 2rem' }}>
              Your shelf is waiting for timeless thoughts, design monographs, and hand-bound editions.
            </p>
            <button
              onClick={() => navigateTo('catalogue')}
              className="neo-btn neo-btn-primary"
              style={{ padding: '0.9rem 2rem' }}
            >
              Browse The Catalogue <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* Cart Grid: Items Table + Financial Summary */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 380px',
              gap: '2.5rem',
              alignItems: 'start'
            }}
            className="cart-page-grid"
          >
            {/* LEFT COLUMN: Items List */}
            <div>
              {/* Free shipping bar */}
              <div
                className="neo-box"
                style={{
                  padding: '1rem 1.25rem',
                  backgroundColor: 'var(--bg-paper)',
                  marginBottom: '1.5rem'
                }}
              >
                <div className="flex-between" style={{ marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Truck size={16} color="var(--accent-tomato)" />
                    {amountNeeded === 0 ? (
                      <span style={{ color: 'var(--accent-sage)', fontWeight: 700 }}>
                        ★ Congratulations! You qualified for Free Express Delivery!
                      </span>
                    ) : (
                      <span>
                        Add <strong>₹{amountNeeded.toFixed(0)}</strong> more to unlock <strong>FREE Shipping</strong> (Threshold: ₹499)
                      </span>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1.5px solid var(--border-color)'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.min(100, ((cartSubtotal - cartDiscount) / freeShippingThreshold) * 100)}%`,
                      backgroundColor: amountNeeded === 0 ? 'var(--accent-sage)' : 'var(--accent-tomato)',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="neo-box cart-item-row"
                    style={{
                      padding: '1.25rem',
                      backgroundColor: 'var(--bg-card)',
                      display: 'grid',
                      gridTemplateColumns: '90px 1fr auto',
                      gap: '1.25rem',
                      alignItems: 'center'
                    }}
                  >
                    {/* Cover Thumbnail */}
                    <div style={{ cursor: 'pointer' }} onClick={() => navigateTo('product', { id: item.id })}>
                      <BookCover book={item} width="100%" aspectRatio="2 / 2.8" showSpine={false} />
                    </div>

                    {/* Book Information */}
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          textTransform: 'uppercase',
                          color: 'var(--text-muted)'
                        }}
                      >
                        {item.genre}
                      </span>
                      <h3
                        onClick={() => navigateTo('product', { id: item.id })}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.25rem',
                          margin: '0.2rem 0',
                          cursor: 'pointer'
                        }}
                      >
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                        by {item.author}
                      </p>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            border: '1.5px solid var(--border-color)',
                            backgroundColor: 'var(--bg-paper)'
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{ padding: '0.35rem 0.6rem', display: 'flex' }}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              padding: '0 0.6rem'
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{ padding: '0.35rem 0.6rem', display: 'flex' }}
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            color: '#EF4444',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price Calculation */}
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '1.35rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)'
                        }}
                      >
                        ₹{item.price * item.quantity}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)'
                        }}
                      >
                        ₹{item.price} each
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div style={{ marginTop: '1.5rem' }}>
                <button
                  onClick={() => navigateTo('catalogue')}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  <ArrowLeft size={16} /> Continue Browsing Catalogue
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary & Coupon */}
            <aside
              className="neo-box"
              style={{
                backgroundColor: 'var(--bg-paper)',
                padding: '1.75rem',
                position: 'sticky',
                top: '95px'
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  borderBottom: 'var(--border-width) solid var(--border-color)',
                  paddingBottom: '0.75rem',
                  marginBottom: '1.25rem'
                }}
              >
                Order Summary
              </h2>

              {/* Coupon Code Input */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    marginBottom: '0.4rem'
                  }}
                >
                  Promotional Coupon
                </label>
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                    placeholder="e.g. READ10"
                    className="neo-input"
                    style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700 }}
                  />
                  <button type="submit" className="neo-btn neo-btn-secondary" style={{ padding: '0.6rem 1rem' }}>
                    Apply
                  </button>
                </form>

                {/* Available coupons hint */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.45rem'
                  }}
                >
                  Try: <button type="button" onClick={() => { setInputCoupon('READ10'); applyCoupon('READ10'); }} style={{ color: 'var(--accent-tomato)', textDecoration: 'underline' }}>READ10</button> (10% off) or <button type="button" onClick={() => { setInputCoupon('WELCOME20'); applyCoupon('WELCOME20'); }} style={{ color: 'var(--accent-tomato)', textDecoration: 'underline' }}>WELCOME20</button> (20% off)
                </div>

                {/* Applied Coupon Tag */}
                {appliedCoupon && (
                  <div
                    style={{
                      marginTop: '0.65rem',
                      padding: '0.4rem 0.65rem',
                      backgroundColor: 'var(--accent-mustard)',
                      color: '#141414',
                      border: '1.5px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: 700
                    }}
                  >
                    <span>✓ Coupon {appliedCoupon.code} applied ({appliedCoupon.discountPercent}% OFF)</span>
                    <button onClick={removeCoupon} style={{ color: '#EF4444', fontWeight: 900 }}>✕</button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  borderBottom: '1px dashed var(--border-color)',
                  paddingBottom: '1.25rem',
                  marginBottom: '1.25rem'
                }}
              >
                <div className="flex-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Books Subtotal</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>₹{cartSubtotal}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex-between" style={{ color: 'var(--accent-tomato)', fontWeight: 600 }}>
                    <span>Promotional Discount</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>- ₹{cartDiscount}</span>
                  </div>
                )}

                <div className="flex-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Carbon-Neutral Delivery</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    {cartShipping === 0 ? (
                      <span style={{ color: 'var(--accent-sage)' }}>FREE</span>
                    ) : (
                      `₹${cartShipping}`
                    )}
                  </span>
                </div>

                <div className="flex-between">
                  <span style={{ color: 'var(--text-secondary)' }}>GST (5% Books & Periodicals)</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>₹{cartTax}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex-between" style={{ marginBottom: '1.75rem' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700 }}>
                  Requisition Total
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    color: 'var(--text-primary)'
                  }}
                >
                  ₹{cartGrandTotal}
                </span>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => navigateTo('checkout')}
                className="neo-btn neo-btn-primary"
                style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', marginBottom: '1rem' }}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)'
                }}
              >
                <ShieldCheck size={14} color="var(--accent-sage)" />
                <span>Encrypted simulated checkout protocol</span>
              </div>
            </aside>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-page-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .cart-item-row { grid-template-columns: 70px 1fr !important; }
        }
      `}</style>
    </div>
  );
}
