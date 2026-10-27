import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, ArrowUpRight, BookOpen, Compass, Shield, Heart } from 'lucide-react';

export default function Footer() {
  const { navigateTo, showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('Subscribed to PageTurn Fortnightly Dispatch!');
    setEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-paper)',
        borderTop: 'var(--border-width) solid var(--border-color)',
        color: 'var(--text-primary)',
        marginTop: '5rem',
        position: 'relative'
      }}
    >
      {/* Top Banner with Paper Stamp */}
      <div
        style={{
          borderBottom: 'var(--border-width) solid var(--border-color)',
          backgroundColor: 'var(--accent-mustard)',
          padding: '1.25rem 0'
        }}
      >
        <div className="container flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 900,
                fontSize: '1.4rem',
                color: '#141414'
              }}
            >
              Support Independent Literary Culture.
            </span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: '#141414',
              fontWeight: 600
            }}
          >
            Zero corporate algorithms. 100% human-selected typography and literature.
          </p>
        </div>
      </div>

      {/* Main Footer Links & Dispatch */}
      <div className="container" style={{ padding: '3.5rem 1.5rem 2.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Column 1: Brand & Manifesto */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
              <span
                style={{
                  backgroundColor: 'var(--accent-tomato)',
                  color: '#FFFDF9',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  padding: '0.1rem 0.4rem',
                  border: '2px solid var(--border-color)'
                }}
              >
                P
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 900,
                  fontSize: '1.6rem',
                  letterSpacing: '-0.02em'
                }}
              >
                PAGE<span style={{ fontStyle: 'italic', color: 'var(--accent-tomato)' }}>TURN</span>
              </span>
            </div>
            <p
              style={{
                fontSize: '0.88rem',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                marginBottom: '1.25rem'
              }}
            >
              An independent bookstore, micro-publisher, and literary archival project founded in 2026.
              Curating titles that champion tangible paper, fearless ideas, and enduring typography.
            </p>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}
            >
              📍 42 Fountain Chambers, Kala Ghoda Arts District, Mumbai 400001
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
                color: 'var(--accent-tomato)'
              }}
            >
              Exploration
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 600
              }}
            >
              <li>
                <button onClick={() => navigateTo('catalogue')} style={{ textAlign: 'left' }}>
                  Complete Book Catalogue
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} style={{ textAlign: 'left' }}>
                  Zine Manifesto & History
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('order-tracking')} style={{ textAlign: 'left' }}>
                  Live Package Tracking
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} style={{ textAlign: 'left' }}>
                  Reading Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} style={{ textAlign: 'left', color: 'var(--accent-tomato)' }}>
                  Admin Portal (ERP)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Policy & Customer Care */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
                color: 'var(--accent-tomato)'
              }}
            >
              Customer Care
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 600
              }}
            >
              <li>
                <button onClick={() => navigateTo('faq')} style={{ textAlign: 'left' }}>
                  Shipping & Dispatch Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} style={{ textAlign: 'left' }}>
                  Returns & Replacements
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} style={{ textAlign: 'left' }}>
                  Submit a Manuscript / Contact
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} style={{ textAlign: 'left' }}>
                  Plastic-Free Packaging Promise
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} style={{ textAlign: 'left' }}>
                  Institutional & Library Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Fortnightly Dispatch Newsletter */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
                color: 'var(--accent-tomato)'
              }}
            >
              Fortnightly Dispatch
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
              Original essays, newly discovered pamphlets, author interviews, and exclusive discounts. No spam, ever.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="reader@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="neo-input"
                style={{ padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}
                required
              />
              <button type="submit" className="neo-btn neo-btn-primary" style={{ padding: '0.6rem 1rem' }}>
                Join the Circle <ArrowUpRight size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div
          style={{
            borderTop: 'var(--border-width) solid var(--border-color)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © 2026 PageTurn Bookstore. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>Privacy</span>
            <span>Terms</span>
            <span>GST Registered</span>
            <span>Carbon Neutral</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
